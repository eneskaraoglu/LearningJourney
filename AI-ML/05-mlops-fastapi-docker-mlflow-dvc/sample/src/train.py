from __future__ import annotations

from pathlib import Path

import joblib
import mlflow
import numpy as np
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score
from sklearn.model_selection import train_test_split


def train_and_save(model_path: Path) -> dict:
    X, y = load_iris(return_X_y=True)
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    model = LogisticRegression(max_iter=300, random_state=42)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    metrics = {
        "accuracy": float(accuracy_score(y_test, preds)),
        "f1_macro": float(f1_score(y_test, preds, average="macro")),
    }

    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, model_path)

    return metrics


def main() -> None:
    base = Path(__file__).resolve().parents[1]
    model_path = base / "models" / "model.joblib"

    mlflow.set_experiment("ai_ml_fastapi_demo")
    with mlflow.start_run(run_name="iris_logreg"):
        mlflow.log_param("model", "LogisticRegression")
        mlflow.log_param("random_state", 42)

        metrics = train_and_save(model_path)
        mlflow.log_metrics(metrics)
        mlflow.log_artifact(str(model_path))

    print("Training complete")
    print(metrics)


if __name__ == "__main__":
    main()
