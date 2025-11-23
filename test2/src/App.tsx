import { useState } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { MetricsOverview } from "./components/MetricsOverview";
import { CandidatePipeline, type Candidate } from "./components/CandidatePipeline";
import { GitHubAnalysis } from "./components/GitHubAnalysis";
import { InterviewQuestions } from "./components/InterviewQuestions";
import { InterviewTranscript } from "./components/InterviewTranscript";
import { CandidateScore } from "./components/CandidateScore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { ArrowLeft, Shield, Code2, Zap, Brain, Target, Database } from "lucide-react";

// Mock data
const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    position: "Senior Full Stack Engineer",
    githubUrl: "https://github.com/sarahchen/ecommerce-platform",
    status: "completed",
    score: 87,
    interviewDate: "Nov 20, 2025",
    avatar: "SC",
  },
  {
    id: "2",
    name: "Marcus Thompson",
    position: "Backend Engineer",
    githubUrl: "https://github.com/mthompson/api-gateway",
    status: "interviewing", // Changed status
    interviewDate: "Nov 24, 2025",
    avatar: "MT",
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    position: "Frontend Developer",
    githubUrl: "https://github.com/alexr/dashboard-ui",
    status: "analyzing",
    avatar: "AR",
  },
  {
    id: "4",
    name: "Emily Zhang",
    position: "DevOps Engineer",
    githubUrl: "https://github.com/ezhang/kubernetes-deploy",
    status: "completed",
    score: 94, // Different score
    interviewDate: "Nov 19, 2025",
    avatar: "EZ",
  },
  {
    id: "5",
    name: "David Kim",
    position: "Full Stack Developer",
    githubUrl: "", // Empty initially
    status: "new",
    avatar: "DK",
  },
];

const mockAnalysis = {
  repoName: "ecommerce-platform",
  techStack: ["Node.js", "React", "PostgreSQL", "Redis", "Docker", "AWS", "TypeScript"],
  linesOfCode: 45230,
  complexity: "High" as const,
  lastCommit: "2 days ago",
  stars: 234,
  branches: 12,
  vulnerabilities: [
    {
      severity: "high" as const,
      file: "server/auth.js",
      line: 87,
      description: "JWT authentication implemented without secret rotation mechanism",
      code: "const token = jwt.sign(payload, process.env.JWT_SECRET);",
    },
    {
      severity: "medium" as const,
      file: "api/payments.js",
      line: 156,
      description: "Payment processing lacks comprehensive error handling for edge cases",
    },
    {
      severity: "low" as const,
      file: "utils/logger.js",
      line: 23,
      description: "Console.log statements found in production code",
      code: "console.log('Payment processed:', paymentData);",
    },
  ],
  strengths: [
    "Well-structured microservices architecture",
    "Comprehensive test coverage (87%)",
    "Clean separation of concerns",
    "Proper use of async/await patterns",
  ],
  concerns: [
    "Limited error handling in critical paths",
    "Some security best practices need attention",
    "Documentation could be more detailed",
  ],
};

// Emily's specific analysis (Mock)
const emilyAnalysis = {
  ...mockAnalysis,
  repoName: "kubernetes-deploy",
  techStack: ["Kubernetes", "Terraform", "Go", "Python", "AWS", "Helm"],
  strengths: ["Excellent IaC practices", "Robust CI/CD pipeline", "Strong security policies"],
  vulnerabilities: []
}

const mockQuestions = [
  {
    id: "q1",
    category: "security" as const,
    question: "I noticed you're handling JWT authentication without a secret rotation mechanism. Can you walk me through your security strategy for token management?",
    context: "Found in server/auth.js:87 - tokens are signed but no rotation policy exists",
    difficulty: "Hard" as const,
    codeReference: {
      file: "server/auth.js",
      line: 87,
    },
  },
  {
    id: "q2",
    category: "architecture" as const,
    question: "Your payment processing module shows limited error handling. How would you handle scenarios where the payment gateway is down?",
    context: "api/payments.js lacks comprehensive error handling for external service failures",
    difficulty: "Medium" as const,
    codeReference: {
      file: "api/payments.js",
      line: 156,
    },
  },
  {
    id: "q3",
    category: "best-practices" as const,
    question: "I see console.log statements in your production code. What's your logging strategy for production environments?",
    context: "Multiple console.log statements found in utils/logger.js",
    difficulty: "Easy" as const,
    codeReference: {
      file: "utils/logger.js",
      line: 23,
    },
  },
  {
    id: "q4",
    category: "performance" as const,
    question: "You're using Redis for caching. Can you explain your cache invalidation strategy and how you handle cache stampede scenarios?",
    context: "Redis implementation found but cache invalidation logic is unclear",
    difficulty: "Hard" as const,
  },
];

