from __future__ import annotations

from typing import Any

from datasets import load_dataset
from huggingface_hub import login
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from transformers import AutoTokenizer, pipeline

from config import Settings


def normalize_prediction_label(label: str) -> str:
    value = label.strip().upper()
    if value not in {"POSITIVE", "NEGATIVE"}:
        raise ValueError(f"Unexpected label from model: {label}")
    return value


def login_if_token_present(token: str | None) -> None:
    if token:
        login(token=token, add_to_git_credential=False)


def create_pipeline(settings: Settings):
    return pipeline(
        task="sentiment-analysis",
        model=settings.model_id,
    )


def load_records(settings: Settings) -> list[dict[str, Any]]:
    ds = load_dataset(settings.dataset_name, split=settings.dataset_split)
    ds = ds.select(range(min(len(ds), settings.dataset_limit)))

    if "text" not in ds.column_names or "label" not in ds.column_names:
        raise ValueError("Dataset must contain both 'text' and 'label' columns")

    rows: list[dict[str, Any]] = []
    for item in ds:
        text = str(item["text"]).strip()
        if not text:
            continue
        rows.append({"text": text, "expected": int(item["label"])})

    if not rows:
        raise ValueError("No usable text rows found in dataset slice")
    return rows


def run_predictions(
    classifier,
    records: list[dict[str, Any]],
    threshold: float,
) -> list[dict[str, Any]]:
    texts = [row["text"] for row in records]
    outputs = classifier(texts, truncation=True)

    results: list[dict[str, Any]] = []
    for row, out in zip(records, outputs):
        label = normalize_prediction_label(out["label"])
        score = float(out["score"])
        predicted_int = 1 if label == "POSITIVE" else 0
        results.append(
            {
                "text": row["text"],
                "expected": int(row["expected"]),
                "predicted": predicted_int,
                "label": label,
                "score": round(score, 6),
                "low_confidence": score < threshold,
            }
        )
    return results


def compute_metrics(predictions: list[dict[str, Any]]) -> dict[str, Any]:
    y_true = [p["expected"] for p in predictions]
    y_pred = [p["predicted"] for p in predictions]
    low_confidence_count = sum(1 for p in predictions if p["low_confidence"])

    tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)
    tn = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 0)
    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)
    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)

    return {
        "accuracy": round(float(accuracy_score(y_true, y_pred)), 6),
        "precision": round(float(precision_score(y_true, y_pred, zero_division=0)), 6),
        "recall": round(float(recall_score(y_true, y_pred, zero_division=0)), 6),
        "f1": round(float(f1_score(y_true, y_pred, zero_division=0)), 6),
        "confusion": {"tp": tp, "tn": tn, "fp": fp, "fn": fn},
        "low_confidence_rate": round(low_confidence_count / len(predictions), 6),
        "total": len(predictions),
    }


def inspect_token_lengths(settings: Settings, texts: list[str], sample_size: int = 20) -> dict[str, int]:
    tokenizer = AutoTokenizer.from_pretrained(settings.model_id)
    lengths = [len(tokenizer(text, truncation=False)["input_ids"]) for text in texts[:sample_size]]

    return {
        "min_tokens": min(lengths),
        "max_tokens": max(lengths),
        "avg_tokens": int(sum(lengths) / len(lengths)),
    }
