"""
Quick test script to verify Gemini API key and model availability
"""
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("❌ GEMINI_API_KEY not found in .env file!")
    exit(1)

print(f"✅ API Key found: {api_key[:10]}...{api_key[-10:]}")
print("\n🔍 Testing Gemini API connection...\n")

try:
    client = genai.Client(api_key=api_key)
    
    # Test with gemini-2.0-flash-exp
    print("Testing model: gemini-2.0-flash-exp")
    response = client.models.generate_content(
        model='gemini-2.0-flash-exp',
        contents='Say hello in one sentence'
    )
    print(f"✅ Success! Response: {response.text}\n")
    
except Exception as e:
    print(f"❌ Error with gemini-2.0-flash-exp: {e}\n")
    
    # Try gemini-3.5-flash as alternative
    try:
        print("Trying alternative model: gemini-3.5-flash")
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents='Say hello in one sentence'
        )
        print(f"✅ Success! Response: {response.text}\n")
        print("💡 Suggestion: Update agent.py to use 'gemini-3.5-flash'")
    except Exception as e2:
        print(f"❌ Error with gemini-3.5-flash: {e2}\n")
        print("💡 Your API key might need to be regenerated or activated at:")
        print("   https://aistudio.google.com/app/apikey")
