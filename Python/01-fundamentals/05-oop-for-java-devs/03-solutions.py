# OOP - Exercise Solutions

"""
Exercise 1: Basic Class
"""
class Car:
    def __init__(self, make, model, year, mileage=0):
        self.make = make
        self.model = model
        self.year = year
        self.mileage = mileage
    
    def drive(self, miles):
        self.mileage += miles
    
    def __str__(self):
        return f"{self.year} {self.make} {self.model} ({self.mileage} miles)"

car = Car("Toyota", "Camry", 2020)
print(car)
car.drive(100)
print(car)

print("\n" + "="*50 + "\n")


"""
Exercise 2: Property Practice
"""
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

temp = Temperature(25)
print(f"Celsius: {temp.celsius}")
print(f"Fahrenheit: {temp.fahrenheit}")
temp.celsius = 0
print(f"Fahrenheit at 0C: {temp.fahrenheit}")

print("\n" + "="*50 + "\n")


"""
Exercise 3: Inheritance
"""
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def describe(self):
        return f"{self.name} earns ${self.salary}"

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus
    
    @property
    def total_pay(self):
        return self.salary + self.bonus
    
    def describe(self):
        return f"{self.name} is a Manager earning ${self.total_pay}"

class Developer(Employee):
    def __init__(self, name, salary, language):
        super().__init__(name, salary)
        self.language = language
    
    def describe(self):
        return f"{self.name} is a Developer skilled in {self.language}"

mgr = Manager("Alice", 80000, 10000)
dev = Developer("Bob", 70000, "Python")
print(mgr.describe())
print(dev.describe())

print("\n" + "="*50 + "\n")


"""
Exercise 4: Magic Methods
"""
import math

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return self.__str__()
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __abs__(self):
        return math.sqrt(self.x**2 + self.y**2)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1)
print(f"v1 + v2 = {v1 + v2}")
print(f"v1 - v2 = {v1 - v2}")
print(f"v1 * 2 = {v1 * 2}")
print(f"v1 == v2: {v1 == v2}")
print(f"|v1| = {abs(v1)}")

print("\n" + "="*50 + "\n")


"""
Exercise 5: Class Method Factory
"""
from datetime import date as dt_date

class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day
    
    @classmethod
    def from_string(cls, date_string):
        year, month, day = map(int, date_string.split('-'))
        return cls(year, month, day)
    
    @classmethod
    def today(cls):
        today = dt_date.today()
        return cls(today.year, today.month, today.day)
    
    def __str__(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

d1 = Date(2024, 12, 25)
d2 = Date.from_string("2024-01-15")
d3 = Date.today()
print(d1)
print(d2)
print(f"Today: {d3}")

print("\n" + "="*50 + "\n")


"""
Exercise 6: Multiple Inheritance
"""
class Printable:
    def print_info(self):
        print(f"Title: {self.title}")
        print(f"Content: {self.content[:50]}...")

class Saveable:
    def save(self):
        print(f"Saving '{self.title}' to disk...")

class Document(Printable, Saveable):
    def __init__(self, title, content):
        self.title = title
        self.content = content

doc = Document("Report", "This is the content of my document...")
doc.print_info()
doc.save()

print("\n" + "="*50 + "\n")


"""
Exercise 7: Bank Account
"""
class BankAccount:
    bank_name = "Python Bank"
    
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self._balance = initial_balance
    
    @property
    def balance(self):
        return self._balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount
    
    def withdraw(self, amount):
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
    
    @classmethod
    def get_bank_info(cls):
        return f"Welcome to {cls.bank_name}!"

acc = BankAccount("Alice", 1000)
print(f"Balance: ${acc.balance}")
acc.deposit(500)
print(f"After deposit: ${acc.balance}")
acc.withdraw(200)
print(f"After withdrawal: ${acc.balance}")
print(BankAccount.get_bank_info())

try:
    acc.withdraw(2000)
except ValueError as e:
    print(f"Error: {e}")

print("\n" + "="*50 + "\n")


"""
BONUS: Abstract Shape
"""
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        return 2 * math.pi * self.radius

class Square(Shape):
    def __init__(self, side):
        self.side = side
    
    def area(self):
        return self.side ** 2
    
    def perimeter(self):
        return 4 * self.side

circle = Circle(5)
square = Square(4)
print(f"Circle area: {circle.area():.2f}")
print(f"Circle perimeter: {circle.perimeter():.2f}")
print(f"Square area: {square.area()}")
print(f"Square perimeter: {square.perimeter()}")
