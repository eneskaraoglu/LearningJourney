# Syntax Basics - Exercise Solutions

"""
Exercise 1: Hello Java Developer!
"""
name = "Alex"
years = 5
favorite_feature = "Stream API"

print(f"Hi, I'm {name}! I have {years} years of Java experience.")
print(f"My favorite Java feature is {favorite_feature}.")

print("\n" + "="*50 + "\n")


"""
Exercise 2: Variable Swap
"""
a = 100
b = 200

# Python's elegant swap
a, b = b, a

print(f"a = {a}, b = {b}")  # a = 200, b = 100

print("\n" + "="*50 + "\n")


"""
Exercise 3: Type Detective
"""
my_int = 42
my_float = 3.14159
my_string = "Hello Python"
my_bool = True
my_none = None

print(f"my_int = {my_int}, type: {type(my_int)}")
print(f"my_float = {my_float}, type: {type(my_float)}")
print(f"my_string = {my_string}, type: {type(my_string)}")
print(f"my_bool = {my_bool}, type: {type(my_bool)}")
print(f"my_none = {my_none}, type: {type(my_none)}")

print("\n" + "="*50 + "\n")


"""
Exercise 4: Calculator
"""
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
operator = input("Enter operator (+, -, *, /): ")

if operator == "+":
    result = num1 + num2
elif operator == "-":
    result = num1 - num2
elif operator == "*":
    result = num1 * num2
elif operator == "/":
    if num2 != 0:
        result = num1 / num2
    else:
        result = "Error: Division by zero"
else:
    result = "Invalid operator"

print(f"Result: {num1} {operator} {num2} = {result}")

print("\n" + "="*50 + "\n")


"""
Exercise 5: Temperature Converter
"""
celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = celsius * 9/5 + 32
print(f"{celsius}°C = {fahrenheit:.2f}°F")

print("\n" + "="*50 + "\n")


"""
Exercise 6: Java to Python Translation
"""
x = 10
y = 20

if x < y and y < 30:  # or: if x < y < 30:
    print("Both conditions true")

print(f"Sum: {x + y}")
print(f"Power: {2 ** x}")

print("\n" + "="*50 + "\n")


"""
BONUS: Profile Card
"""
name = "Alex"

profile = f"""
+------------------------+
|   DEVELOPER PROFILE    |
+------------------------+
| Name: {name:<16}|
| Language: Java → Python|
| Level: Learning        |
+------------------------+
"""

print(profile)

# Note: {name:<16} means left-align in 16 character width
# This is advanced f-string formatting we'll cover later!
