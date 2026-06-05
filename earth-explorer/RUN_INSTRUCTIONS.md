# Terra Explorer - Run Instructions

## 🚀 How to Run Your Project

### Step 1: Start the Backend (AI Agent)

Open a terminal and run:

```bash
cd "C:\Users\aishw\OneDrive\Documents\Coding\AI-Agent\earth-explorer"
python agent.py
```

You should see:
```
✅ Gemini API Key loaded
🚀 Starting Expedition Guide Server on http://127.0.0.1:8000
🤖 Using Google Gemini 2.5 Flash
📍 Endpoint: http://127.0.0.1:8000/copilotkit
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Keep this terminal open!** The backend must run continuously.

---

### Step 2: Start the Frontend (React Website)

Open a **NEW terminal** and run:

```bash
cd "C:\Users\aishw\OneDrive\Documents\Coding\AI-Agent\earth-explorer"
npm run dev
```

You should see:
```
VITE v8.0.16  ready in 896 ms
➜  Local:   http://localhost:5173/
```

---

### Step 3: Open Your Browser

Go to: **http://localhost:5173**

---

## ✨ How to Use Your Travel Website

1. **Search for a Country**: Type "India", "France", "Egypt", "Japan", or "Italy" in the search box
2. **Explore Monuments**: The map zooms in and shows historical sites
3. **Chat with AI Guide**: Click the chat icon (bottom-right) to ask about history:
   - "What is the history of the Taj Mahal?"
   - "Tell me about the architecture"
   - "Give me a hidden fact"

---

## 🛠️ Troubleshooting

### Backend Won't Start
**Error**: `ModuleNotFoundError: No module named 'fastapi'` or `No module named 'google'`

**Fix**: Install dependencies:
```bash
pip install fastapi uvicorn google-genai python-dotenv
```

---

### Frontend Won't Start
**Error**: `Cannot find module...`

**Fix**: Install npm packages:
```bash
npm install
```

---

### Chat Not Working
**Error**: "Failed to fetch" or "Network error"

**Check**:
1. Backend is running on http://127.0.0.1:8000 ✅
2. Your `.env` file has a valid `GEMINI_API_KEY`
3. Open browser console (F12) to see errors

---

### Google Gemini API Key
Your `.env` file should contain:
```
GEMINI_API_KEY=YOUR_KEY_HERE
```

Get a **FREE** API key from: https://aistudio.google.com/app/apikey

**Test your API key**:
```bash
python test_gemini.py
```
This will verify your key works and show which model is available.

---

## 📝 Project Structure

```
earth-explorer/
├── agent.py              # Backend AI server (FastAPI + Gemini)
├── test_gemini.py        # Test script to verify API key
├── .env                  # Your API keys (keep this SECRET!)
├── package.json          # Frontend dependencies
├── src/
│   ├── App.jsx          # Main React app
│   ├── components/
│   │   └── CoPilotAgentPanel.jsx  # Chat interface
│   └── data.js          # Country/monument data
└── RUN_INSTRUCTIONS.md  # This file!
```

---

## 🎯 Quick Start Commands

**Terminal 1 (Backend)**:
```bash
cd "C:\Users\aishw\OneDrive\Documents\Coding\AI-Agent\earth-explorer"
python agent.py
```

**Terminal 2 (Frontend)**:
```bash
cd "C:\Users\aishw\OneDrive\Documents\Coding\AI-Agent\earth-explorer"
npm run dev
```

**Browser**:
```
http://localhost:5173
```

---

## 🔧 Technology Stack

- **Frontend**: React + Vite
- **3D/Animation**: Three.js, GSAP, Lenis
- **Backend**: FastAPI (Python)
- **AI**: Google Gemini 2.5 Flash (FREE!)
- **Icons**: Lucide React

---

## 💡 Tips

- **Voice Narration**: Toggle the speaker icon to hear AI responses
- **Monument Navigation**: Use the dots on the left to jump between sites
- **Smooth Scroll**: Scroll naturally to explore different monuments
- **Quick Prompts**: Click suggested questions for instant answers

---

Happy Exploring! 🌍✈️