const mockTranscript = [
  {
    id: "t1",
    speaker: "ai" as const,
    text: "Hi Sarah, this is DevHunter AI. Thank you for taking my call. I've reviewed your ecommerce-platform repository and I'd like to ask you a few technical questions about your code. This should take about 5 minutes. Are you ready?",
    timestamp: "0:00",
  },
  {
    id: "t2",
    speaker: "candidate" as const,
    text: "Yes, I'm ready. Thanks for reaching out!",
    timestamp: "0:08",
  },
  {
    id: "t3",
    speaker: "ai" as const,
    text: "Great! Let's start with security. I noticed in your auth.js file at line 87 that you're implementing JWT authentication without a secret rotation mechanism. Can you walk me through your security strategy for token management?",
    timestamp: "0:12",
  },
  {
    id: "t4",
    speaker: "candidate" as const,
    text: "That's a good catch. So, while the current implementation doesn't have automatic rotation, we do have a manual rotation process through our deployment pipeline. The JWT_SECRET is stored in AWS Secrets Manager and we rotate it quarterly. For the production version, I actually built a middleware that checks token age and forces re-authentication after 7 days, which gives us a balance between security and user experience. I'd definitely want to implement automatic rotation with a grace period in the next iteration.",
    timestamp: "0:25",
    assessment: {
      score: 9,
      feedback: "Excellent response. Demonstrates understanding of security trade-offs, awareness of limitations, and has a plan for improvement.",
      keyPoints: [
        "Understands the security issue identified",
        "Has implemented compensating controls (AWS Secrets Manager, token expiry)",
        "Recognizes room for improvement and has a roadmap",
      ],
    },
  },
  {
    id: "t5",
    speaker: "ai" as const,
    text: "That's a solid approach. Now let's talk about your payment processing. I see your payments.js module has limited error handling. How would you handle scenarios where the payment gateway is temporarily down?",
    timestamp: "0:55",
  },
  {
    id: "t6",
    speaker: "candidate" as const,
    text: "Good question. We use Stripe as our payment gateway, and I implemented a circuit breaker pattern using the opossum library. If the gateway fails, we catch the error, log it to our monitoring system, and queue the payment for retry using Bull queue. The user sees a friendly message saying their payment is processing. We have exponential backoff for retries - starting at 30 seconds, then 2 minutes, then 10 minutes. After 3 failed attempts, we alert the ops team and notify the customer via email. We also have a fallback to a secondary payment processor if the primary is down for more than 15 minutes.",
    timestamp: "1:05",
    assessment: {
      score: 10,
      feedback: "Outstanding answer. Shows advanced understanding of distributed systems, error handling patterns, and user experience considerations.",
      keyPoints: [
        "Implements circuit breaker pattern correctly",
        "Has proper retry logic with exponential backoff",
        "Considers user experience and monitoring",
        "Has fallback strategy for critical failures",
      ],
    },
  },
  {
    id: "t7",
    speaker: "ai" as const,
    text: "Impressive implementation. One more question - I noticed console.log statements in your logger utility. What's your logging strategy for production?",
    timestamp: "1:45",
  },
  {
    id: "t8",
    speaker: "candidate" as const,
    text: "Oh yes, those are actually legacy from early development. In production, we use Winston for structured logging with different transports - CloudWatch for AWS, and we also stream to Datadog. The console.logs should have been removed, but they're behind a NODE_ENV check so they don't actually execute in prod. That said, I should clean those up - thanks for catching that!",
    timestamp: "1:52",
    assessment: {
      score: 7,
      feedback: "Good awareness of proper logging practices. Honest about the oversight and understands the issue.",
      keyPoints: [
        "Uses appropriate logging library (Winston)",
        "Has proper production logging infrastructure",
        "Acknowledges technical debt honestly",
      ],
    },
  },
];

