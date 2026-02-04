# Data Visualization - Exercise Solutions

import matplotlib.pyplot as plt
import pandas as pd

"""
Exercise 1: Basic Line Plot
"""
x = [1, 2, 3, 4, 5]
y = [2, 4, 1, 3, 5]

plt.plot(x, y)
plt.title("Simple Line Plot")
plt.xlabel("x")
plt.ylabel("y")
plt.show()

print("\n" + "=" * 50 + "\n")


"""
Exercise 2: Scatter Plot
"""
x2 = [10, 20, 30, 40, 50]
y2 = [5, 15, 10, 25, 20]

plt.scatter(x2, y2, color="red", marker="o")
plt.title("Scatter Plot")
plt.xlabel("x")
plt.ylabel("y")
plt.show()

print("\n" + "=" * 50 + "\n")


"""
Exercise 3: Bar Chart
"""
labels = ["A", "B", "C"]
values = [10, 15, 7]

plt.bar(labels, values)
plt.title("Bar Chart")
plt.show()

print("\n" + "=" * 50 + "\n")


"""
Exercise 4: Histogram
"""
data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
plt.hist(data, bins=4)
plt.title("Histogram")
plt.show()

print("\n" + "=" * 50 + "\n")


"""
Exercise 5: Subplots
"""
fig, axes = plt.subplots(1, 2, figsize=(8, 3))

axes[0].plot(x, y)
axes[0].set_title("Line")

axes[1].bar(labels, values)
axes[1].set_title("Bar")

plt.tight_layout()
plt.show()

print("\n" + "=" * 50 + "\n")


"""
Exercise 6: Pandas Plot
"""
df = pd.DataFrame({
    "day": ["Mon", "Tue", "Wed"],
    "sales": [100, 140, 120]
})

df.plot(x="day", y="sales", kind="line", marker="o", title="Sales by Day")
plt.show()

print("\n" + "=" * 50 + "\n")


"""
Exercise 7: Plot From CSV
"""
line_df = pd.read_csv("data/line_data.csv")

plt.plot(line_df["month"], line_df["sales"], marker="o", label="Sales")
plt.plot(line_df["month"], line_df["expenses"], marker="o", label="Expenses")
plt.title("Sales vs Expenses")
plt.xlabel("Month")
plt.ylabel("Amount")
plt.legend()
plt.show()

print("\n" + "=" * 50 + "\n")


"""
Exercise 8: Scatter From CSV
"""
scatter_df = pd.read_csv("data/scatter_data.csv")

for group, chunk in scatter_df.groupby("group"):
    plt.scatter(chunk["x"], chunk["y"], label=group)

plt.title("Scatter by Group")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.show()

print("\n" + "=" * 50 + "\n")


"""
BONUS: Save Figure
"""
plt.plot(x, y)
plt.title("Saved Plot")
plt.savefig("chart.png", dpi=150, bbox_inches="tight")
