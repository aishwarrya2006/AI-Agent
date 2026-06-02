from agno.agent import Agent
from agno.models.groq import Groq
from agno.models.openai import OpenAIChat
from agno.models.fallback import FallbackConfig
from agno.tools.yfinance import YFinanceTools
from agno.guardrails import PromptInjectionGuardrail, PIIDetectionGuardrail
from agno.eval.accuracy import AccuracyEval, AccuracyResult
from typing import Optional

import os
from dotenv import load_dotenv

load_dotenv()
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")


fagent = Agent(
    name="Divident Safety Analyst",
    role="Analyze for unsustainable dividend payouts, earnings decay, dividend traps",
    model=Groq(id="llama-3.3-70b-versatile"),  # Fixed: valid Groq model ID
    fallback_config=FallbackConfig(
        on_rate_limit=[Groq(id="llama3-70b-8192")],
        on_error=[Groq(id="llama3-8b-8192")]
    ),
    pre_hooks=[
        PromptInjectionGuardrail(injection_patterns=[
            "ignore previous instructions",
            "ignore your instructions",
            "you are now a",
            "forget everything above",
            "developer mode",
            "override safety",
            "disregard guidelines",
            "system prompt",
            "jailbreak",
            "act as if",
            "pretend you are",
            "roleplay as",
            "simulate being",
            "bypass restrictions",
            "ignore safeguards",
            "admin override",
            "root access",
            "forget everything",
            "forget your",
            "forget the",
            "ignore the",
        ]),
        PIIDetectionGuardrail(mask_pii=True)
    ],
    tools=[YFinanceTools()],
    instructions=[
        "You are an elite financial analyst.",
        "Your job is to identify if a stock is a 'Dividend Trap'.",
        "Always cross-reference the company's dividend yield against its net income trends.",
        "If a company pays out more than 80% of its earnings as dividends while quarterly income is falling, clearly flag it.",
        "For REITs and Utilities, allow a higher payout threshold up to 95% before flagging.",
        "Keep your output clear, spam-free, concise, and ready for a professional WhatsApp alert style."
    ],
    markdown=True,
)

evaluation = AccuracyEval(
    model=Groq(id="llama-3.3-70b-versatile"),  # Fixed: use Groq instead of OpenAIChat with a Llama model
    agent=fagent,
    input="Analyze Altria (MO). Is its payout ratio signaling a dividend trap scenario?",
    expected_output="Flagged as high-yield or high payout ratio, requiring structural cash flow assessment.",
    additional_guidelines="Verify that the agent explicitly used yfinance to inspect net income trends and calculated a clear conclusion.",
    num_iterations=1
)


if __name__ == "__main__":
    print("🧪 Starting Automated Agent Evaluation...")
    result: Optional[AccuracyResult] = evaluation.run(print_results=True)
    
    if result:
        # Safely access score — attribute name varies by agno version
        score = getattr(result, "avg_score", None) or getattr(result, "score", None) or getattr(result, "mean_score", None)
        
        if score is not None:
            print(f"\n📈 Evaluation Complete! Average Score Given by Judge: {score}/10")
            assert score >= 7.0, "❌ Test Failed: Agent response quality fell below threshold."
        else:
            print("\n⚠️ Could not retrieve score. Available attributes:")
            print(dir(result))