const emilyTranscript = [
  {
    id: "t1",
    speaker: "ai" as const,
    text: "Hi Emily, DevHunter AI here. I've analyzed your kubernetes-deploy repo. Ready for some questions?",
    timestamp: "0:00"
  },
  {
    id: "t2",
    speaker: "candidate" as const,
    text: "Absolutely, fire away.",
    timestamp: "0:05"
  },
  {
    id: "t3",
    speaker: "ai" as const,
    text: "I see you're using Helm charts for deployment. How do you manage secret injection in your Helm templates securely?",
    timestamp: "0:10"
  },
  {
    id: "t4",
    speaker: "candidate" as const,
    text: "We use the External Secrets Operator to sync secrets from AWS Secrets Manager directly into Kubernetes secrets. In the Helm charts, we just reference the SecretStore and ExternalSecret resources, so no actual sensitive data is ever committed to git or even in the values.yaml files.",
    timestamp: "0:25",
    assessment: {
      score: 10,
      feedback: "Perfect answer. Uses modern best practices for GitOps secret management.",
      keyPoints: ["External Secrets Operator", "AWS Secrets Manager integration", "No secrets in git"]
    }
  },
  {
    id: "t5",
    speaker: "ai" as const,
    text: "That's a robust approach. Now, I noticed you're using a sidecar pattern for logging in your pod specs. What trade-offs did you consider when choosing this over a node-level daemonset?",
    timestamp: "0:45"
  },
  {
    id: "t6",
    speaker: "candidate" as const,
    text: "We went with sidecars because we have a multi-tenant cluster where different teams need different log shipping configurations and destinations. A daemonset is more resource-efficient, sure, but it forces a one-size-fits-all model. The sidecar gives us isolation and flexibility per service, even though it adds a bit of overhead per pod.",
    timestamp: "1:10",
    assessment: {
      score: 9,
      feedback: "Strong justification. Demonstrates understanding of architectural trade-offs in a multi-tenant environment.",
      keyPoints: ["Multi-tenancy requirements", "Flexibility vs Efficiency", "Isolation"]
    }
  },
  {
    id: "t7",
    speaker: "ai" as const,
    text: "Makes sense for your use case. Last question: Your HPA configuration triggers purely on CPU usage. Why didn't you include custom metrics like request latency or queue depth?",
    timestamp: "1:35"
  },
  {
    id: "t8",
    speaker: "candidate" as const,
    text: "Honestly, that's on the roadmap. We started with CPU just to get autoscaling working quickly. We are currently implementing the Prometheus Adapter to expose custom metrics so we can scale based on the SQS queue depth, which is a much better leading indicator for our workload than CPU.",
    timestamp: "1:55",
    assessment: {
      score: 8,
      feedback: "Honest and forward-looking. Acknowledges the limitation and has a concrete plan to address it.",
      keyPoints: ["MVP approach", "Prometheus Adapter", "Queue depth as leading indicator"]
    }
  }
];

const liveTranscript = [
  {
    id: "l1",
    speaker: "ai" as const,
    text: "Hello Marcus. I'm reviewing your api-gateway. I see you're using a custom rate limiter. Why did you choose that over a standard library like express-rate-limit?",
    timestamp: "0:02"
  },
  {
    id: "l2",
    speaker: "candidate" as const,
    text: "We needed distributed rate limiting across multiple instances. The standard library stores state in memory, which doesn't work when you scale out. My implementation uses Redis with a sliding window algorithm to ensure accuracy across the cluster.",
    timestamp: "0:15"
  },
  {
    id: "l3",
    speaker: "ai" as const,
    text: "That makes sense. Now, regarding your service discovery mechanism...",
    timestamp: "0:22"
  }
];

