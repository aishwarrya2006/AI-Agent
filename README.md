AI-powered stock scanning platform delivering real-time insights, safety reviews, and dividend trap intelligence.

## Project Info

**GitHub Repository:** [https://github.com/aishwarrya2006/AI-Agent](https://github.com/aishwarrya2006/AI-Agent)  
**Author:** [aishwarrya2006](https://github.com/aishwarrya2006)  
**License:** [MIT](file:///c:/Users/aishw/OneDrive/Documents/Coding/AI-Agent/LICENSE)

## Tech Stack

This project is built with modern AI and financial analysis technologies:

- **Agno** - Developer-first framework for building agents with memory, tools, and guardrails
- **Groq** - Ultra-fast LLM inference engine powering the agent model (`llama-3.3-70b-versatile`)
- **YFinance Tools** - Financial market data tool to inspect stock metrics, dividend history, and income trends
- **FastAPI + Uvicorn** - Web server suite for potential API hosting and webhook integrations
- **python-dotenv** - Python configuration library to manage API keys securely
- **Automated Evaluations** - Built-in verification using `AccuracyEval` to test agent output quality against guidelines

## Local Development

### Prerequisites

- **Python 3.10+** and `pip` installed
- API Keys for **Groq** and **OpenAI** (configured in your `.env` file)

### Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd AI-Agent

# Install dependencies
pip install -r requirements.txt

# Start safety analysis & evaluation
python agent.py
```

The safety analyst runs evaluations and inspects stock data programmatically.

### Available Scripts

- `python agent.py` – Runs the automated dividend safety agent evaluation

## Project Structure

```
AI-Agent/
├── .vscode/          # VS Code settings
│   └── settings.json # Workspace preferences
├── agent.py          # Main script defining the Dividend Analyst Agent and evaluations
├── requirements.txt  # Python package dependencies
├── .env_sample       # Template for environment variables (GROQ_API_KEY, OPENAI_API_KEY)
└── README.md         # Project documentation (this file)
```

## Deployment

The AI-Agent is configured for local terminal execution or execution on a scheduled server VM.

### Deploy to Production

The script can be configured to run as a cron job or worker service on any cloud platform supporting Python.

### Manual Run

```bash
# Run agent safety analysis and evaluations locally
python agent.py
```

## Quality Checklist

Before opening a PR or deployment:

- `python agent.py` – Run automated accuracy & safety evaluations (target score >= 7.0/10)
- `pip audit` – Review python packages dependency advisories
- `black --check agent.py` – Confirm code formatting meets standards

## Contact

**aishwarrya2006**  
India  

**Email:** [aishwarrya.t2006@gmail.com](mailto:aishwarrya.t2006@gmail.com)  
**Website:** [https://github.com/aishwarrya2006/AI-Agent](https://github.com/aishwarrya2006/AI-Agent)  

## License

© 2026 aishwarrya2006. All rights reserved. Licensed under the MIT License.

