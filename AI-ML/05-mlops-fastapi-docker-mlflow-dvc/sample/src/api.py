from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    features: list[float] = Field(..., min_length=4, max_length=4)


class PredictResponse(BaseModel):
    prediction: int


BASE_DIR = Path(__file__).resolve().parents[1]
MODEL_PATH = BASE_DIR / "models" / "model.joblib"

app = FastAPI(title="AI-ML FastAPI Inference", version="1.0.0")


def load_model():
    if not MODEL_PATH.exists():
        raise RuntimeError(f"Model file not found: {MODEL_PATH}")
    return joblib.load(MODEL_PATH)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest) -> PredictResponse:
    try:
        model = load_model()
        features = np.array(payload.features, dtype=float).reshape(1, -1)
        pred = int(model.predict(features)[0])
        return PredictResponse(prediction=pred)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=str(exc)) from exc
