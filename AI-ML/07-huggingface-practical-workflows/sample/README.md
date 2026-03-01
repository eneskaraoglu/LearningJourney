# Hugging Face Practical Workflows Sample

This sample runs a sentiment-analysis workflow using Hugging Face:
- model loading via `transformers`,
- optional Hub auth via `HF_TOKEN`,
- dataset sampling via `datasets`,
- basic metrics and confusion analysis.

## 1) Setup
```bash
cd AI-ML/07-huggingface-practical-workflows/sample
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
# source .venv/bin/activate
pip install -r requirements.txt
```

## 2) Configure
```bash
copy .env.example .env
```
Update values in `.env` if you want a different model or dataset.

## 3) Run
```bash
python src/app.py
```

## Output
The script prints:
- batch predictions for demo sentences,
- tokenization stats,
- evaluation summary (accuracy/precision/recall/f1),
- confusion counts and low-confidence rate.

## Notes
- First run may take time to download model artifacts.
- `HF_TOKEN` is optional for public models, required for private/gated models.
