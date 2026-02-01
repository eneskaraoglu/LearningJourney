# Session 2: Data Types in Depth

## 🎯 Learning Objectives
By the end of this session, you will:
1. Master Python's numeric types and their differences from Java
2. Manipulate strings with slicing and methods
3. Understand mutability vs immutability
4. Convert between types confidently
5. Use Python's built-in type functions

---

## 1. Numeric Types

### Integers - No Limits!

```java
// Java - integers have limits
int maxInt = 2147483647;           // Max value
long biggerNum = 9223372036854775807L;  // Need long for bigger
// Can't go bigger without BigInteger!
```

```python
# Python - integers have NO size limit!
small = 42
big = 999999999999999999999999999999999999999
bigger = 2 ** 1000  # Try this in Java!

print(big + 1)  # Just works!
```

**Why this matters for ML/AI:** You'll work with very large numbers. Python handles them natively.

### Floats

```python
pi = 3.14159
scientific = 1.5e-10    # 0.00000000015
negative_exp = 2.5e3    # 2500.0

# Float precision (same issue as Java)
print(0.1 + 0.2)        # 0.30000000000000004 (not 0.3!)

# For precise decimals (like money):
from decimal import Decimal
price = Decimal('19.99')
tax = Decimal('0.08')
total = price * (1 + tax)  # Precise!
```

### Complex Numbers (Python has them built-in!)

```python
# Java: No native support
# Python: Built-in!
z = 3 + 4j              # j is imaginary unit (not i)
print(z.real)           # 3.0
print(z.imag)           # 4.0
print(abs(z))           # 5.0 (magnitude)

# Useful for signal processing, scientific computing
```

### Numeric Operations

```python
# Basic
10 + 3    # 13 (addition)
10 - 3    # 7 (subtraction)
10 * 3    # 30 (multiplication)
10 / 3    # 3.3333... (true division - ALWAYS returns float!)
10 // 3   # 3 (floor division - returns int)
10 % 3    # 1 (modulo)
10 ** 3   # 1000 (power)

# Java comparison
# Java: 10 / 3 = 3 (integer division if both ints)
# Python: 10 / 3 = 3.333... (always float!)
# Python: 10 // 3 = 3 (explicit floor division)

# Handy built-in functions
abs(-5)         # 5
round(3.7)      # 4
round(3.14159, 2)  # 3.14 (2 decimal places)
min(1, 2, 3)    # 1
max(1, 2, 3)    # 3
sum([1,2,3,4])  # 10 (works on lists!)
```

---

## 2. Strings - Immutable and Powerful

### Creating Strings

```python
# Single or double quotes (no difference!)
s1 = 'Hello'
s2 = "Hello"

# Triple quotes for multiline
s3 = """This is a
multiline string
with line breaks preserved"""

# Raw strings (ignore escape sequences)
path = r"C:\Users\name\documents"  # No need to escape backslashes

# Escape sequences (same as Java)
newline = "Line1\nLine2"
tab = "Col1\tCol2"
quote = "He said \"Hello\""
```

### String Indexing (Zero-based like Java)

```python
s = "Python"
#    012345  (positive index)
#   -6-5-4-3-2-1  (negative index!)

s[0]      # 'P' (first character)
s[5]      # 'n' (last character)
s[-1]     # 'n' (last character - Python way!)
s[-2]     # 'o' (second to last)
```

### String Slicing - SUPER POWERFUL!

```python
s = "Python"

# Syntax: s[start:end:step]
# - start: inclusive (default 0)
# - end: exclusive (default len)
# - step: increment (default 1)

s[0:3]    # 'Pyt' (chars 0, 1, 2)
s[:3]     # 'Pyt' (same - start defaults to 0)
s[3:]     # 'hon' (char 3 to end)
s[1:5]    # 'ytho'
s[::2]    # 'Pto' (every 2nd char)
s[::-1]   # 'nohtyP' (REVERSE!)

# Java comparison
// Java: s.substring(0, 3)
# Python: s[0:3] or s[:3]
```

### String Methods

```python
s = "  Hello World  "

# Case methods
s.upper()          # '  HELLO WORLD  '
s.lower()          # '  hello world  '
s.title()          # '  Hello World  '

# Whitespace
s.strip()          # 'Hello World' (trim both ends)

# Search
s.find('World')    # 8 (index) or -1 if not found
s.count('l')       # 3

# Check content
s.startswith('  He')  # True
s.endswith('  ')      # True

# Replace
s.replace('World', 'Python')  # '  Hello Python  '

# Split and Join
"a,b,c".split(',')           # ['a', 'b', 'c']
'-'.join(['a', 'b', 'c'])    # 'a-b-c'
```

### String Formatting (f-strings)

```python
name = "Alice"
age = 30
balance = 1234.5678

# Basic
f"Name: {name}"                    # 'Name: Alice'

# Expressions inside braces
f"Next year: {age + 1}"            # 'Next year: 31'

# Formatting numbers
f"Balance: {balance:.2f}"          # 'Balance: 1234.57' (2 decimals)
f"Balance: {balance:,.2f}"         # 'Balance: 1,234.57' (with comma)

# Padding and alignment
f"{name:>10}"    # '     Alice' (right align, 10 chars)
f"{name:<10}"    # 'Alice     ' (left align)
f"{42:05d}"      # '00042' (zero-padded)
```

---

## 3. Booleans and Truthy/Falsy

```python
# Truthy and Falsy (IMPORTANT!)
# Falsy values: False, 0, 0.0, '', [], {}, None
# Everything else is Truthy

if []:           # Empty list is Falsy
    print("won't print")

if "hello":      # Non-empty string is Truthy
    print("will print!")

# Pythonic way to check empty
if not my_list:
    print("list is empty")
```

---

## 4. None Type

```python
result = None

# Check for None (use 'is', not '==')
if result is None:
    print("No result")

if result is not None:
    print("Has result")
```

---

## 5. Type Conversion

```python
# String to Number
int("42")           # 42
float("3.14")       # 3.14

# Number to String
str(42)             # "42"

# To Boolean
bool(0)             # False
bool("")            # False
bool([])            # False

# Check type
type(42)            # <class 'int'>
isinstance(42, int) # True
```

