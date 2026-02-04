# Session 3: Data Visualization

## Learning Objectives
By the end of this session, you will:
1. Build basic plots with Matplotlib
2. Customize titles, labels, legends, and styles
3. Use common chart types for analysis
4. Create multi-plot layouts
5. Save figures for reports

---

## 1. Matplotlib Basics

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 1, 3, 5]

plt.plot(x, y)
plt.title("Simple Line Plot")
plt.xlabel("x")
plt.ylabel("y")
plt.show()
```

---

## 2. Common Plot Types

### Line and Scatter

```python
plt.plot(x, y, marker="o")
plt.scatter(x, y, color="red")
```

### Bar Charts

```python
labels = ["A", "B", "C"]
values = [10, 15, 7]
plt.bar(labels, values)
```

### Histograms

```python
data = [1, 2, 2, 3, 3, 3, 4]
plt.hist(data, bins=4)
```

---

## 3. Customization

```python
plt.plot(x, y, color="green", linestyle="--", linewidth=2, label="series")
plt.title("Styled Plot")
plt.xlabel("X Axis")
plt.ylabel("Y Axis")
plt.legend()
plt.grid(True)
```

---

## 4. Subplots

```python
fig, axes = plt.subplots(1, 2, figsize=(8, 3))

axes[0].plot(x, y)
axes[0].set_title("Line")

axes[1].bar(labels, values)
axes[1].set_title("Bar")

plt.tight_layout()
```

---

## 5. Using Pandas with Matplotlib

```python
import pandas as pd

df = pd.DataFrame({
    "day": ["Mon", "Tue", "Wed"],
    "sales": [100, 140, 120]
})

df.plot(x="day", y="sales", kind="line", marker="o")
plt.show()
```

---

## 6. Seaborn Quick Look

```python
import seaborn as sns

tips = sns.load_dataset("tips")
sns.scatterplot(data=tips, x="total_bill", y="tip", hue="sex")
```

---

## 7. Saving Figures

```python
plt.savefig("chart.png", dpi=150, bbox_inches="tight")
```

---

## Summary
1. Matplotlib is the foundation for Python visualization
2. Choose chart types based on the question
3. Customize labels and legends for clarity
4. Subplots help compare multiple views
5. Save figures for reports and notebooks
