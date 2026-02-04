# Unsupervised Learning - Exercise Solutions

import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

"""
Exercise 1: Load Data
"""
df_points = pd.read_csv("data/points.csv")
X = df_points[["x", "y"]]
print(df_points.head())
print("\n" + "=" * 50 + "\n")


"""
Exercise 2: KMeans Clustering
"""
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)
print(labels[:10])
print("\n" + "=" * 50 + "\n")


"""
Exercise 3: Evaluate Clusters
"""
inertia = kmeans.inertia_
score = silhouette_score(X, labels)
print(inertia)
print(score)
print("\n" + "=" * 50 + "\n")


"""
Exercise 4: PCA
"""
pca = PCA(n_components=2)
X_2d = pca.fit_transform(X)
print(X_2d[:5])
print("\n" + "=" * 50 + "\n")


"""
Exercise 5: Visualize
"""
plt.scatter(X["x"], X["y"], c=labels)
plt.title("KMeans Clusters")
plt.xlabel("x")
plt.ylabel("y")
plt.show()

print("\n" + "=" * 50 + "\n")


"""
BONUS: Try Different K
"""
for k in range(2, 6):
    km = KMeans(n_clusters=k, random_state=42)
    km.fit(X)
    print(k, km.inertia_)
