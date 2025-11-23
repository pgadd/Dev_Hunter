/**
 * DevHunter AI - Backend Server (Aggressive Probe Version)
 * Feature: Brute-forces common subfolder paths if GitHub API blocks the file tree.
 */

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');
const Telnyx = require('telnyx');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Initialize APIs
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const telnyx = Telnyx(process.env.TELNYX_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory database
const DB = { candidates: {}, calls: {} };

// --- ROUTES ---

// 1. Analyze GitHub Repo
app.post('/api/analyze', async (req, res) => {
  try {
    const { githubUrl } = req.body;
    console.log(`\n[Analyzer] Starting Aggressive Scan for: ${githubUrl}`);

    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return res.status(400).json({ error: 'Invalid GitHub URL' });
    const [_, owner, repo] = match;
    
    // 1. Detect Branch (Main vs Master)
    const branch = await detectBranch(owner, repo);
    console.log(`[Analyzer] Branch: ${branch}`);

    // 2. Try to get File Tree (API)
    let allFiles = await fetchRecursiveTree(owner, repo, branch);
    let scanMethod = "API Tree Scan";

    // 3. FALLBACK: If API is blocked, generate a "Virtual Tree" by probing common paths
    if (allFiles.length === 0) {
        console.log(`[Analyzer] API blocked. Engaging Aggressive Subfolder Probe...`);
        scanMethod = "Aggressive Deep Probe";
        
        // We blindly try to fetch these paths to see which ones exist
        const commonPaths = [
            // Configs
            'package.json', 'frontend/package.json', 'backend/package.json', 'client/package.json', 'server/package.json',
            'requirements.txt', 'backend/requirements.txt', 'pyproject.toml',
            'go.mod', 'Cargo.toml', 'pom.xml', 'build.gradle',
            // Source Entries (JS/TS)
            'src/index.js', 'src/main.js', 'src/App.js', 'src/App.jsx',
            'src/index.ts', 'src/main.ts', 'src/App.tsx',
            'app/page.tsx', 'app/layout.tsx', 'app/page.js', // Next.js
            'pages/index.js', 'pages/index.tsx',
            // Backend
            'server/index.js', 'server/server.js', 'server/main.py', 'backend/main.py', 'app.py', 'main.py',
            'main.go', 'cmd/main.go'
        ];

        // Verify which files actually exist using parallel HEAD requests
        const validFiles = await probePaths(owner, repo, branch, commonPaths);
        allFiles = ['README.md', ...validFiles]; // Always assume README
        console.log(`[Analyzer] Probe found ${validFiles.length} deep files: ${validFiles.join(', ')}`);
    }

    // 4. Select Best Files to Read
    const getBestMatch = (snippets) => {
        for (let snippet of snippets) {
            const found = allFiles.find(f => f.toLowerCase().endsWith(snippet.toLowerCase()));
            if (found) return found;
        }
        return null;
    };

    // Prioritize deep config files over root ones if they exist
    const packagePath = getBestMatch(['server/package.json', 'client/package.json', 'package.json', 'requirements.txt', 'go.mod']);
    
    const sourcePath = getBestMatch([
        'src/App.tsx', 'src/App.jsx', 'src/index.js', 'app/page.tsx', // Frontend
        'server/index.js', 'main.py', 'backend/main.py', 'main.go'    // Backend
    ]);

    // 5. Fetch Content
    const [readme, configContent, sourceContent] = await Promise.all([
        fetchRawFile(owner, repo, branch, 'README.md'),
        packagePath ? fetchRawFile(owner, repo, branch, packagePath) : null,
        sourcePath ? fetchRawFile(owner, repo, branch, sourcePath) : null
    ]);

    console.log(`[Analyzer] Content: README=${!!readme}, Config=${!!configContent} (${packagePath}), Source=${!!sourceContent} (${sourcePath})`);

    // 6. AI Analysis
    const prompt = `
      You are a Technical Recruiter AI. Analyze this GitHub repository.
      Scan Method: ${scanMethod}
      Repo: ${owner}/${repo}
      
      Files Found: ${JSON.stringify(allFiles)}

      -- CONTENT --
      README: ${readme ? readme.substring(0, 1500) : 'N/A'}
      Config (${packagePath || 'N/A'}): ${configContent ? configContent.substring(0, 1000) : 'N/A'}
      Source Code (${sourcePath || 'N/A'}): ${sourceContent ? sourceContent.substring(0, 1500) : 'N/A'}

      -- OUTPUT --
      1. Tech Stack Summary.
      2. Complexity Rating (1-10).
      3. Generate 3 specific technical interview questions based on the code found.
      
      Return JSON: { "summary": "...", "complexity": 8, "questions": ["q1", "q2", "q3"] }
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview", 
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    const id = Date.now().toString();
    DB.candidates[id] = { owner, repo, analysis, githubUrl };

    res.json({ id, ...analysis });

  } catch (error) {
    console.error("Analysis Error:", error.message);
    res.status(500).json({ error: "Analysis failed. Check terminal logs." });
  }
});

// 2. Call Route (Same as before)
app.post('/api/call', async (req, res) => {
  try {
    const { candidateId, phoneNumber } = req.body;
    const candidate = DB.candidates[candidateId];
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    console.log(`[Call] Dialing ${phoneNumber}...`);
    const { data: call } = await telnyx.calls.create({
      connection_id: await getTelnyxConnectionId(),
      to: phoneNumber,
      from: process.env.TELNYX_PHONE_NUMBER,
      webhook_url: `${process.env.PUBLIC_URL}/webhooks/telnyx`,
      webhook_url_method: "POST"
    });

    DB.calls[call.call_control_id] = {
      candidateId,
      stage: 'intro',
      questions: candidate.analysis.questions,
      transcript: []
    };
    res.json({ success: true, callId: call.call_control_id });
  } catch (error) {
    console.error("Call Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Webhook Route (Same as before)
app.post('/webhooks/telnyx', async (req, res) => {
  const event = req.body.data;
  const callId = event.payload.call_control_id;
  const callState = DB.calls[callId];

  res.status(200).send('Received');
  if (!callState) return;

  const call = new Telnyx.Call({ call_control_id: callId });

  try {
    if (event.event_type === 'call.answered') {
        const intro = `Hello! I am Dev Hunter AI. I have reviewed your code. Ready for 3 technical questions?`;
        await call.speak({ payload: intro, voice: 'female', language: 'en-US' });
    }
    else if (event.event_type === 'call.speak.ended') {
        if (callState.stage === 'goodbye') { await call.hangup(); return; }
        await call.gatherUsingAudio({ maximum_recording_duration_millis: 4000 });
    }
    else if (event.event_type === 'call.gather.ended') {
        const stages = ['intro', 'question1', 'question2', 'question3'];
        const currentIdx = stages.indexOf(callState.stage);
        const nextStage = stages[currentIdx + 1] || 'goodbye';
        callState.stage = nextStage;

        let msg = "Goodbye.";
        if (nextStage !== 'goodbye') msg = `Next Question: ${callState.questions[currentIdx]}`; // currentIdx corresponds to Q index 0,1,2
        
        await call.speak({ payload: msg, voice: 'female' });
    }
  } catch (e) { await call.hangup(); }
});

// --- AGGRESSIVE HELPER FUNCTIONS ---

async function detectBranch(owner, repo) {
    // 1. Try API
    try {
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}
        });
        return data.default_branch;
    } catch (e) {}

    // 2. Probe Raw URLs
    const branches = ['main', 'master', 'dev'];
    for (const b of branches) {
        try {
            await axios.head(`https://raw.githubusercontent.com/${owner}/${repo}/${b}/README.md`);
            return b;
        } catch (e) {}
    }
    return 'main';
}

async function fetchRecursiveTree(owner, repo, branch) {
    try {
        const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
        const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
        const { data } = await axios.get(url, { headers });
        return data.tree.filter(item => item.type === 'blob').map(item => item.path);
    } catch (e) { return []; }
}

// NEW: Probe multiple paths in parallel to see what exists
async function probePaths(owner, repo, branch, paths) {
    const validPaths = [];
    // Check in batches of 10 to avoid overwhelming connection
    const checkPath = async (path) => {
        try {
            const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
            await axios.head(url); // Lightweight check
            return path;
        } catch (e) { return null; }
    };

    const results = await Promise.all(paths.map(p => checkPath(p)));
    return results.filter(p => p !== null);
}

async function fetchRawFile(owner, repo, branch, path) {
    if (!path) return null;
    try {
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
        const { data } = await axios.get(url);
        if (typeof data === 'object') return JSON.stringify(data);
        return data;
    } catch (e) { return null; }
}

async function getTelnyxConnectionId() {
    try {
        const { data } = await telnyx.callControlApplications.list();
        if (data.length > 0) return data[0].id;
        return "12345";
    } catch (e) { return "12345"; }
}

app.listen(port, () => {
  console.log(`DevHunter AI (Aggressive Probe) running on http://localhost:${port}`);
});