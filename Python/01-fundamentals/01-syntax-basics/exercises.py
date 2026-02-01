print("Hello World")

a = 100
b = 200

a, b = b, a  # Python magic!

print(f"a = {a}, b = {b}") 

name = "Alice"
if name == "Alice":
    print("Hello Alice")
    
nameD = "Enes"
years = 18
print("Hi. My name is ", nameD ,", I have been java developer in ", years, " year.")


year = 9
leght = 1.2
name = "Alice"
day = False


name = "John"
age = 25

#name = input("Enter name: ")      # Always returns string
#age = int(input("Enter age: "))   # Convert to int manually

print(name," is ",age," years old")
# Method 2: .format()
print("Name: {}, Age: {}".format(name, age))

# Method 3: % operator (old style, like C)
print("Name: %s, Age: %d" % (name, age))
print(f"Name: {name}, Age: {age}")

x =4
if 0 < x < 10:  # Same as: if x > 0 and x < 10
    print("x is between 0 and 10")