DevHunter AI is an automated technical recruitment platform that combines GitHub repository analysis with AI-driven voice interviews. It helps recruiters screen engineering candidates by deeply analyzing their code and conducting real-time, context-aware phone interviews.

Features 🚀

Deep GitHub Analysis: Scans repositories (even complex nested structures) to identify tech stacks, complexity, and code quality.

Automated Voice Interviews: Uses Telnyx and OpenAI to call candidates and ask technical questions generated specifically from their code.

Real-time Transcript: Watch the interview unfold live on the dashboard as the AI speaks with the candidate.

Candidate Pipeline: Manage candidates through stages: New -> Analyzing -> Scheduled -> Interviewing -> Completed.

Modern UI: Built with React, Tailwind CSS, and Shadcn UI for a professional "SaaS" look.

Tech Stack 🛠️

Frontend: React, Vite, Tailwind CSS, Lucide React

Backend: Node.js, Express

AI & Voice: OpenAI (GPT-4 Turbo), Telnyx (Voice API)

Utilities: Axios, concurrently

Prerequisites 📋

Before running the project, ensure you have:

Node.js (v18+ recommended)

OpenAI API Key (for code analysis and interview logic)

Telnyx Account (API Key + Phone Number + Call Control App)

Ngrok (to expose your local server for voice webhooks)

Installation & Setup ⚙️

Clone or Create Project
Ensure you have the file structure set up (see Directory Structure below).

Install Dependencies

npm install


Configure Environment Variables
Create a .env file in the root directory and add your keys:

PORT=3000
OPENAI_API_KEY=sk-YOUR_OPENAI_KEY
TELNYX_API_KEY=KEY017_YOUR_TELNYX_KEY
TELNYX_PHONE_NUMBER=+15551234567
PUBLIC_URL=[https://your-ngrok-url.ngrok-free.app](https://your-ngrok-url.ngrok-free.app)


Start Ngrok
Telnyx needs to reach your local server to handle call events.

ngrok http 3000


Copy the HTTPS URL from ngrok and paste it into PUBLIC_URL in your .env file.

Run the Application
This command starts both the backend API (port 3000) and the frontend React app (port 5173).

npm start


Access the Dashboard
Open your browser to http://localhost:5173.

Usage Guide 📖

Add a Candidate: Click the "+" icon in the sidebar. Enter a name, role, and a public GitHub repository URL.

Analyze Code: Select the candidate and click "Analyze GitHub". The AI will deep-scan the repo.

Start Interview: Once analysis is complete, the status changes to "Scheduled." Click "Start Interview", enter a phone number, and the AI will call the candidate.

Monitor Live: Watch the "Live Transcript" panel update in real-time as the candidate answers technical questions.

Directory Structure 📂

devhunter-dashboard/
├── .env                  # Config & API Keys
├── package.json          # Dependencies
├── server.js             # Node.js Backend (Voice & GitHub Logic)
├── vite.config.js        # Vite Configuration
├── tailwind.config.js    # Tailwind Configuration
├── postcss.config.js     # PostCSS Configuration
├── index.html            # React Entry Point
└── src/
    ├── App.jsx           # Main Dashboard Component
    ├── main.jsx          # React DOM Render
    └── index.css         # Global Styles


Troubleshooting 🔧

"Vite: react-babel error": Ensure you removed type imports from App.jsx (e.g., change import { type ClassValue } to import { clsx }).

Voice Call Not Connecting: Check your PUBLIC_URL in .env. It must match your current running Ngrok session. Also, ensure your Telnyx Call Control App is pointing to ${PUBLIC_URL}/webhooks/telnyx.

GitHub Analysis Fails: Ensure the repository is public. If hitting rate limits, try using a different repo or wait a few minutes.

*Built for the 2025 AI Agent Hackathon
