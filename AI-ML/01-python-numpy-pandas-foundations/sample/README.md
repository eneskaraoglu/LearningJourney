# Sample: Customer Data Prep Pipeline

## Setup
```bash
cd AI-ML/01-python-numpy-pandas-foundations/sample
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run
```bash
python src/main.py
```

## Output
The script generates:
- `output/customers_clean.csv`
- `output/quality_report.json`

## Goal
Practice production-style preprocessing with schema checks, numeric coercion, and stable feature generation.
