"""
02 Exercises: Python + NumPy + pandas Foundations

Part A (Core Implementation)
- Implement `load_customers(csv_path)` to read CSV and return DataFrame.
- Implement `validate_required_columns(df, required_columns)`.
- Implement `coerce_numeric_columns(df, numeric_columns)`.

Part B (Validation and Error Cases)
- Reject negative values in `age` and `monthly_spend`.
- Detect duplicate `user_id` values and return them in a diagnostics dict.
- Handle missing `region` values using one of:
  1) drop row
  2) fill with "unknown"
  Document your choice in comments.

Part C (Reliability and Refactor)
- Implement `build_features(df)` with:
  - `spend_per_age` (safe divide; avoid division by zero)
  - `is_high_value` (1 if monthly_spend >= 250 else 0)
- Implement `generate_quality_report(df_raw, df_clean, duplicates_count)`.
- Return a final dictionary contract:
  {
    "clean_df": <DataFrame>,
    "quality_report": <dict>
  }

Constraints
- Use functions; avoid writing all logic in global scope.
- Raise `ValueError` with clear messages for contract violations.
- Keep transformations deterministic.
- Do not mutate caller-owned DataFrame in-place.

Acceptance Criteria
- Script runs without syntax errors.
- All required columns are validated.
- Numeric coercion and invalid-value filtering works.
- Feature columns are present and correct.
- Quality report includes input_rows, output_rows, dropped_rows, duplicates_count.

Bonus Challenge
- Add a small unit-style check function that asserts key invariants.
- Save `quality_report` as JSON next to output CSV.

Reflection Prompts
- Which cleaning rule had the biggest effect on output rows?
- What could go wrong if inference-time preprocessing differs from training?
- Which part should become a reusable library module in a larger project?
"""

from __future__ import annotations

from pathlib import Path
from typing import Iterable

import pandas as pd


def load_customers(csv_path: str) -> pd.DataFrame:
    # TODO: implement
    raise NotImplementedError


def validate_required_columns(df: pd.DataFrame, required_columns: Iterable[str]) -> None:
    # TODO: implement
    raise NotImplementedError


def coerce_numeric_columns(df: pd.DataFrame, numeric_columns: Iterable[str]) -> pd.DataFrame:
    # TODO: implement
    raise NotImplementedError


def build_features(df: pd.DataFrame) -> pd.DataFrame:
    # TODO: implement
    raise NotImplementedError


def generate_quality_report(
    df_raw: pd.DataFrame,
    df_clean: pd.DataFrame,
    duplicates_count: int,
) -> dict:
    # TODO: implement
    raise NotImplementedError


def run_pipeline(input_csv: str) -> dict:
    # TODO: wire all steps together and return the final dictionary contract
    raise NotImplementedError


if __name__ == "__main__":
    demo_input = Path("sample/data/customers_raw.csv")
    if not demo_input.exists():
        print("Demo file not found. Run this from AI-ML/01-python-numpy-pandas-foundations")
    else:
        result = run_pipeline(str(demo_input))
        print(result["quality_report"])
        print(result["clean_df"].head())
