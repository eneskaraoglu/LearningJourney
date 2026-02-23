from __future__ import annotations

import json
from pathlib import Path
from typing import Iterable

import numpy as np
import pandas as pd


REQUIRED_COLUMNS = {"user_id", "age", "monthly_spend", "region"}
NUMERIC_COLUMNS = ("age", "monthly_spend")


def load_customers(csv_path: str) -> pd.DataFrame:
    path = Path(csv_path)
    if not path.exists():
        raise ValueError(f"Input CSV not found: {path}")
    return pd.read_csv(path)


def validate_required_columns(df: pd.DataFrame, required_columns: Iterable[str]) -> None:
    missing = set(required_columns) - set(df.columns)
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")


def coerce_numeric_columns(df: pd.DataFrame, numeric_columns: Iterable[str]) -> pd.DataFrame:
    out = df.copy()
    for col in numeric_columns:
        out[col] = pd.to_numeric(out[col], errors="coerce")
    return out


def filter_invalid_rows(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()

    out = out.dropna(subset=["age", "monthly_spend"])
    out = out[(out["age"] >= 0) & (out["monthly_spend"] >= 0)]

    # For this reference, we fill missing region for stable downstream grouping.
    out["region"] = out["region"].fillna("unknown")

    return out


def build_features(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()

    safe_age = out["age"].replace(0, np.nan)
    out["spend_per_age"] = (out["monthly_spend"] / safe_age).fillna(0.0)
    out["is_high_value"] = (out["monthly_spend"] >= 250).astype(int)

    return out


def generate_quality_report(df_raw: pd.DataFrame, df_clean: pd.DataFrame, duplicates_count: int) -> dict:
    input_rows = len(df_raw)
    output_rows = len(df_clean)

    return {
        "input_rows": input_rows,
        "output_rows": output_rows,
        "dropped_rows": input_rows - output_rows,
        "duplicates_count": duplicates_count,
        "output_columns": list(df_clean.columns),
    }


def run_pipeline(input_csv: str) -> dict:
    df_raw = load_customers(input_csv)
    validate_required_columns(df_raw, REQUIRED_COLUMNS)

    duplicates_count = int(df_raw.duplicated(subset=["user_id"]).sum())

    df_numeric = coerce_numeric_columns(df_raw, NUMERIC_COLUMNS)
    df_valid = filter_invalid_rows(df_numeric)
    df_features = build_features(df_valid)

    report = generate_quality_report(df_raw, df_features, duplicates_count)

    return {
        "clean_df": df_features,
        "quality_report": report,
    }


def persist_outputs(result: dict, output_dir: str) -> None:
    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    clean_csv = out_dir / "customers_clean.csv"
    report_json = out_dir / "quality_report.json"

    result["clean_df"].to_csv(clean_csv, index=False)
    report_json.write_text(json.dumps(result["quality_report"], indent=2), encoding="utf-8")


if __name__ == "__main__":
    base = Path(__file__).resolve().parent
    input_csv = base / "sample" / "data" / "customers_raw.csv"
    output_dir = base / "sample" / "output"

    result = run_pipeline(str(input_csv))
    persist_outputs(result, str(output_dir))

    print("Pipeline completed")
    print(json.dumps(result["quality_report"], indent=2))
