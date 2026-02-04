# Pandas Fundamentals - Practice Exercises

import pandas as pd

"""
Exercise 1: Create a DataFrame
------------------------------
Create a DataFrame with columns:
name, age, city
Use at least 4 rows of data.
"""

df = pd.DataFrame({
    "name": ["Alice", "Bob", "Cara", "Dan"],
    "age": [30, 25, 35, 28],
    "city": ["NY", "LA", "SF", "NY"]
})
print(df)


"""
Exercise 2: Load From CSV
-------------------------
Load the dataset from:
data/people.csv
Store it in a DataFrame named df_people.
"""

df_people = pd.read_csv("data/people.csv")
print(df_people)


"""
Exercise 3: Inspect the Data
----------------------------
Using df_people:
1) Print the first 2 rows
2) Print the shape
3) Print the column names
4) Print the data types
"""

print(df_people.head(2))
print(df_people.shape)
print(df_people.columns)
print(df_people.dtypes)


"""
Exercise 4: Select and Filter
-----------------------------
Using df_people:
1) Select the "name" column
2) Select rows where age >= 30
3) Select rows where city is "NY"
"""

print(df_people["name"])
print(df_people[df_people["age"] >= 30])
print(df_people[df_people["city"] == "NY"])


"""
Exercise 5: Add a Column
------------------------
Add a column "age_plus_1" that adds 1 to age.
Then add "is_senior" where age >= 30.
"""

df_people["age_plus_1"] = df_people["age"] + 1
df_people["is_senior"] = df_people["age"] >= 30
print(df_people)


"""
Exercise 6: Missing Values
--------------------------
Create a new DataFrame with a missing value in "age".
1) Show how many missing values are in each column
2) Fill missing ages with the mean age
"""

df_missing = pd.DataFrame({
    "name": ["Alice", "Bob", "Cara"],
    "age": [30, None, 35],
    "city": ["NY", "LA", "SF"]
})

print(df_missing.isna().sum())
df_missing["age"] = df_missing["age"].fillna(df_missing["age"].mean())
print(df_missing)


"""
Exercise 7: Group and Aggregate
-------------------------------
Group by "city" and compute:
1) Mean age
2) Count of people
"""

grouped = df_people.groupby("city").agg({
    "age": "mean",
    "name": "count"
})
print(grouped)


"""
BONUS 1: Merge Two DataFrames
---------------------------
Create two DataFrames:
1) users: id, name
2) scores: id, score
Merge them on id.
"""

users = pd.DataFrame({"id": [1, 2, 3], "name": ["A", "B", "C"]})
scores = pd.DataFrame({"id": [1, 2, 3], "score": [90, 95, 88]})

merged = pd.merge(users, scores, on="id")
print(merged)


"""
BONUS 2: CSV Analysis
---------------------
Load data/sales.csv and compute:
1) Total revenue
2) Revenue by region
3) Top 2 products by total units
"""

sales = pd.read_csv("data/sales.csv")

total_revenue = sales["revenue"].sum()
revenue_by_region = sales.groupby("region")["revenue"].sum()
top_products = (
    sales.groupby("product")["units"]
    .sum()
    .sort_values(ascending=False)
    .head(2)
)

print(total_revenue)
print(revenue_by_region)
print(top_products)
