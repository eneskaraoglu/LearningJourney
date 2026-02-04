# Session 2: Supervised Learning

## Learning Objectives
By the end of this session, you will:
1. Understand regression vs classification
2. Train and evaluate a regression model
3. Train and evaluate a classification model
4. Use train/test split and metrics
5. Interpret coefficients and feature importance

---

## 1. Supervised Learning Overview

- **Regression** predicts a number (price, score, revenue)
- **Classification** predicts a category (spam/ham, churn/no churn)

### Setup

```bash
pip install pandas scikit-learn
```

### Datasets

This module uses:
- `data/housing.csv` for regression
- `data/churn.csv` for classification

---

## 2. Regression Example

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

df = pd.read_csv("data/housing.csv")
X = df[["rooms", "area_sqft", "age_years"]]
y = df["price_k"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)
preds = model.predict(X_test)

rmse = mean_squared_error(y_test, preds, squared=False)
```

---

## 3. Classification Example

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

df = pd.read_csv("data/churn.csv")
X = df[["tenure_months", "monthly_fee", "support_calls"]]
y = df["churn"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)
preds = clf.predict(X_test)

acc = accuracy_score(y_test, preds)
print(classification_report(y_test, preds))
```

---

## 4. Feature Interpretation

```python
model.coef_      # linear regression coefficients
clf.coef_        # logistic regression coefficients
```

---

## 5. Metrics Cheat Sheet

- **Regression**: MSE, RMSE, MAE, R2
- **Classification**: Accuracy, Precision, Recall, F1

---

## Summary
1. Regression predicts numbers
2. Classification predicts categories
3. Always evaluate with proper metrics
4. Coefficients show feature impact