const mockScoring = {
  overallScore: 87,
  competencies: [
    {
      category: "Security & Authentication",
      score: 85,
      icon: <Shield className="h-4 w-4" />,
    },
    {
      category: "Code Architecture",
      score: 92,
      icon: <Code2 className="h-4 w-4" />,
    },
    {
      category: "Error Handling",
      score: 88,
      icon: <Target className="h-4 w-4" />,
    },
    {
      category: "Performance Optimization",
      score: 84,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      category: "Database Design",
      score: 86,
      icon: <Database className="h-4 w-4" />,
    },
    {
      category: "Problem Solving",
      score: 90,
      icon: <Brain className="h-4 w-4" />,
    },
  ],
  recommendation: "hire" as const,
  reasoning:
    "Sarah demonstrates exceptional technical depth and practical experience. Her responses show strong understanding of distributed systems, security best practices, and production-ready error handling. She's honest about technical debt and has clear plans for improvement. Her implementation of circuit breaker patterns and fallback strategies indicates senior-level thinking. Strong recommendation to proceed to final round.",
  strengths: [
    "Deep understanding of distributed systems and resilience patterns",
    "Excellent error handling and user experience considerations",
    "Strong security awareness with practical compensating controls",
    "Clear communication of technical concepts",
    "Honest about limitations and has improvement roadmap",
  ],
  weaknesses: [
    "Some legacy code cleanup needed (console.log statements)",
    "Could improve documentation of security mechanisms",
    "Token rotation could be more automated",
  ],
};

const emilyScoring = {
  ...mockScoring,
  overallScore: 94,
  recommendation: "hire" as const,
  reasoning: "Emily is a top-tier DevOps engineer. Her knowledge of Kubernetes internals and security best practices is outstanding.",
  strengths: ["Kubernetes Expert", "Security First Mindset", "Automation"],
  weaknesses: ["None observed"]
};

