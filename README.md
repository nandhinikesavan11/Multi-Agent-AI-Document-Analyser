# AI Document Analyzer 

A powerful, full-stack web application that leverages the blazing-fast **Llama 3** (via Groq) to instantly extract key insights and fact-check documents. 

Designed with a premium dark-mode, glassmorphic UI, this tool transforms lengthy and cumbersome PDFs into quick, scannable insights in seconds.

---

## Features

- **Document Parsing:** Upload any PDF to extract its raw text context using `pdf2json`.
- **AI Insight Generator:** Instantly pull out top 5 key bullet-point insights powered by Groq's `llama-3.1-8b-instant`.
- **AI Fact Checker:** Automatically identifies and verifies numeric or factual claims as True, False, or Neutral based on the provided text.
- **Modern Architecture:** Built on the MERN stack with lightning-fast Vite + React.
- **Premium UI:** Glassmorphism aesthetics, responsive CSS grids, and micro-hover animations.

---

## Tech Stack

- **Frontend:** React, Vite, Axios, Vanilla CSS (Custom Design System)
- **Backend:** Node.js, Express, Multer (memory storage), pdf2json
- **AI Integrations:** Groq API (Llama-3.1)

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a free API key from [Groq](https://console.groq.com/keys).

### 1. Backend Setup

Open a terminal and navigate to the backend directory:
```sh
cd backend
```

Install dependencies:
```sh
npm install
```

Create a `.env` file inside the `backend/` folder and add your Groq API key:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
```

Start the backend server:
```sh
node server.js
```

### 2. Frontend Setup

Open a **new** terminal window and navigate to the frontend directory:
```sh
cd frontend
```

Install dependencies:
```sh
npm install
```

Start the Vite development server:
```sh
npm run dev
```

### 3. Usage
- Once both servers are running, open your browser and navigate to `http://localhost:5173`.
- Click **"Choose file"** to upload a `.pdf` document.
- Click **"Analyze Document"** and watch the AI process your file in real-time!

---

## 📝 License
This project is open-source and free to adapt or modify for your own personal or commercial use.
