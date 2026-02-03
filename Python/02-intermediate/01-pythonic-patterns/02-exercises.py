# Pythonic Patterns - Exercises

"""
Exercise 1: Rewrite Pythonically
--------------------------------
Rewrite this Java-style code in Pythonic way.
"""

# ❌ Non-Pythonic code to fix:
def process_users_old(users):
    result = []
    for i in range(len(users)):
        if users[i]["active"] == True:
            if users[i]["age"] >= 18:
                result.append(users[i]["name"])
    return result

# ✅ Your Pythonic version:
def process_users(users):
    pass


"""
Exercise 2: Dictionary Operations
---------------------------------
Rewrite using Pythonic patterns.
"""

def count_words_old(text):
    words = text.lower().split()
    counts = {}
    for word in words:
        if word in counts:
            counts[word] = counts[word] + 1
        else:
            counts[word] = 1
    return counts

# ✅ Your Pythonic version (hint: use dict.get() or defaultdict):
def count_words(text):
    pass


"""
Exercise 3: Use enumerate and zip
---------------------------------
Print a formatted leaderboard.
"""

names = ["Alice", "Bob", "Charlie", "Diana"]
scores = [95, 87, 92, 88]

# Expected output:
# 1st: Alice - 95 points
# 2nd: Bob - 87 points
# 3rd: Charlie - 92 points
# 4th: Diana - 88 points

def print_leaderboard(names, scores):
    pass


"""
Exercise 4: Unpacking
---------------------
Use unpacking to simplify this code.
"""

def get_user_info():
    return ("Alice", 30, "NYC", "Engineer", True)

# ❌ Old way
info = get_user_info()
name = info[0]
age = info[1]
city = info[2]
# We don't need job and active

# ✅ Your version using unpacking:


"""
Exercise 5: any() and all()
---------------------------
Implement these validation functions using any/all.
"""

def has_admin(users):
    """Return True if any user is an admin."""
    pass

def all_verified(users):
    """Return True if all users are verified."""
    pass

def has_invalid_email(users):
    """Return True if any user has invalid email (no @ symbol)."""
    pass

# Test data:
users = [
    {"name": "Alice", "is_admin": True, "verified": True, "email": "alice@example.com"},
    {"name": "Bob", "is_admin": False, "verified": True, "email": "bob@example.com"},
    {"name": "Charlie", "is_admin": False, "verified": False, "email": "charlie.com"},
]


"""
Exercise 6: Walrus Operator (Python 3.8+)
-----------------------------------------
Rewrite using the walrus operator.
"""

# ❌ Without walrus
def find_first_long_word_old(words, min_length=5):
    for word in words:
        stripped = word.strip()
        if len(stripped) >= min_length:
            return stripped
    return None

# ✅ Your version with walrus operator:
def find_first_long_word(words, min_length=5):
    pass


"""
Exercise 7: Merge and Transform Dicts
-------------------------------------
Merge these configs and add computed values.
"""

default_config = {
    "host": "localhost",
    "port": 8080,
    "debug": False,
    "timeout": 30
}

user_config = {
    "port": 3000,
    "debug": True
}

# Create final_config that:
# 1. Merges both (user overrides default)
# 2. Adds "url" key with value "http://{host}:{port}"

def merge_config(default, user):
    pass


"""
Exercise 8: Refactor to Pythonic
--------------------------------
Completely refactor this function.
"""

def process_data_old(items):
    if items == None:
        return []
    if len(items) == 0:
        return []
    
    result = []
    index = 0
    for i in range(len(items)):
        item = items[i]
        if item["status"] == "active":
            new_item = {}
            new_item["id"] = item["id"]
            new_item["name"] = item["name"].upper()
            new_item["index"] = index
            result.append(new_item)
            index = index + 1
    
    return result

# ✅ Your Pythonic version:
def process_data(items):
    pass


"""
BONUS: One-liner Challenges
---------------------------
Solve each in a single expression.
"""

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1. Sum of squares of even numbers
sum_even_squares = None  # Expected: 4+16+36+64+100 = 220

# 2. Create dict mapping number to its cube
cubes = None  # Expected: {1:1, 2:8, 3:27, ...}

# 3. Find first number > 5 or None
first_over_5 = None  # Expected: 6

# 4. Check if any number is divisible by 7
has_div_7 = None  # Expected: True (7 is divisible by 7)

# 5. Flatten and get unique sorted values
nested = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
unique_sorted = None  # Expected: [1, 2, 3, 4, 5]
