# Functions - Practice Exercises

"""
Exercise 1: Basic Function
--------------------------
Write a function that takes a person's first and last name
and returns their full name formatted as "Last, First".
"""

def format_name(first, last):
    # Your code:
    pass

# Test:
# print(format_name("John", "Doe"))  # Should print: "Doe, John"



"""
Exercise 2: Default Parameters
------------------------------
Write a function 'power' that calculates x raised to power n.
- If n is not provided, default to 2 (square).
"""

def power(x, n=2):
    # Your code:
    pass

# Test:
# print(power(5))      # 25 (5 squared)
# print(power(2, 10))  # 1024 (2 to the 10th)



"""
Exercise 3: Multiple Return Values
----------------------------------
Write a function that takes a list of numbers and returns
both the minimum and maximum values as a tuple.
"""

def min_max(numbers):
    # Your code:
    pass

# Test:
# result = min_max([3, 1, 4, 1, 5, 9, 2, 6])
# print(result)  # (1, 9)



"""
Exercise 4: *args - Sum Calculator
----------------------------------
Write a function that can add ANY number of arguments.
"""

def add_all(*args):
    # Your code:
    pass

# Test:
# print(add_all(1, 2))           # 3
# print(add_all(1, 2, 3, 4, 5))  # 15
# print(add_all())               # 0



"""
Exercise 5: **kwargs - Build HTML Tag
-------------------------------------
Write a function that builds an HTML tag with attributes.

Example:
build_tag("a", href="https://python.org", target="_blank")
Should return: '<a href="https://python.org" target="_blank"></a>'
"""

def build_tag(tag_name, **attributes):
    # Your code:
    pass

# Test:
# print(build_tag("a", href="https://python.org", target="_blank"))
# print(build_tag("img", src="photo.jpg", alt="A photo", width="100"))
# print(build_tag("div"))



"""
Exercise 6: Lambda Sorting
--------------------------
Given a list of dictionaries representing products,
sort them by price using a lambda function.
"""

products = [
    {"name": "Laptop", "price": 999},
    {"name": "Mouse", "price": 25},
    {"name": "Keyboard", "price": 75},
    {"name": "Monitor", "price": 300}
]

# Sort by price (ascending)
sorted_products = # Your code using sorted() and lambda

# print(sorted_products)



"""
Exercise 7: Higher-Order Function
---------------------------------
Write a function 'apply_operation' that:
- Takes a list of numbers and a function
- Applies the function to each number
- Returns a new list with the results
"""

def apply_operation(numbers, operation):
    # Your code:
    pass

# Test:
# nums = [1, 2, 3, 4, 5]
# print(apply_operation(nums, lambda x: x * 2))    # [2, 4, 6, 8, 10]
# print(apply_operation(nums, lambda x: x ** 2))   # [1, 4, 9, 16, 25]



"""
Exercise 8: Function Factory
----------------------------
Write a function 'make_greeting' that takes a greeting word
and returns a NEW function that greets people with that word.
"""

def make_greeting(greeting):
    # Your code:
    pass

# Test:
# say_hello = make_greeting("Hello")
# say_hi = make_greeting("Hi")
# say_welcome = make_greeting("Welcome")

# print(say_hello("Alice"))    # "Hello, Alice!"
# print(say_hi("Bob"))         # "Hi, Bob!"
# print(say_welcome("Charlie")) # "Welcome, Charlie!"



"""
BONUS: Decorator Preview
------------------------
Write a function 'debug' that takes another function and returns
a new function that prints the arguments before calling the original.

This is a simple decorator pattern - we'll cover decorators in depth later!
"""

def debug(func):
    def wrapper(*args, **kwargs):
        # Print arguments
        # Call original function
        # Return result
        pass
    return wrapper

# Test:
# @debug
# def add(a, b):
#     return a + b
#
# add(3, 5)
# Should print: "Calling add with args=(3, 5), kwargs={}"
# Then return: 8
