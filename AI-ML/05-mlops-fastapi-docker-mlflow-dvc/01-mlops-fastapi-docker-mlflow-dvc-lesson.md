# 01 MLOps FastAPI Docker MLflow DVC Lesson

## Module Info
- Level: Intermediate to Advanced
- Duration: 14-20 hours
- Prerequisites: scikit-learn or PyTorch modeling, basic API concepts, Git

## Learning Outcomes
- Serve an ML model via FastAPI with a stable request/response contract.
- Package inference service with Docker.
- Track experiments with MLflow.
- Version data and pipeline steps with DVC.

## Deep Dive

### 1. Why MLOps matters
High-accuracy models still fail in production due to environment drift, missing reproducibility, and non-observable deployments.

### 2. FastAPI inference contract
Define strict schemas for request validation and predictable response shape. This is critical for client integration and rollback safety.

### 3. Docker for environment parity
A container ensures your service behaves similarly across laptop, CI, and server. Pin dependencies and expose explicit startup command.

### 4. MLflow experiment tracking
Track hyperparameters, metrics, and artifacts to compare runs. Without this, model choice becomes anecdotal and hard to audit.

### 5. DVC for data and pipeline reproducibility
DVC codifies data lineage and pipeline stages. It allows teams to rebuild model artifacts from versioned data and commands.

## Worked Example
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictRequest(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(payload: PredictRequest):
    return {"prediction": 1, "score": 0.87}
```

## Common Pitfalls
- Training-serving feature mismatch.
- Unpinned dependencies causing drift.
- No health endpoint or model version metadata.
- Logging too little to debug production failures.

## Debugging Checklist
- Verify model file path and load errors at startup.
- Validate request payload types and lengths.
- Check container logs for dependency mismatch.
- Confirm MLflow artifact paths are accessible.
- Reproduce DVC stage locally from clean state.

## Step-by-Step Practice Plan
1. Train a baseline model and serialize it.
2. Build a FastAPI `/predict` endpoint with schema validation.
3. Dockerize API and run locally.
4. Add MLflow logging in training script.
5. Create DVC pipeline stage for training.

## Mini Project Task
Build a customer churn serving service with:
- reproducible training script,
- model artifact persistence,
- FastAPI prediction API,
- Docker container,
- MLflow run logging,
- DVC stage definition.

## Interview Q&A
1. Why is reproducibility a production requirement, not a research-only concern?
2. What does DVC add beyond Git for ML workflows?
3. What should be included in an inference API response contract?
4. How would you detect model degradation after deployment?

## Exit Criteria
- You can train, track, version, and serve a model end-to-end.
- You can run API locally and inside Docker.
- You can explain lineage from raw data to served artifact.
