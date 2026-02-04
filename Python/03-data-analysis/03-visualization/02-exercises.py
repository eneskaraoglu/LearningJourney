# Data Visualization - Practice Exercises

import matplotlib.pyplot as plt
import pandas as pd

"""
Exercise 1: Basic Line Plot
---------------------------
Plot x = [1, 2, 3, 4, 5] and y = [2, 4, 1, 3, 5]
Add a title and axis labels.
"""

x = [1, 2, 3, 4, 5]
y = [2, 4, 1, 3, 5]

plt.plot(x, y)
plt.title("Simple Line Plot")
plt.xlabel("x")
plt.ylabel("y")
plt.show()


"""
Exercise 2: Scatter Plot
------------------------
Create a scatter plot for:
x = [10, 20, 30, 40, 50]
y = [5, 15, 10, 25, 20]
Use a red color and circle markers.
"""

x2 = [10, 20, 30, 40, 50]
y2 = [5, 15, 10, 25, 20]

plt.scatter(x2, y2, color="red", marker="o")
plt.title("Scatter Plot")
plt.xlabel("x")
plt.ylabel("y")
plt.show()


"""
Exercise 3: Bar Chart
---------------------
Plot a bar chart with labels ["A", "B", "C"] and values [10, 15, 7].
Add a title.
"""

labels = ["A", "B", "C"]
values = [10, 15, 7]

plt.bar(labels, values)
plt.title("Bar Chart")
plt.show()


"""
Exercise 4: Histogram
---------------------
Plot a histogram for the data:
[1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
Use 4 bins.
"""

data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
plt.hist(data, bins=4)
plt.title("Histogram")
plt.show()


"""
Exercise 5: Subplots
--------------------
Create a 1x2 subplot layout:
1) Left: line plot from Exercise 1
2) Right: bar chart from Exercise 3
"""

fig, axes = plt.subplots(1, 2, figsize=(8, 3))

axes[0].plot(x, y)
axes[0].set_title("Line")

axes[1].bar(labels, values)
axes[1].set_title("Bar")

plt.tight_layout()
plt.show()


"""
Exercise 6: Pandas Plot
-----------------------
Create a DataFrame with columns:
day = ["Mon", "Tue", "Wed"]
sales = [100, 140, 120]
Plot sales by day using pandas.
"""

df = pd.DataFrame({
    "day": ["Mon", "Tue", "Wed"],
    "sales": [100, 140, 120]
})

df.plot(x="day", y="sales", kind="line", marker="o", title="Sales by Day")
plt.show()


"""
Exercise 7: Plot From CSV
-------------------------
Load data/line_data.csv and plot:
1) A line chart of sales by month
2) A second line for expenses on the same chart
Add a title and legend.
"""

line_df = pd.read_csv("data/line_data.csv")

plt.plot(line_df["month"], line_df["sales"], marker="o", label="Sales")
plt.plot(line_df["month"], line_df["expenses"], marker="o", label="Expenses")
plt.title("Sales vs Expenses")
plt.xlabel("Month")
plt.ylabel("Amount")
plt.legend()
plt.show()


"""
Exercise 8: Scatter From CSV
----------------------------
Load data/scatter_data.csv and create a scatter plot
of x vs y. Color points by group (A, B, C).
"""

scatter_df = pd.read_csv("data/scatter_data.csv")

for group, chunk in scatter_df.groupby("group"):
    plt.scatter(chunk["x"], chunk["y"], label=group)

plt.title("Scatter by Group")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.show()


"""
BONUS: Save Figure
------------------
Save any plot to "chart.png" with dpi=150 and tight layout.
"""

plt.plot(x, y)
plt.title("Saved Plot")
plt.savefig("chart.png", dpi=150, bbox_inches="tight")
