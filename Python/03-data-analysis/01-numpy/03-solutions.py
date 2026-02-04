# NumPy Essentials - Exercise Solutions

import numpy as np

"""
Exercise 1: Array Creation
"""
a1 = np.array([1, 2, 3, 4, 5])
a2 = np.zeros((2, 3))
a3 = np.full((3, 3), 7)
a4 = np.arange(0, 11, 2)

print(a1)
print(a2)
print(a3)
print(a4)
print("\n" + "=" * 50 + "\n")


"""
Exercise 2: Array Basics
"""
a = np.array([[10, 20, 30], [40, 50, 60]])
print(a.shape)
print(a.ndim)
print(a.size)
print(a.dtype)
print("\n" + "=" * 50 + "\n")


"""
Exercise 3: Indexing and Slicing
"""
b = np.array([[10, 20, 30], [40, 50, 60]])
print(b[1, 1])    # 50
print(b[0, :])    # first row
print(b[:, 1])    # second column
print(b[:, 1:3])  # columns 1 and 2
print("\n" + "=" * 50 + "\n")


"""
Exercise 4: Boolean Masking
"""
x = np.array([1, 2, 3, 4, 5, 6])
print(x[x > 3])
print(x[x % 2 == 0])
print("\n" + "=" * 50 + "\n")


"""
Exercise 5: Vectorized Operations
"""
x = np.array([1, 2, 3])
y = np.array([10, 20, 30])

print(x + y)
print(x * y)
print(x ** 2)
print("\n" + "=" * 50 + "\n")


"""
Exercise 6: Aggregations
"""
c = np.array([[1, 2, 3], [4, 5, 6]])
print(c.sum())
print(c.sum(axis=0))  # column sums
print(c.sum(axis=1))  # row sums
print("\n" + "=" * 50 + "\n")


"""
BONUS: Reshape Challenge
"""
r = np.arange(12).reshape(3, 4)
flat = r.flatten()
print(r)
print(flat)
