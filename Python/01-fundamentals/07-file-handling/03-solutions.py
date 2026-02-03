# File Handling - Exercise Solutions

import csv
import json
from datetime import datetime
from pathlib import Path


"""Exercise 1: Read and Count"""
with open("sample.txt", "w") as f:
    f.write("""Python is a great language.
It is used for web development.
It is also used for data science and machine learning.
Python is easy to learn.""")

with open("sample.txt", "r") as f:
    content = f.read()
    lines = content.split("\n")
    words = content.split()
    chars = len(content)
    
print(f"Ex 1: Lines: {len(lines)}, Words: {len(words)}, Chars: {chars}")


"""Exercise 2: Write a Log File"""
def log_message(message, filename="app.log"):
    with open(filename, "a") as f:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"[{timestamp}] {message}\n")

log_message("Application started")
log_message("User logged in")
print("Ex 2: Log messages written to app.log")


"""Exercise 3: CSV Reader"""
with open("users.csv", "w") as f:
    f.write("name,age,city\nAlice,30,New York\nBob,25,Los Angeles")

def read_csv_as_dicts(filename):
    with open(filename, "r") as f:
        reader = csv.DictReader(f)
        return list(reader)

users = read_csv_as_dicts("users.csv")
print(f"Ex 3: {users}")


"""Exercise 4: JSON Config"""
def load_config(filename="config.json"):
    default_config = {"theme": "light", "language": "en", "debug": False}
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return default_config

def save_config(config, filename="config.json"):
    with open(filename, "w") as f:
        json.dump(config, f, indent=2)

config = load_config()
config["theme"] = "dark"
save_config(config)
print(f"Ex 4: Config saved: {config}")


"""Exercise 5: Find and Replace"""
def find_replace(input_file, output_file, find_word, replace_word):
    with open(input_file, "r") as f:
        content = f.read()
    
    modified = content.replace(find_word, replace_word)
    
    with open(output_file, "w") as f:
        f.write(modified)

find_replace("sample.txt", "sample_modified.txt", "Python", "Java")
print("Ex 5: Find/replace completed")


"""Exercise 6: Merge CSV Files"""
with open("scores1.csv", "w") as f:
    f.write("name,score\nAlice,85\nBob,90")
with open("scores2.csv", "w") as f:
    f.write("name,score\nCharlie,78\nDiana,92")

def merge_csv_files(file_list, output_file):
    all_rows = []
    header = None
    
    for filename in file_list:
        with open(filename, "r") as f:
            reader = csv.reader(f)
            file_header = next(reader)
            if header is None:
                header = file_header
                all_rows.append(header)
            all_rows.extend(reader)
    
    with open(output_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerows(all_rows)

merge_csv_files(["scores1.csv", "scores2.csv"], "all_scores.csv")
print("Ex 6: CSV files merged")


"""Exercise 7: Directory Listing"""
def list_files_by_size(directory="."):
    path = Path(directory)
    files = [(f, f.stat().st_size) for f in path.iterdir() if f.is_file()]
    files.sort(key=lambda x: x[1], reverse=True)
    
    for f, size in files[:5]:  # Show top 5
        print(f"  {f.name}: {size} bytes")

print("Ex 7: Files by size:")
list_files_by_size(".")


"""BONUS: JSON Data Processor"""
users_data = [
    {"name": "Alice", "age": 30, "active": True},
    {"name": "Bob", "age": 17, "active": True},
    {"name": "Charlie", "age": 25, "active": False},
    {"name": "Diana", "age": 19, "active": True}
]
with open("users.json", "w") as f:
    json.dump(users_data, f)

def filter_users(input_file, output_file, condition_func):
    with open(input_file, "r") as f:
        users = json.load(f)
    
    filtered = [u for u in users if condition_func(u)]
    
    with open(output_file, "w") as f:
        json.dump(filtered, f, indent=2)
    
    return filtered

result = filter_users("users.json", "active_adults.json", 
                      lambda u: u["age"] >= 18 and u["active"])
print(f"Bonus: Filtered users: {[u['name'] for u in result]}")
