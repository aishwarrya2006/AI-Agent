# Terra Explorer - AI Agent Backend
# Powered by Agno (formerly Phidata) and CopilotKit (AG-UI protocol)
#
# Requirements:
# pip install fastapi uvicorn copilotkit agno openai
#
# Running the server:
# python main.py

import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from copilotkit import CopilotKitRemoteEndpoint
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from agno.agent import Agent
from agno.models.openai import OpenAIChat

# Load environment variables
load_dotenv()

app = FastAPI(title="Terra Explorer AI Agent Server", redirect_slashes=False)

# Configure CORS so the React frontend can reach the agent endpoint
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174",
        "http://localhost:3000"
    ],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the Agno Travel Agent
travel_guide_agent = Agent(
    name="default",
    role="Premium Interactive Travel Guide",
    model=OpenAIChat(id="gpt-4o"),
    instructions=[
        "You are 'Terra Guide', an expert interactive travel companion for the Terra Explorer platform.",
        "Your responses should feel like a premium documentary narrative: rich in history, geographical facts, local traditions, and architectural secrets.",
        "Be concise but deep, avoiding generic travel blog advice. Focus on the country and monument currently being explored.",
        "You have the capability to guide the user's camera. If they ask to see a specific monument in the current country (e.g. Red Fort in India or Leaning Tower in Italy), use the 'navigateToMonument' tool/action to pan the viewport."
    ],
    markdown=True,
)

from typing import List, Any, Optional

class AgnoCopilotAgent:
    def __init__(self, agent):
        self.agent = agent
        self.name = agent.name
        self.description = agent.description or ""

    def dict_repr(self):
        return {
            "name": self.name,
            "description": self.description,
            "type": "langgraph_agui"
        }

    async def get_state(self, *, thread_id: str):
        return {
            "threadId": thread_id or "",
            "threadExists": True,
            "state": {},
            "messages": [],
        }

    async def execute(
        self,
        *,
        state: dict,
        config: Optional[dict] = None,
        messages: List[Any],
        thread_id: str,
        actions: Optional[List[Any]] = None,
        meta_events: Optional[List[Any]] = None,
        **kwargs,
    ):
        import uuid
        from ag_ui.core import RunAgentInput
        from ag_ui.encoder import EventEncoder
        from agno.os.interfaces.agui.router import run_agent

        run_input = RunAgentInput(
            thread_id=thread_id,
            run_id=kwargs.get("run_id") or str(uuid.uuid4()),
            state=state or {},
            messages=messages or [],
            tools=[],
            context=[]
        )

        encoder = EventEncoder()
        
        async def event_generator():
            async for event in run_agent(self.agent, run_input):
                encoded_event = encoder.encode(event)
                yield encoded_event

        return event_generator()

# Initialize CopilotKit SDK and bind the Agno Agent
sdk = CopilotKitRemoteEndpoint(
    agents=[AgnoCopilotAgent(travel_guide_agent)]
)

# Add CopilotKit endpoint to FastAPI
add_fastapi_endpoint(app, sdk, "/copilotkit")

@app.get("/")
def read_root():
    return {"status": "Terra Explorer backend online", "endpoint": "/copilotkit"}

if __name__ == "__main__":
    # Ensure OPENAI_API_KEY is configured
    if "OPENAI_API_KEY" not in os.environ:
        print("WARNING: OPENAI_API_KEY environment variable is not set. The agent runtime will fail to process messages.")
    
    print("Launching Terra Explorer AI Agent Server on http://localhost:8000")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
