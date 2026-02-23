# Sample: FastAPI + Docker + MLflow + DVC

## Setup
```bash
cd AI-ML/05-mlops-fastapi-docker-mlflow-dvc/sample
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Train model
```bash
python src/train.py
```

## Run API
```bash
uvicorn src.api:app --reload --host 0.0.0.0 --port 8000
```

## Test API
```bash
curl -X POST http://127.0.0.1:8000/predict -H "Content-Type: application/json" -d "{\"features\":[5.1,3.5,1.4,0.2]}"
```

## Docker
```bash
docker build -t ai-ml-fastapi .
docker run -p 8000:8000 ai-ml-fastapi
```

## DVC
```bash
dvc repro
```

## Output
- `models/model.joblib`
- local MLflow runs under `mlruns/`