export default function App() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | undefined>(
    mockCandidates[0]
  );
  const [githubUrl, setGithubUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedCandidate) return;
    if (!githubUrl && !selectedCandidate.githubUrl) {
      setAnalysisError("Please enter a GitHub URL");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    // Update status to analyzing
    const updatedCandidate = {
      ...selectedCandidate,
      status: "analyzing" as const,
      githubUrl: githubUrl || selectedCandidate.githubUrl
    };
    setSelectedCandidate(updatedCandidate);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUrl: updatedCandidate.githubUrl })
      });

      if (!response.ok) throw new Error('Analysis failed');

      const analysisData = await response.json();

      // Map backend response to frontend structure
      const analysis = {
        repoName: updatedCandidate.githubUrl.split('/').pop() || "unknown-repo",
        techStack: analysisData.techStack || [],
        linesOfCode: 15000, // Placeholder
        complexity: analysisData.complexity > 7 ? "High" : "Medium",
        lastCommit: "Recently",
        stars: 0,
        branches: 1,
        vulnerabilities: analysisData.vulnerabilities || [],
        strengths: analysisData.strengths || [],
        concerns: []
      };

      // Map questions strings to object structure
      const questions = (analysisData.questions || []).map((q: string, i: number) => ({
        id: `gen-${i}`,
        category: "general",
        question: q,
        difficulty: "Medium",
        context: "Generated from repository analysis"
      }));

      setSelectedCandidate({
        ...updatedCandidate,
        status: "scheduled",
        analysis: analysis,
        questions: questions
      });

    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : 'Analysis failed');
      setSelectedCandidate({ ...selectedCandidate, status: "new" }); // Revert
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCall = async () => {
    if (!selectedCandidate) return;

    try {
      const response = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId: selectedCandidate.id,
          phoneNumber: "+15551234567" // Hardcoded for demo, or add input
        })
      });

      if (!response.ok) throw new Error('Call failed');

      alert("Call initiated! Check the server console for logs.");

    } catch (err) {
      alert("Failed to initiate call");
    }
  };

  // Helper to get correct data based on candidate
  const getAnalysis = (c: Candidate) => {
    if (c.analysis) return c.analysis;
    return c.name === "Emily Zhang" ? emilyAnalysis : mockAnalysis;
  };

  const getQuestions = (c: Candidate) => {
    if (c.questions) return c.questions;
    return mockQuestions;
  };

  const getTranscript = (c: Candidate) => c.name === "Emily Zhang" ? emilyTranscript : mockTranscript;
  const getScoring = (c: Candidate) => c.name === "Emily Zhang" ? emilyScoring : mockScoring;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="p-6 max-w-[1600px] mx-auto">
        <MetricsOverview />

        <div className="mt-8 grid grid-cols-12 gap-6">
          {/* Candidate Pipeline - Left Sidebar */}
          <div className="col-span-4">
            <h2 className="text-gray-900 mb-4">Candidate Pipeline</h2>
            <CandidatePipeline
              candidates={mockCandidates}
              onSelectCandidate={(c: Candidate) => {
                setSelectedCandidate(c);
                setGithubUrl(c.githubUrl || "");
                setAnalysisError(null);
              }}
              selectedCandidate={selectedCandidate}
            />
          </div>

          {/* Candidate Details - Main Content */}
          <div className="col-span-8">
            {selectedCandidate ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-900">{selectedCandidate.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedCandidate.position}
                    </p>
                  </div>
                  {selectedCandidate.status === "scheduled" && (
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={handleCall}
                    >
                      Start Interview Call
                    </Button>
                  )}
                  {selectedCandidate.status === "analyzing" && (
                    <Button variant="outline" disabled>
                      Analyzing Repository...
                    </Button>
                  )}
                  {selectedCandidate.status === "interviewing" && (
                    <div className="flex items-center gap-2 text-purple-600 animate-pulse font-medium">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      Live Interview in Progress
                    </div>
                  )}
                </div>

                {selectedCandidate.status === "completed" && (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="code">Code Analysis</TabsTrigger>
                      <TabsTrigger value="interview">Interview</TabsTrigger>
                      <TabsTrigger value="questions">Questions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <CandidateScore {...getScoring(selectedCandidate)} />
                    </TabsContent>

                    <TabsContent value="code" className="mt-6">
                      <GitHubAnalysis analysis={getAnalysis(selectedCandidate)} />
                    </TabsContent>

                    <TabsContent value="interview" className="mt-6">
                      <InterviewTranscript
                        transcript={getTranscript(selectedCandidate)}
                        duration="5:23"
                        status="completed"
                      />
                    </TabsContent>

                    <TabsContent value="questions" className="mt-6">
                      <InterviewQuestions questions={getQuestions(selectedCandidate)} />
                    </TabsContent>
                  </Tabs>
                )}

                {selectedCandidate.status === "scheduled" && (
                  <div className="space-y-6">
                    <GitHubAnalysis analysis={getAnalysis(selectedCandidate)} />
                    <InterviewQuestions questions={getQuestions(selectedCandidate)} />
                  </div>
                )}

                {selectedCandidate.status === "interviewing" && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 border-l-4 border-l-purple-500">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Live Interview Transcript</h3>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium animate-pulse">LIVE</span>
                      </div>
                      <div className="space-y-4 mb-4">
                        {liveTranscript.map((entry) => (
                          <div key={entry.id} className={`flex gap-4 ${entry.speaker === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                                    ${entry.speaker === 'ai' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                              {entry.speaker === 'ai' ? 'AI' : 'C'}
                            </div>
                            <div className={`max-w-[80%] p-3 rounded-lg text-sm
                                    ${entry.speaker === 'ai' ? 'bg-gray-50 text-gray-800 rounded-tl-none' : 'bg-blue-50 text-blue-900 rounded-tr-none'}`}>
                              <p>{entry.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 italic border-t pt-4">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        </div>
                        Candidate is speaking...
                      </div>
                    </div>
                    <GitHubAnalysis analysis={getAnalysis(selectedCandidate)} />
                  </div>
                )}

                {selectedCandidate.status === "analyzing" && (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                    <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                      <Code2 className="h-8 w-8 text-purple-600 animate-pulse" />
                    </div>
                    <h3 className="text-gray-900 mb-2">Analyzing Repository</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                      DevHunter AI is scanning {selectedCandidate.name}'s GitHub repository
                      to identify code patterns, vulnerabilities, and generate targeted
                      interview questions. This usually takes 2-3 minutes.
                    </p>
                  </div>
                )}

                {selectedCandidate.status === "new" && (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                    <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <Code2 className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 mb-2">Ready to Start</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                      Enter a GitHub repository URL to begin analyzing {selectedCandidate.name}'s code.
                    </p>

                    <div className="max-w-md mx-auto mb-6">
                      <input
                        type="text"
                        placeholder="https://github.com/username/repo"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                      />
                    </div>

                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !githubUrl}
                    >
                      {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                    </Button>
                    {analysisError && (
                      <p className="text-red-500 mt-2 text-sm">{analysisError}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <h3 className="text-gray-500">Select a candidate to view details</h3>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
