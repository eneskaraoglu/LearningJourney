"""
02 Exercises: Scikit-learn Modeling

Part A (Core Implementation)
- Implement `build_preprocessor(numeric_cols, categorical_cols)`.
- Implement `train_baseline_model(X_train, y_train)` using logistic regression pipeline.
- Implement `evaluate_model(model, X_test, y_test)` with precision, recall, f1.

Part B (Validation/Error Cases)
- Validate target is binary.
- Raise clear error if required feature columns are missing.
- Handle unseen categorical values in test data.

Part C (Reliability/Refactor)
- Implement `run_cv(model, X, y, cv=5)`.
- Add second candidate model and compare mean CV F1.
- Return a final model-selection summary dictionary.

Constraints
- Use scikit-learn Pipeline and ColumnTransformer.
- Avoid leakage from fit-on-full-data.
- Keep deterministic random states.

Acceptance Criteria
- Pipeline runs end-to-end on sample tabular dataset.
- Report includes precision, recall, f1, and confusion matrix counts.
- Model selection summary includes chosen model and reason.

Bonus Challenge
- Add threshold tuning and report precision/recall trade-off table.

Reflection Prompts
- Which model failed gracefully under noisy features?
- How did class imbalance affect your metric interpretation?
"""

from __future__ import annotations

from typing import Iterable

import pandas as pd


def build_preprocessor(numeric_cols: Iterable[str], categorical_cols: Iterable[str]):
    # TODO
    raise NotImplementedError


def train_baseline_model(X_train: pd.DataFrame, y_train: pd.Series):
    # TODO
    raise NotImplementedError


def evaluate_model(model, X_test: pd.DataFrame, y_test: pd.Series) -> dict:
    # TODO
    raise NotImplementedError


def run_cv(model, X: pd.DataFrame, y: pd.Series, cv: int = 5) -> dict:
    # TODO
    raise NotImplementedError
