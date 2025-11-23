# 🚀 DevHunter AI Dashboard
## Automated Technical Recruitment Platform

---

## 💡 Abstract

**DevHunter AI** is an automated technical recruitment platform that combines **GitHub repository analysis** with **AI-driven voice interviews**. It helps recruiters screen engineering candidates by deeply analyzing their code and conducting real-time, context-aware phone interviews.

---

## 🔎 Overview

DevHunter transforms the hiring pipeline by automating the initial technical screen. Instead of generic questions, it reads the candidate's actual code to generate highly specific, relevant interview topics.



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

1.  **Node.js** (v18+ recommended)
2.  **OpenAI API Key** (for code analysis and interview logic)
3.  **Telnyx Account** (API Key + Phone Number + Call Control App)
4.  **Ngrok** (to expose your local server for voice webhooks)

---

## 🛠️ Installation & Setup

### 1. Clone Project

Ensure you have the file structure set up as defined in the Directory Structure section.

### 2. Install Dependencies

Run the following command in the root directory:

```bash
npm install

PORT=3000
OPENAI_API_KEY=sk-YOUR_OPENAI_KEY
TELNYX_API_KEY=KEY017_YOUR_TELNYX_KEY
TELNYX_PHONE_NUMBER=+15551234567
PUBLIC_URL=[https://your-ngrok-url.ngrok-free.app](https://your-ngrok-url.ngrok-free.app)

