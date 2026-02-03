# Exception Handling - Practice Exercises

"""
Exercise 1: Basic Exception Handling
------------------------------------
Write a function that safely converts a string to an integer.
Return None if conversion fails.
"""

def safe_int(value):
    # Your code:
    pass

# Test:
# print(safe_int("42"))      # 42
# print(safe_int("hello"))   # None
# print(safe_int("3.14"))    # None


"""
Exercise 2: Multiple Exceptions
-------------------------------
Write a function that safely accesses a list element.
Handle IndexError and TypeError appropriately.
"""

def safe_get(lst, index, default=None):
    # Your code:
    pass

# Test:
# print(safe_get([1, 2, 3], 1))      # 2
# print(safe_get([1, 2, 3], 10))     # None
# print(safe_get([1, 2, 3], "a"))    # None
# print(safe_get(None, 0))           # None


"""
Exercise 3: File Operations with Exceptions
-------------------------------------------
Write a function that reads a file and returns its contents.
Return an error message if file doesn't exist or can't be read.
"""

def read_file_safe(filename):
    # Your code:
    pass

# Test:
# print(read_file_safe("existing.txt"))     # File contents
# print(read_file_safe("nonexistent.txt"))  # Error message


"""
Exercise 4: Custom Exception
----------------------------
Create a custom exception 'InvalidEmailError'.
Write a function that validates email addresses.
"""

class InvalidEmailError(Exception):
    # Your code:
    pass

def validate_email(email):
    # Must contain @ and .
    # Must have text before @ and after .
    # Your code:
    pass

# Test:
# validate_email("user@example.com")  # OK
# validate_email("invalid")           # Raises InvalidEmailError


"""
Exercise 5: Exception Chaining
------------------------------
Write a function that processes a config file.
If there's an error, raise a ConfigError with the original exception.
"""

class ConfigError(Exception):
    pass

def load_config(filename):
    # Should raise ConfigError with original exception chained
    # Your code:
    pass


"""
Exercise 6: Try/Except/Else/Finally
-----------------------------------
Write a function that demonstrates all four blocks.
- Try to open and read a file
- Except: handle file not found
- Else: process the content (count lines)
- Finally: print "Operation complete"
"""

def process_file(filename):
    # Your code:
    pass

# Test:
# process_file("existing.txt")
# process_file("nonexistent.txt")


"""
Exercise 7: Retry Decorator
---------------------------
Create a decorator that retries a function up to N times
if it raises an exception.
"""

def retry(max_attempts=3):
    def decorator(func):
        def wrapper(*args, **kwargs):
            # Your code:
            pass
        return wrapper
    return decorator

# Test:
# @retry(max_attempts=3)
# def unreliable_function():
#     import random
#     if random.random() < 0.7:
#         raise ValueError("Random failure!")
#     return "Success!"
#
# print(unreliable_function())


"""
Exercise 8: Context Manager
---------------------------
Create a context manager class that suppresses specified exceptions
and logs them instead.
"""

class ExceptionLogger:
    def __init__(self, *exceptions_to_catch):
        # Your code:
        pass
    
    def __enter__(self):
        # Your code:
        pass
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Your code:
        pass

# Test:
# with ExceptionLogger(ValueError, TypeError):
#     int("not a number")  # Should be logged, not raised
# print("Continued execution")


"""
BONUS: Validation Class
-----------------------
Create a Validator class with methods that raise appropriate
exceptions for invalid data.
"""

class ValidationError(Exception):
    pass

class Validator:
    @staticmethod
    def require_positive(value, name="value"):
        # Your code:
        pass
    
    @staticmethod
    def require_non_empty(value, name="value"):
        # Your code:
        pass
    
    @staticmethod
    def require_in_range(value, min_val, max_val, name="value"):
        # Your code:
        pass

# Test:
# Validator.require_positive(-5, "age")     # Raises ValidationError
# Validator.require_non_empty("", "name")   # Raises ValidationError
# Validator.require_in_range(150, 0, 100)   # Raises ValidationError
