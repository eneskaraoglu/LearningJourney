# Session 1: NumPy Essentials

## Learning Objectives
By the end of this session, you will:
1. Understand NumPy arrays and how they differ from Python lists
2. Create arrays with common constructors
3. Use indexing, slicing, and boolean masks
4. Apply vectorized operations and broadcasting
5. Perform aggregations and basic linear algebra

---

## 1. Why NumPy?

Python lists are flexible but slow for numeric work. NumPy gives you:
- Fixed-type, contiguous arrays
- Fast vectorized operations
- Broadcasting for shape-aware math
- Efficient tools for data analysis and ML

---

## 2. Creating Arrays

```python
import numpy as np

# From lists
a = np.array([1, 2, 3])
b = np.array([[1, 2], [3, 4]])

# Common constructors
zeros = np.zeros((2, 3))
ones = np.ones((3, 2))
full = np.full((2, 2), 7)

# Ranges
r1 = np.arange(0, 10, 2)   # [0, 2, 4, 6, 8]
r2 = np.linspace(0, 1, 5)  # [0.0, 0.25, 0.5, 0.75, 1.0]
```

---

## 3. Array Basics

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

a.shape      # (2, 3)
a.ndim       # 2
a.size       # 6
a.dtype      # dtype('int64') or similar
```

### Changing Types

```python
f = a.astype(float)
```

---

## 4. Indexing and Slicing

```python
a = np.array([[10, 20, 30], [40, 50, 60]])

a[0, 0]      # 10
a[1, 2]      # 60

# Row and column slices
a[0, :]      # [10, 20, 30]
a[:, 1]      # [20, 50]

# Sub-matrix
a[:, 1:3]    # columns 1 and 2
```

### Boolean Masking

```python
x = np.array([1, 2, 3, 4, 5, 6])
mask = x % 2 == 0
x[mask]      # [2, 4, 6]

# Directly
x[x > 3]     # [4, 5, 6]
```

---

## 5. Vectorized Operations

```python
x = np.array([1, 2, 3])
y = np.array([10, 20, 30])

x + y        # [11, 22, 33]
x * y        # [10, 40, 90]
x ** 2       # [1, 4, 9]
```

### Broadcasting

```python
data = np.array([[1, 2, 3], [4, 5, 6]])
data + 10          # adds 10 to every element
data + np.array([1, 2, 3])  # adds per-column
```

---

## 6. Aggregations

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

a.sum()       # 21
a.mean()      # 3.5
a.min()       # 1
a.max()       # 6

# By axis
a.sum(axis=0)  # [5, 7, 9] column sums
a.sum(axis=1)  # [6, 15] row sums
```

---

## 7. Reshaping

```python
x = np.arange(12)
x.reshape(3, 4)  # 3 rows, 4 columns

# Flatten
x.ravel()        # view
x.flatten()      # copy
```

---

## 8. Random Numbers

```python
rng = np.random.default_rng(42)

rng.random((2, 2))        # uniform [0, 1)
rng.integers(0, 10, 5)    # 5 integers 0..9
rng.normal(0, 1, (3, 3))  # normal distribution
```

---

## 9. Linear Algebra Basics

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

a @ b           # matrix multiplication
np.dot(a, b)    # same for 2D

np.linalg.det(a)
np.linalg.inv(a)
np.linalg.eig(a)
```

---

## 10. Useful Tips

```python
# Sorting
x = np.array([3, 1, 2])
np.sort(x)      # [1, 2, 3]
x.argsort()     # indices that would sort

# Unique values
np.unique([1, 2, 2, 3])  # [1, 2, 3]
```

---

## Summary
1. NumPy arrays are fast and fixed-type
2. Use slicing and boolean masks for selection
3. Prefer vectorized math over Python loops
4. Broadcasting enables shape-aware operations
5. Aggregations and linear algebra are built in
