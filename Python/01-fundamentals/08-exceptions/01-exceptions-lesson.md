# Session 8: Exception Handling

## 🎯 Learning Objectives
- Handle exceptions with try/except
- Use finally and else blocks
- Raise custom exceptions
- Create custom exception classes
- Apply best practices for error handling

---

## 1. Basic Exception Handling

### Java vs Python
```java
// Java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Cleanup");
}
```

```python
# Python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
finally:
    print("Cleanup")
```

---

## 2. Try / Except / Else / Finally

```python
try:
    # Code that might raise an exception
    result = risky_operation()
except SomeException as e:
    # Handle specific exception
    print(f"Error: {e}")
except AnotherException:
    # Handle another exception
    pass
except (TypeError, ValueError) as e:
    # Handle multiple exceptions
    print(f"Type or Value error: {e}")
except Exception as e:
    # Catch-all (use sparingly!)
    print(f"Unexpected error: {e}")
else:
    # Runs ONLY if no exception occurred
    print(f"Success! Result: {result}")
finally:
    # ALWAYS runs (cleanup code)
    print("Cleanup complete")
```

### Flow Diagram
```
try block
    │
    ├── Exception? ──Yes──► except block ──► finally
    │
    └── No Exception ──► else block ──► finally
```

---

## 3. Common Built-in Exceptions

| Exception | Cause |
|-----------|-------|
| `ValueError` | Wrong value (e.g., `int("abc")`) |
| `TypeError` | Wrong type (e.g., `"a" + 1`) |
| `KeyError` | Dict key not found |
| `IndexError` | List index out of range |
| `FileNotFoundError` | File doesn't exist |
| `ZeroDivisionError` | Division by zero |
| `AttributeError` | Attribute not found |
| `ImportError` | Module not found |
| `RuntimeError` | Generic runtime error |
| `StopIteration` | Iterator exhausted |

### Exception Hierarchy (Partial)
```
BaseException
├── SystemExit
├── KeyboardInterrupt
└── Exception
    ├── ValueError
    ├── TypeError
    ├── KeyError
    ├── IndexError
    ├── FileNotFoundError (IOError)
    ├── ZeroDivisionError
    └── ... many more
```

---

## 4. Raising Exceptions

```python
# Raise built-in exception
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero!")
    return a / b

# Raise with original exception (chaining)
try:
    result = divide(10, 0)
except ValueError as e:
    raise RuntimeError("Division failed") from e

# Re-raise current exception
try:
    risky_operation()
except Exception:
    print("Logging error...")
    raise  # Re-raises the caught exception
```

---

## 5. Custom Exceptions

```python
# Simple custom exception
class ValidationError(Exception):
    pass

# Custom exception with attributes
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        self.deficit = amount - balance
        super().__init__(
            f"Cannot withdraw ${amount}. "
            f"Balance: ${balance}. "
            f"Deficit: ${self.deficit}"
        )

# Usage
class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return amount

# Handling custom exception
try:
    account = BankAccount(100)
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"You need ${e.deficit} more")
```

---

## 6. Context Managers (with statement)

```python
# Files automatically close even if exception occurs
with open("file.txt", "r") as f:
    content = f.read()
# f is automatically closed here

# Multiple context managers
with open("input.txt") as inp, open("output.txt", "w") as out:
    out.write(inp.read())

# Creating custom context manager
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.elapsed = time.time() - self.start
        print(f"Elapsed: {self.elapsed:.2f} seconds")
        return False  # Don't suppress exceptions

with Timer():
    # Code to time
    sum(range(1000000))

# Using contextlib decorator
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    elapsed = time.time() - start
    print(f"Elapsed: {elapsed:.2f} seconds")

with timer():
    sum(range(1000000))
```

---

## 7. Best Practices

### DO ✅
```python
# Be specific with exceptions
try:
    value = int(user_input)
except ValueError:
    print("Please enter a valid number")

# Use else for code that should run only on success
try:
    file = open("data.txt")
except FileNotFoundError:
    print("File not found")
else:
    content = file.read()
    file.close()

# Log exceptions
import logging
try:
    risky_operation()
except Exception as e:
    logging.error(f"Operation failed: {e}", exc_info=True)
    raise

# Use finally for cleanup
try:
    conn = database.connect()
    conn.execute(query)
finally:
    conn.close()
```

### DON'T ❌
```python
# Don't catch all exceptions silently
try:
    something()
except:  # Bad! Catches EVERYTHING including Ctrl+C
    pass

# Don't use exceptions for flow control
try:
    value = my_dict[key]  # Bad if key might not exist
except KeyError:
    value = default

# Better:
value = my_dict.get(key, default)

# Don't catch too broadly
try:
    complex_operation()
except Exception:  # Too broad
    print("Something went wrong")
```

---

## 8. LBYL vs EAFP

### LBYL (Look Before You Leap) - Java style
```python
if key in my_dict:
    value = my_dict[key]
else:
    value = default

if os.path.exists(filename):
    with open(filename) as f:
        content = f.read()
```

### EAFP (Easier to Ask Forgiveness) - Python style ✅
```python
try:
    value = my_dict[key]
except KeyError:
    value = default

try:
    with open(filename) as f:
        content = f.read()
except FileNotFoundError:
    content = ""
```

**Python prefers EAFP** - it's often faster and handles race conditions better.

---

## 9. Common Patterns

### Retry Pattern
```python
def retry(func, max_attempts=3, delay=1):
    import time
    for attempt in range(max_attempts):
        try:
            return func()
        except Exception as e:
            if attempt == max_attempts - 1:
                raise
            print(f"Attempt {attempt + 1} failed: {e}")
            time.sleep(delay)
```

### Default Value Pattern
```python
def safe_get(dictionary, key, default=None):
    try:
        return dictionary[key]
    except (KeyError, TypeError):
        return default
```

### Validation Pattern
```python
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return age
```

---

## Java vs Python Summary

| Feature | Java | Python |
|---------|------|--------|
| Catch keyword | `catch` | `except` |
| Throw keyword | `throw` | `raise` |
| Checked exceptions | Yes | No |
| Finally | `finally` | `finally` |
| Try-with-resources | `try (...)` | `with` |
| Exception variable | `catch (E e)` | `except E as e` |
| Multiple exceptions | `catch (A \| B e)` | `except (A, B) as e` |

---

## Summary

1. **try/except** - catch specific exceptions
2. **else** - runs only if no exception
3. **finally** - always runs (cleanup)
4. **raise** - throw exceptions
5. **Custom exceptions** - extend Exception class
6. **with statement** - auto cleanup (context managers)
7. **EAFP** - Pythonic way (try first, handle errors)
