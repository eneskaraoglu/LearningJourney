# Session 1: Machine Learning Foundations

## Learning Objectives
By the end of this session, you will:
1. Understand the supervised ML workflow
2. Split data into train and test sets
3. Train a simple model with scikit-learn
4. Evaluate models with common metrics
5. Use pipelines for clean preprocessing

---

## 1. What Is Machine Learning?

Machine learning trains models to learn patterns from data.
Typical workflow:
1. Collect data
2. Prepare features and labels
3. Split train/test
4. Train a model
5. Evaluate and iterate

---

## 2. Core Libraries

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, mean_squared_error
from sklearn.linear_model import LinearRegression, LogisticRegression
```

### Setup

```bash
pip install pandas numpy scikit-learn
```

### Dataset

This module uses `data/iris_small.csv` (a small Iris sample) for the exercises.

---

## 3. Train/Test Split

```python
X = df[["feature1", "feature2"]]
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

---

## 4. Training a Model

```python
model = LinearRegression()
model.fit(X_train, y_train)
preds = model.predict(X_test)
```

---

## 5. Evaluation Basics

```python
# Regression
rmse = mean_squared_error(y_test, preds, squared=False)

# Classification
clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)
class_preds = clf.predict(X_test)
acc = accuracy_score(y_test, class_preds)
```

---

## 6. Pipelines

Pipelines keep preprocessing and modeling together.

```python
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression(max_iter=1000))
])

pipe.fit(X_train, y_train)
pipe.predict(X_test)
```

---

## 7. Key Terms

- **Features (X)**: Inputs
- **Labels (y)**: Outputs/targets
- **Overfitting**: Model learns noise, not general patterns
- **Underfitting**: Model too simple to learn patterns

---

## Summary
1. ML uses data to learn patterns
2. Always split train/test
3. Use metrics to evaluate
4. Pipelines keep workflows clean
