# Decorators and Generators - Solutions

import functools
import time

"""Exercise 1: Simple Timer Decorator"""
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.2f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)
    return "Done"

print("Ex 1:")
slow_function()


"""Exercise 2: Call Counter Decorator"""
def count_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@count_calls
def say_hello():
    print("Hello!")

print("\nEx 2:")
say_hello()
say_hello()
say_hello()
print(f"Called {say_hello.calls} times")


"""Exercise 3: Decorator with Parameter"""
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
def greet(name):
    print(f"Hello, {name}!")

print("\nEx 3:")
greet("Alice")


"""Exercise 4: Authorization Decorator"""
current_user = {"name": "Alice", "permissions": ["read", "write"]}

def require_auth(permission):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            if permission not in current_user.get("permissions", []):
                raise PermissionError(f"User lacks '{permission}' permission")
            return func(*args, **kwargs)
        return wrapper
    return decorator

@require_auth("read")
def view_data():
    return "Here's the data"

@require_auth("delete")
def delete_data():
    return "Data deleted"

print("\nEx 4:")
print(view_data())
try:
    print(delete_data())
except PermissionError as e:
    print(f"Permission denied: {e}")


"""Exercise 5: Memoization Decorator"""
def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    wrapper.cache = cache
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print("\nEx 5:")
print(f"fibonacci(30) = {fibonacci(30)}")
print(f"Cache size: {len(fibonacci.cache)}")


"""Exercise 6: Simple Generator"""
def number_range(start, end):
    current = start
    while current <= end:
        yield current
        current += 1

print("\nEx 6:")
print(list(number_range(1, 5)))


"""Exercise 7: Fibonacci Generator"""
def fibonacci_gen():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print("\nEx 7:")
fib = fibonacci_gen()
print([next(fib) for _ in range(10)])


"""Exercise 8: File Reader Generator"""
def read_non_empty_lines(filepath):
    with open(filepath) as f:
        for line in f:
            stripped = line.strip()
            if stripped:
                yield stripped

# Create test file
with open("test_gen.txt", "w") as f:
    f.write("Line 1\n\nLine 2\n   \nLine 3\n")

print("\nEx 8:")
print(list(read_non_empty_lines("test_gen.txt")))


"""Exercise 9: Batching Generator"""
def batch(iterable, size):
    batch_list = []
    for item in iterable:
        batch_list.append(item)
        if len(batch_list) == size:
            yield batch_list
            batch_list = []
    if batch_list:  # Don't forget the last partial batch!
        yield batch_list

print("\nEx 9:")
items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for b in batch(items, 3):
    print(b)


"""Exercise 10: Flatten Generator"""
def flatten(items):
    for item in items:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

print("\nEx 10:")
nested = [1, [2, 3, [4, 5]], [6, [7, 8, [9]]]]
print(list(flatten(nested)))


"""BONUS: Decorator + Generator Combined"""
def listify(gen_func):
    @functools.wraps(gen_func)
    def wrapper(*args, **kwargs):
        return list(gen_func(*args, **kwargs))
    return wrapper

@listify
def numbers(n):
    for i in range(n):
        yield i

print("\nBonus:")
result = numbers(5)
print(f"Result: {result}, Type: {type(result).__name__}")
