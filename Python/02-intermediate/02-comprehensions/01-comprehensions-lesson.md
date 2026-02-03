# Session 2: Advanced Comprehensions

## 🎯 Learning Objectives
- Master list, dict, set comprehensions
- Use nested comprehensions effectively
- Understand generator expressions
- Know when to use comprehensions vs loops

---

## 1. List Comprehension Review

### Basic Syntax
```python
# [expression for item in iterable if condition]

# Simple transformation
squares = [x**2 for x in range(10)]

# With filtering
evens = [x for x in range(20) if x % 2 == 0]

# Transform + filter
even_squares = [x**2 for x in range(20) if x % 2 == 0]
```

### With If-Else (Ternary)
```python
# [true_expr if condition else false_expr for item in iterable]

labels = ["even" if x % 2 == 0 else "odd" for x in range(5)]
# ["even", "odd", "even", "odd", "even"]

# Transform based on condition
processed = [x.upper() if x.startswith("a") else x for x in words]
```

### Multiple Conditions
```python
# Multiple if conditions (AND logic)
result = [x for x in range(100) if x % 2 == 0 if x % 5 == 0]
# Same as: [x for x in range(100) if x % 2 == 0 and x % 5 == 0]

# For OR logic, use or in condition
result = [x for x in range(100) if x % 2 == 0 or x % 5 == 0]
```

---

## 2. Nested Comprehensions

### Flatten 2D to 1D
```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Read as: for each row in matrix, for each num in row
flat = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Equivalent loop:
flat = []
for row in matrix:
    for num in row:
        flat.append(num)
```

### Create 2D Lists
```python
# Multiplication table
table = [[i * j for j in range(1, 6)] for i in range(1, 6)]
# [[1,2,3,4,5], [2,4,6,8,10], [3,6,9,12,15], [4,8,12,16,20], [5,10,15,20,25]]

# Initialize grid with zeros
grid = [[0 for _ in range(cols)] for _ in range(rows)]

# ⚠️ WRONG WAY - all rows share same list!
grid = [[0] * cols] * rows  # Don't do this!
```

### Nested with Conditions
```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Flatten only even numbers
evens = [num for row in matrix for num in row if num % 2 == 0]
# [2, 4, 6, 8]

# Flatten only from rows with sum > 10
result = [num for row in matrix if sum(row) > 10 for num in row]
# [4, 5, 6, 7, 8, 9]
```

### Triple Nesting (Use Sparingly!)
```python
# 3D to 1D
cube = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
flat = [num for matrix in cube for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6, 7, 8]
```

---

## 3. Dictionary Comprehension

### Basic Syntax
```python
# {key_expr: value_expr for item in iterable if condition}

# Number to square
squares = {x: x**2 for x in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# From two lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
# {"a": 1, "b": 2, "c": 3}
```

### Transform Existing Dict
```python
prices = {"apple": 1.0, "banana": 0.5, "orange": 0.75}

# Apply discount
discounted = {k: v * 0.9 for k, v in prices.items()}

# Filter by value
expensive = {k: v for k, v in prices.items() if v > 0.6}

# Transform keys
upper_keys = {k.upper(): v for k, v in prices.items()}
```

### Swap Keys and Values
```python
original = {"a": 1, "b": 2, "c": 3}
swapped = {v: k for k, v in original.items()}
# {1: "a", 2: "b", 3: "c"}
```

### Group by Property
```python
users = [
    {"name": "Alice", "dept": "Engineering"},
    {"name": "Bob", "dept": "Sales"},
    {"name": "Charlie", "dept": "Engineering"},
]

# Group names by department
by_dept = {}
for u in users:
    by_dept.setdefault(u["dept"], []).append(u["name"])

# Or with defaultdict
from collections import defaultdict
by_dept = defaultdict(list)
for u in users:
    by_dept[u["dept"]].append(u["name"])
```

---

## 4. Set Comprehension

### Basic Syntax
```python
# {expression for item in iterable if condition}

# Unique squares
squares = {x**2 for x in range(-5, 6)}
# {0, 1, 4, 9, 16, 25}

# Unique first letters
words = ["apple", "apricot", "banana", "blueberry"]
first_letters = {w[0] for w in words}
# {"a", "b"}
```

