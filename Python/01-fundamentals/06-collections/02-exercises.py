# Collections - Practice Exercises

"""
Exercise 1: List Manipulation
-----------------------------
Given a list of numbers, return a new list with:
- Duplicates removed
- Sorted in descending order
"""
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]

# Your code:
result = 
print(result)  # [9, 6, 5, 4, 3, 2, 1]


"""
Exercise 2: List Comprehension - Squares
----------------------------------------
Create a list of squares for numbers 1-10, but only for odd numbers.
"""
# Your code:
odd_squares = 
print(odd_squares)  # [1, 9, 25, 49, 81]


"""
Exercise 3: List Comprehension - Filter Strings
-----------------------------------------------
Given a list of words, keep only words longer than 3 characters
and convert them to uppercase.
"""
words = ["hi", "hello", "hey", "world", "python", "go", "java"]

# Your code:
result = 
print(result)  # ['HELLO', 'WORLD', 'PYTHON', 'JAVA']


"""
Exercise 4: Dictionary Basics
-----------------------------
Create a function that counts character frequency in a string.
Return as a dictionary.
"""
def char_frequency(text):
    # Your code:
    pass

print(char_frequency("hello"))  # {'h': 1, 'e': 1, 'l': 2, 'o': 1}


"""
Exercise 5: Dict Comprehension
------------------------------
Create a dict mapping numbers 1-5 to their cubes.
"""
# Your code:
cubes = 
print(cubes)  # {1: 1, 2: 8, 3: 27, 4: 64, 5: 125}


"""
Exercise 6: Nested Dict Access
------------------------------
Given the data below, extract all student names who scored > 80.
"""
students = {
    "class_a": [
        {"name": "Alice", "score": 85},
        {"name": "Bob", "score": 72},
    ],
    "class_b": [
        {"name": "Charlie", "score": 90},
        {"name": "Diana", "score": 68},
    ]
}

# Your code:
top_students = 
print(top_students)  # ['Alice', 'Charlie']


"""
Exercise 7: Set Operations
--------------------------
Given two lists of student IDs who completed assignments 1 and 2,
find students who:
a) Completed both
b) Completed at least one
c) Completed only assignment 1
"""
assignment1 = [1, 2, 3, 4, 5]
assignment2 = [3, 4, 5, 6, 7]

# Your code:
both = 
at_least_one = 
only_first = 


"""
Exercise 8: Word Frequency Counter
----------------------------------
Count word frequency in a sentence (case-insensitive).
"""
text = "The quick brown fox jumps over the lazy dog the fox"

# Your code:
word_count = 
print(word_count)


"""
BONUS: Flatten and Unique
-------------------------
Given a nested list, return a sorted list of unique elements.
"""
nested = [[1, 2, 3], [2, 3, 4], [3, 4, 5], [1, 5, 6]]

# Your code (hint: use set and list comprehension):
unique_sorted = 
print(unique_sorted)  # [1, 2, 3, 4, 5, 6]
