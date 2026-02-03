# Exception Handling - Exercise Solutions

"""Exercise 1: Basic Exception Handling"""
def safe_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None

print(f"Ex 1: safe_int('42')={safe_int('42')}, safe_int('hello')={safe_int('hello')}")


"""Exercise 2: Multiple Exceptions"""
def safe_get(lst, index, default=None):
    try:
        return lst[index]
    except (IndexError, TypeError, KeyError):
        return default

print(f"Ex 2: safe_get([1,2,3], 1)={safe_get([1,2,3], 1)}, safe_get([1,2,3], 10)={safe_get([1,2,3], 10)}")


"""Exercise 3: File Operations with Exceptions"""
def read_file_safe(filename):
    try:
        with open(filename, "r") as f:
            return f.read()
    except FileNotFoundError:
        return f"Error: File '{filename}' not found"
    except PermissionError:
        return f"Error: Permission denied for '{filename}'"
    except IOError as e:
        return f"Error reading file: {e}"

print(f"Ex 3: {read_file_safe('nonexistent.txt')}")


"""Exercise 4: Custom Exception"""
class InvalidEmailError(Exception):
    def __init__(self, email, message=None):
        self.email = email
        self.message = message or f"Invalid email: {email}"
        super().__init__(self.message)

def validate_email(email):
    if not isinstance(email, str):
        raise InvalidEmailError(email, "Email must be a string")
    if "@" not in email:
        raise InvalidEmailError(email, "Email must contain @")
    if "." not in email.split("@")[-1]:
        raise InvalidEmailError(email, "Email domain must contain .")
    parts = email.split("@")
    if len(parts[0]) == 0 or len(parts[1]) == 0:
        raise InvalidEmailError(email, "Email must have text before and after @")
    return True

try:
    validate_email("invalid")
except InvalidEmailError as e:
    print(f"Ex 4: {e}")


"""Exercise 5: Exception Chaining"""
class ConfigError(Exception):
    pass

def load_config(filename):
    try:
        with open(filename, "r") as f:
            import json
            return json.load(f)
    except FileNotFoundError as e:
        raise ConfigError(f"Config file not found: {filename}") from e
    except json.JSONDecodeError as e:
        raise ConfigError(f"Invalid JSON in config: {filename}") from e

try:
    load_config("nonexistent_config.json")
except ConfigError as e:
    print(f"Ex 5: {e}")


"""Exercise 6: Try/Except/Else/Finally"""
def process_file(filename):
    try:
        f = open(filename, "r")
    except FileNotFoundError:
        print(f"  File '{filename}' not found")
        return None
    else:
        content = f.read()
        line_count = len(content.split("\n"))
        print(f"  File has {line_count} lines")
        f.close()
        return line_count
    finally:
        print("  Operation complete")

# Create test file
with open("test_file.txt", "w") as f:
    f.write("Line 1\nLine 2\nLine 3")

print("Ex 6:")
process_file("test_file.txt")
process_file("nonexistent.txt")


"""Exercise 7: Retry Decorator"""
import functools
import time

def retry(max_attempts=3, delay=0.1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    print(f"  Attempt {attempt + 1} failed: {e}")
                    if attempt < max_attempts - 1:
                        time.sleep(delay)
            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3)
def unreliable_function():
    import random
    if random.random() < 0.6:
        raise ValueError("Random failure!")
    return "Success!"

print("Ex 7:")
try:
    result = unreliable_function()
    print(f"  Result: {result}")
except ValueError as e:
    print(f"  All attempts failed: {e}")


"""Exercise 8: Context Manager"""
class ExceptionLogger:
    def __init__(self, *exceptions_to_catch):
        self.exceptions = exceptions_to_catch or (Exception,)
        self.logged_exceptions = []
    
    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None and issubclass(exc_type, self.exceptions):
            self.logged_exceptions.append((exc_type, exc_val))
            print(f"  Logged exception: {exc_type.__name__}: {exc_val}")
            return True  # Suppress the exception
        return False

print("Ex 8:")
with ExceptionLogger(ValueError, TypeError) as logger:
    int("not a number")
print("  Continued execution after suppressed exception")


"""BONUS: Validation Class"""
class ValidationError(Exception):
    pass

class Validator:
    @staticmethod
    def require_positive(value, name="value"):
        if not isinstance(value, (int, float)):
            raise ValidationError(f"{name} must be a number")
        if value <= 0:
            raise ValidationError(f"{name} must be positive, got {value}")
        return value
    
    @staticmethod
    def require_non_empty(value, name="value"):
        if value is None or (hasattr(value, "__len__") and len(value) == 0):
            raise ValidationError(f"{name} cannot be empty")
        return value
    
    @staticmethod
    def require_in_range(value, min_val, max_val, name="value"):
        if not isinstance(value, (int, float)):
            raise ValidationError(f"{name} must be a number")
        if not (min_val <= value <= max_val):
            raise ValidationError(f"{name} must be between {min_val} and {max_val}, got {value}")
        return value

print("Bonus:")
try:
    Validator.require_positive(-5, "age")
except ValidationError as e:
    print(f"  {e}")

try:
    Validator.require_in_range(150, 0, 100, "score")
except ValidationError as e:
    print(f"  {e}")

print("\n✅ All exercises completed!")
