# Java to Python Cheatsheet 🔄

Quick reference for Java developers learning Python.

---

## 1. Basic Syntax Comparison

### Hello World
```java
// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```python
# Python
print("Hello, World!")
```

**Key Differences:**
- No class wrapper required for simple scripts
- No semicolons
- No `main()` method required
- `print()` instead of `System.out.println()`

---

## 2. Variables & Types

### Declaration
```java
// Java - explicitly typed
int age = 25;
String name = "John";
final double PI = 3.14159;
```

```python
# Python - dynamically typed
age = 25
name = "John"
PI = 3.14159  # Convention: UPPERCASE for constants
```

### Type Checking
```java
// Java
if (obj instanceof String) { }
```

```python
# Python
if isinstance(obj, str):
    pass
```

---

## 3. Data Types Mapping

| Java | Python | Notes |
|------|--------|-------|
| `int` | `int` | Python int has unlimited size |
| `double` | `float` | Python has no double |
| `boolean` | `bool` | `True`/`False` (capitalized) |
| `String` | `str` | Immutable in both |
| `char` | `str` | No char type, use str of length 1 |
| `int[]` | `list` | Python lists are dynamic |
| `ArrayList<T>` | `list` | Same as above |
| `HashMap<K,V>` | `dict` | Dictionary |
| `HashSet<T>` | `set` | Set |
| `null` | `None` | Note capitalization |

---

## 4. Control Flow

### If-Else
```java
// Java
if (x > 0) {
    System.out.println("positive");
} else if (x < 0) {
    System.out.println("negative");
} else {
    System.out.println("zero");
}
```

```python
# Python
if x > 0:
    print("positive")
elif x < 0:
    print("negative")
else:
    print("zero")
```

### For Loop
```java
// Java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// Enhanced for
for (String item : list) {
    System.out.println(item);
}
```

```python
# Python
for i in range(10):
    print(i)

# Iterate collection
for item in list:
    print(item)
```

### While Loop
```java
// Java
while (condition) {
    // code
}
```

```python
# Python
while condition:
    # code
    pass
```

---

## 5. Functions/Methods

### Basic Function
```java
// Java
public int add(int a, int b) {
    return a + b;
}
```

```python
# Python
def add(a, b):
    return a + b

# With type hints (optional)
def add(a: int, b: int) -> int:
    return a + b
```

### Default Parameters
```java
// Java - use overloading
public void greet(String name) {
    greet(name, "Hello");
}
public void greet(String name, String greeting) {
    System.out.println(greeting + ", " + name);
}
```

```python
# Python - default values
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}")
```

---

## 6. Classes & OOP

### Basic Class
```java
// Java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
```

```python
# Python
class Person:
    def __init__(self, name, age):
        self.name = name  # public by default
        self.age = age
    
    # Getter/setter using property (optional)
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        self._name = value
```

### Inheritance
```java
// Java
public class Student extends Person {
    public Student(String name, int age) {
        super(name, age);
    }
}
```

```python
# Python
class Student(Person):
    def __init__(self, name, age):
        super().__init__(name, age)
```

---

## 7. Collections

### List (ArrayList equivalent)
```java
// Java
List<String> list = new ArrayList<>();
list.add("apple");
list.get(0);
list.size();
list.remove(0);
```

```python
# Python
list = []
list.append("apple")
list[0]
len(list)
list.pop(0)  # or del list[0]
```

### Dictionary (HashMap equivalent)
```java
// Java
Map<String, Integer> map = new HashMap<>();
map.put("age", 25);
map.get("age");
map.containsKey("age");
```

```python
# Python
dict = {}
dict["age"] = 25
dict["age"]  # or dict.get("age")
"age" in dict
```

---

## 8. String Operations

| Java | Python |
|------|--------|
| `str.length()` | `len(str)` |
| `str.substring(0, 5)` | `str[0:5]` |
| `str.indexOf("x")` | `str.find("x")` |
| `str.split(",")` | `str.split(",")` |
| `str.trim()` | `str.strip()` |
| `str.toLowerCase()` | `str.lower()` |
| `str.toUpperCase()` | `str.upper()` |
| `String.format("%s", x)` | `f"{x}"` |

---

## 9. Exception Handling

```java
// Java
try {
    // risky code
} catch (IOException e) {
    // handle
} finally {
    // cleanup
}
```

```python
# Python
try:
    # risky code
except IOError as e:
    # handle
finally:
    # cleanup
```

---

## 10. Common Gotchas for Java Devs

1. **Indentation matters!** - Python uses indentation instead of braces
2. **No semicolons** - Line endings define statements
3. **`self` is explicit** - Always first parameter in methods
4. **Everything is an object** - Even functions and classes
5. **`None` not `null`** - And it's capitalized
6. **`True`/`False`** - Capitalized booleans
7. **No `++`/`--`** - Use `+= 1` or `-= 1`
8. **Lists are mutable** - Unlike Java strings
9. **Duck typing** - If it walks like a duck...
10. **`==` compares values** - Use `is` for identity

---

*Keep this handy as you transition from Java to Python!*
