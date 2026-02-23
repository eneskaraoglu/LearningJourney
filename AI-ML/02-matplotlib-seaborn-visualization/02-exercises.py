"""
02 Exercises: Matplotlib + Seaborn Visualization

Part A (Core Implementation)
- Implement `load_data(path)`.
- Implement `plot_numeric_distributions(df, columns)`.
- Implement `plot_category_balance(df, category_col)`.

Part B (Validation/Error Cases)
- Validate required columns exist before plotting.
- Handle empty DataFrame with clear `ValueError`.
- Skip columns with all-null values and log reason.

Part C (Reliability/Refactor)
- Build `create_eda_report(df, output_dir)` that saves:
  - distributions.png
  - category_balance.png
  - correlation_heatmap.png
- Return metadata dict with generated file paths.

Constraints
- Use reusable plotting functions.
- Validate inputs explicitly.
- Keep figure sizing readable.

Acceptance Criteria
- Code runs without syntax errors.
- Output images are saved.
- Invalid inputs fail with clear messages.

Bonus Challenge
- Add optional `use_log_scale` for skewed columns.

Reflection Prompts
- Which chart changed your preprocessing decision?
- Which metric should accompany each chart in text?
"""

from __future__ import annotations

from pathlib import Path
from typing import Iterable

import pandas as pd


def load_data(path: str) -> pd.DataFrame:
    # TODO
    raise NotImplementedError


def plot_numeric_distributions(df: pd.DataFrame, columns: Iterable[str], output_path: Path) -> None:
    # TODO
    raise NotImplementedError


def plot_category_balance(df: pd.DataFrame, category_col: str, output_path: Path) -> None:
    # TODO
    raise NotImplementedError


def create_eda_report(df: pd.DataFrame, output_dir: str) -> dict:
    # TODO
    raise NotImplementedError
