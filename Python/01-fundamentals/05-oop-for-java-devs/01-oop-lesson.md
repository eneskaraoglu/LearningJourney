# Session 5: OOP for Java Developers

## 🎯 Learning Objectives
- Create classes with `__init__` constructor
- Understand `self` (Python's `this`)
- Work without access modifiers (public/private)
- Use properties for getters/setters
- Implement inheritance and method overriding
- Discover Python's multiple inheritance

---

## 1. Basic Class Definition

### Java
```java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void greet() {
        System.out.println("Hello, I'm " + name);
    }
}

Person p = new Person("Alice", 30);
p.greet();
```

### Python
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print(f"Hello, I'm {self.name}")

p = Person("Alice", 30)  # No 'new' keyword!
p.greet()
```

### Key Differences
| Java | Python |
|------|--------|
| `public class` | `class` |
| Constructor = class name | `__init__` method |
| `this.name` | `self.name` |
| `this` is implicit | `self` is EXPLICIT (first param) |
| `new Person()` | `Person()` (no new) |

---

## 2. The `self` Parameter - CRITICAL!

```python
class Dog:
    def __init__(self, name):
        self.name = name  # Instance variable
    
    def bark(self):
        # 'self' must be first parameter in ALL instance methods!
        print(f"{self.name} says Woof!")
    
    def rename(self, new_name):
        self.name = new_name

# When calling, don't pass 'self' - Python does it automatically
dog = Dog("Buddy")
dog.bark()        # Python calls: Dog.bark(dog)
dog.rename("Max") # Python calls: Dog.rename(dog, "Max")
```

### Common Mistake
```python
class Calculator:
    def add(a, b):  # WRONG! Missing self
        return a + b

calc = Calculator()
calc.add(2, 3)  # TypeError!

# Correct:
class Calculator:
    def add(self, a, b):  # self is required!
        return a + b
```

---

## 3. Instance vs Class Variables

```python
class Dog:
    # Class variable - shared by ALL instances
    species = "Canis familiaris"
    count = 0
    
    def __init__(self, name):
        # Instance variable - unique to each instance
        self.name = name
        Dog.count += 1  # Access class variable via class name

# Usage
dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.name)      # Buddy (instance)
print(dog2.name)      # Max (instance)
print(dog1.species)   # Canis familiaris (class)
print(Dog.species)    # Canis familiaris (class)
print(Dog.count)      # 2 (shared counter)
```

### Java Comparison
```java
// Java
public class Dog {
    static String species = "Canis familiaris";  // static = class variable
    String name;  // instance variable
}
```

---

## 4. No Access Modifiers! (Convention-Based)

Python has NO `public`, `private`, `protected` keywords!

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner        # Public (by convention)
        self._balance = balance   # "Protected" (single underscore)
        self.__pin = 1234         # "Private" (double underscore)
    
    def get_balance(self):
        return self._balance

account = BankAccount("Alice", 1000)

# Everything is technically accessible!
print(account.owner)       # Alice (public - OK)
print(account._balance)    # 1000 (protected - works but discouraged)
print(account.__pin)       # AttributeError! (name mangling)
print(account._BankAccount__pin)  # 1234 (still accessible via mangled name!)
```

### Python Convention
| Prefix | Meaning | Java Equivalent |
|--------|---------|-----------------|
| `name` | Public | `public` |
| `_name` | Protected (internal use) | `protected` |
| `__name` | Private (name mangling) | `private` |
| `__name__` | Magic/dunder methods | N/A |

**Philosophy:** "We're all consenting adults here" - Python trusts developers.

---

## 5. Properties (Pythonic Getters/Setters)

### Java Way - Explicit Getters/Setters
```java
public class Person {
    private int age;
    
    public int getAge() { return age; }
    public void setAge(int age) {
        if (age >= 0) this.age = age;
    }
}
```

### Python Way - Properties!
```python
class Person:
    def __init__(self, age):
        self._age = age  # Internal storage
    
    @property
    def age(self):
        """Getter - called when accessing person.age"""
        return self._age
    
    @age.setter
    def age(self, value):
        """Setter - called when assigning person.age = x"""
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value
    
    @age.deleter
    def age(self):
        """Deleter - called when using del person.age"""
        del self._age

# Usage - looks like direct attribute access!
p = Person(30)
print(p.age)    # 30 (calls getter)
p.age = 31      # (calls setter)
p.age = -5      # ValueError!
```

### Read-Only Property
```python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def area(self):
        """Read-only computed property"""
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.area)   # 78.53975
c.area = 100    # AttributeError! (no setter defined)
```

---

## 6. Inheritance

### Single Inheritance
```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass  # To be overridden

class Dog(Animal):  # Dog extends Animal
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent constructor
        self.breed = breed
    
    def speak(self):  # Override parent method
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Usage
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers")

print(dog.speak())  # Buddy says Woof!
print(cat.speak())  # Whiskers says Meow!
print(dog.breed)    # Golden Retriever
```

