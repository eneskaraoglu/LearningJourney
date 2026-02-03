# Modules and Packages - Solutions (Complete)

import math
import json
from datetime import datetime
from collections import Counter, defaultdict, namedtuple
from pathlib import Path
from itertools import combinations, permutations, chain
from functools import lru_cache, partial, reduce

print("="*60)
print("Modules and Packages - Solutions")
print("="*60)


"""Exercise 1: mathutils.py content"""
print("\nEx 1: mathutils.py code:")
print("-" * 40)
mathutils_code = '''
import math

TAU = 2 * math.pi

def circle_area(radius):
    return math.pi * radius ** 2

def circle_circumference(radius):
    return TAU * radius
'''
print(mathutils_code)


"""Exercise 3: Standard Library"""
print("\nEx 3: Standard Library Usage")
print("-" * 40)

# 1. Current date
current_date = datetime.now().strftime("%Y-%m-%d")
print(f"3.1 Current date: {current_date}")

# 2. Word frequency
sentence = "the quick brown fox jumps over the lazy dog the fox"
word_counts = Counter(sentence.split())
print(f"3.2 Word counts: {dict(word_counts)}")

# 3. Python files
py_files = list(Path('.').glob('*.py'))
print(f"3.3 Python files found: {len(py_files)}")


"""Exercise 4: JSON Functions"""
print("\nEx 4: JSON Functions")
print("-" * 40)

def save_users(users, filename):
    with open(filename, 'w') as f:
        json.dump(users, f, indent=2)

def load_users(filename):
    try:
        with open(filename, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

users = [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]
save_users(users, "test_users.json")
loaded = load_users("test_users.json")
print(f"Saved and loaded: {loaded}")


"""Exercise 6: Collections Module"""
print("\nEx 6: Collections Module")
print("-" * 40)

# Most common characters
text = "abracadabra"
most_common = Counter(text).most_common(3)
print(f"6.1 Most common in '{text}': {most_common}")

# Group by first letter
words = ["apple", "banana", "apricot", "cherry", "blueberry", "avocado"]
grouped = defaultdict(list)
for word in words:
    grouped[word[0]].append(word)
print(f"6.2 Grouped by first letter: {dict(grouped)}")

# Point and distance
Point = namedtuple('Point', ['x', 'y'])
p1, p2 = Point(0, 0), Point(3, 4)
distance = math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2)
print(f"6.3 Distance from {p1} to {p2}: {distance}")


"""Exercise 7: itertools"""
print("\nEx 7: itertools")
print("-" * 40)

people = ["Alice", "Bob", "Charlie", "Diana"]
teams = list(combinations(people, 2))
print(f"7.1 2-person teams: {teams}")

orderings = list(permutations(["A", "B", "C"]))
print(f"7.2 Permutations of ABC: {len(orderings)} total")

combined = list(chain([1,2], [3,4], [5,6]))
print(f"7.3 Chained lists: {combined}")


"""Exercise 8: functools"""
print("\nEx 8: functools")
print("-" * 40)

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)
print(f"8.1 fib(30) = {fib(30)}")

double = partial(lambda a, b: a * b, 2)
print(f"8.2 double(5) = {double(5)}")

product = reduce(lambda a, b: a * b, [1, 2, 3, 4, 5])
print(f"8.3 Product of [1,2,3,4,5] = {product}")


"""BONUS: CLI Tool Code"""
print("\nBonus: CLI Tool Template")
print("-" * 40)
cli_code = '''
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python cli_tool.py <command> [args]")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "greet":
        name = sys.argv[2] if len(sys.argv) > 2 else "World"
        print(f"Hello, {name}!")
    elif command == "add":
        nums = [float(x) for x in sys.argv[2:]]
        print(f"Sum: {sum(nums)}")
    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()
'''
print("CLI tool code created (see above)")

print("\n" + "="*60)
print("All exercises completed!")
print("="*60)
