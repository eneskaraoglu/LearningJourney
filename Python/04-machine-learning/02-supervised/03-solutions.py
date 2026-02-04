# Supervised Learning - Exercise Solutions

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score, classification_report

"""
Exercise 1: Regression Dataset
"""
df_house = pd.read_csv("data/housing.csv")
X = df_house[["rooms", "area_sqft", "age_years"]]
y = df_house["price_k"]
print(df_house.head())
print("\n" + "=" * 50 + "\n")


"""
Exercise 2: Train Regression Model
"""
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
reg = LinearRegression()
reg.fit(X_train, y_train)
preds = reg.predict(X_test)
print(preds)
print("\n" + "=" * 50 + "\n")


"""
Exercise 3: Evaluate Regression
"""
rmse = mean_squared_error(y_test, preds, squared=False)
print(rmse)
print("\n" + "=" * 50 + "\n")


"""
Exercise 4: Classification Dataset
"""
df_churn = pd.read_csv("data/churn.csv")
Xc = df_churn[["tenure_months", "monthly_fee", "support_calls"]]
yc = df_churn["churn"]
print(df_churn.head())
print("\n" + "=" * 50 + "\n")


"""
Exercise 5: Train Classifier
"""
Xc_train, Xc_test, yc_train, yc_test = train_test_split(
    Xc, yc, test_size=0.2, random_state=42
)
clf = LogisticRegression(max_iter=1000)
clf.fit(Xc_train, yc_train)
cpreds = clf.predict(Xc_test)
print(cpreds)
print("\n" + "=" * 50 + "\n")


"""
Exercise 6: Evaluate Classifier
"""
acc = accuracy_score(yc_test, cpreds)
print(acc)
print(classification_report(yc_test, cpreds))
print("\n" + "=" * 50 + "\n")


"""
BONUS: Feature Importance
"""
coef = reg.coef_
features = ["rooms", "area_sqft", "age_years"]

for name, value in zip(features, coef):
    print(name, value)
