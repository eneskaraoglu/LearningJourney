# Pandas Fundamentals - Exercise Solutions

import pandas as pd

"""
Exercise 1: Create a DataFrame
"""
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Cara", "Dan"],
    "age": [30, 25, 35, 28],
    "city": ["NY", "LA", "SF", "NY"]
})
print(df)
print("\n" + "=" * 50 + "\n")


"""
Exercise 2: Load From CSV
"""
df_people = pd.read_csv("data/people.csv")
print(df_people)
print("\n" + "=" * 50 + "\n")


"""
Exercise 3: Inspect the Data
"""
print(df_people.head(2))
print(df_people.shape)
print(df_people.columns)
print(df_people.dtypes)
print("\n" + "=" * 50 + "\n")


"""
Exercise 4: Select and Filter
"""
print(df_people["name"])
print(df_people[df_people["age"] >= 30])
print(df_people[df_people["city"] == "NY"])
print("\n" + "=" * 50 + "\n")


"""
Exercise 5: Add a Column
"""
df_people["age_plus_1"] = df_people["age"] + 1
df_people["is_senior"] = df_people["age"] >= 30
print(df_people)
print("\n" + "=" * 50 + "\n")


"""
Exercise 6: Missing Values
"""
df_missing = pd.DataFrame({
    "name": ["Alice", "Bob", "Cara"],
    "age": [30, None, 35],
    "city": ["NY", "LA", "SF"]
})

print(df_missing.isna().sum())
df_missing["age"] = df_missing["age"].fillna(df_missing["age"].mean())
print(df_missing)
print("\n" + "=" * 50 + "\n")


"""
Exercise 7: Group and Aggregate
"""
grouped = df_people.groupby("city").agg({
    "age": "mean",
    "name": "count"
})
print(grouped)
print("\n" + "=" * 50 + "\n")


"""
BONUS 1: Merge Two DataFrames
"""
users = pd.DataFrame({"id": [1, 2, 3], "name": ["A", "B", "C"]})
scores = pd.DataFrame({"id": [1, 2, 3], "score": [90, 95, 88]})

merged = pd.merge(users, scores, on="id")
print(merged)

print("\n" + "=" * 50 + "\n")


"""
BONUS 2: CSV Analysis
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
