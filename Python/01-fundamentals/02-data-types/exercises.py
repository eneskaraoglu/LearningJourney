result = 2 ** 10
print(f"2^100 = {result}")
print(f"Number of digits: {len(str(result))}")

a = 17
b = 5

# Your code:
true_div = a/b
floor_div = a//b 
remainder = a%b

print(f"17 / 5 = {true_div}")
print(f"17 // 5 = {floor_div}")
print(f"17 % 5 = {remainder}")


text = "Machine Learning"

# Your code:
part1 = text[0:7]
part2 = text[8:]
part3 = text[9:100]
reversed_text = text[::-1]

print(f"Part 1: {part1}")
print(f"Part 2: {part2}")
print(f"Part 3: {part3}")
print(f"Reversed: {reversed_text}")


email = "john.doe@company.com"

# Your code:
username = email.split("@")[0]
domain = email.split("@")[1]
company = email.split("@")[1][:-4]
company2 = email.split("@")[1].split(".")[0]

print(f"Username: {username}")
print(f"Domain: {domain}")
print(f"Company: {company}")
print(f"Company2: {company2}")

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
currency = round(amount,2)
one_decimal = round(amount,1)
padded = round(amount,-2)

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
print(bool("False"))   # Prediction: True
print(bool(""))        # Prediction: False
print(bool(0.0001))    # Prediction: True
print(bool([0]))       # Prediction: True
print(bool([]))        # Prediction: False
print(bool(None))      # Prediction: False
print(bool(" "))       # Prediction: True

"""
Exercise 7: Type Detective
--------------------------
What type will each variable be? Predict first, then verify.
"""

a = 10 / 2      # Prediction: 5
b = 10 // 2     # Prediction: 5
c = "10" + "2"  # Prediction: 102
d = int("10") + int("2")  # Prediction: 12

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
has_length = len(password)
has_digit = password.count("1")
has_upper = password.upper()

print(f"Password: {password}")
print(f"Has 8+ chars: {has_length}")
print(f"Has digit: {has_digit}")
print(f"Has uppercase: {has_upper}")
print(f"Valid: {has_length and has_digit and has_upper}")

