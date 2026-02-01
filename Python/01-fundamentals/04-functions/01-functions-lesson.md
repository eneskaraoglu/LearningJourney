# Session 4: Functions in Python

## 🎯 Learning Objectives
- Define functions with def keyword
- Use default parameters and keyword arguments
- Master *args and **kwargs
- Understand lambda functions
- Work with functions as first-class objects

---

## 1. Basic Function Definition

### Java vs Python

```java
// Java
public int add(int a, int b) {
    return a + b;
}
```

```python
# Python
def add(a, b):
    return a + b

# Call it
result = add(3, 5)  # 8
```

### Key Differences
- `def` keyword instead of return type
- No type declarations (but type hints available)
- No access modifiers (public/private)
- Colon and indentation instead of braces

### Functions Without Return

```python
def greet(name):
    print(f"Hello, {name}!")
    # No return statement - returns None implicitly

result = greet("Alice")  # Prints: Hello, Alice!
print(result)            # None
```

---

## 2. Type Hints (Optional but Recommended)

```python
# Without type hints
def add(a, b):
    return a + b

# With type hints (Python 3.5+)
def add(a: int, b: int) -> int:
    return a + b

# Type hints are NOT enforced at runtime!
# They're for documentation and IDE support
add("Hello", " World")  # Still works! Returns "Hello World"
```

### Common Type Hints
```python
from typing import List, Dict, Optional, Tuple, Union

def process_items(items: List[str]) -> int:
    return len(items)

def get_user(id: int) -> Optional[Dict]:  # Can return None
    return {"id": id, "name": "Alice"}

def parse_data(data: Union[str, bytes]) -> str:  # Multiple types
    return str(data)
```

---

## 3. Default Parameters

### Java - Uses Overloading
```java
// Java needs multiple methods
public void greet(String name) {
    greet(name, "Hello");
}
public void greet(String name, String greeting) {
    System.out.println(greeting + ", " + name);
}
```

### Python - Default Values
```python
# Python - simple default values!
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Hi")          # Hi, Bob!
greet("Charlie", "Welcome") # Welcome, Charlie!
```

### ⚠️ DANGER: Mutable Default Arguments!

```python
# WRONG! - Common Python gotcha
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b'] - NOT ['b']! Same list!

# CORRECT way
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['b'] - Fresh list each time
```

---

## 4. Keyword Arguments

```python
def create_user(name, age, city="Unknown", active=True):
    return {
        "name": name,
        "age": age,
        "city": city,
        "active": active
    }

# Positional arguments
create_user("Alice", 30)

# Keyword arguments - order doesn't matter!
create_user(name="Bob", age=25, city="NYC")
create_user(age=25, name="Bob", active=False)

# Mix positional and keyword (positional must come first)
create_user("Charlie", 35, city="LA")
```

### Forcing Keyword-Only Arguments

```python
# Everything after * must be keyword argument
def connect(host, port, *, timeout=30, retries=3):
    print(f"Connecting to {host}:{port}")

connect("localhost", 8080)                    # OK
connect("localhost", 8080, timeout=60)        # OK
connect("localhost", 8080, 60)                # ERROR! timeout must be keyword
```

---

## 5. *args - Variable Positional Arguments

```python
# *args collects extra positional arguments into a tuple
def sum_all(*args):
    print(f"args = {args}")  # It's a tuple!
    return sum(args)

sum_all(1, 2, 3)        # args = (1, 2, 3), returns 6
sum_all(1, 2, 3, 4, 5)  # args = (1, 2, 3, 4, 5), returns 15

# Combine with regular parameters
def greet_all(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet_all("Hello", "Alice", "Bob", "Charlie")
# Hello, Alice!
# Hello, Bob!
# Hello, Charlie!
```

### Unpacking with *

```python
numbers = [1, 2, 3, 4, 5]

# Without unpacking
print(numbers)      # [1, 2, 3, 4, 5]

# With unpacking
print(*numbers)     # 1 2 3 4 5

# Useful for function calls
def add(a, b, c):
    return a + b + c

values = [1, 2, 3]
add(*values)  # Same as add(1, 2, 3)
```

---

## 6. **kwargs - Variable Keyword Arguments

