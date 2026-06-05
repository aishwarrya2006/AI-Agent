import os
from dotenv import load_dotenv
from google import genai
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
import json

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(title="Expedition Guide Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """You are 'Terra Guide', an expert Expedition Guide with a passion for world history, archaeology, and architecture.

Your goal is to provide accurate, engaging, and vivid information about world monuments and historical sites.

When provided with a location or monument name, structure your response to cover:
1. History & Origins: When it was built, who built it, and why.
2. Architectural Significance: Style, engineering marvels, unique materials, and structural details.
3. Cultural Details & Lore: Local myths, legends, or its modern-day cultural impact.

Adopt an enthusiastic, worldly, and storytelling tone—like a seasoned tour guide speaking to an eager traveler.

Keep your responses concise (2-3 paragraphs) but deep and engaging."""

@app.post("/copilotkit")
async def copilotkit_endpoint(request: Request):
    """CopilotKit compatible endpoint for chat using Gemini"""
    try:
        body = await request.json()
        messages = body.get("messages", [])
        
        if not messages:
            return {"error": "No messages found"}, 400
        
        # Build contents from messages to support full conversation history
        contents = []
        for msg in messages:
            role = "model" if msg.get("role") == "assistant" else "user"
            contents.append({
                "role": role,
                "parts": [{"text": msg.get("content", "")}]
            })
        
        # Stream response from Gemini
        async def generate():
            try:
                response = client.models.generate_content_stream(
                    model='gemini-3.5-flash',
                    contents=contents,
                    config=genai.types.GenerateContentConfig(
                        system_instruction=SYSTEM_PROMPT,
                        temperature=0.7,
                        max_output_tokens=1000,
                    )
                )
                
                for chunk in response:
                    if chunk.text:
                        # Format as Server-Sent Events
                        data = {
                            "choices": [{
                                "delta": {
                                    "content": chunk.text
                                }
                            }]
                        }
                        yield f"data: {json.dumps(data)}\n\n"
                
                yield "data: [DONE]\n\n"
                
            except Exception as e:
                print(f"Streaming error: {e}")
                error_msg = f"Sorry, I encountered an error: {str(e)}"
                error_data = {
                    "choices": [{
                        "delta": {
                            "content": error_msg
                        }
                    }]
                }
                yield f"data: {json.dumps(error_data)}\n\n"
                yield "data: [DONE]\n\n"
        
        return StreamingResponse(generate(), media_type="text/event-stream")
    
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}, 500

@app.get("/health")
async def health():
    return {"status": "ok", "message": "Terra Explorer backend online (Gemini)"}

@app.get("/")
async def root():
    return {"status": "ok", "model": "Google Gemini 3.5 Flash", "endpoints": ["/copilotkit", "/health"]}

if __name__ == "__main__":
    if not os.getenv("GEMINI_API_KEY"):
        print("⚠️  WARNING: GEMINI_API_KEY not set!")
        print("Get your free API key at: https://aistudio.google.com/app/apikey")
    else:
        print("✅ Gemini API Key loaded")
    
    print("🚀 Starting Expedition Guide Server on http://127.0.0.1:8000")
    print("🤖 Using Google Gemini 3.5 Flash")
    print("📍 Endpoint: http://127.0.0.1:8000/copilotkit")
    uvicorn.run("agent:app", host="127.0.0.1", port=8000, reload=True)
