# Advanced Comprehensions - Exercises

"""
Exercise 1: Flatten and Transform
---------------------------------
Flatten the nested list and square each number.
"""
nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]

# Expected: [1, 4, 9, 16, 25, 36, 49, 64, 81]
result = None


"""
Exercise 2: Filter Nested
-------------------------
Flatten but keep only even numbers greater than 4.
"""
nested = [[1, 2, 8], [3, 4, 6], [5, 10, 12]]

# Expected: [8, 6, 10, 12]
result = None


"""
Exercise 3: Create Multiplication Table
---------------------------------------
Create a 10x10 multiplication table as a 2D list.
table[i][j] should equal (i+1) * (j+1)
"""
# Expected: table[2][3] = 12 (3*4)
table = None


"""
Exercise 4: Dict from Lists
---------------------------
Create a dict mapping words to their lengths.
"""
words = ["python", "java", "javascript", "go", "rust"]

# Expected: {"python": 6, "java": 4, "javascript": 10, "go": 2, "rust": 4}
word_lengths = None


"""
Exercise 5: Invert Dict
-----------------------
Create a dict mapping lengths to lists of words with that length.
"""
words = ["python", "java", "javascript", "go", "rust", "ruby"]

# Expected: {6: ["python"], 4: ["java", "rust", "ruby"], 10: ["javascript"], 2: ["go"]}
# Hint: Can't do this with pure comprehension, use defaultdict
length_to_words = None


"""
Exercise 6: Nested Dict Comprehension
-------------------------------------
Create a dict where each key is a number 1-5 and value is 
a dict of that number's first 3 multiples.
"""
# Expected: {1: {1: 1, 2: 2, 3: 3}, 2: {1: 2, 2: 4, 3: 6}, ...}
multiples = None


"""
Exercise 7: Set Comprehension
-----------------------------
Given a list of sentences, extract all unique words (lowercase).
"""
sentences = [
    "The quick brown fox",
    "jumps over the lazy dog",
    "The dog barks"
]

# Expected: {"the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "barks"}
unique_words = None


"""
Exercise 8: Generator Expression
--------------------------------
Create a generator that yields squares of numbers 1-1000000.
Then find the sum of all squares less than 10000.
"""
# Use generator expression (not list) for memory efficiency
total = None


"""
Exercise 9: Parse CSV Data
--------------------------
Parse this CSV string into a list of dictionaries.
"""
csv_data = """name,age,city
Alice,30,NYC
Bob,25,LA
Charlie,35,Chicago"""

# Expected: [{"name": "Alice", "age": "30", "city": "NYC"}, ...]
# Hint: First split by newlines, then split header and rows
records = None


"""
Exercise 10: Complex Transformation
-----------------------------------
From the products list:
1. Filter only in-stock items
2. Apply 20% discount to price
3. Create dict mapping name to discounted price
"""
products = [
    {"name": "Laptop", "price": 1000, "in_stock": True},
    {"name": "Mouse", "price": 50, "in_stock": True},
    {"name": "Keyboard", "price": 100, "in_stock": False},
    {"name": "Monitor", "price": 500, "in_stock": True},
]

# Expected: {"Laptop": 800.0, "Mouse": 40.0, "Monitor": 400.0}
discounted = None


"""
BONUS: Matrix Operations
------------------------
Implement these using comprehensions.
"""
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# 1. Transpose the matrix
transposed = None  # Expected: [[1,4,7], [2,5,8], [3,6,9]]

# 2. Get diagonal elements
diagonal = None  # Expected: [1, 5, 9]

# 3. Flatten and get only elements where row_index == col_index
# (another way to get diagonal)
diagonal_v2 = None