### Java Comparison
```java
// Java
class Dog extends Animal {
    public Dog(String name, String breed) {
        super(name);  // Same!
        this.breed = breed;
    }
}
```

---

## 7. Multiple Inheritance (Python Exclusive!)

```python
# Java can't do this! (interfaces only)
# Python allows multiple inheritance

class Flyable:
    def fly(self):
        return "Flying!"

class Swimmable:
    def swim(self):
        return "Swimming!"

class Duck(Flyable, Swimmable):  # Inherits from BOTH!
    def quack(self):
        return "Quack!"

duck = Duck()
print(duck.fly())    # Flying!
print(duck.swim())   # Swimming!
print(duck.quack())  # Quack!
```

### Method Resolution Order (MRO)
```python
class A:
    def greet(self):
        return "A"

class B(A):
    def greet(self):
        return "B"

class C(A):
    def greet(self):
        return "C"

class D(B, C):  # Which greet() is used?
    pass

d = D()
print(d.greet())  # "B" - follows MRO

# Check MRO
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)
```

---

## 8. Magic Methods (Dunder Methods)

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        """Called by print() and str()"""
        return f"Point({self.x}, {self.y})"
    
    def __repr__(self):
        """Called in REPL, debugging"""
        return f"Point({self.x}, {self.y})"
    
    def __eq__(self, other):
        """Called for == comparison"""
        return self.x == other.x and self.y == other.y
    
    def __add__(self, other):
        """Called for + operator"""
        return Point(self.x + other.x, self.y + other.y)
    
    def __len__(self):
        """Called by len()"""
        return 2  # 2D point

# Usage
p1 = Point(1, 2)
p2 = Point(3, 4)

print(p1)           # Point(1, 2) - __str__
print(p1 == p2)     # False - __eq__
p3 = p1 + p2        # Point(4, 6) - __add__
print(len(p1))      # 2 - __len__
```

### Common Magic Methods
| Method | Triggered By | Java Equivalent |
|--------|-------------|-----------------|
| `__init__` | Constructor | Constructor |
| `__str__` | `print()`, `str()` | `toString()` |
| `__repr__` | REPL, `repr()` | `toString()` |
| `__eq__` | `==` | `equals()` |
| `__hash__` | `hash()`, dict key | `hashCode()` |
| `__lt__` | `<` | `compareTo()` |
| `__len__` | `len()` | `size()` |
| `__getitem__` | `obj[key]` | `get()` |
| `__setitem__` | `obj[key] = val` | `set()` |
| `__iter__` | `for x in obj` | `iterator()` |

---

## 9. Class Methods and Static Methods

```python
class Pizza:
    def __init__(self, ingredients):
        self.ingredients = ingredients
    
    def __str__(self):
        return f"Pizza with {', '.join(self.ingredients)}"
    
    @classmethod
    def margherita(cls):
        """Factory method - creates instance"""
        return cls(["mozzarella", "tomatoes"])
    
    @classmethod
    def pepperoni(cls):
        return cls(["mozzarella", "pepperoni"])
    
    @staticmethod
    def calculate_price(num_ingredients):
        """Utility method - no self or cls"""
        return 10 + (num_ingredients * 2)

# Usage
p1 = Pizza(["cheese", "mushrooms"])
p2 = Pizza.margherita()  # Factory method
p3 = Pizza.pepperoni()   # Factory method

print(p2)  # Pizza with mozzarella, tomatoes
print(Pizza.calculate_price(5))  # 20
```

### Comparison
| Type | First Param | Access | Use Case |
|------|-------------|--------|----------|
| Instance method | `self` | Instance | Normal methods |
| Class method | `cls` | Class | Factory methods |
| Static method | None | Neither | Utility functions |

---

## 10. Abstract Classes (Optional)

```python
from abc import ABC, abstractmethod

class Shape(ABC):  # Abstract Base Class
    @abstractmethod
    def area(self):
        """Subclasses MUST implement this"""
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

# shape = Shape()  # TypeError! Can't instantiate abstract class
rect = Rectangle(5, 3)
print(rect.area())  # 15
```

---

## Quick Reference: Java vs Python OOP

| Feature | Java | Python |
|---------|------|--------|
| Class | `public class X` | `class X:` |
| Constructor | `ClassName()` | `__init__(self)` |
| This reference | `this` (implicit) | `self` (explicit) |
| Inheritance | `extends` | `class Child(Parent):` |
| Multiple inheritance | No (interfaces) | Yes! |
| Abstract class | `abstract class` | `ABC` + `@abstractmethod` |
| Interface | `interface` | ABC or Protocol |
| Private | `private` | `__name` (convention) |
| Static method | `static` | `@staticmethod` |
| toString | `toString()` | `__str__()` |
| equals | `equals()` | `__eq__()` |

---

## Summary

1. **`self`** is explicit first parameter (not implicit like `this`)
2. **No access modifiers** - use `_` and `__` conventions
3. **Properties** replace getters/setters elegantly
4. **Multiple inheritance** is allowed!
5. **Magic methods** (`__xxx__`) customize behavior
6. **`@classmethod`** for factories, **`@staticmethod`** for utilities

