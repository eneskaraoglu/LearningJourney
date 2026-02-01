# OOP - Practice Exercises

"""
Exercise 1: Basic Class
-----------------------
Create a 'Car' class with:
- Attributes: make, model, year, mileage (default 0)
- Method: drive(miles) - adds to mileage
- Method: __str__ - returns "Year Make Model (X miles)"
"""

class Car:
    # Your code:
    pass

# Test:
# car = Car("Toyota", "Camry", 2020)
# print(car)           # 2020 Toyota Camry (0 miles)
# car.drive(100)
# print(car)           # 2020 Toyota Camry (100 miles)



"""
Exercise 2: Property Practice
-----------------------------
Create a 'Temperature' class that stores temperature in Celsius.
- Property: celsius (getter and setter)
- Property: fahrenheit (computed, read-only)
  Formula: F = C * 9/5 + 32
"""

class Temperature:
    # Your code:
    pass

# Test:
# temp = Temperature(25)
# print(temp.celsius)     # 25
# print(temp.fahrenheit)  # 77.0
# temp.celsius = 0
# print(temp.fahrenheit)  # 32.0



"""
Exercise 3: Inheritance
-----------------------
Create an 'Employee' base class with:
- Attributes: name, salary

Create two subclasses:
- 'Manager': has bonus attribute, total_pay = salary + bonus
- 'Developer': has language attribute

Both should have a method describe() that returns appropriate string.
"""

class Employee:
    # Your code:
    pass

class Manager(Employee):
    # Your code:
    pass

class Developer(Employee):
    # Your code:
    pass

# Test:
# mgr = Manager("Alice", 80000, 10000)
# dev = Developer("Bob", 70000, "Python")
# print(mgr.describe())  # "Alice is a Manager earning $90000"
# print(dev.describe())  # "Bob is a Developer skilled in Python"



"""
Exercise 4: Magic Methods
-------------------------
Create a 'Vector' class that represents a 2D vector:
- __init__(x, y)
- __str__: returns "Vector(x, y)"
- __add__: adds two vectors
- __sub__: subtracts two vectors
- __mul__: scalar multiplication (vector * number)
- __eq__: compares two vectors
- __abs__: returns magnitude (sqrt(x² + y²))
"""

class Vector:
    # Your code:
    pass

# Test:
# v1 = Vector(3, 4)
# v2 = Vector(1, 2)
# print(v1)           # Vector(3, 4)
# print(v1 + v2)      # Vector(4, 6)
# print(v1 - v2)      # Vector(2, 2)
# print(v1 * 2)       # Vector(6, 8)
# print(v1 == v2)     # False
# print(abs(v1))      # 5.0 (3-4-5 triangle)



"""
Exercise 5: Class Method Factory
--------------------------------
Create a 'Date' class with:
- Attributes: year, month, day
- Class method: from_string("YYYY-MM-DD") - creates Date from string
- Class method: today() - creates Date with current date
- __str__: returns "YYYY-MM-DD"
"""

class Date:
    # Your code:
    pass

# Test:
# d1 = Date(2024, 12, 25)
# d2 = Date.from_string("2024-01-15")
# d3 = Date.today()
# print(d1)  # 2024-12-25
# print(d2)  # 2024-01-15



"""
Exercise 6: Multiple Inheritance
--------------------------------
Create:
- 'Printable' mixin with print_info() method
- 'Saveable' mixin with save() method
- 'Document' class that inherits from both

Document should have: title, content
"""

class Printable:
    # Your code:
    pass

class Saveable:
    # Your code:
    pass

class Document(Printable, Saveable):
    # Your code:
    pass

# Test:
# doc = Document("Report", "This is the content...")
# doc.print_info()  # Prints document info
# doc.save()        # "Saving document..."



"""
Exercise 7: Bank Account (Comprehensive)
----------------------------------------
Create a 'BankAccount' class with:
- Protected attribute: _balance
- Property: balance (read-only)
- Methods: deposit(amount), withdraw(amount)
- Withdraw should raise ValueError if insufficient funds
- Class variable: bank_name = "Python Bank"
- Class method: get_bank_info()
"""

class BankAccount:
    # Your code:
    pass

# Test:
# acc = BankAccount("Alice", 1000)
# print(acc.balance)     # 1000
# acc.deposit(500)
# print(acc.balance)     # 1500
# acc.withdraw(200)
# print(acc.balance)     # 1300
# acc.withdraw(2000)     # ValueError!
# print(BankAccount.get_bank_info())



"""
BONUS: Abstract Shape
---------------------
Create an abstract 'Shape' class and concrete 'Circle' and 'Square' classes.
- Shape has abstract methods: area() and perimeter()
- Circle: initialized with radius
- Square: initialized with side length
"""

from abc import ABC, abstractmethod

class Shape(ABC):
    # Your code:
    pass

class Circle(Shape):
    # Your code:
    pass

class Square(Shape):
    # Your code:
    pass

# Test:
# circle = Circle(5)
# square = Square(4)
# print(f"Circle area: {circle.area():.2f}")       # ~78.54
# print(f"Square perimeter: {square.perimeter()}") # 16
