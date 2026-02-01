# Session 3: Control Flow

## 🎯 Learning Objectives
- Master if/elif/else syntax
- Understand Python's unique for loop
- Use enumerate() and zip()
- Discover the for-else construct

---

## 1. If / Elif / Else

```java
// Java
if (x > 0) {
    System.out.println("positive");
} else if (x < 0) {
    System.out.println("negative");
} else {
    System.out.println("zero");
}
```

```python
# Python
if x > 0:
    print("positive")
elif x < 0:          # elif, not "else if"!
    print("negative")
else:
    print("zero")
```

### Chained Comparisons (Python Magic!)
```python
score = 75
if 70 <= score < 80:    # Same as: score >= 70 and score < 80
    print("Grade: C")
```

### Ternary Operator
```java
// Java
String status = age >= 18 ? "adult" : "minor";
```

```python
# Python - reads like English!
status = "adult" if age >= 18 else "minor"
```

---

## 2. For Loop - VERY Different from Java!

### Python iterates over sequences - no C-style for loop!

```python
# Iterate over range
for i in range(5):     # 0, 1, 2, 3, 4
    print(i)

# Iterate over list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

### range() Function
```python
range(5)           # 0, 1, 2, 3, 4
range(2, 5)        # 2, 3, 4
range(0, 10, 2)    # 0, 2, 4, 6, 8
range(10, 0, -1)   # 10, 9, 8, ... 1 (countdown)
```

### enumerate() - Index + Value
```python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry
```

### zip() - Parallel Iteration
```python
names = ["Alice", "Bob"]
ages = [25, 30]

for name, age in zip(names, ages):
    print(f"{name} is {age}")
# Alice is 25
# Bob is 30
```

---

## 3. While Loop

```python
count = 0
while count < 5:
    print(count)
    count += 1    # No ++ in Python!
```

---

## 4. break, continue, pass

```python
# break - exit loop
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - skip iteration
for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4

# pass - placeholder (do nothing)
for i in range(5):
    pass  # TODO: implement later
```

---

## 5. For-Else (Python Exclusive!) ⭐

```python
# else runs if loop completes WITHOUT break
numbers = [1, 3, 5, 7]
target = 4

for num in numbers:
    if num == target:
        print("Found!")
        break
else:
    print("Not found!")  # This runs!
```

---

## Quick Reference

| Java | Python |
|------|--------|
| `for(int i=0; i<10; i++)` | `for i in range(10):` |
| `else if` | `elif` |
| `&&` / `||` | `and` / `or` |
| `i++` | `i += 1` |
| `a ? b : c` | `b if a else c` |
