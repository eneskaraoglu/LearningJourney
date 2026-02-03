# Session 3: Decorators and Generators

## 🎯 Learning Objectives
- Understand and create decorators
- Use built-in decorators (@property, @staticmethod, @classmethod)
- Create generators with yield
- Use generator expressions and itertools

---

## PART 1: DECORATORS

## 1. What is a Decorator?

A decorator is a function that takes another function and extends its behavior without modifying it.

```python
# A decorator is just a function that:
# 1. Takes a function as input
# 2. Returns a new function that usually calls the original

def my_decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

# This is equivalent to:
# say_hello = my_decorator(say_hello)

say_hello()
# Output:
# Before function call
# Hello!
# After function call
```

---

## 2. Decorator with Arguments

```python
import functools

def my_decorator(func):
    @functools.wraps(func)  # Preserves function metadata
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Finished {func.__name__}")
        return result
    return wrapper

@my_decorator
def add(a, b):
    """Add two numbers."""
    return a + b

print(add(3, 5))
# Calling add
# Finished add
# 8

# functools.wraps preserves:
print(add.__name__)  # "add" (not "wrapper")
print(add.__doc__)   # "Add two numbers."
```

---

## 3. Common Decorator Patterns

### Timer Decorator
```python
import functools
import time

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"
```

### Debug/Logger Decorator
```python
def debug(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_str = ", ".join(repr(a) for a in args)
        kwargs_str = ", ".join(f"{k}={v!r}" for k, v in kwargs.items())
        all_args = ", ".join(filter(None, [args_str, kwargs_str]))
        print(f"Calling {func.__name__}({all_args})")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result!r}")
        return result
    return wrapper

@debug
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
```

### Retry Decorator
```python
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed: {e}")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def unreliable_api_call():
    # Might fail sometimes
    pass
```

### Cache/Memoize Decorator
```python
def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Or use built-in:
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

---

## 4. Decorators with Parameters

```python
def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def say_hello():
    print("Hello!")

# Equivalent to: say_hello = repeat(times=3)(say_hello)
```

### Decorator with Optional Parameters
```python
def debug(func=None, *, prefix="DEBUG"):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print(f"{prefix}: Calling {func.__name__}")
            return func(*args, **kwargs)
        return wrapper
    
    if func is None:
        return decorator
    return decorator(func)

# Can be used both ways:
@debug
def func1(): pass

