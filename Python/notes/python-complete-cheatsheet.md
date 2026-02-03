# Python Complete Cheatsheet 🐍

## 1. Syntax Basics

```python
# Variables (no type declaration)
x = 10
name = "Alice"
is_valid = True
nothing = None

# Print with f-strings
print(f"Name: {name}, Value: {x}")

# Input (always returns string)
user_input = input("Enter: ")
age = int(input("Age: "))

# Comments
# Single line
"""Multi-line"""
```

## 2. Data Types

```python
# Numbers
i = 42          # int (unlimited size!)
f = 3.14        # float
c = 3 + 4j      # complex

# Strings
s = "hello"
s = 'hello'
s = """multi
line"""

# Boolean
True, False     # Capitalized!

# None (null equivalent)
None

# Type conversion
int("42")       # 42
str(42)         # "42"
float("3.14")   # 3.14
bool(0)         # False
```

## 3. Operators

```python
# Arithmetic
+ - * /         # Basic
//              # Floor division
%               # Modulo
**              # Power (2**10 = 1024)

# Comparison
== != < > <= >=
# Chained: 0 < x < 10

# Logical
and or not      # Not && || !

# Membership
x in list
x not in list
```

## 4. Strings

```python
s = "Python"

# Indexing
s[0]            # 'P'
s[-1]           # 'n' (last)

# Slicing [start:end:step]
s[0:3]          # 'Pyt'
s[:3]           # 'Pyt'
s[3:]           # 'hon'
s[::-1]         # 'nohtyP' (reverse)

# Methods
s.upper()       # 'PYTHON'
s.lower()       # 'python'
s.strip()       # Remove whitespace
s.split(',')    # Split to list
','.join(list)  # Join list to string
s.replace(a,b)  # Replace
s.find('th')    # Find index
```

## 5. Control Flow

```python
# If/elif/else
if x > 0:
    print("positive")
elif x < 0:
    print("negative")
else:
    print("zero")

# Ternary
result = "yes" if condition else "no"

# For loop
for i in range(5):          # 0,1,2,3,4
    print(i)

for item in list:
    print(item)

for i, item in enumerate(list):  # Index + value
    print(i, item)

for a, b in zip(list1, list2):   # Parallel
    print(a, b)

# While loop
while condition:
    # code

# Loop control
break           # Exit loop
continue        # Skip iteration
pass            # Do nothing

# For-else (runs if no break)
for item in items:
    if found:
        break
else:
    print("not found")
```

## 6. Collections

```python
# List (mutable)
lst = [1, 2, 3]
lst.append(4)
lst.pop()
lst[0]
len(lst)

# Tuple (immutable)
t = (1, 2, 3)
x, y, z = t     # Unpacking

# Dictionary
d = {"key": "value"}
d["key"]
d.get("key", default)
d.keys()
d.values()
d.items()

# Set (unique elements)
s = {1, 2, 3}
s.add(4)
a | b           # Union
a & b           # Intersection
a - b           # Difference

# Comprehensions
[x**2 for x in range(10)]
[x for x in lst if x > 0]
{k: v for k, v in items}
{x for x in lst}
```

## 7. Functions

```python
# Basic
def func(a, b):
    return a + b

# Default parameters
def func(a, b=10):
    return a + b

# *args, **kwargs
def func(*args, **kwargs):
    print(args)     # Tuple
    print(kwargs)   # Dict

# Lambda
square = lambda x: x**2
sorted(lst, key=lambda x: x[1])

# Type hints
def func(a: int, b: str) -> bool:
    return True
```

## 8. Classes

```python
class MyClass:
    class_var = 0           # Class variable
    
    def __init__(self, x):
        self.x = x          # Instance variable
    
    def method(self):
        return self.x
    
    @property
    def prop(self):
        return self._value
    
    @classmethod
    def factory(cls):
        return cls(0)
    
    @staticmethod
    def utility():
        pass

# Inheritance
class Child(Parent):
    def __init__(self):
        super().__init__()

# Magic methods
__init__        # Constructor
__str__         # str(obj)
__repr__        # repr(obj)
__eq__          # ==
__len__         # len(obj)
__getitem__     # obj[key]
```

## 9. File Handling

```python
# Read
with open("file.txt", "r") as f:
    content = f.read()
    # or
    lines = f.readlines()
    # or
    for line in f:
        print(line)

# Write
with open("file.txt", "w") as f:
    f.write("content")

# CSV
import csv
with open("data.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["column"])

# JSON
import json
data = json.load(f)         # File to dict
json.dump(data, f)          # Dict to file
data = json.loads(string)   # String to dict
string = json.dumps(data)   # Dict to string

# Paths
from pathlib import Path
p = Path("folder/file.txt")
p.exists()
p.is_file()
p.parent
p.name
```

## 10. Exceptions

```python
try:
    risky_code()
except ValueError as e:
    print(f"Error: {e}")
except (TypeError, KeyError):
    pass
else:
    print("Success")
finally:
    print("Always runs")

# Raise
raise ValueError("message")

# Custom exception
class MyError(Exception):
    pass
```

## 11. Common Patterns

```python
# Swap
a, b = b, a

# Default dict value
value = d.get(key, default)

# List to set (unique)
unique = list(set(lst))

# Flatten list
flat = [x for sub in nested for x in sub]

# Count frequency
from collections import Counter
counts = Counter(lst)

# Sort by key
sorted(lst, key=lambda x: x["name"])

# Filter
filtered = [x for x in lst if condition]

# Map
mapped = [func(x) for x in lst]
```

## 12. Java to Python Quick Reference

| Java | Python |
|------|--------|
| `System.out.println()` | `print()` |
| `int x = 5;` | `x = 5` |
| `String` | `str` |
| `ArrayList` | `list` |
| `HashMap` | `dict` |
| `HashSet` | `set` |
| `null` | `None` |
| `true/false` | `True/False` |
| `&&` `\|\|` `!` | `and` `or` `not` |
| `this` | `self` |
| `extends` | `class Child(Parent)` |
| `for(int i=0;i<10;i++)` | `for i in range(10):` |
| `try/catch/finally` | `try/except/finally` |
| `throw` | `raise` |
| `instanceof` | `isinstance()` |

