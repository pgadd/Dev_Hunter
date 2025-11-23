\documentclass[11pt, a4paper]{article}

% --- UNIVERSAL PREAMBLE BLOCK ---
\usepackage[a4paper, top=2.5cm, bottom=2.5cm, left=2cm, right=2cm]{geometry}
\usepackage{fontspec}
\usepackage[english, provide=*]{babel}
\babelprovide[import, onchar=ids fonts]{english}

% Set default/Latin font to Sans Serif in the main (rm) slot for a modern look
\babelfont{rm}{Noto Sans}
\babelfont{sf}{Noto Sans}
\babelfont{tt}{Noto Sans Mono}

\usepackage{enumitem}
\setlist[itemize]{label=\textbullet, leftmargin=*}

% --- ADDITIONAL PACKAGES ---
\usepackage{xcolor}
\usepackage{titlesec}
\usepackage{hyperref}
\usepackage{tcolorbox}
\usepackage{listings}
\usepackage{fancyhdr}
\usepackage{fontawesome5} % Note: This might not work in all restricted environments, removed if causes error. 
% Since fontawesome is forbidden in the prompt instructions, I will simulate icons or use text.
% Replacing with text-based markers or simple shapes.

% --- CUSTOM COLORS ---
\definecolor{primary}{HTML}{2563EB} % Blue-600
\definecolor{secondary}{HTML}{475569} % Slate-600
\definecolor{bgcode}{HTML}{F1F5F9} % Slate-100
\definecolor{bordercode}{HTML}{CBD5E1} % Slate-300

% --- STYLING ---
\titleformat{\section}
  {\Large\bfseries\color{primary}}
  {}{0em}
  {}[\titlerule]

\titleformat{\subsection}
  {\large\bfseries\color{secondary}}
  {}{0em}
  {}

\hypersetup{
    colorlinks=true,
    linkcolor=primary,
    filecolor=magenta,      
    urlcolor=primary,
}

% Code block styling
\lstset{
  basicstyle=\ttfamily\small,
  backgroundcolor=\color{bgcode},
  frame=single,
  rulecolor=\color{bordercode},
  breaklines=true,
  columns=fullflexible,
  keepspaces=true,
  language=bash
}

% Header/Footer
\pagestyle{fancy}
\fancyhf{}
\lhead{\textbf{DevHunter AI}}
\rhead{Project Documentation}
\cfoot{\thepage}

\title{\textbf{\Huge DevHunter AI Dashboard} \\ \Large Automated Technical Recruitment Platform}
\author{Team DevHunter}
\date{\today}

\begin{document}

\maketitle

\begin{abstract}
DevHunter AI is an automated technical recruitment platform that combines \textbf{GitHub repository analysis} with \textbf{AI-driven voice interviews}. It helps recruiters screen engineering candidates by deeply analyzing their code and conducting real-time, context-aware phone interviews.
\end{abstract}

\tableofcontents
\newpage

\section{Overview}

DevHunter transforms the hiring pipeline by automating the initial technical screen. Instead of generic questions, it reads the candidate's actual code to generate highly specific, relevant interview topics.

\begin{figure}[htbp]
  \centering
  \framebox{\parbox{0.9\textwidth}{\centering
    \vspace{2cm}
    \textbf{Dashboard Screenshot Placeholder} \\
    \small\textit{Shows Candidate Pipeline, Code Analysis Scores, and Live Transcript}
    \vspace{2cm}
  }}
  \caption{The DevHunter AI Recruitment Dashboard}
  \label{fig:dashboard}
\end{figure}

\section{Key Features}

\begin{itemize}
    \item \textbf{Deep GitHub Analysis:} Scans repositories (including complex nested structures) to identify tech stacks, complexity metrics, and code quality indicators.
    \item \textbf{Automated Voice Interviews:} Leverages Telnyx and OpenAI to call candidates and ask technical questions generated specifically from their code analysis.
    \item \textbf{Real-time Transcript:} Watch the interview unfold live on the dashboard as the AI speaks with the candidate.
    \item \textbf{Candidate Pipeline:} Manage candidates through stages: \texttt{New} $\to$ \texttt{Analyzing} $\to$ \texttt{Scheduled} $\to$ \texttt{Interviewing} $\to$ \texttt{Completed}.
    \item \textbf{Modern UI:} Built with React, Tailwind CSS, and Shadcn UI for a professional ``SaaS'' aesthetic.
\end{itemize}

