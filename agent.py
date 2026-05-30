from agno.agent import Agent
from agno.models.groq import Groq
from agno.models.fallback import FallbackConfig
from agno.tools.yfinance import YFinanceTools
from agno.guardrails import PromptInjectionGuardrail, PIIDetectionGuardrail
from agno.knowledge.pdf_url import PDFUrlKnowledgeBase
from agno.vectordb.lancedb import LanceDb, SearchType
from agno.embedder.openai import OpenAIEmbedder

import os
from dotenv import load_dotenv

load_dotenv()
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")



agent = Agent(
    name= "Divident Safety Analyst",
    role= "Analyze for unsustantiable dividentpayouts, earnings decay, divident traps",
    model = Groq(id="openai/gpt-oss-120b"),
    fallback_config=FallbackConfig(
        on_rate_limit=[Groq(id="llama3-70b-8192")],
        on_error=[Groq(id="llama3-8b-8192")]
    ),
    pre_hooks=[
        PromptInjectionGuardrail(),
        PIIDetectionGuardrail(mask_pii=True)
    ],
    tools= [YFinanceTools()],
    instructions=["You are an elite financial analyst.",
                "Your job is to identify if a stock is a 'Dividend Trap'.",
                "Always cross-reference the company's dividend yield against its net income trends.",
                "If a company pays out more than 80% of its earnings as dividends while quarterly income is falling, clearly flag it.",
                "For REITs and Utilities, allow a higher payout threshold up to 95% before flagging.",
                "Keep your output clear, spam-free, concise, and ready for a professional WhatsApp alert style."],
    markdown=True,
)

query = "Analyze Intel (INTC) and Altria (MO) to see if either shows signs of being a dividend trap based on their recent payout ratios and net income trends."

print(f"🚀 Running Analysis for: '{query}'...\n")
agent.print_response(query, stream=True)