# Data Types - Practice Exercises

"""
Exercise 1: Number Play
-----------------------
Calculate 2 to the power of 100.
In Java you'd need BigInteger, but Python handles it natively!
"""

# Your code:
result = 
print(f"2^100 = {result}")
print(f"Number of digits: {len(str(result))}")



"""
Exercise 2: Division Differences
--------------------------------
Given a = 17 and b = 5, show:
- True division (with decimals)
- Floor division (integer result)
- Modulo (remainder)
"""

a = 17
b = 5

# Your code:
true_div = 
floor_div = 
remainder = 

print(f"17 / 5 = {true_div}")
print(f"17 // 5 = {floor_div}")
print(f"17 % 5 = {remainder}")



"""
Exercise 3: String Slicing
--------------------------
Given the string "Machine Learning", extract:
1. "Machine"
2. "Learning"
3. "earn" (from Learning)
4. The whole string reversed
"""

text = "Machine Learning"

# Your code:
part1 = 
part2 = 
part3 = 
reversed_text = 

print(f"Part 1: {part1}")
print(f"Part 2: {part2}")
print(f"Part 3: {part3}")
print(f"Reversed: {reversed_text}")



"""
Exercise 4: Email Parser
------------------------
Given an email "john.doe@company.com", extract:
1. Username (john.doe)
2. Domain (company.com)
3. Company name only (company)

Hint: Use split() method
"""

email = "john.doe@company.com"

# Your code:
username = 
domain = 
company = 

print(f"Username: {username}")
print(f"Domain: {domain}")
print(f"Company: {company}")



"""
Exercise 5: Format Currency
---------------------------
Format the number 1234567.891 as:
1. "$1,234,567.89" (currency)
2. "1234567.9" (one decimal)
3. "001234567.89" (zero-padded to 12 chars total)
"""

amount = 1234567.891

# Your code:
currency = 
one_decimal = 
padded = 

print(currency)
print(one_decimal)
print(padded)



"""
Exercise 6: Truthy/Falsy Challenge
----------------------------------
Predict the output WITHOUT running the code first.
Then run it to check your answers.
"""

# Predict: True or False?
print(bool("False"))   # Prediction: ___
print(bool(""))        # Prediction: ___
print(bool(0.0001))    # Prediction: ___
print(bool([0]))       # Prediction: ___
print(bool([]))        # Prediction: ___
print(bool(None))      # Prediction: ___
print(bool(" "))       # Prediction: ___ (space character)



"""
Exercise 7: Type Detective
--------------------------
What type will each variable be? Predict first, then verify.
"""

a = 10 / 2      # Prediction: ___
b = 10 // 2     # Prediction: ___
c = "10" + "2"  # Prediction: ___
d = int("10") + int("2")  # Prediction: ___

print(f"a = {a}, type: {type(a)}")
print(f"b = {b}, type: {type(b)}")
print(f"c = {c}, type: {type(c)}")
print(f"d = {d}, type: {type(d)}")



"""
BONUS: Password Validator
-------------------------
Write code that checks if a password string:
1. Has at least 8 characters
2. Contains at least one digit
3. Contains at least one uppercase letter

Use string methods: isdigit(), isupper(), and len()
Hint: You'll need to loop through characters (we'll cover loops next,
      but try: any(char.isdigit() for char in password))
"""

password = "MyPass123"

# Your code:
has_length = 
has_digit = 
has_upper = 

print(f"Password: {password}")
print(f"Has 8+ chars: {has_length}")
print(f"Has digit: {has_digit}")
print(f"Has uppercase: {has_upper}")
print(f"Valid: {has_length and has_digit and has_upper}")
