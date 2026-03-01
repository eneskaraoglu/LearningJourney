from __future__ import annotations

import os
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass(frozen=True)
class Settings:
    model_id: str
    confidence_threshold: float
    dataset_name: str
    dataset_split: str
    dataset_limit: int
    hf_token: str | None


def load_settings() -> Settings:
    load_dotenv()

    model_id = os.getenv(
        "HF_MODEL_ID",
        "distilbert-base-uncased-finetuned-sst-2-english",
    ).strip()
    dataset_name = os.getenv("HF_DATASET", "imdb").strip()
    dataset_split = os.getenv("HF_DATASET_SPLIT", "test").strip()
    hf_token = os.getenv("HF_TOKEN", "").strip() or None

    try:
        confidence_threshold = float(os.getenv("HF_CONFIDENCE_THRESHOLD", "0.65"))
    except ValueError as exc:
        raise ValueError("HF_CONFIDENCE_THRESHOLD must be a float") from exc

    try:
        dataset_limit = int(os.getenv("HF_DATASET_LIMIT", "30"))
    except ValueError as exc:
        raise ValueError("HF_DATASET_LIMIT must be an integer") from exc

    if not model_id:
        raise ValueError("HF_MODEL_ID cannot be empty")
    if not dataset_name:
        raise ValueError("HF_DATASET cannot be empty")
    if not dataset_split:
        raise ValueError("HF_DATASET_SPLIT cannot be empty")
    if not 0.0 <= confidence_threshold <= 1.0:
        raise ValueError("HF_CONFIDENCE_THRESHOLD must be between 0.0 and 1.0")
    if dataset_limit <= 0:
        raise ValueError("HF_DATASET_LIMIT must be > 0")

    return Settings(
        model_id=model_id,
        confidence_threshold=confidence_threshold,
        dataset_name=dataset_name,
        dataset_split=dataset_split,
        dataset_limit=dataset_limit,
        hf_token=hf_token,
    )
