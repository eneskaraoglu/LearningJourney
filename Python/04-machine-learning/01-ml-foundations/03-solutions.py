# Machine Learning Foundations - Exercise Solutions

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

"""
Exercise 1: Load Data
"""
df = pd.read_csv("data/iris_small.csv")
print(df.head())
print("\n" + "=" * 50 + "\n")


"""
Exercise 2: Features and Labels
"""
X = df[["sepal_length", "sepal_width", "petal_length", "petal_width"]]
y = df["species"]
print(X.head())
print(y.head())
print("\n" + "=" * 50 + "\n")


"""
Exercise 3: Train/Test Split
"""
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(X_train.shape, X_test.shape)
print("\n" + "=" * 50 + "\n")


"""
Exercise 4: Train a Classifier
"""
clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)
preds = clf.predict(X_test)
print(preds)
print("\n" + "=" * 50 + "\n")


"""
Exercise 5: Evaluate
"""
acc = accuracy_score(y_test, preds)
print(acc)
print("\n" + "=" * 50 + "\n")


"""
BONUS: Pipeline
"""
pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression(max_iter=1000))
])
pipe.fit(X_train, y_train)
pipe_preds = pipe.predict(X_test)
pipe_acc = accuracy_score(y_test, pipe_preds)
print(pipe_acc)
