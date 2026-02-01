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

# Your code here:

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

# Your code here (swap a and b):

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

# Your code here:

year = 9
leght = 1.2
name = "Alice"
day = False

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

# Your code here:



"""
Exercise 5: Temperature Converter
---------------------------------
Ask the user for a temperature in Celsius.
Convert it to Fahrenheit using: F = C * 9/5 + 32
Print the result formatted to 2 decimal places.

Hint: f"{value:.2f}" formats to 2 decimal places
"""

# Your code here:



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

# Your Python translation here:



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

# Your code here:


