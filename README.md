<div align="center">

# 🚀 DevHunter AI Dashboard
### Automated Technical Recruitment Platform

<br />
<img src="assets/logo.png" alt="DevHunter Logo" width="150" height="150">
<br />

**Automated Screening • Deep Code Analysis • Voice AI Interviews**

[Report Bug](https://github.com/yourusername/repo/issues) · [Request Feature](https://github.com/yourusername/repo/issues)

</div>

---

## 💡 Abstract

**DevHunter AI** is an automated technical recruitment platform that combines **GitHub repository analysis** with **AI-driven voice interviews**. It helps recruiters screen engineering candidates by deeply analyzing their code and conducting real-time, context-aware phone interviews.

---

## 🔎 Overview

DevHunter transforms the hiring pipeline by automating the initial technical screen. Instead of generic questions, it reads the candidate's actual code to generate highly specific, relevant interview topics.

![Dashboard Screenshot Placeholder](path/to/dashboard_screenshot.png)

---

## ✨ Key Features

* **Deep GitHub Analysis:** Scans repositories (including complex nested structures) to identify tech stacks, complexity metrics, and code quality indicators.
* **Automated Voice Interviews:** Leverages Telnyx and OpenAI to call candidates and ask technical questions generated specifically from their code analysis.
* **Real-time Transcript:** Watch the interview unfold live on the dashboard as the AI speaks with the candidate.
* **Candidate Pipeline:** Manage candidates through stages: `New` → `Analyzing` → `Scheduled` → `Interviewing` → `Completed`.
* **Modern UI:** Built with React, Tailwind CSS, and Shadcn UI for a professional *SaaS* aesthetic.

---

## ⚙️ Technology Stack

| Category | Technologies Used |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Lucide React |
| **Backend** | Node.js, Express |
| **AI & Voice** | OpenAI (GPT-4 Turbo), Telnyx (Voice API) |
| **Utilities** | Axios, Concurrently, Ngrok |

---

## ✅ Prerequisites

Before running the project, ensure you have the following installed and configured:

1. **Node.js** (v18+ recommended)
2. **OpenAI API Key** (for code analysis and interview logic)
3. **Telnyx Account** (API Key + Phone Number + Call Control App)
4. **Ngrok** (to expose your local server for voice webhooks)

---

## 🛠️ Installation & Setup

Follow these steps to get a local development environment running.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/devhunter-dashboard.git](https://github.com/your-username/devhunter-dashboard.git)
cd devhunter-dashboard
```
2. Install Dependencies
Install the necessary packages for both the backend and frontend.
```Bash

npm install
```
3. Configure Environment Variables
Create a .env file in the root directory. You can copy the example below:

```Bash

# Create the file
touch .env
Paste the following configuration into your .env file:

Code snippet

# Server Configuration
PORT=3000

# API Keys
OPENAI_API_KEY=sk-YOUR_OPENAI_KEY_HERE
TELNYX_API_KEY=KEY017_YOUR_TELNYX_KEY_HERE

# Voice Configuration
TELNYX_PHONE_NUMBER=+15551234567
# NOTE: This URL will be updated in Step 4
PUBLIC_URL=[https://placeholder.ngrok-free.app](https://placeholder.ngrok-free.app)

```
4. Start Ngrok Tunnel
Telnyx needs to reach your local server to handle call events. Start Ngrok on your backend port:
```
ngrok http 3000
```
⚠️ Important: Copy the HTTPS URL provided by Ngrok (e.g., https://xyz.ngrok-free.app) and paste it into the PUBLIC_URL variable in your .env file.

5. Run the Application
This command uses concurrently to start both the backend API (port 3000) and the frontend React app (port 5173).

```Bash

npm start
```
6. Access the Dashboard
Open your web browser and navigate to: http://localhost:5173

📖 Usage Guide
Add a Candidate: Click the + icon in the sidebar. Enter a name, role, and a public GitHub repository URL.

Analyze Code: Select the candidate and click Analyze GitHub. The AI will deep-scan the repository.

Start Interview: Once analysis is complete, the status changes to "Scheduled." Click Start Interview, enter a phone number, and the AI will initiate the call.

Monitor Live: Watch the Live Transcript panel update in real-time as the candidate answers technical questions.

📂 Directory Structure
Plaintext

```
devhunter-dashboard/
├── .env                    # Environment variables (API Keys)
├── package.json            # Project dependencies & scripts
├── server.js               # Node.js Backend (Voice & GitHub Logic)
├── vite.config.js          # Vite Configuration
├── tailwind.config.js      # Tailwind Configuration
├── postcss.config.js       # PostCSS Configuration
├── index.html              # React Entry Point
├── public/                 # Static assets
└── src/
    ├── App.jsx             # Main Application Component
    ├── main.jsx            # React DOM Render
    ├── index.css           # Global Tailwind Styles
    ├── components/         # Reusable UI components
    └── lib/                # Utility functions (e.g., API helpers)

```
##⚡ Troubleshooting
Vite: react-babel error

Ensure you removed type imports from App.jsx.

Example: Change import { type ClassValue } ... → import { clsx } ...


Voice Call Not Connecting

Check your PUBLIC_URL in .env. It must match your current running Ngrok session. Also, ensure your Telnyx Call Control App is pointing to ${PUBLIC_URL}/webhooks/telnyx.



GitHub Analysis Fails

Ensure the repository is public. If hitting rate limits, try using a different repo or wait a few minutes.

