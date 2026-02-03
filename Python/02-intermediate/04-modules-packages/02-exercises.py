# Modules and Packages - Exercises

"""
Exercise 1: Create a Simple Module
----------------------------------
Create a file called 'mathutils.py' with:
- A constant TAU = 2 * PI
- A function circle_area(radius)
- A function circle_circumference(radius)
Then import and use it.
"""

# First, create mathutils.py with this content:
mathutils_content = '''
import math

TAU = 2 * math.pi

def circle_area(radius):
    """Calculate circle area."""
    pass  # Your code

def circle_circumference(radius):
    """Calculate circle circumference."""
    pass  # Your code
'''

# Then test it:
# from mathutils import circle_area, TAU
# print(circle_area(5))


"""
Exercise 2: Using __name__ == "__main__"
----------------------------------------
Create a module that can be both imported and run directly.
When run directly, it should demo its functions.
"""

# Create demo_module.py with:
demo_content = '''
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

# Add the if __name__ == "__main__" block
# that demos the functions
'''


"""
Exercise 3: Explore Standard Library
------------------------------------
Write code using the standard library to:
1. Get current date and format as "YYYY-MM-DD"
2. Count word frequency in a sentence
3. Get all .py files in current directory
"""

from datetime import datetime
from collections import Counter
from pathlib import Path

# 1. Current date formatted
current_date = None

# 2. Word frequency
sentence = "the quick brown fox jumps over the lazy dog the fox"
word_counts = None

# 3. All .py files
py_files = None


"""
Exercise 4: Working with json Module
------------------------------------
Create functions to save and load user data to/from JSON.
"""

import json

def save_users(users, filename):
    """Save list of user dicts to JSON file."""
    pass

def load_users(filename):
    """Load users from JSON file. Return empty list if file doesn't exist."""
    pass

# Test data:
users = [
    {"name": "Alice", "age": 30, "email": "alice@example.com"},
    {"name": "Bob", "age": 25, "email": "bob@example.com"}
]


"""
Exercise 5: Create a Package Structure
--------------------------------------
Create this package structure (just describe the files needed):

calculator/
├── __init__.py
├── basic.py (add, subtract, multiply, divide)
├── advanced.py (power, sqrt, factorial)
└── utils.py (is_number validation)

Write the content for each file.
"""

# __init__.py content:
init_content = '''
# Your code here
'''

# basic.py content:
basic_content = '''
# Your code here
'''

# advanced.py content:
advanced_content = '''
# Your code here
'''


"""
Exercise 6: Using collections Module
------------------------------------
Solve these problems using collections.
"""

from collections import Counter, defaultdict, namedtuple

# 1. Find the 3 most common characters in this string
text = "abracadabra"
most_common_chars = None

# 2. Group these words by their first letter
words = ["apple", "banana", "apricot", "cherry", "blueberry", "avocado"]
grouped = None  # Should be: {'a': ['apple', 'apricot', 'avocado'], 'b': [...], ...}

# 3. Create a Point namedtuple and calculate distance between two points
# Point = ...
# p1 = Point(0, 0)
# p2 = Point(3, 4)
# distance = ...  # Should be 5.0


"""
Exercise 7: Using itertools
---------------------------
Use itertools to solve these.
"""

from itertools import combinations, permutations, cycle, chain

# 1. Generate all 2-person teams from ["Alice", "Bob", "Charlie", "Diana"]
people = ["Alice", "Bob", "Charlie", "Diana"]
teams = None

# 2. Generate all possible orderings of ["A", "B", "C"]
orderings = None

# 3. Combine these lists into one: [1,2], [3,4], [5,6]
lists = [[1, 2], [3, 4], [5, 6]]
combined = None


"""
Exercise 8: Using functools
---------------------------
Use functools for these tasks.
"""

from functools import lru_cache, partial, reduce

# 1. Create a cached version of fibonacci
# @lru_cache
def fib(n):
    pass

# 2. Create a 'double' function using partial
def multiply(a, b):
    return a * b
double = None  # partial(multiply, ???)

# 3. Use reduce to find the product of [1, 2, 3, 4, 5]
numbers = [1, 2, 3, 4, 5]
product = None


"""
BONUS: Create a CLI Tool
------------------------
Create a module that works as a command-line tool.
It should accept arguments and do something useful.
"""

# cli_tool.py
cli_content = '''
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python cli_tool.py <command> [args]")
        print("Commands: greet <name>, add <num1> <num2>")
        sys.exit(1)
    
    command = sys.argv[1]
    
    # Handle 'greet' command
    # Handle 'add' command
    # Your code here

if __name__ == "__main__":
    main()
'''
