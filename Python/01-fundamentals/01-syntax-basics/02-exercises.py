# Syntax Basics - Practice Exercises

"""
Exercise 1: Hello Java Developer!
---------------------------------
Create variables for your name, years of Java experience, 
and favorite Java feature. Print a formatted introduction.

Expected output:
Hi, I'm [name]! I have [years] years of Java experience.
My favorite Java feature is [feature].
"""

nameD = "Enes"
years = 18
print("Hi. My name is ", nameD ,", I have been java developer in ", years, " year.")

"""
Exercise 2: Variable Swap
-------------------------
Given two variables, swap their values without using a temporary variable.
(Hint: Python makes this very easy!)
"""

a = 100
b = 200

a, b = b, a 

# Print results
print(f"a = {a}, b = {b}")  # Should print: a = 200, b = 100



"""
Exercise 3: Type Detective
--------------------------
Create variables of different types and print their types.
"""

# Create these variables:
# - an integer
# - a float
# - a string
# - a boolean
# - None

year = 9
leght = 1.2
name = "Alice"
day = False
none_value = None

print(f"year = {year}, type: {type(year)}")
print(f"leght = {leght}, type: {type(leght)}")
print(f"name = {name}, type: {type(name)}")
print(f"day = {day}, type: {type(day)}")
print(f"none_value = {none_value}, type: {type(none_value)}")

"""
Exercise 4: Calculator
----------------------
Ask the user for two numbers and an operator (+, -, *, /).
Perform the calculation and print the result.

Example:
Enter first number: 10
Enter second number: 3
Enter operator (+, -, *, /): *
Result: 10 * 3 = 30
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



"""
Exercise 5: Temperature Converter
---------------------------------
Ask the user for a temperature in Celsius.
Convert it to Fahrenheit using: F = C * 9/5 + 32
Print the result formatted to 2 decimal places.

Hint: f"{value:.2f}" formats to 2 decimal places
"""

celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = celsius * 9/5 + 32
print(f"{celsius}C = {fahrenheit:.2f}F")



"""
Exercise 6: Java to Python Translation
--------------------------------------
Translate this Java code to Python:

public class Exercise {
    public static void main(String[] args) {
        int x = 10;
        int y = 20;
        
        if (x < y && y < 30) {
            System.out.println("Both conditions true");
        }
        
        System.out.println("Sum: " + (x + y));
        System.out.println("Power: " + Math.pow(2, x));
    }
}
"""

x = 10
y = 20

if x < y and y < 30:
    print("Both conditions true")

print(f"Sum: {x + y}")
print(f"Power: {2 ** x}")



"""
BONUS Exercise: Multi-line Fun
------------------------------
Using a multi-line string and f-strings, create a 
formatted "profile card" that looks like this:

+------------------------+
|   DEVELOPER PROFILE    |
+------------------------+
| Name: [your name]      |
| Language: Java → Python|
| Level: Learning        |
+------------------------+
"""

profile_name = "Alex"

profile = f"""
+------------------------+
|   DEVELOPER PROFILE    |
+------------------------+
| Name: {profile_name:<16}|
| Language: Java -> Python|
| Level: Learning        |
+------------------------+
"""

print(profile)