@debug(prefix="INFO")
def func2(): pass
```

---

## 5. Class-Based Decorators

```python
class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0
    
    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call {self.count} of {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hello():
    print("Hello!")

say_hello()  # Call 1 of say_hello
say_hello()  # Call 2 of say_hello
print(say_hello.count)  # 2
```

---

## 6. Stacking Decorators

```python
@decorator1
@decorator2
@decorator3
def func():
    pass

# Equivalent to:
# func = decorator1(decorator2(decorator3(func)))
# Decorators are applied bottom-up!

@timer
@debug
def my_function():
    pass
```

---

## PART 2: GENERATORS

## 7. What is a Generator?

A generator is a function that yields values one at a time, maintaining state between calls.

```python
# Regular function - returns all at once
def get_squares_list(n):
    result = []
    for i in range(n):
        result.append(i ** 2)
    return result

# Generator function - yields one at a time
def get_squares_gen(n):
    for i in range(n):
        yield i ** 2  # 'yield' instead of 'return'

# Usage
squares = get_squares_gen(5)
print(type(squares))  # <class 'generator'>
print(next(squares))  # 0
print(next(squares))  # 1
print(next(squares))  # 4

for sq in get_squares_gen(5):
    print(sq)  # 0, 1, 4, 9, 16
```

---

## 8. How Generators Work

```python
def countdown(n):
    print("Starting countdown")
    while n > 0:
        yield n  # Pause and return value
        n -= 1
    print("Blastoff!")

gen = countdown(3)
# Nothing printed yet - generator is lazy!

print(next(gen))  # "Starting countdown", then 3
print(next(gen))  # 2
print(next(gen))  # 1
print(next(gen))  # "Blastoff!", then StopIteration error
```

---

## 9. Generator Benefits

### Memory Efficiency
```python
# List - stores all values in memory
big_list = [x**2 for x in range(1000000)]  # ~8MB memory!

# Generator - computes on demand
big_gen = (x**2 for x in range(1000000))   # Almost no memory!

# Perfect for large files
def read_large_file(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()
```

### Infinite Sequences
```python
def infinite_counter(start=0):
    n = start
    while True:
        yield n
        n += 1

counter = infinite_counter()
print(next(counter))  # 0
print(next(counter))  # 1
# Can go forever!

# Take only what you need
from itertools import islice
first_10 = list(islice(infinite_counter(), 10))
```

---

## 10. Generator Expressions

```python
# List comprehension - creates list
squares_list = [x**2 for x in range(1000000)]

# Generator expression - creates generator
squares_gen = (x**2 for x in range(1000000))

# Use generators in functions that iterate
total = sum(x**2 for x in range(1000000))  # No list created!
has_even = any(x % 2 == 0 for x in numbers)
all_positive = all(x > 0 for x in numbers)
```

---

## 11. yield from (Delegation)

```python
# Without yield from
def flatten(nested):
    for sublist in nested:
        for item in sublist:
            yield item

# With yield from
def flatten(nested):
    for sublist in nested:
        yield from sublist  # Delegates to sub-generator

# Useful for recursive generators
def flatten_deep(items):
    for item in items:
        if isinstance(item, list):
            yield from flatten_deep(item)
        else:
            yield item

nested = [1, [2, 3, [4, 5]], 6]
print(list(flatten_deep(nested)))  # [1, 2, 3, 4, 5, 6]
```

---

## 12. itertools - Generator Utilities

```python
from itertools import (
    count, cycle, repeat,           # Infinite iterators
    chain, islice, takewhile,       # Terminating iterators
    combinations, permutations,     # Combinatoric
    groupby, accumulate             # Reduction
)

# Infinite counter
for i in islice(count(10), 5):
    print(i)  # 10, 11, 12, 13, 14

# Cycle through items
colors = cycle(["red", "green", "blue"])
print([next(colors) for _ in range(5)])  # [red, green, blue, red, green]

# Chain iterables
combined = chain([1, 2], [3, 4], [5, 6])
print(list(combined))  # [1, 2, 3, 4, 5, 6]

# Take while condition is true
nums = [1, 3, 5, 7, 2, 4, 6]
result = list(takewhile(lambda x: x < 6, nums))  # [1, 3, 5]

# Combinations and permutations
print(list(combinations("ABC", 2)))  # [('A','B'), ('A','C'), ('B','C')]
print(list(permutations("AB", 2)))   # [('A','B'), ('B','A')]

# Group consecutive items
data = [("a", 1), ("a", 2), ("b", 3), ("b", 4)]
for key, group in groupby(data, key=lambda x: x[0]):
    print(key, list(group))
```

---

## 13. Practical Generator Examples

### File Processing
```python
def grep(pattern, filepath):
    with open(filepath) as f:
        for line in f:
            if pattern in line:
                yield line

for match in grep("error", "logfile.txt"):
    print(match)
```

### Data Pipeline
```python
def read_data(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

def parse_records(lines):
    for line in lines:
        yield line.split(",")

def filter_valid(records):
    for record in records:
        if len(record) == 3:
            yield record

# Chain them together
lines = read_data("data.csv")
records = parse_records(lines)
valid = filter_valid(records)

for record in valid:
    print(record)
```

---

## Summary

### Decorators
1. Functions that modify other functions
2. Use `@functools.wraps` to preserve metadata
3. Can take parameters (triple-nested functions)
4. Can be stacked (applied bottom-up)

### Generators
1. Use `yield` to produce values lazily
2. Memory efficient for large data
3. Can represent infinite sequences
4. `yield from` delegates to sub-generators
5. Generator expressions: `(x for x in items)`
