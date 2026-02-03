# Session 1: Pythonic Patterns

## 🎯 Learning Objectives
- Write idiomatic Python code
- Understand Python's philosophy (Zen of Python)
- Use built-in functions effectively
- Apply common Pythonic patterns

---

## 1. The Zen of Python

```python
import this  # Run this to see Python's philosophy
```

Key principles:
- **Beautiful is better than ugly**
- **Explicit is better than implicit**
- **Simple is better than complex**
- **Readability counts**
- **There should be one obvious way to do it**

---

## 2. Pythonic vs Non-Pythonic Code

### Checking Empty Collections
```python
# ❌ Non-Pythonic (Java style)
if len(my_list) == 0:
    print("empty")

if len(my_dict) > 0:
    print("has items")

# ✅ Pythonic (truthy/falsy)
if not my_list:
    print("empty")

if my_dict:
    print("has items")
```

### Checking for None
```python
# ❌ Non-Pythonic
if x == None:
    pass

# ✅ Pythonic
if x is None:
    pass

if x is not None:
    pass
```

### Comparing Booleans
```python
# ❌ Non-Pythonic
if is_valid == True:
    pass

if is_valid == False:
    pass

# ✅ Pythonic
if is_valid:
    pass

if not is_valid:
    pass
```

### String Concatenation
```python
# ❌ Non-Pythonic (slow for many strings)
result = ""
for s in strings:
    result += s

# ✅ Pythonic
result = "".join(strings)

# ✅ For formatted strings
name, age = "Alice", 30
message = f"Name: {name}, Age: {age}"
```

---

## 3. Iteration Patterns

### Don't Use Range for Simple Iteration
```python
colors = ["red", "green", "blue"]

# ❌ Non-Pythonic
for i in range(len(colors)):
    print(colors[i])

# ✅ Pythonic
for color in colors:
    print(color)
```

### Use enumerate() for Index + Value
```python
# ❌ Non-Pythonic
i = 0
for color in colors:
    print(i, color)
    i += 1

# ✅ Pythonic
for i, color in enumerate(colors):
    print(i, color)

# Start from different index
for i, color in enumerate(colors, start=1):
    print(i, color)
```

### Use zip() for Parallel Iteration
```python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

# ❌ Non-Pythonic
for i in range(len(names)):
    print(names[i], ages[i])

# ✅ Pythonic
for name, age in zip(names, ages):
    print(name, age)

# Create dict from two lists
name_age = dict(zip(names, ages))
```

### Iterate in Reverse
```python
# ❌ Non-Pythonic
for i in range(len(colors) - 1, -1, -1):
    print(colors[i])

# ✅ Pythonic
for color in reversed(colors):
    print(color)
```

### Iterate Sorted
```python
# ✅ Pythonic
for color in sorted(colors):
    print(color)

for color in sorted(colors, reverse=True):
    print(color)

# Sort by custom key
for item in sorted(items, key=lambda x: x["price"]):
    print(item)
```

---

## 4. Dictionary Patterns

### Get with Default
```python
# ❌ Non-Pythonic
if key in d:
    value = d[key]
else:
    value = default

# ✅ Pythonic
value = d.get(key, default)
```

### setdefault for Missing Keys
```python
# ❌ Non-Pythonic
if key not in d:
    d[key] = []
d[key].append(item)

# ✅ Pythonic
d.setdefault(key, []).append(item)

# Or use defaultdict
from collections import defaultdict
d = defaultdict(list)
d[key].append(item)  # No KeyError!
```

### Dictionary Iteration
```python
# Keys only
for key in d:
    print(key)

# Values only
for value in d.values():
    print(value)

# Both (most common)
for key, value in d.items():
    print(key, value)
```

### Merge Dictionaries
```python
# Python 3.9+
merged = d1 | d2

# Python 3.5+
merged = {**d1, **d2}

# Update in place
d1.update(d2)
```

---

## 5. Conditional Expressions

### Ternary Operator
```python
# ❌ Non-Pythonic
if condition:
    x = value1
else:
    x = value2

# ✅ Pythonic
x = value1 if condition else value2
```

