x=1

if x > 0:
    print("positive")
elif x < 0:          # elif, not "else if"!
    print("negative")
else:
    print("zero")
    
score = 75
if 70 <= score < 80:    # Same as: score >= 70 and score < 80
    print("Grade: C")

age = 21
status = "adult" if age >= 18 else "minor"
print(f"status: {status}")

for i in range(5):     # 0, 1, 2, 3, 4
    print(i)

for i in range(-2, 4, 2):     # 0, 1, 2, 3, 4
    print(i)

fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
    
names = ["Alice", "Bob"]
ages = [25, 30]

for name, age in zip(names, ages):
    print(f"{name} is {age}")
    
count = 0
while count < 5:
    print(count)
    count += 1    # No ++ in Python!
    
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4
    
for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4
    
for i in range(5):
    pass  # TODO: implement later

numbers = [1, 3, 5, 7]
target = 4

for num in numbers:
    if num == target:
        print("Found!")
        break
else:
    print("Not found!")  # This runs!
    
print("\n" + "="*50 + "\n")

score = 85
   
if 90 <= score < 101:    # Same as: score >= 70 and score < 80
    print("Grade: A")
elif 80 <= score < 89:    # Same as: score >= 70 and score < 80
    print("Grade: B")
elif 70 <= score < 79:    # Same as: score >= 70 and score < 80
    print("Grade: C")
elif 60 <= score < 60:    # Same as: score >= 70 and score < 80
    print("Grade: D")
    
for i in range(20):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
 
print("\n" + "="*50 + "\n")
        
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name} scored {score} points")

print("\n" + "="*50 + "\n")