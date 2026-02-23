# 01 Visualization Lesson

## Module Info
- Level: Beginner to Intermediate
- Duration: 6-8 hours
- Prerequisites: Python, NumPy, pandas basics

## Learning Outcomes
- Build clear analytical plots with Matplotlib and Seaborn.
- Select plot types based on business questions.
- Detect outliers, skew, and category imbalance visually.
- Produce reusable plotting utilities for ML EDA workflows.

## Deep Dive

### 1. Plot intent before plot code
Every chart should answer one question: distribution, comparison, relationship, or trend. Unclear intent causes noisy visuals and wrong model decisions.

### 2. Matplotlib control surface
Matplotlib is low-level and ideal when you need exact control over axes, annotations, and multi-plot layout. Use it for production reports where consistency matters.

### 3. Seaborn statistical defaults
Seaborn gives sane defaults and high-level statistical plots. It reduces boilerplate for histograms, box plots, pair plots, and correlation heatmaps.

### 4. Data quality through charts
- Histograms reveal impossible values.
- Box plots reveal outliers and long tails.
- Count plots reveal class imbalance.
- Scatter plots reveal non-linear relationships.

### 5. Reusable EDA plotting patterns
Wrap common plotting logic into functions (`plot_distribution`, `plot_target_balance`) so EDA stays consistent across datasets.

## Worked Example
```python
import matplotlib.pyplot as plt
import seaborn as sns


def plot_spend_distribution(df):
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    sns.histplot(df["monthly_spend"], bins=20, kde=True, ax=axes[0])
    axes[0].set_title("Monthly Spend Distribution")

    sns.boxplot(x=df["monthly_spend"], ax=axes[1])
    axes[1].set_title("Outlier Check")

    plt.tight_layout()
    plt.show()
```

## Common Pitfalls
- Using default axis ranges that hide anomalies.
- Comparing categories with very different sample sizes without normalization.
- Overusing pair plots on wide dataframes (slow and unreadable).
- Ignoring figure size and label overlap.

## Debugging Checklist
- Confirm numeric columns are numeric before plotting.
- Check null counts before charting.
- Verify sample size per category.
- Validate axis scales (linear vs log).
- Recheck labels and units in titles.

## Step-by-Step Practice Plan
1. Load a CSV and run `describe()`.
2. Plot histogram + box plot for each key numeric feature.
3. Plot target/class balance with count plot.
4. Plot correlation heatmap for numeric columns.
5. Save final EDA dashboard image.

## Mini Project Task
Create an `eda_dashboard.py` script that builds a 2x2 dashboard:
- distribution plot,
- outlier plot,
- category balance,
- feature correlation.
Also save a text summary of the top 5 anomalies.

## Interview Q&A
1. When do you prefer Matplotlib over Seaborn?
2. How can visuals detect data leakage hints?
3. Why is class imbalance visible but still easy to ignore?
4. What chart choices are risky for skewed data?

## Exit Criteria
- You can create readable multi-plot EDA visuals.
- You can explain chart-driven preprocessing decisions.
- You can generate a repeatable visualization script for new datasets.
