# Unsupervised Learning - Practice Exercises

import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

"""
Exercise 1: Load Data
---------------------
Load data/points.csv into df_points.
Create X with columns x and y.
"""

df_points = pd.read_csv("data/points.csv")
X = df_points[["x", "y"]]
print(df_points.head())


"""
Exercise 2: KMeans Clustering
-----------------------------
Run KMeans with n_clusters=3 and random_state=42.
Store labels.
"""

kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)
print(labels[:10])


"""
Exercise 3: Evaluate Clusters
-----------------------------
Compute inertia and silhouette score.
"""

inertia = kmeans.inertia_
score = silhouette_score(X, labels)
print(inertia)
print(score)


"""
Exercise 4: PCA
---------------
Use PCA to reduce X to 2 components.
"""

pca = PCA(n_components=2)
X_2d = pca.fit_transform(X)
print(X_2d[:5])


"""
Exercise 5: Visualize
---------------------
Create a scatter plot of the points colored by cluster labels.
"""

plt.scatter(X["x"], X["y"], c=labels)
plt.title("KMeans Clusters")
plt.xlabel("x")
plt.ylabel("y")
plt.show()


"""
BONUS: Try Different K
----------------------
Compute inertia for k=2..5 and print the results.
"""

for k in range(2, 6):
    km = KMeans(n_clusters=k, random_state=42)
    km.fit(X)
    print(k, km.inertia_)
