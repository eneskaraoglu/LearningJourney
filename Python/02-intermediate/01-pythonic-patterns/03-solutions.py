# Pythonic Patterns - Solutions

"""Exercise 1: Rewrite Pythonically"""
def process_users(users):
    return [u["name"] for u in users if u["active"] and u["age"] >= 18]

# Test
users = [
    {"name": "Alice", "age": 25, "active": True},
    {"name": "Bob", "age": 17, "active": True},
    {"name": "Charlie", "age": 30, "active": False},
]
print(f"Ex 1: {process_users(users)}")


"""Exercise 2: Dictionary Operations"""
def count_words(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts

# Alternative with Counter:
from collections import Counter
def count_words_v2(text):
    return Counter(text.lower().split())

print(f"Ex 2: {count_words('the quick brown fox jumps over the lazy dog the fox')}")


"""Exercise 3: Use enumerate and zip"""
def print_leaderboard(names, scores):
    suffixes = ["st", "nd", "rd"] + ["th"] * 10
    for i, (name, score) in enumerate(zip(names, scores), start=1):
        suffix = suffixes[i - 1] if i <= len(suffixes) else "th"
        print(f"{i}{suffix}: {name} - {score} points")

names = ["Alice", "Bob", "Charlie", "Diana"]
scores = [95, 87, 92, 88]
print("Ex 3:")
print_leaderboard(names, scores)


"""Exercise 4: Unpacking"""
def get_user_info():
    return ("Alice", 30, "NYC", "Engineer", True)

# Pythonic unpacking - ignore what we don't need
name, age, city, *_ = get_user_info()
# Or more explicitly:
name, age, city, _, _ = get_user_info()

print(f"\nEx 4: name={name}, age={age}, city={city}")


"""Exercise 5: any() and all()"""
users = [
    {"name": "Alice", "is_admin": True, "verified": True, "email": "alice@example.com"},
    {"name": "Bob", "is_admin": False, "verified": True, "email": "bob@example.com"},
    {"name": "Charlie", "is_admin": False, "verified": False, "email": "charlie.com"},
]

def has_admin(users):
    return any(u["is_admin"] for u in users)

def all_verified(users):
    return all(u["verified"] for u in users)

def has_invalid_email(users):
    return any("@" not in u["email"] for u in users)

print(f"\nEx 5: has_admin={has_admin(users)}, all_verified={all_verified(users)}, has_invalid={has_invalid_email(users)}")


"""Exercise 6: Walrus Operator"""
def find_first_long_word(words, min_length=5):
    return next((s for w in words if len(s := w.strip()) >= min_length), None)

# Alternative without walrus:
def find_first_long_word_v2(words, min_length=5):
    return next((w.strip() for w in words if len(w.strip()) >= min_length), None)

words = ["  hi  ", "hello", "  world  ", "python"]
print(f"\nEx 6: {find_first_long_word(words)}")


"""Exercise 7: Merge and Transform Dicts"""
def merge_config(default, user):
    config = {**default, **user}  # or default | user in Python 3.9+
    config["url"] = f"http://{config['host']}:{config['port']}"
    return config

default_config = {"host": "localhost", "port": 8080, "debug": False, "timeout": 30}
user_config = {"port": 3000, "debug": True}

print(f"\nEx 7: {merge_config(default_config, user_config)}")


"""Exercise 8: Refactor to Pythonic"""
def process_data(items):
    if not items:
        return []
    
    return [
        {"id": item["id"], "name": item["name"].upper(), "index": i}
        for i, item in enumerate(item for item in items if item["status"] == "active")
    ]

# Or slightly more readable:
def process_data_v2(items):
    if not items:
        return []
    
    active = [item for item in items if item["status"] == "active"]
    return [
        {"id": item["id"], "name": item["name"].upper(), "index": i}
        for i, item in enumerate(active)
    ]

items = [
    {"id": 1, "name": "alice", "status": "active"},
    {"id": 2, "name": "bob", "status": "inactive"},
    {"id": 3, "name": "charlie", "status": "active"},
]
print(f"\nEx 8: {process_data(items)}")


"""BONUS: One-liner Challenges"""
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1. Sum of squares of even numbers
sum_even_squares = sum(x**2 for x in numbers if x % 2 == 0)
print(f"\nBonus 1: {sum_even_squares}")  # 220

# 2. Create dict mapping number to its cube
cubes = {x: x**3 for x in numbers}
print(f"Bonus 2: {cubes}")

# 3. Find first number > 5 or None
first_over_5 = next((x for x in numbers if x > 5), None)
print(f"Bonus 3: {first_over_5}")  # 6

# 4. Check if any number is divisible by 7
has_div_7 = any(x % 7 == 0 for x in numbers)
print(f"Bonus 4: {has_div_7}")  # True

# 5. Flatten and get unique sorted values
nested = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
unique_sorted = sorted(set(x for row in nested for x in row))
print(f"Bonus 5: {unique_sorted}")  # [1, 2, 3, 4, 5]
