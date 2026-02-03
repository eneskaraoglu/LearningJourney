# Decorators and Generators - Exercises

import functools
import time

"""
PART 1: DECORATORS
==================
"""

"""
Exercise 1: Simple Timer Decorator
----------------------------------
Create a decorator that prints how long a function takes to execute.
"""

def timer(func):
    # Your code:
    pass

# Test:
# @timer
# def slow_function():
#     time.sleep(0.5)
#     return "Done"
# slow_function()  # Should print: "slow_function took 0.50 seconds"


"""
Exercise 2: Call Counter Decorator
----------------------------------
Create a decorator that counts how many times a function is called.
Store the count as an attribute on the wrapper function.
"""

def count_calls(func):
    # Your code:
    pass

# Test:
# @count_calls
# def say_hello():
#     print("Hello!")
# say_hello()
# say_hello()
# say_hello()
# print(say_hello.calls)  # Should print: 3


"""
Exercise 3: Decorator with Parameter
------------------------------------
Create a decorator that runs a function multiple times.
"""

def repeat(times):
    # Your code:
    pass

# Test:
# @repeat(times=3)
# def greet(name):
#     print(f"Hello, {name}!")
# greet("Alice")
# Should print "Hello, Alice!" three times


"""
Exercise 4: Authorization Decorator
-----------------------------------
Create a decorator that checks if a user has permission.
"""

def require_auth(permission):
    def decorator(func):
        # Your code:
        pass
    return decorator

# Simulated current user
current_user = {"name": "Alice", "permissions": ["read", "write"]}

# Test:
# @require_auth("read")
# def view_data():
#     return "Here's the data"
#
# @require_auth("delete")
# def delete_data():
#     return "Data deleted"
#
# print(view_data())   # Should work
# print(delete_data()) # Should raise PermissionError


"""
Exercise 5: Memoization Decorator
---------------------------------
Create a decorator that caches function results.
"""

def memoize(func):
    # Your code:
    pass

# Test:
# @memoize
# def fibonacci(n):
#     if n < 2:
#         return n
#     return fibonacci(n-1) + fibonacci(n-2)
#
# print(fibonacci(30))  # Should be fast!
# print(fibonacci.cache)  # Should show cached values


"""
PART 2: GENERATORS
==================
"""

"""
Exercise 6: Simple Generator
----------------------------
Create a generator that yields numbers from start to end (inclusive).
"""

def number_range(start, end):
    # Your code:
    pass

# Test:
# for num in number_range(1, 5):
#     print(num)  # 1, 2, 3, 4, 5


"""
Exercise 7: Fibonacci Generator
-------------------------------
Create a generator that yields Fibonacci numbers indefinitely.
"""

def fibonacci_gen():
    # Your code:
    pass

# Test:
# fib = fibonacci_gen()
# for _ in range(10):
#     print(next(fib))  # 0, 1, 1, 2, 3, 5, 8, 13, 21, 34


"""
Exercise 8: File Reader Generator
---------------------------------
Create a generator that reads a file and yields non-empty lines.
"""

def read_non_empty_lines(filepath):
    # Your code:
    pass

# Test (create a test file first):
# with open("test.txt", "w") as f:
#     f.write("Line 1\n\nLine 2\n   \nLine 3\n")
# for line in read_non_empty_lines("test.txt"):
#     print(line)  # Line 1, Line 2, Line 3


"""
Exercise 9: Batching Generator
------------------------------
Create a generator that yields items in batches.
"""

def batch(iterable, size):
    # Your code:
    pass

# Test:
# items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# for b in batch(items, 3):
#     print(b)  # [1,2,3], [4,5,6], [7,8,9], [10]


"""
Exercise 10: Flatten Generator
------------------------------
Create a generator that flattens nested lists to any depth.
"""

def flatten(items):
    # Your code (hint: use yield from for recursion):
    pass

# Test:
# nested = [1, [2, 3, [4, 5]], [6, [7, 8, [9]]]]
# print(list(flatten(nested)))  # [1, 2, 3, 4, 5, 6, 7, 8, 9]


"""
BONUS: Decorator + Generator Combined
-------------------------------------
Create a decorator that converts a generator function to return a list.
"""

def listify(gen_func):
    # Your code:
    pass

# Test:
# @listify
# def numbers(n):
#     for i in range(n):
#         yield i
#
# result = numbers(5)
# print(result)  # [0, 1, 2, 3, 4]
# print(type(result))  # <class 'list'>
