from __future__ import annotations

import time
from typing import Any

from datasets import load_dataset
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from transformers import AutoTokenizer, pipeline


DEFAULT_MODEL_ID = "distilbert-base-uncased-finetuned-sst-2-english"


def normalize_label(label: str) -> str:
    value = label.strip().upper()
    if value not in {"POSITIVE", "NEGATIVE"}:
        raise ValueError(f"Unsupported label: {label}")
    return value


def validate_inputs(texts: list[str]) -> list[str]:
    if not isinstance(texts, list) or not texts:
        raise ValueError("texts must be a non-empty list of strings")

    cleaned: list[str] = []
    for index, text in enumerate(texts):
        if not isinstance(text, str):
            raise ValueError(f"text at index {index} must be a string")
        value = text.strip()
        if not value:
            raise ValueError(f"text at index {index} cannot be blank")
        cleaned.append(value)
    return cleaned


def build_sentiment_pipeline(
    model_id: str = DEFAULT_MODEL_ID,
    retries: int = 3,
    backoff_seconds: float = 1.5,
):
    if not model_id.strip():
        raise ValueError("model_id cannot be empty")
    if retries <= 0:
        raise ValueError("retries must be > 0")
    if backoff_seconds <= 0:
        raise ValueError("backoff_seconds must be > 0")

    errors: list[str] = []
    for attempt in range(1, retries + 1):
        try:
            return pipeline(task="sentiment-analysis", model=model_id)
        except Exception as exc:  # pragma: no cover
            errors.append(f"attempt {attempt}: {exc}")
            if attempt < retries:
                time.sleep(backoff_seconds * attempt)

    raise RuntimeError(f"Failed to initialize pipeline for model '{model_id}'. {errors}")


def predict_batch(
    texts: list[str],
    classifier,
    threshold: float = 0.6,
) -> list[dict[str, Any]]:
    if not 0.0 <= threshold <= 1.0:
        raise ValueError("threshold must be between 0.0 and 1.0")

    cleaned = validate_inputs(texts)
    outputs = classifier(cleaned, truncation=True)

    if len(outputs) != len(cleaned):
        raise RuntimeError("Model output length does not match input length")

    records: list[dict[str, Any]] = []
    for text, output in zip(cleaned, outputs):
        label = normalize_label(output["label"])
        score = float(output["score"])
        records.append(
            {
                "text": text,
                "label": label,
                "score": round(score, 6),
                "low_confidence": score < threshold,
            }
        )
    return records


def load_dataset_slice(
    dataset_name: str,
    split: str = "train",
    limit: int = 100,
) -> list[dict[str, Any]]:
    if not dataset_name.strip():
        raise ValueError("dataset_name cannot be empty")
    if not split.strip():
        raise ValueError("split cannot be empty")
    if limit <= 0:
        raise ValueError("limit must be > 0")

    ds = load_dataset(dataset_name, split=split)
    slice_ds = ds.select(range(min(limit, len(ds))))

    if len(slice_ds) == 0:
        raise ValueError("dataset slice is empty")
    if "text" not in slice_ds.column_names:
        raise ValueError("dataset must contain a 'text' column")
    if "label" not in slice_ds.column_names:
        raise ValueError("dataset must contain a 'label' column")

    rows: list[dict[str, Any]] = []
    for item in slice_ds:
        text = str(item["text"]).strip()
        if not text:
            continue
        label_value = int(item["label"])
        rows.append({"text": text, "label": label_value})

    if not rows:
        raise ValueError("no usable rows found after cleaning")
    return rows


def tokenize_texts(tokenizer, texts: list[str], max_length: int = 128) -> dict[str, Any]:
    cleaned = validate_inputs(texts)
    if max_length <= 0:
        raise ValueError("max_length must be > 0")

    return tokenizer(
        cleaned,
        truncation=True,
        padding=True,
        max_length=max_length,
        return_tensors=None,
    )


def compute_classification_metrics(
    y_true: list[int],
    y_pred: list[int],
) -> dict[str, float]:
    if not y_true or not y_pred:
        raise ValueError("y_true and y_pred cannot be empty")
    if len(y_true) != len(y_pred):
        raise ValueError("y_true and y_pred must have the same length")

    return {
        "accuracy": round(float(accuracy_score(y_true, y_pred)), 6),
        "precision": round(float(precision_score(y_true, y_pred, zero_division=0)), 6),
        "recall": round(float(recall_score(y_true, y_pred, zero_division=0)), 6),
        "f1": round(float(f1_score(y_true, y_pred, zero_division=0)), 6),
    }


def evaluate_predictions(records: list[dict[str, Any]]) -> dict[str, Any]:
    if not records:
        raise ValueError("records cannot be empty")

    y_true: list[int] = []
    y_pred: list[int] = []
    low_conf_count = 0

    for index, record in enumerate(records):
        if "expected" not in record or "predicted" not in record:
            raise ValueError(f"record {index} must include expected and predicted")

        expected = normalize_label(str(record["expected"]))
        predicted = normalize_label(str(record["predicted"]))
        low_conf = bool(record.get("low_confidence", False))

        y_true.append(1 if expected == "POSITIVE" else 0)
        y_pred.append(1 if predicted == "POSITIVE" else 0)
        if low_conf:
            low_conf_count += 1

    metrics = compute_classification_metrics(y_true, y_pred)

    tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)
    tn = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 0)
    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)
    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)

    return {
        "metrics": metrics,
        "confusion": {"tp": tp, "tn": tn, "fp": fp, "fn": fn},
        "low_confidence_rate": round(low_conf_count / len(records), 6),
        "total": len(records),
    }


if __name__ == "__main__":
    model_id = DEFAULT_MODEL_ID
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    classifier = build_sentiment_pipeline(model_id=model_id)

    sample_texts = [
        "The onboarding flow was smooth and fast.",
        "The app keeps crashing after the latest update.",
        "Documentation is okay but missing deployment examples.",
    ]
    predictions = predict_batch(sample_texts, classifier, threshold=0.65)
    print("Predictions:", predictions)

    tokenized = tokenize_texts(tokenizer, sample_texts, max_length=64)
    print("Tokenized keys:", list(tokenized.keys()))

