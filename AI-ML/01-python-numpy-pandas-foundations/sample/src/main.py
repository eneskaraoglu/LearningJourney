from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pandas as pd


REQUIRED_COLUMNS = {"user_id", "age", "monthly_spend", "region"}


def run_pipeline(input_csv: Path) -> tuple[pd.DataFrame, dict]:
    df = pd.read_csv(input_csv)

    missing = REQUIRED_COLUMNS - set(df.columns)
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")

    duplicates_count = int(df.duplicated(subset=["user_id"]).sum())

    out = df.copy()
    out["age"] = pd.to_numeric(out["age"], errors="coerce")
    out["monthly_spend"] = pd.to_numeric(out["monthly_spend"], errors="coerce")
    out = out.dropna(subset=["age", "monthly_spend"])
    out = out[(out["age"] >= 0) & (out["monthly_spend"] >= 0)]
    out["region"] = out["region"].fillna("unknown")

    safe_age = out["age"].replace(0, np.nan)
    out["spend_per_age"] = (out["monthly_spend"] / safe_age).fillna(0.0)
    out["is_high_value"] = (out["monthly_spend"] >= 250).astype(int)

    report = {
        "input_rows": int(len(df)),
        "output_rows": int(len(out)),
        "dropped_rows": int(len(df) - len(out)),
        "duplicates_count": duplicates_count,
    }

    return out, report


def main() -> None:
    base = Path(__file__).resolve().parents[1]
    input_csv = base / "data" / "customers_raw.csv"
    output_dir = base / "output"
    output_dir.mkdir(parents=True, exist_ok=True)

    clean_df, report = run_pipeline(input_csv)

    clean_df.to_csv(output_dir / "customers_clean.csv", index=False)
    (output_dir / "quality_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    print("Pipeline completed")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
