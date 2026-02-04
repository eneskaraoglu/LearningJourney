# NumPy Essentials - Practice Exercises

"""
Exercise 1: Array Creation
--------------------------
Create the following arrays:
1) A 1D array [1, 2, 3, 4, 5]
2) A 2x3 array filled with zeros
3) A 3x3 array filled with 7
4) An array of even numbers from 0 to 10 (inclusive)
"""

a1 = np.array([1, 2, 3, 4, 5])
a2 = np.zeros((2, 3))
a3 = np.full((3, 3), 7)
a4 = np.arange(0, 11, 2)

print(a1)
print(a2)
print(a3)
print(a4)


"""
Exercise 2: Array Basics
------------------------
Given the array below, print its shape, number of dimensions,
total size, and dtype.
"""

import numpy as np

a = np.array([[10, 20, 30], [40, 50, 60]])

print(a.shape)
print(a.ndim)
print(a.size)
print(a.dtype)


"""
Exercise 3: Indexing and Slicing
--------------------------------
Using the array below, do the following:
1) Print the value 50
2) Print the first row
3) Print the second column
4) Print the sub-matrix with columns 1 and 2
"""

b = np.array([[10, 20, 30], [40, 50, 60]])

print(b[1, 1])
print(b[0, :])
print(b[:, 1])
print(b[:, 1:3])


"""
Exercise 4: Boolean Masking
---------------------------
From the array below, select only the values greater than 3.
Then select only the even values.
"""

x = np.array([1, 2, 3, 4, 5, 6])

print(x[x > 3])
print(x[x % 2 == 0])


"""
Exercise 5: Vectorized Operations
---------------------------------
Given arrays x and y, compute:
1) x + y
2) x * y
3) x squared
"""

x = np.array([1, 2, 3])
y = np.array([10, 20, 30])

print(x + y)
print(x * y)
print(x ** 2)


"""
Exercise 6: Aggregations
------------------------
Using the array below:
1) Compute the total sum
2) Compute the column sums
3) Compute the row sums
"""

c = np.array([[1, 2, 3], [4, 5, 6]])

print(c.sum())
print(c.sum(axis=0))
print(c.sum(axis=1))


"""
BONUS: Reshape Challenge
------------------------
Create an array from 0 to 11 and reshape it into a 3x4 matrix.
Then flatten it back to a 1D array.
"""

r = np.arange(12).reshape(3, 4)
flat = r.flatten()
print(r)
print(flat)
