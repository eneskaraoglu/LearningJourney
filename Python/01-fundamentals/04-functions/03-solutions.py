# Functions - Exercise Solutions

"""
Exercise 1: Basic Function
"""
def format_name(first, last):
    return f"{last}, {first}"

print(format_name("John", "Doe"))  # Doe, John

print("\n" + "="*50 + "\n")


"""
Exercise 2: Default Parameters
"""
def power(x, n=2):
    return x ** n

print(power(5))      # 25
print(power(2, 10))  # 1024

print("\n" + "="*50 + "\n")


"""
Exercise 3: Multiple Return Values
"""
def min_max(numbers):
    return (min(numbers), max(numbers))

# Alternative manual implementation:
def min_max_manual(numbers):
    min_val = numbers[0]
    max_val = numbers[0]
    for num in numbers:
        if num < min_val:
            min_val = num
        if num > max_val:
            max_val = num
    return (min_val, max_val)

result = min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(result)  # (1, 9)

# Unpack the result
minimum, maximum = min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(f"Min: {minimum}, Max: {maximum}")

print("\n" + "="*50 + "\n")


"""
Exercise 4: *args - Sum Calculator
"""
def add_all(*args):
    return sum(args)

# Alternative manual:
def add_all_manual(*args):
    total = 0
    for num in args:
        total += num
    return total

print(add_all(1, 2))           # 3
print(add_all(1, 2, 3, 4, 5))  # 15
print(add_all())               # 0

print("\n" + "="*50 + "\n")


"""
Exercise 5: **kwargs - Build HTML Tag
"""
def build_tag(tag_name, **attributes):
    if attributes:
        attrs = " ".join(f'{key}="{value}"' for key, value in attributes.items())
        return f'<{tag_name} {attrs}></{tag_name}>'
    else:
        return f'<{tag_name}></{tag_name}>'

print(build_tag("a", href="https://python.org", target="_blank"))
# <a href="https://python.org" target="_blank"></a>

print(build_tag("img", src="photo.jpg", alt="A photo", width="100"))
# <img src="photo.jpg" alt="A photo" width="100"></img>

print(build_tag("div"))
# <div></div>

print("\n" + "="*50 + "\n")


"""
Exercise 6: Lambda Sorting
"""
products = [
    {"name": "Laptop", "price": 999},
    {"name": "Mouse", "price": 25},
    {"name": "Keyboard", "price": 75},
    {"name": "Monitor", "price": 300}
]

sorted_products = sorted(products, key=lambda p: p["price"])

for product in sorted_products:
    print(f"{product['name']}: ${product['price']}")
# Mouse: $25
# Keyboard: $75
# Monitor: $300
# Laptop: $999

# Sort descending:
sorted_desc = sorted(products, key=lambda p: p["price"], reverse=True)

print("\n" + "="*50 + "\n")


"""
Exercise 7: Higher-Order Function
"""
def apply_operation(numbers, operation):
    result = []
    for num in numbers:
        result.append(operation(num))
    return result

# Alternative one-liner:
def apply_operation_v2(numbers, operation):
    return [operation(num) for num in numbers]

# Or using map:
def apply_operation_v3(numbers, operation):
    return list(map(operation, numbers))

nums = [1, 2, 3, 4, 5]
print(apply_operation(nums, lambda x: x * 2))    # [2, 4, 6, 8, 10]
print(apply_operation(nums, lambda x: x ** 2))   # [1, 4, 9, 16, 25]

print("\n" + "="*50 + "\n")


"""
Exercise 8: Function Factory
"""
def make_greeting(greeting):
    def greeter(name):
        return f"{greeting}, {name}!"
    return greeter

say_hello = make_greeting("Hello")
say_hi = make_greeting("Hi")
say_welcome = make_greeting("Welcome")

print(say_hello("Alice"))     # Hello, Alice!
print(say_hi("Bob"))          # Hi, Bob!
print(say_welcome("Charlie")) # Welcome, Charlie!

print("\n" + "="*50 + "\n")


"""
BONUS: Decorator Preview
"""
def debug(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"Result: {result}")
        return result
    return wrapper

@debug
def add(a, b):
    return a + b

@debug
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print("--- Testing debug decorator ---")
add(3, 5)
# Calling add with args=(3, 5), kwargs={}
# Result: 8

greet("Alice", greeting="Hi")
# Calling greet with args=('Alice',), kwargs={'greeting': 'Hi'}
# Result: Hi, Alice!
