# Session 2: Pandas Fundamentals

## Learning Objectives
By the end of this session, you will:
1. Understand Series and DataFrame structures
2. Load, inspect, and summarize data
3. Select, filter, and transform columns and rows
4. Handle missing values
5. Use grouping, aggregation, and merging

---

## 1. Series and DataFrames

```python
import pandas as pd

# Series: 1D labeled array
s = pd.Series([10, 20, 30], index=["a", "b", "c"])

# DataFrame: 2D labeled table
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Cara"],
    "age": [30, 25, 35],
    "city": ["NY", "LA", "SF"]
})
```

---

## 2. Inspecting Data

```python
df.head()        # first 5 rows
df.tail(3)       # last 3 rows
df.shape         # (rows, cols)
df.columns       # column names
df.dtypes        # data types
df.info()        # concise summary
df.describe()    # stats for numeric cols
```

---

## 3. Selecting Data

```python
# Column selection
df["age"]
df[["name", "age"]]

# Row selection by index
df.loc[0]            # label-based
df.iloc[0]           # position-based

# Row + column selection
df.loc[0, "name"]
df.iloc[0, 1]
```

### Filtering Rows

```python
df[df["age"] > 30]
df[(df["age"] > 25) & (df["city"] == "SF")]
```

---

## 4. Creating and Modifying Columns

```python
df["age_plus_1"] = df["age"] + 1

df["is_senior"] = df["age"] >= 30

# Apply a function
df["name_len"] = df["name"].apply(len)
```

---

## 5. Missing Data

```python
df.isna().sum()           # count missing per column
df.dropna()               # drop rows with any missing values
df.fillna(0)              # fill missing with 0
df["age"].fillna(df["age"].mean())
```

---

## 6. Grouping and Aggregation

```python
df.groupby("city")["age"].mean()

# Multiple aggregations
df.groupby("city").agg({
    "age": ["mean", "min", "max"],
    "name": "count"
})
```

---

## 7. Sorting

```python
df.sort_values("age")
df.sort_values(["city", "age"], ascending=[True, False])
```

---

## 8. Combining DataFrames

```python
left = pd.DataFrame({"id": [1, 2], "name": ["A", "B"]})
right = pd.DataFrame({"id": [1, 2], "score": [90, 95]})

# Merge (SQL-style join)
pd.merge(left, right, on="id")

# Concatenate (stack)
pd.concat([left, left], axis=0)
```

---

## 9. Datetime Basics

```python
df = pd.DataFrame({"date": ["2025-01-01", "2025-01-02"]})
df["date"] = pd.to_datetime(df["date"])

df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day"] = df["date"].dt.day
```

---

## 10. Input and Output

```python
df.to_csv("data.csv", index=False)
df2 = pd.read_csv("data.csv")

df.to_excel("data.xlsx", index=False)
df3 = pd.read_excel("data.xlsx")
```

---

## Summary
1. Series and DataFrames are core Pandas structures
2. Use loc/iloc for clear indexing
3. Handle missing data explicitly
4. Groupby unlocks powerful aggregations
5. Merges and concat combine datasets
