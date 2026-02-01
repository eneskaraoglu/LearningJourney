# Session 1: Python Syntax Basics for Java Developers

## 🎯 Learning Objectives
By the end of this session, you will:
1. Understand Python's philosophy and key differences from Java
2. Write and run basic Python programs
3. Work with variables without type declarations
4. Use Python's print and input functions
5. Understand indentation-based syntax

---

## 1. The Python Philosophy

Python follows the "Zen of Python" - type `import this` in Python to see it.

Key principles:
- **Readability counts** - Code is read more than written
- **Simple is better than complex**
- **There should be one obvious way to do it**

### Java vs Python Mindset

| Java | Python |
|------|--------|
| Explicit is good | Implicit is fine |
| Ceremony required | Minimal boilerplate |
| Compile then run | Interpret directly |
| Static typing | Dynamic typing |

---

## 2. Your First Python Program

### Java Way
```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
// Compile: javac HelloWorld.java
// Run: java HelloWorld
```

### Python Way
```python
# hello.py
print("Hello, World!")

# Run: python hello.py
```

**That's it!** No class, no main method, no compilation step.

---

## 3. Variables and Dynamic Typing

### Java - Static Typing
```java
int age = 25;           // Must declare type
String name = "Alice";  // Must declare type
age = "old";            // ERROR! Can't assign string to int
```

### Python - Dynamic Typing
```python
age = 25          # Python infers it's an integer
name = "Alice"    # Python infers it's a string
age = "old"       # Valid! Variables can change types

# Check type at runtime
print(type(age))  # <class 'str'>
```

### Multiple Assignment (Python-specific)
```python
# Assign multiple variables at once
x, y, z = 1, 2, 3

# Swap values (no temp variable needed!)
a, b = 1, 2
a, b = b, a  # Now a=2, b=1

# Same value to multiple variables
x = y = z = 0
```

---

## 4. Basic Data Types

```python
# Integers (unlimited size in Python!)
small = 42
big = 99999999999999999999999999999  # No overflow!

# Floating point
pi = 3.14159
scientific = 1.5e-10

# Strings (single or double quotes - no difference)
name = "Alice"
also_name = 'Alice'
multiline = """This is a
multiline string"""

# Booleans (Note: Capitalized!)
is_valid = True   # not 'true'
is_empty = False  # not 'false'

# None (equivalent to Java's null)
result = None  # not 'null'
```

---

## 5. Print Function - More Powerful Than System.out.println

### Basic Print
```python
print("Hello")                    # Hello
print("Hello", "World")           # Hello World (auto space)
print("Hello", "World", sep="-")  # Hello-World
print("No newline", end="")       # No newline at end
```

### String Formatting (3 ways)

```python
name = "Alice"
age = 30

# Method 1: f-strings (RECOMMENDED - Python 3.6+)
print(f"Name: {name}, Age: {age}")
print(f"Next year: {age + 1}")  # Can include expressions!

# Method 2: .format()
print("Name: {}, Age: {}".format(name, age))

# Method 3: % operator (old style, like C)
print("Name: %s, Age: %d" % (name, age))
```

### Java Comparison
```java
// Java
System.out.println("Name: " + name + ", Age: " + age);
System.out.printf("Name: %s, Age: %d%n", name, age);
```

```python
# Python (much cleaner!)
print(f"Name: {name}, Age: {age}")
```

---

## 6. Input from User

### Java Way
```java
Scanner scanner = new Scanner(System.in);
System.out.print("Enter name: ");
String name = scanner.nextLine();
System.out.print("Enter age: ");
int age = scanner.nextInt();
```

### Python Way
```python
name = input("Enter name: ")      # Always returns string
age = int(input("Enter age: "))   # Convert to int manually
```

**Important:** `input()` always returns a string! You must convert:
```python
age = int(input("Age: "))         # Convert to integer
price = float(input("Price: "))   # Convert to float
```

---

## 7. Comments

```python
# Single line comment (like Java's //)

"""
Multi-line comment
(technically a string, but used as comment)
Like Java's /* */
"""

# Inline comment
x = 5  # This is an inline comment
```

---

## 8. Indentation - CRITICAL!

Python uses indentation instead of braces `{}`. This is **not optional**!

### Java
```java
if (x > 0) {
    System.out.println("positive");
    System.out.println("definitely positive");
}
```

### Python
```python
if x > 0:
    print("positive")
    print("definitely positive")  # Same indentation = same block
```

### Common Mistakes
```python
# WRONG - inconsistent indentation
if x > 0:
    print("one")
   print("two")  # IndentationError!

# WRONG - missing indentation
if x > 0:
print("positive")  # IndentationError!

# CORRECT
if x > 0:
    print("positive")
    print("still in if block")
print("outside if block")  # Different indentation
```

**Convention:** Use 4 spaces for indentation (not tabs).

---

## 9. Operators

### Mostly Same as Java
```python
# Arithmetic
+, -, *, /    # Basic math
%             # Modulo
**            # Power (Java has no equivalent, uses Math.pow())

# Comparison
==, !=, <, >, <=, >=

# Logical (different from Java!)
and   # Java: &&
or    # Java: ||
not   # Java: !
```

### Python-Specific
```python
# Floor division
7 // 2    # Result: 3 (not 3.5)

# Power operator
2 ** 10   # Result: 1024 (no Math.pow needed)

# Chained comparisons (Python magic!)
if 0 < x < 10:  # Same as: if x > 0 and x < 10
    print("x is between 0 and 10")
```

---

## 10. Quick Practice

Try these in your Python interpreter:

```python
# 1. Variables and printing
name = "Your Name"
age = 25
print(f"Hello, I'm {name} and I'm {age} years old")

# 2. Math operations
result = 2 ** 10
print(f"2 to the power of 10 is {result}")

# 3. User input
user_name = input("What's your name? ")
print(f"Nice to meet you, {user_name}!")

# 4. Type checking
x = 42
print(f"x = {x}, type = {type(x)}")
x = "now a string"
print(f"x = {x}, type = {type(x)}")
```

---

## Summary: Java → Python Quick Reference

| Concept | Java | Python |
|---------|------|--------|
| Print | `System.out.println()` | `print()` |
| Variables | `int x = 5;` | `x = 5` |
| String format | `"Hi " + name` | `f"Hi {name}"` |
| Input | `Scanner` | `input()` |
| Null | `null` | `None` |
| Boolean | `true/false` | `True/False` |
| And/Or | `&&` / `||` | `and` / `or` |
| Not | `!` | `not` |
| Power | `Math.pow(2,10)` | `2 ** 10` |
| Block delimiters | `{ }` | Indentation |

---

## Next Session Preview
- Data types in depth (strings, numbers, type conversion)
- String manipulation and slicing
- More Python-specific features

