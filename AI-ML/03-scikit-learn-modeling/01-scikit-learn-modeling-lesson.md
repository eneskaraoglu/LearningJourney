# 01 Scikit-learn Modeling Lesson

## Module Info
- Level: Intermediate
- Duration: 10-14 hours
- Prerequisites: pandas cleaning, train/test split basics, visualization

## Learning Outcomes
- Build baseline classification and regression pipelines.
- Prevent data leakage with proper split and transformers.
- Evaluate models using fit-for-purpose metrics.
- Tune hyperparameters with reproducible workflows.

## Deep Dive

### 1. Baseline first, then complexity
Always establish a baseline model and baseline metric. Without it, you cannot prove the value of advanced tuning.

### 2. Pipeline-based preprocessing
Use `Pipeline` and `ColumnTransformer` so preprocessing is part of the model artifact. This prevents training-serving skew.

### 3. Metric selection by business cost
Accuracy is weak under imbalance. Prefer precision/recall/F1/PR-AUC when false negatives or false positives have different costs.

### 4. Cross-validation discipline
Single split can mislead. Cross-validation measures stability and variance in model behavior.

### 5. Error analysis loop
Inspect confusion matrix, hardest false positives/negatives, and feature-driven bias. Then redesign features and thresholds.

## Worked Example
```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression

preprocess = ColumnTransformer(
    transformers=[
        (
            "num",
            Pipeline([
                ("imputer", SimpleImputer(strategy="median")),
                ("scaler", StandardScaler()),
            ]),
            ["age", "monthly_spend"],
        ),
        (
            "cat",
            Pipeline([
                ("imputer", SimpleImputer(strategy="most_frequent")),
                ("onehot", OneHotEncoder(handle_unknown="ignore")),
            ]),
            ["region"],
        ),
    ]
)

model = Pipeline([
    ("preprocess", preprocess),
    ("clf", LogisticRegression(max_iter=1000)),
])
```

## Common Pitfalls
- Fitting encoders on full data before split.
- Using only accuracy on imbalanced classes.
- Comparing models with different random states and no seed control.
- Ignoring calibration and decision threshold tuning.

## Debugging Checklist
- Verify target leakage columns are excluded.
- Validate class balance in train/test.
- Check missing-value handling per column type.
- Compare CV score variance, not only mean.
- Review top misclassified samples.

## Step-by-Step Practice Plan
1. Build baseline logistic regression pipeline.
2. Add class-weight and threshold experiments.
3. Compare random forest and gradient boosting.
4. Run `GridSearchCV` on top candidate.
5. Export best model with metadata.

## Mini Project Task
Create a churn prediction module with:
- one preprocessing pipeline,
- two candidate models,
- model comparison report,
- chosen model and threshold recommendation.

## Interview Q&A
1. What is leakage and how do pipelines reduce it?
2. Why might F1 improve while accuracy drops?
3. When should you tune threshold instead of model class?
4. How do you choose between CV folds and runtime budget?

## Exit Criteria
- You can train, evaluate, and compare multiple models with stable methodology.
- You can defend metric choices with business impact.
- You can export a reproducible model pipeline artifact.
