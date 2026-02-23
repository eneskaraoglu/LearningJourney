from __future__ import annotations

from pathlib import Path
from typing import Iterable

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns


REQUIRED_COLUMNS = {"monthly_spend", "region", "churn"}


def load_data(path: str) -> pd.DataFrame:
    csv_path = Path(path)
    if not csv_path.exists():
        raise ValueError(f"CSV not found: {csv_path}")
    df = pd.read_csv(csv_path)
    if df.empty:
        raise ValueError("Input DataFrame is empty")
    return df


def _validate_columns(df: pd.DataFrame, columns: Iterable[str]) -> None:
    missing = set(columns) - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {sorted(missing)}")


def plot_numeric_distributions(df: pd.DataFrame, columns: Iterable[str], output_path: Path) -> None:
    _validate_columns(df, columns)

    cols = list(columns)
    fig, axes = plt.subplots(len(cols), 1, figsize=(8, 4 * len(cols)))
    if len(cols) == 1:
        axes = [axes]

    for ax, col in zip(axes, cols):
        series = df[col].dropna()
        if series.empty:
            ax.set_title(f"{col}: skipped (all null)")
            continue
        sns.histplot(series, kde=True, ax=ax)
        ax.set_title(f"Distribution: {col}")

    plt.tight_layout()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    plt.savefig(output_path)
    plt.close(fig)


def plot_category_balance(df: pd.DataFrame, category_col: str, output_path: Path) -> None:
    _validate_columns(df, [category_col])

    fig, ax = plt.subplots(figsize=(8, 4))
    sns.countplot(data=df, x=category_col, ax=ax)
    ax.set_title(f"Category Balance: {category_col}")
    ax.tick_params(axis="x", rotation=25)

    plt.tight_layout()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    plt.savefig(output_path)
    plt.close(fig)


def plot_correlation_heatmap(df: pd.DataFrame, output_path: Path) -> None:
    numeric_df = df.select_dtypes(include="number")
    if numeric_df.shape[1] < 2:
        raise ValueError("Need at least two numeric columns for correlation heatmap")

    corr = numeric_df.corr(numeric_only=True)

    fig, ax = plt.subplots(figsize=(7, 5))
    sns.heatmap(corr, annot=True, cmap="Blues", fmt=".2f", ax=ax)
    ax.set_title("Correlation Heatmap")
    plt.tight_layout()

    output_path.parent.mkdir(parents=True, exist_ok=True)
    plt.savefig(output_path)
    plt.close(fig)


def create_eda_report(df: pd.DataFrame, output_dir: str) -> dict:
    _validate_columns(df, REQUIRED_COLUMNS)
    out_dir = Path(output_dir)

    dist_path = out_dir / "distributions.png"
    category_path = out_dir / "category_balance.png"
    heatmap_path = out_dir / "correlation_heatmap.png"

    plot_numeric_distributions(df, ["monthly_spend"], dist_path)
    plot_category_balance(df, "region", category_path)
    plot_correlation_heatmap(df, heatmap_path)

    return {
        "distributions": str(dist_path),
        "category_balance": str(category_path),
        "correlation_heatmap": str(heatmap_path),
    }
