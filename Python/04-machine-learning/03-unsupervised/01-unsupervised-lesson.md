# Session 3: Unsupervised Learning

## Learning Objectives
By the end of this session, you will:
1. Understand clustering and dimensionality reduction
2. Use KMeans for clustering
3. Evaluate clusters with inertia and silhouette score
4. Apply PCA for dimensionality reduction
5. Visualize clusters in 2D

---

## 1. Unsupervised Overview

Unsupervised learning finds structure in unlabeled data.
Common tasks:
- Clustering
- Dimensionality reduction

### Setup

```bash
pip install pandas scikit-learn matplotlib
```

### Dataset

This module uses `data/points.csv` for clustering exercises.

---

## 2. KMeans Clustering

```python
import pandas as pd
from sklearn.cluster import KMeans

df = pd.read_csv("data/points.csv")
X = df[["x", "y"]]

kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)
```

---

## 3. Evaluating Clusters

```python
from sklearn.metrics import silhouette_score

inertia = kmeans.inertia_
score = silhouette_score(X, labels)
```

---

## 4. PCA Basics

```python
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_2d = pca.fit_transform(X)
```

---

## 5. Visualizing Clusters

```python
import matplotlib.pyplot as plt

plt.scatter(X["x"], X["y"], c=labels)
plt.title("KMeans Clusters")
plt.show()
```

---

## Summary
1. Unsupervised learning finds structure without labels
2. KMeans is a common clustering algorithm
3. PCA reduces dimensions for visualization
