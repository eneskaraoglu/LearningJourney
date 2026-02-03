# Session 6: Collections (Lists, Tuples, Dicts, Sets)

## 🎯 Learning Objectives
- Master Python's built-in collection types
- Understand when to use each collection
- Learn list comprehensions (Python superpower!)
- Work with dictionaries fluently (critical for ML/Data)

---

## 1. Lists (Like Java's ArrayList)

```python
# Creating
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]  # Can mix types!

# Indexing
numbers[0]     # 1 (first)
numbers[-1]    # 5 (last)
numbers[1:3]   # [2, 3] (slice)

# Common Operations
numbers.append(6)          # Add to end
numbers.insert(0, 0)       # Insert at index
numbers.extend([7, 8])     # Add multiple
numbers.remove(3)          # Remove by value
popped = numbers.pop()     # Remove & return last
numbers.sort()             # Sort in-place
numbers.reverse()          # Reverse in-place

# Search
3 in numbers               # True
numbers.index(3)           # Find index
numbers.count(3)           # Count occurrences
len(numbers)               # Length
```

### Java vs Python
| Java ArrayList | Python List |
|---------------|-------------|
| `.add(item)` | `.append(item)` |
| `.get(0)` | `[0]` |
| `.size()` | `len(list)` |
| `.contains(x)` | `x in list` |

---

## 2. List Comprehensions ⭐ (Python Superpower!)

```python
# Basic: [expression for item in iterable]
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With filter: [expression for item in iterable if condition]
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With if-else
labels = ["even" if x % 2 == 0 else "odd" for x in range(5)]
# ["even", "odd", "even", "odd", "even"]

# Nested - flatten 2D list
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6]

# Real-world examples
names = [user["name"] for user in users]
adults = [u for u in users if u["age"] >= 18]
clean = [s.strip().lower() for s in strings if s]
```

---

## 3. Tuples (Immutable Lists)

```python
# Creating
point = (3, 4)
single = (42,)    # Single element needs comma!
t = tuple([1, 2, 3])

# Unpacking
x, y = point      # x=3, y=4
first, *rest = (1, 2, 3, 4)  # first=1, rest=[2,3,4]

# Tuples are IMMUTABLE
point[0] = 10     # TypeError!

# Use tuples for:
# - Function return values
# - Dictionary keys
# - Data that shouldn't change
```

---

## 4. Dictionaries (Like Java's HashMap) - CRITICAL!

```python
# Creating
person = {"name": "Alice", "age": 30, "city": "NYC"}
empty = {}
from_pairs = dict([("a", 1), ("b", 2)])

# Access
person["name"]           # "Alice"
person.get("name")       # "Alice"
person.get("job", "N/A") # "N/A" (default if missing)
person["job"]            # KeyError!

# Modify
person["age"] = 31       # Update
person["job"] = "Engineer"  # Add new
del person["city"]       # Delete
person.pop("age")        # Remove & return

# Check existence
"name" in person         # True
"salary" in person       # False

# Iterate
for key in person:
    print(key)
    
for key, value in person.items():
    print(f"{key}: {value}")
    
for value in person.values():
    print(value)

# Useful methods
person.keys()            # All keys
person.values()          # All values
person.items()           # All (key, value) pairs
person.update({"a": 1})  # Merge another dict
```

### Dict Comprehension
```python
# {key: value for item in iterable}
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# From two lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
# {"a": 1, "b": 2, "c": 3}
```

---

## 5. Sets (Unique Elements)

```python
# Creating
s = {1, 2, 3, 3, 3}  # {1, 2, 3} - duplicates removed!
empty = set()         # NOT {} (that's empty dict)

# Operations
s.add(4)              # Add element
s.remove(2)           # Remove (error if missing)
s.discard(2)          # Remove (no error if missing)
s.pop()               # Remove & return arbitrary element

# Set operations
a = {1, 2, 3}
b = {2, 3, 4}
a | b    # Union: {1, 2, 3, 4}
a & b    # Intersection: {2, 3}
a - b    # Difference: {1}
a ^ b    # Symmetric diff: {1, 4}

# Check membership (FAST - O(1))
2 in a   # True

# Set comprehension
evens = {x for x in range(10) if x % 2 == 0}
```

---

## 6. When to Use What?

| Collection | Use When |
|------------|----------|
| **List** | Ordered, may have duplicates, need indexing |
| **Tuple** | Immutable list, dict keys, function returns |
| **Dict** | Key-value pairs, fast lookup by key |
| **Set** | Unique items, fast membership test, set math |

---

## 7. Common Patterns for Data/ML

```python
# Count frequency
from collections import Counter
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# Default values
from collections import defaultdict
d = defaultdict(list)
d["fruits"].append("apple")  # No KeyError!

# Group data
groups = defaultdict(list)
for item in data:
    groups[item["category"]].append(item)

# Ordered dict (Python 3.7+ dicts are ordered by default)
from collections import OrderedDict
```

---

## Summary

1. **Lists** `[]` - mutable, ordered, use most often
2. **Tuples** `()` - immutable, for fixed data
3. **Dicts** `{}` - key-value, use A LOT in data work
4. **Sets** `{x}` - unique items, fast membership
5. **Comprehensions** - Pythonic way to create collections
