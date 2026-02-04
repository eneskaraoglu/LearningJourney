# Machine Learning Foundations - Practice Exercises

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

"""
Exercise 1: Load Data
---------------------
Load the CSV file:
data/iris_small.csv
Store it in a DataFrame named df.
"""

df = pd.read_csv("data/iris_small.csv")
print(df.head())


"""
Exercise 2: Features and Labels
-------------------------------
From df, create:
X = features (sepal_length, sepal_width, petal_length, petal_width)
y = target (species)
"""

X = df[["sepal_length", "sepal_width", "petal_length", "petal_width"]]
y = df["species"]
print(X.head())
print(y.head())


"""
Exercise 3: Train/Test Split
----------------------------
Split X and y into train/test sets with:
test_size=0.2 and random_state=42
"""

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(X_train.shape, X_test.shape)


"""
Exercise 4: Train a Classifier
------------------------------
Train a LogisticRegression model.
Then predict on the test set.
"""

clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)
preds = clf.predict(X_test)
print(preds)


"""
Exercise 5: Evaluate
--------------------
Compute accuracy for your classifier.
"""

acc = accuracy_score(y_test, preds)
print(acc)


"""
BONUS: Pipeline
---------------
Build a pipeline with StandardScaler and LogisticRegression.
Train and evaluate it with accuracy.
"""

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression(max_iter=1000))
])
pipe.fit(X_train, y_train)
pipe_preds = pipe.predict(X_test)
pipe_acc = accuracy_score(y_test, pipe_preds)
print(pipe_acc)
