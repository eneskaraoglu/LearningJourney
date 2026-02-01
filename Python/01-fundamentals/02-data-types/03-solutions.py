# Data Types - Exercise Solutions

"""
Exercise 1: Number Play
"""
result = 2 ** 100
print(f"2^100 = {result}")
print(f"Number of digits: {len(str(result))}")
# Output: 31 digits! No BigInteger needed.

print("\n" + "="*50 + "\n")


"""
Exercise 2: Division Differences
"""
a = 17
b = 5

true_div = a / b      # 3.4 (always float!)
floor_div = a // b    # 3 (integer)
remainder = a % b     # 2

print(f"17 / 5 = {true_div}")
print(f"17 // 5 = {floor_div}")
print(f"17 % 5 = {remainder}")

print("\n" + "="*50 + "\n")


"""
Exercise 3: String Slicing
"""
text = "Machine Learning"

part1 = text[:7]           # "Machine" (0 to 6)
part2 = text[8:]           # "Learning" (8 to end)
part3 = text[9:13]         # "earn" (index 9,10,11,12)
reversed_text = text[::-1] # "gninraeL enihcaM"

print(f"Part 1: {part1}")
print(f"Part 2: {part2}")
print(f"Part 3: {part3}")
print(f"Reversed: {reversed_text}")

print("\n" + "="*50 + "\n")


"""
Exercise 4: Email Parser
"""
email = "john.doe@company.com"

parts = email.split('@')   # ['john.doe', 'company.com']
username = parts[0]        # 'john.doe'
domain = parts[1]          # 'company.com'
company = domain.split('.')[0]  # 'company'

# Alternative one-liner approaches:
# username, domain = email.split('@')
# company = email.split('@')[1].split('.')[0]

print(f"Username: {username}")
print(f"Domain: {domain}")
print(f"Company: {company}")

print("\n" + "="*50 + "\n")


"""
Exercise 5: Format Currency
"""
amount = 1234567.891

currency = f"${amount:,.2f}"        # $1,234,567.89
one_decimal = f"{amount:.1f}"       # 1234567.9
padded = f"{amount:012.2f}"         # 001234567.89

print(currency)
print(one_decimal)
print(padded)

print("\n" + "="*50 + "\n")


"""
Exercise 6: Truthy/Falsy Challenge
"""
print("Truthy/Falsy Results:")
print(f'bool("False") = {bool("False")}')  # True! (non-empty string)
print(f'bool("") = {bool("")}')            # False (empty string)
print(f'bool(0.0001) = {bool(0.0001)}')    # True (non-zero)
print(f'bool([0]) = {bool([0])}')          # True! (non-empty list)
print(f'bool([]) = {bool([])}')            # False (empty list)
print(f'bool(None) = {bool(None)}')        # False
print(f'bool(" ") = {bool(" ")}')          # True! (contains space char)

print("\n" + "="*50 + "\n")


"""
Exercise 7: Type Detective
"""
a = 10 / 2      # 5.0 - float! (/ always returns float)
b = 10 // 2     # 5 - int (floor division)
c = "10" + "2"  # "102" - string concatenation
d = int("10") + int("2")  # 12 - int

print(f"a = {a}, type: {type(a)}")
print(f"b = {b}, type: {type(b)}")
print(f"c = {c}, type: {type(c)}")
print(f"d = {d}, type: {type(d)}")

print("\n" + "="*50 + "\n")


"""
BONUS: Password Validator
"""
password = "MyPass123"

has_length = len(password) >= 8
has_digit = any(char.isdigit() for char in password)
has_upper = any(char.isupper() for char in password)

# Alternative without any() - using loops:
# has_digit = False
# for char in password:
#     if char.isdigit():
#         has_digit = True
#         break

print(f"Password: {password}")
print(f"Has 8+ chars: {has_length}")
print(f"Has digit: {has_digit}")
print(f"Has uppercase: {has_upper}")
print(f"Valid: {has_length and has_digit and has_upper}")

# Test with invalid password
print("\n--- Testing invalid password ---")
weak_password = "abc"
print(f"Password: {weak_password}")
print(f"Has 8+ chars: {len(weak_password) >= 8}")
print(f"Has digit: {any(c.isdigit() for c in weak_password)}")
print(f"Has uppercase: {any(c.isupper() for c in weak_password)}")
