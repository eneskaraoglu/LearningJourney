# Supervised Learning - Practice Exercises

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_squared_error, accuracy_score, classification_report

"""
Exercise 1: Regression Dataset
------------------------------
Load data/housing.csv into df_house.
Create X (rooms, area_sqft, age_years) and y (price_k).
"""

df_house = pd.read_csv("data/housing.csv")
X = df_house[["rooms", "area_sqft", "age_years"]]
y = df_house["price_k"]
print(df_house.head())


"""
Exercise 2: Train Regression Model
----------------------------------
Split data with test_size=0.2, random_state=42.
Train a LinearRegression model and predict on X_test.
"""

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
reg = LinearRegression()
reg.fit(X_train, y_train)
preds = reg.predict(X_test)
print(preds)


"""
Exercise 3: Evaluate Regression
-------------------------------
Compute RMSE for the regression model.
"""

rmse = mean_squared_error(y_test, preds, squared=False)
print(rmse)


"""
Exercise 4: Classification Dataset
----------------------------------
Load data/churn.csv into df_churn.
Create X (tenure_months, monthly_fee, support_calls) and y (churn).
"""

df_churn = pd.read_csv("data/churn.csv")
Xc = df_churn[["tenure_months", "monthly_fee", "support_calls"]]
yc = df_churn["churn"]
print(df_churn.head())


"""
Exercise 5: Train Classifier
----------------------------
Split data and train a LogisticRegression model.
Predict on X_test.
"""

Xc_train, Xc_test, yc_train, yc_test = train_test_split(
    Xc, yc, test_size=0.2, random_state=42
)
clf = LogisticRegression(max_iter=1000)
clf.fit(Xc_train, yc_train)
cpreds = clf.predict(Xc_test)
print(cpreds)


"""
Exercise 6: Evaluate Classifier
-------------------------------
Compute accuracy and print a classification report.
"""

acc = accuracy_score(yc_test, cpreds)
print(acc)
print(classification_report(yc_test, cpreds))


"""
BONUS: Feature Importance
-------------------------
Print regression coefficients with their feature names.
"""

coef = reg.coef_
features = ["rooms", "area_sqft", "age_years"]

for name, value in zip(features, coef):
    print(name, value)