### Deduplicate with Transformation
```python
names = ["Alice", "ALICE", "alice", "Bob", "BOB"]
unique_names = {name.lower() for name in names}
# {"alice", "bob"}
```

---

## 5. Generator Expressions

### Memory-Efficient Alternative
```python
# List comprehension - creates list in memory
squares_list = [x**2 for x in range(1000000)]  # Uses lots of memory!

# Generator expression - computes on demand
squares_gen = (x**2 for x in range(1000000))  # Almost no memory!

# Use () instead of []
```

### When to Use Generators
```python
# When you only need to iterate once
total = sum(x**2 for x in range(1000000))  # No intermediate list!

# When checking conditions
has_large = any(x > 1000 for x in numbers)  # Stops early!
all_positive = all(x > 0 for x in numbers)

# When passing to functions that iterate
",".join(str(x) for x in numbers)
max(user["age"] for user in users)
```

### Generator vs List Comparison
```python
# List - immediate evaluation, stores all values
[x**2 for x in range(10)]  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator - lazy evaluation, yields one at a time
(x**2 for x in range(10))  # <generator object>

# Generators are:
# ✅ Memory efficient
# ✅ Can represent infinite sequences
# ✅ Good for large datasets
# ❌ Can only iterate once
# ❌ Can't index or slice
```

---

## 6. Complex Real-World Examples

### Data Transformation Pipeline
```python
users = [
    {"name": "Alice", "age": 25, "active": True, "score": 85},
    {"name": "Bob", "age": 17, "active": True, "score": 92},
    {"name": "Charlie", "age": 30, "active": False, "score": 78},
    {"name": "Diana", "age": 22, "active": True, "score": 95},
]

# Get names of active adults with high scores
top_performers = [
    u["name"] 
    for u in users 
    if u["active"] and u["age"] >= 18 and u["score"] >= 80
]
# ["Alice", "Diana"]
```

### Matrix Operations
```python
matrix_a = [[1, 2], [3, 4]]
matrix_b = [[5, 6], [7, 8]]

# Transpose
transposed = [[row[i] for row in matrix_a] for i in range(len(matrix_a[0]))]

# Element-wise addition
summed = [[a + b for a, b in zip(row_a, row_b)] 
          for row_a, row_b in zip(matrix_a, matrix_b)]
```

### Parse and Transform Data
```python
raw_data = "1,2,3;4,5,6;7,8,9"

# Parse to 2D list of ints
matrix = [[int(x) for x in row.split(",")] for row in raw_data.split(";")]
# [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

### Word Frequency Analysis
```python
text = "the quick brown fox jumps over the lazy dog"
words = text.lower().split()

# Word frequency dict
freq = {word: words.count(word) for word in set(words)}

# Words longer than 3 chars, sorted by frequency
common_long = sorted(
    [(w, c) for w, c in freq.items() if len(w) > 3],
    key=lambda x: -x[1]
)
```

---

## 7. When NOT to Use Comprehensions

### Too Complex - Use Regular Loop
```python
# ❌ Too hard to read
result = [
    transform(x) if complex_condition(x) else other_transform(x)
    for x in items
    if precondition(x) and another_check(x)
]

# ✅ Better as a loop
result = []
for x in items:
    if not precondition(x) or not another_check(x):
        continue
    if complex_condition(x):
        result.append(transform(x))
    else:
        result.append(other_transform(x))
```

### Side Effects - Use Regular Loop
```python
# ❌ Don't use comprehensions for side effects
[print(x) for x in items]  # Creates useless list of Nones

# ✅ Use regular loop
for x in items:
    print(x)
```

### Multiple Statements Needed
```python
# ❌ Can't do this in comprehension
results = []
for item in items:
    processed = preprocess(item)
    validated = validate(processed)
    results.append(format_output(validated))

# Comprehensions are single expressions only
```

---

## Summary

| Type | Syntax | Returns |
|------|--------|---------|
| List | `[expr for x in iter]` | `list` |
| Dict | `{k: v for x in iter}` | `dict` |
| Set | `{expr for x in iter}` | `set` |
| Generator | `(expr for x in iter)` | `generator` |

**Rules of Thumb:**
1. Keep comprehensions simple and readable
2. Use generators for large data / single iteration
3. Use regular loops for complex logic or side effects
4. Max 2 levels of nesting; beyond that, use loops