```python
# **kwargs collects extra keyword arguments into a dictionary
def print_info(**kwargs):
    print(f"kwargs = {kwargs}")  # It's a dict!
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="NYC")
# kwargs = {'name': 'Alice', 'age': 30, 'city': 'NYC'}
# name: Alice
# age: 30
# city: NYC

# Combine with regular parameters
def create_profile(name, **details):
    profile = {"name": name}
    profile.update(details)
    return profile

create_profile("Alice", age=30, city="NYC", job="Engineer")
# {'name': 'Alice', 'age': 30, 'city': 'NYC', 'job': 'Engineer'}
```

### Unpacking with **

```python
user_data = {"name": "Alice", "age": 30}

def display(name, age):
    print(f"{name} is {age}")

display(**user_data)  # Same as display(name="Alice", age=30)
```

---

## 7. Combining All Parameter Types

```python
# Order matters!
# 1. Regular positional
# 2. *args
# 3. Keyword-only (after *)
# 4. **kwargs

def ultimate_function(a, b, *args, option=True, **kwargs):
    print(f"a = {a}")
    print(f"b = {b}")
    print(f"args = {args}")
    print(f"option = {option}")
    print(f"kwargs = {kwargs}")

ultimate_function(1, 2, 3, 4, 5, option=False, x=10, y=20)
# a = 1
# b = 2
# args = (3, 4, 5)
# option = False
# kwargs = {'x': 10, 'y': 20}
```

---

## 8. Lambda Functions (Anonymous Functions)

### Java vs Python

```java
// Java (Lambda)
Function<Integer, Integer> square = x -> x * x;
```

```python
# Python Lambda
square = lambda x: x * x
square(5)  # 25

# Equivalent to:
def square(x):
    return x * x
```

### Lambda Syntax
```python
# lambda arguments: expression
add = lambda a, b: a + b
add(3, 5)  # 8

# Multiple arguments
full_name = lambda first, last: f"{first} {last}"
full_name("John", "Doe")  # "John Doe"

# No arguments
get_pi = lambda: 3.14159
get_pi()  # 3.14159
```

### Common Use Cases

```python
# Sorting with custom key
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]

# Sort by score (second element)
sorted(students, key=lambda x: x[1])
# [('Charlie', 78), ('Alice', 85), ('Bob', 92)]

# Sort by name length
names = ["Alice", "Bob", "Christopher"]
sorted(names, key=lambda x: len(x))
# ['Bob', 'Alice', 'Christopher']

# With filter and map
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4, 6]
squared = list(map(lambda x: x ** 2, numbers))       # [1, 4, 9, 16, 25, 36]
```

---

## 9. Functions as First-Class Objects

```python
# Functions can be assigned to variables
def shout(text):
    return text.upper()

yell = shout  # Assign function to variable
yell("hello")  # "HELLO"

# Functions can be passed as arguments
def apply_twice(func, value):
    return func(func(value))

def add_ten(x):
    return x + 10

apply_twice(add_ten, 5)  # add_ten(add_ten(5)) = add_ten(15) = 25

# Functions can be returned from functions
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

double(5)  # 10
triple(5)  # 15
```

---

## 10. Docstrings

```python
def calculate_area(length: float, width: float) -> float:
    """
    Calculate the area of a rectangle.
    
    Args:
        length: The length of the rectangle.
        width: The width of the rectangle.
    
    Returns:
        The area of the rectangle.
    
    Raises:
        ValueError: If length or width is negative.
    
    Example:
        >>> calculate_area(5, 3)
        15
    """
    if length < 0 or width < 0:
        raise ValueError("Dimensions must be positive")
    return length * width

# Access docstring
print(calculate_area.__doc__)
help(calculate_area)
```

---

## Quick Reference: Java vs Python Functions

| Feature | Java | Python |
|---------|------|--------|
| Definition | `public int add(int a, int b)` | `def add(a, b):` |
| Default params | Overloading | `def f(a, b=10):` |
| Variable args | `int... nums` | `*args` |
| Return type | Required | Optional (use hints) |
| Lambda | `x -> x * 2` | `lambda x: x * 2` |
| Docstring | Javadoc comments | Triple-quoted string |

---

## Summary

1. **def** keyword, colon, indentation
2. **Default parameters** eliminate overloading
3. **\*args** = tuple of extra positional args
4. **\*\*kwargs** = dict of extra keyword args
5. **Lambda** = single-expression anonymous function
6. **Functions are objects** - pass them around!
7. **Docstrings** document your functions

