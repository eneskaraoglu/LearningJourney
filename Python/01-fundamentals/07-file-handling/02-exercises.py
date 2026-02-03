# File Handling - Practice Exercises

"""
Exercise 1: Read and Count
--------------------------
Create a file called 'sample.txt' with some text, then:
- Read the file
- Count the number of lines, words, and characters
"""

# First, create the sample file
sample_text = """Python is a great language.
It is used for web development.
It is also used for data science and machine learning.
Python is easy to learn."""

# Create the file
with open("sample.txt", "w") as f:
    f.write(sample_text)

# Now read and count:
# Your code:



"""
Exercise 2: Write a Log File
----------------------------
Create a function that logs messages with timestamps to a file.
"""
from datetime import datetime

def log_message(message, filename="app.log"):
    # Your code:
    pass

# Test:
# log_message("Application started")
# log_message("User logged in")
# log_message("Processing data")



"""
Exercise 3: CSV Reader
----------------------
Create a CSV file and read it back as a list of dictionaries.
"""

# Create CSV file first
csv_data = """name,age,city
Alice,30,New York
Bob,25,Los Angeles
Charlie,35,Chicago"""

with open("users.csv", "w") as f:
    f.write(csv_data)

# Now read it as list of dicts:
# Your code:
def read_csv_as_dicts(filename):
    pass

# users = read_csv_as_dicts("users.csv")
# print(users)



"""
Exercise 4: JSON Config
-----------------------
Create a function that:
- Loads config from JSON file
- Returns default config if file doesn't exist
- Saves config to file
"""

def load_config(filename="config.json"):
    # Your code:
    pass

def save_config(config, filename="config.json"):
    # Your code:
    pass

# Test:
# config = load_config()  # Should return default if not exists
# config["theme"] = "dark"
# save_config(config)



"""
Exercise 5: Find and Replace
----------------------------
Create a function that reads a file, replaces all occurrences
of a word, and writes to a new file.
"""

def find_replace(input_file, output_file, find_word, replace_word):
    # Your code:
    pass

# Test:
# find_replace("sample.txt", "sample_modified.txt", "Python", "Java")



"""
Exercise 6: Merge CSV Files
---------------------------
Create a function that merges multiple CSV files into one.
Assume all CSV files have the same columns.
"""

# Create test files
csv1 = "name,score\nAlice,85\nBob,90"
csv2 = "name,score\nCharlie,78\nDiana,92"

with open("scores1.csv", "w") as f:
    f.write(csv1)
with open("scores2.csv", "w") as f:
    f.write(csv2)

def merge_csv_files(file_list, output_file):
    # Your code:
    pass

# merge_csv_files(["scores1.csv", "scores2.csv"], "all_scores.csv")



"""
Exercise 7: Directory Listing
-----------------------------
Using pathlib, create a function that lists all files
in a directory with their sizes, sorted by size.
"""
from pathlib import Path

def list_files_by_size(directory="."):
    # Your code:
    pass

# list_files_by_size(".")



"""
BONUS: JSON Data Processor
--------------------------
Create functions to:
1. Read a JSON file containing a list of users
2. Filter users by a condition
3. Save filtered users to a new JSON file
"""

# Create test data
users_data = [
    {"name": "Alice", "age": 30, "active": True},
    {"name": "Bob", "age": 17, "active": True},
    {"name": "Charlie", "age": 25, "active": False},
    {"name": "Diana", "age": 19, "active": True}
]

import json
with open("users.json", "w") as f:
    json.dump(users_data, f, indent=2)

def filter_users(input_file, output_file, condition_func):
    # Your code:
    pass

# Example: Filter active adults (age >= 18 and active)
# filter_users("users.json", "active_adults.json", 
#              lambda u: u["age"] >= 18 and u["active"])
