# Sample: Local Retrieval-First Assistant

## Setup
```bash
cd AI-ML/06-llm-engineering-foundations/sample
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run
```bash
python src/main.py
```

## What it does
- loads local knowledge base,
- chunks documents,
- builds TF-IDF retriever,
- answers sample questions with evidence and confidence,
- runs a small groundedness evaluation batch.
