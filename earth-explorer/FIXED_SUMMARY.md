
---

## 🚀 How to Run Your Project Now

### Terminal 1: Start Backend (AI Server)
```bash
cd "C:\Users\aishw\OneDrive\Documents\Coding\AI-Agent\earth-explorer"
python agent.py
```

**Expected Output:**
```
✅ Gemini API Key loaded
🚀 Starting Expedition Guide Server on http://127.0.0.1:8000
🤖 Using Google Gemini 2.5 Flash
📍 Endpoint: http://127.0.0.1:8000/copilotkit
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Terminal 2: Start Frontend (React App)
```bash
cd "C:\Users\aishw\OneDrive\Documents\Coding\AI-Agent\earth-explorer"
npm run dev
```

**Expected Output:**
```
VITE ready in 896 ms
➜  Local:   http://localhost:5173/
```

### Open Browser
Visit: **http://localhost:5173**

---

## 🧪 Test Your API Key (Optional)

If you want to verify everything is working before starting the full app:

```bash
python test_gemini.py
```

This will test your Gemini API key and show you a sample response.

---

## 💬 How to Use the Chat Feature

1. **Open Terra Explorer** in your browser at http://localhost:5173
2. **Search for a country**: Type "India", "France", "Egypt", "Japan", or "Italy"
3. **Click the chat icon** (bottom-right corner - should be visible now)
4. **Ask about monuments**:
   - "Tell me the history of the Taj Mahal"
   - "What is the architecture of the Eiffel Tower?"
   - "Give me a hidden fact about the Pyramids"

The AI (Terra Guide) will respond with engaging, detailed information about the monuments!

---

## 🔑 Your Current Setup

- **API Provider**: Google Gemini (FREE!)
- **Model**: gemini-3.5-flash
- **API Key**: Stored in `.env` file (working ✅)
- **Backend**: FastAPI on http://127.0.0.1:8000
- **Frontend**: React + Vite on http://localhost:5173

---

## ⚠️ Important Notes

1. **Keep Both Terminals Open**: The backend and frontend must run simultaneously
2. **Don't Share Your API Key**: The `.env` file contains your secret key
3. **Free Tier Limits**: Gemini has generous free limits, but not unlimited
4. **Test First**: If unsure, run `python test_gemini.py` to verify setup

---

## 🐛 If You Still See Errors

### "Connection refused" or "Failed to fetch"
**Cause**: Backend not running  
**Fix**: Make sure `python agent.py` is running in Terminal 1

### "Module not found: google"
**Cause**: Missing Python package  
**Fix**: `pip install google-genai`

### Chat button not visible
**Cause**: Frontend JavaScript error  
**Fix**: Check browser console (F12) for errors

### AI responds with "Sorry, I encountered an error"
**Cause**: API key issue  
**Fix**: 
1. Verify `.env` has `GEMINI_API_KEY=YOUR_KEY`
2. Get a new key from https://aistudio.google.com/app/apikey
3. Run `python test_gemini.py` to test

---


## 🌟 Next Steps

1. **Run the project** using the commands above
2. **Test the chat** by asking about monuments
3. **Explore different countries** (India, France, Egypt, Japan, Italy)
4. **Enjoy your AI-powered travel guide!** 🌍✈️

---

**Need Help?**
- Check `RUN_INSTRUCTIONS.md` for detailed troubleshooting
- Run `python test_gemini.py` to verify your setup
- Open browser console (F12) to see any frontend errors
- Check Terminal 1 (backend) for API error messages

**Happy Exploring with Terra Guide!** 🗺️🤖
