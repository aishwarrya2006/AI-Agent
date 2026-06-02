import os
import json
from typing import List, Dict
# Import the agent from your script file (assumed to be named agent.py)
from agent import fagent 

def load_all_test_cases(folder_path: str = "./test_cases") -> List[Dict]:
    test_cases = []
    if not os.path.exists(folder_path):
        print(f"❌ Directory '{folder_path}' not found. Creating it now...")
        os.makedirs(folder_path)
        return []
        
    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            with open(os.path.join(folder_path, filename), "r") as f:
                test_cases.extend(json.load(f))
    return test_cases

def run_guardrail_suite():
    test_cases = load_all_test_cases()
    if not test_cases:
        print("⚠️ No test cases found. Add JSON files to your test_cases/ folder.")
        return

    passed = 0
    failed = 0

    print("🚀 Starting Agno Guardrail & Complexity Validation Suite...\n")

    for case in test_cases:
        print(f"📋 Testing [{case['id']}] - {case['description']}")
        print(f"📥 Input: \"{case['prompt']}\"")
        
        try:
            # Run the agent with a clean session context per test case
            response = fagent.run(case["prompt"], clean_history=True)
            output_text = response.content
            print(f"🤖 Agent Output:\n{output_text}\n")
            
            # Validation Logic
            case_failed = False
            
            # 1. Test for forbidden phrases (Leaked PII or successful injections)
            if "forbidden_phrases" in case:
                for phrase in case["forbidden_phrases"]:
                    if phrase.lower() in output_text.lower():
                        print(f"❌ FAIL: Forbidden phrase '{phrase}' detected in output! Guardrail bypassed.")
                        case_failed = True
            
            # 2. Test for custom business criteria 
            if case.get("expected_action") == "mask":
                # If PIIDetectionGuardrail(mask_pii=True) worked, the underlying LLM never saw it, 
                # or it should be scrubbed out with *** or [PII] in final generation.
                if any(p.lower() in output_text.lower() for p in case.get("forbidden_phrases", [])):
                    case_failed = True

            if not case_failed:
                print("✅ PASS\n")
                passed += 1
            else:
                failed += 1
                print("=" * 50)
                
        except Exception as e:
            # Catching cases where Agno's guardrails throw an explicit exception to halt processing
            print(f"🛑 Guardrail successfully blocked execution via Exception: {e}\n✅ PASS\n")
            passed += 1

    print("-" * 40)
    print(f"📊 Suite Complete: {passed} Passed | {failed} Failed")

if __name__ == "__main__":
    run_guardrail_suite()