\section{Technology Stack}

\begin{description}
    \item[Frontend] React, Vite, Tailwind CSS, Lucide React
    \item[Backend] Node.js, Express
    \item[AI \& Voice] OpenAI (GPT-4 Turbo), Telnyx (Voice API)
    \item[Utilities] Axios, Concurrently, Ngrok
\end{description}

\section{Prerequisites}

Before running the project, ensure you have the following installed and configured:

\begin{enumerate}
    \item \textbf{Node.js} (v18+ recommended)
    \item \textbf{OpenAI API Key} (for code analysis and interview logic)
    \item \textbf{Telnyx Account} (API Key + Phone Number + Call Control App)
    \item \textbf{Ngrok} (to expose your local server for voice webhooks)
\end{enumerate}

\section{Installation \& Setup}

\subsection{1. Clone or Create Project}
Ensure you have the file structure set up as defined in the Directory Structure section.

\subsection{2. Install Dependencies}
Run the following command in the root directory:
\begin{lstlisting}
npm install
\end{lstlisting}

\subsection{3. Configure Environment Variables}
Create a \texttt{.env} file in the root directory and add your keys:

\begin{tcolorbox}[colback=bgcode, colframe=bordercode, title=.env Configuration]
\begin{verbatim}
PORT=3000
OPENAI_API_KEY=sk-YOUR_OPENAI_KEY
TELNYX_API_KEY=KEY017_YOUR_TELNYX_KEY
TELNYX_PHONE_NUMBER=+15551234567
PUBLIC_URL=https://your-ngrok-url.ngrok-free.app
\end{verbatim}
\end{tcolorbox}

\subsection{4. Start Ngrok}
Telnyx needs to reach your local server to handle call events.
\begin{lstlisting}
ngrok http 3000
\end{lstlisting}
\textit{Note: Copy the HTTPS URL from ngrok and paste it into \texttt{PUBLIC\_URL} in your \texttt{.env} file.}

\subsection{5. Run the Application}
This command starts both the backend API (port 3000) and the frontend React app (port 5173).
\begin{lstlisting}
npm start
\end{lstlisting}

\subsection{6. Access the Dashboard}
Open your web browser and navigate to:
\begin{center}
    \url{http://localhost:5173}
\end{center}

\section{Usage Guide}

\begin{enumerate}
    \item \textbf{Add a Candidate:} Click the \textbf{+} icon in the sidebar. Enter a name, role, and a public GitHub repository URL.
    \item \textbf{Analyze Code:} Select the candidate and click \textbf{Analyze GitHub}. The AI will deep-scan the repository.
    \item \textbf{Start Interview:} Once analysis is complete, the status changes to ``Scheduled.'' Click \textbf{Start Interview}, enter a phone number, and the AI will initiate the call.
    \item \textbf{Monitor Live:} Watch the \textbf{Live Transcript} panel update in real-time as the candidate answers technical questions.
\end{enumerate}

\section{Directory Structure}

\begin{verbatim}
devhunter-dashboard/
|-- .env                  # Config & API Keys
|-- package.json          # Dependencies
|-- server.js             # Node.js Backend (Voice & GitHub Logic)
|-- vite.config.js        # Vite Configuration
|-- tailwind.config.js    # Tailwind Configuration
|-- postcss.config.js     # PostCSS Configuration
|-- index.html            # React Entry Point
`-- src/
    |-- App.jsx           # Main Dashboard Component
    |-- main.jsx          # React DOM Render
    `-- index.css         # Global Styles
\end{verbatim}

\section{Troubleshooting}

\begin{itemize}
    \item \textbf{Vite: react-babel error:} Ensure you removed \texttt{type} imports from \texttt{App.jsx}. For example, change: \\
    \texttt{import \{ type ClassValue \} ...} $\to$ \texttt{import \{ clsx \} ...}
    \item \textbf{Voice Call Not Connecting:} Check your \texttt{PUBLIC\_URL} in \texttt{.env}. It must match your current running Ngrok session. Also, ensure your Telnyx Call Control App is pointing to \texttt{\$\{PUBLIC\_URL\}/webhooks/telnyx}.
    \item \textbf{GitHub Analysis Fails:} Ensure the repository is public. If hitting rate limits, try using a different repo or wait a few minutes.
\end{itemize}

\vfill
\begin{center}
    \small \textit{Built for the 2025 AI Agent Hackathon - Track 2: Vertical Agents}
\end{center}

\end{document}