### Or for Default Values
```python
# ✅ Pythonic - use 'or' for falsy defaults
name = user_input or "Anonymous"
# If user_input is empty/None, uses "Anonymous"

# ⚠️ Careful: 0 and "" are falsy!
# Use 'if x is None' for explicit None check
```

### Walrus Operator := (Python 3.8+)
```python
# ❌ Without walrus
line = input()
while line != "quit":
    print(line)
    line = input()

# ✅ With walrus operator
while (line := input()) != "quit":
    print(line)

# Useful in comprehensions
results = [y for x in data if (y := expensive_func(x)) > 0]
```

---

## 6. Unpacking

### Multiple Assignment
```python
# Basic unpacking
a, b, c = [1, 2, 3]
x, y = y, x  # Swap!

# Extended unpacking
first, *rest = [1, 2, 3, 4, 5]  # first=1, rest=[2,3,4,5]
first, *middle, last = [1, 2, 3, 4, 5]  # first=1, middle=[2,3,4], last=5
*head, tail = [1, 2, 3, 4, 5]  # head=[1,2,3,4], tail=5

# Ignore values
_, important, _ = get_values()
first, *_, last = items
```

### Unpack in Function Calls
```python
args = [1, 2, 3]
func(*args)  # Same as func(1, 2, 3)

kwargs = {"name": "Alice", "age": 30}
func(**kwargs)  # Same as func(name="Alice", age=30)
```

---

## 7. Built-in Functions to Know

### any() and all()
```python
numbers = [2, 4, 6, 8]

# Check if ANY element meets condition
has_odd = any(n % 2 == 1 for n in numbers)  # False

# Check if ALL elements meet condition
all_even = all(n % 2 == 0 for n in numbers)  # True

# Practical examples
if any(user.is_admin for user in users):
    print("Has admin")

if all(item.is_valid for item in items):
    print("All valid")
```

### map(), filter(), reduce()
```python
# map - apply function to all items
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, numbers))  # [1, 4, 9, 16]

# filter - keep items that pass test
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]

# reduce - accumulate values
from functools import reduce
total = reduce(lambda a, b: a + b, numbers)  # 10

# ✅ Usually prefer comprehensions instead:
squared = [x**2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]
total = sum(numbers)
```

### min(), max(), sum() with key
```python
users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]

oldest = max(users, key=lambda u: u["age"])
youngest = min(users, key=lambda u: u["age"])

# With default for empty iterables
oldest = max(users, key=lambda u: u["age"], default=None)
```

---

## 8. Context Managers (with statement)

```python
# ✅ Always use 'with' for resources
with open("file.txt") as f:
    content = f.read()
# File automatically closed!

# Multiple context managers
with open("in.txt") as inp, open("out.txt", "w") as out:
    out.write(inp.read())

# Works with many objects:
# - files
# - database connections
# - locks
# - network sockets
```

---

## 9. Common Anti-Patterns to Avoid

### Don't Use Mutable Default Arguments
```python
# ❌ WRONG!
def add_item(item, items=[]):
    items.append(item)
    return items

# ✅ CORRECT
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Don't Modify List While Iterating
```python
# ❌ WRONG!
for item in items:
    if should_remove(item):
        items.remove(item)

# ✅ CORRECT - create new list
items = [item for item in items if not should_remove(item)]

# ✅ Or iterate over a copy
for item in items[:]:
    if should_remove(item):
        items.remove(item)
```

### Don't Use Bare except
```python
# ❌ WRONG! Catches everything including Ctrl+C
try:
    something()
except:
    pass

# ✅ CORRECT - be specific
try:
    something()
except ValueError:
    handle_error()
```

---

## Summary

1. **Use truthy/falsy** for empty checks
2. **Use `is` for None** comparison
3. **Use enumerate/zip** for iteration
4. **Use dict.get()** for defaults
5. **Use comprehensions** over map/filter
6. **Use context managers** (with)
7. **Avoid mutable default arguments**
8. **Write readable, simple code**
