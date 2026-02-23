# 01 Python NumPy pandas Lesson

## Module Info
- Level: Beginner to Early Intermediate
- Duration: 8-12 hours
- Prerequisites: Basic programming logic, loops, functions

## Learning Outcomes
By the end of this module, you will be able to:
- choose between native Python lists/dicts and NumPy arrays for performance-sensitive work,
- load, clean, and transform tabular data with pandas,
- implement a reliable mini data pipeline with validation and clear error messages,
- produce a simple summary report ready for ML feature preparation.

## Deep Dive

### 1. Why Python + NumPy + pandas is the AI/ML baseline
AI/ML projects fail early when data handling is inconsistent. Python gives readability and ecosystem support, NumPy gives fast vectorized numerical computation, and pandas gives expressive data preparation for tabular datasets.

### 2. Vectorization vs loops
Python loops are flexible but slow for large numeric operations. NumPy pushes operations into optimized native code. In practice, this means lower latency for feature generation and less code surface for bugs.

### 3. Data contracts in pandas
A production-minded dataset has a contract: required columns, expected data types, accepted ranges, and null policy. Define the contract before transformations, or your models train on silently corrupted data.

### 4. Missing values and invalid categories
Missing values must be handled consistently across train and inference. Invalid categories (for example, unexpected city names) should be surfaced as warnings or blocked if they violate strict quality thresholds.

### 5. Reproducible preprocessing
Keep preprocessing steps deterministic:
- explicit type conversion,
- explicit fill/drop policy,
- explicit feature naming.
This makes your model experiments reproducible and debug-friendly.

## Worked Example

```python
from pathlib import Path
import pandas as pd

REQUIRED_COLUMNS = {"user_id", "age", "monthly_spend", "region"}

def load_and_prepare(csv_path: str) -> pd.DataFrame:
    df = pd.read_csv(csv_path)

    missing_columns = REQUIRED_COLUMNS - set(df.columns)
    if missing_columns:
        raise ValueError(f"Missing required columns: {sorted(missing_columns)}")

    df["age"] = pd.to_numeric(df["age"], errors="coerce")
    df["monthly_spend"] = pd.to_numeric(df["monthly_spend"], errors="coerce")
    df = df.dropna(subset=["age", "monthly_spend", "region"])

    df["is_high_value"] = (df["monthly_spend"] >= 250).astype(int)
    return df

prepared = load_and_prepare(str(Path("data/customers.csv")))
print(prepared.groupby("region")["monthly_spend"].mean())
```

## Common Pitfalls
- Using `inplace=True` and assuming it always behaves as expected.
- Mixing string numbers and numeric values without explicit conversion.
- Applying train-time cleaning rules differently during inference.
- Ignoring duplicate rows that inflate model confidence.
- Writing one large notebook cell instead of testable functions.

## Debugging Checklist
- Confirm CSV delimiter and encoding first.
- Print `df.dtypes` before and after transformations.
- Check null counts per required column.
- Validate row count changes after each filtering step.
- Track duplicate count and dropped row reasons.
- Re-run on a small known dataset to verify deterministic output.

## Step-by-Step Practice Plan
1. Create a small CSV with intentional bad values.
2. Implement a `validate_schema(df)` function.
3. Convert numeric fields with strict error handling.
4. Handle missing values with a documented policy.
5. Create 2-3 derived features for downstream modeling.
6. Generate grouped summary metrics and save a clean CSV.

## Mini Project Task
Build a `customer_health_report` script that:
- reads raw customer data,
- validates schema and data quality,
- creates features (`spend_per_age`, `is_high_value`),
- outputs both cleaned dataset and quality summary JSON.

The report should fail fast if critical columns are missing and should log non-critical anomalies (for example, duplicate IDs) as warnings.

## Interview Q&A
1. Why is NumPy faster than Python loops for numeric operations?
2. How do you enforce consistent preprocessing between training and serving?
3. What is the difference between `dropna` and imputation, and when would you choose each?
4. How would you detect silent data drift in categorical features?
5. Why should data cleaning functions be deterministic?

## Exit Criteria
- You can write a script that loads messy CSV input and produces a validated clean output.
- You can explain each cleaning decision and its model impact.
- Your code uses reusable functions and clear error contracts.
- You can run the sample project end-to-end without manual notebook edits.
