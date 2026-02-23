from __future__ import annotations

from typing import Iterable

import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, f1_score, precision_score, recall_score
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


def build_preprocessor(numeric_cols: Iterable[str], categorical_cols: Iterable[str]) -> ColumnTransformer:
    return ColumnTransformer(
        transformers=[
            (
                "num",
                Pipeline([
                    ("imputer", SimpleImputer(strategy="median")),
                    ("scaler", StandardScaler()),
                ]),
                list(numeric_cols),
            ),
            (
                "cat",
                Pipeline([
                    ("imputer", SimpleImputer(strategy="most_frequent")),
                    ("onehot", OneHotEncoder(handle_unknown="ignore")),
                ]),
                list(categorical_cols),
            ),
        ]
    )


def _validate_binary_target(y: pd.Series) -> None:
    values = set(pd.Series(y).dropna().unique().tolist())
    if not values.issubset({0, 1}):
        raise ValueError(f"Target must be binary 0/1, found: {sorted(values)}")


def train_baseline_model(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    numeric_cols: Iterable[str],
    categorical_cols: Iterable[str],
):
    _validate_binary_target(y_train)

    preprocessor = build_preprocessor(numeric_cols, categorical_cols)
    model = Pipeline([
        ("preprocess", preprocessor),
        ("clf", LogisticRegression(max_iter=1000, random_state=42)),
    ])

    model.fit(X_train, y_train)
    return model


def evaluate_model(model, X_test: pd.DataFrame, y_test: pd.Series) -> dict:
    _validate_binary_target(y_test)

    preds = model.predict(X_test)
    cm = confusion_matrix(y_test, preds)

    return {
        "precision": float(precision_score(y_test, preds, zero_division=0)),
        "recall": float(recall_score(y_test, preds, zero_division=0)),
        "f1": float(f1_score(y_test, preds, zero_division=0)),
        "confusion_matrix": cm.tolist(),
    }


def run_cv(model, X: pd.DataFrame, y: pd.Series, cv: int = 5) -> dict:
    _validate_binary_target(y)

    scores = cross_val_score(model, X, y, scoring="f1", cv=cv)
    return {
        "cv_f1_mean": float(np.mean(scores)),
        "cv_f1_std": float(np.std(scores)),
        "cv_f1_scores": [float(s) for s in scores],
    }
