# Control Flow - Exercise Solutions

"""
Exercise 1: Grade Calculator
"""
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")

# Alternative with chained comparison:
if 90 <= score <= 100:
    print("Grade: A")
elif 80 <= score < 90:
    print("Grade: B")
# ... etc

print("\n" + "="*50 + "\n")


"""
Exercise 2: FizzBuzz
"""
for i in range(1, 21):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)

print("\n" + "="*50 + "\n")


"""
Exercise 3: Using enumerate()
"""
tasks = ["Buy groceries", "Clean room", "Study Python", "Exercise"]

for index, task in enumerate(tasks, start=1):
    print(f"{index}. {task}")

print("\n" + "="*50 + "\n")


"""
Exercise 4: Using zip()
"""
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name} scored {score} points")

print("\n" + "="*50 + "\n")


"""
Exercise 5: For-Else (Search)
"""
numbers = [1, 3, 7, 9, 11]

for num in numbers:
    if num % 2 == 0:
        print(f"Found even number: {num}")
        break
else:
    print("No even numbers found")

print("\n" + "="*50 + "\n")


"""
Exercise 6: Countdown
"""
count = 10
while count > 0:
    print(count)
    count -= 1
print("Liftoff!")

# Alternative with for loop:
# for i in range(10, 0, -1):
#     print(i)
# print("Liftoff!")

print("\n" + "="*50 + "\n")


"""
Exercise 7: Number Guessing Game
"""
secret = 7
attempts = 0

print("Guess the number (1-10)!")
while True:
    guess = int(input("Your guess: "))
    attempts += 1
    
    if guess == secret:
        print(f"Correct! You got it in {attempts} attempts!")
        break
    elif guess > secret:
        print("Too high!")
    else:
        print("Too low!")

print("\n" + "="*50 + "\n")


"""
BONUS: Prime Number Checker
"""
num = 17

if num < 2:
    print(f"{num} is not prime")
else:
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            print(f"{num} is NOT prime (divisible by {i})")
            break
    else:
        print(f"{num} is PRIME!")

# Test with different numbers:
for test_num in [2, 15, 17, 23, 100]:
    if test_num < 2:
        result = "not prime"
    else:
        for i in range(2, int(test_num ** 0.5) + 1):
            if test_num % i == 0:
                result = f"not prime (div by {i})"
                break
        else:
            result = "PRIME"
    print(f"{test_num}: {result}")
