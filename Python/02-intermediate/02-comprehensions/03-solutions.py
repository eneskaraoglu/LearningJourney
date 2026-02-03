# Advanced Comprehensions - Solutions

from collections import defaultdict

"""Exercise 1: Flatten and Transform"""
nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
result = [x**2 for row in nested for x in row]
print(f"Ex 1: {result}")


"""Exercise 2: Filter Nested"""
nested = [[1, 2, 8], [3, 4, 6], [5, 10, 12]]
result = [x for row in nested for x in row if x % 2 == 0 and x > 4]
print(f"Ex 2: {result}")


"""Exercise 3: Multiplication Table"""
table = [[(i+1) * (j+1) for j in range(10)] for i in range(10)]
print(f"Ex 3: table[2][3] = {table[2][3]}")  # 12


"""Exercise 4: Dict from Lists"""
words = ["python", "java", "javascript", "go", "rust"]
word_lengths = {word: len(word) for word in words}
print(f"Ex 4: {word_lengths}")


"""Exercise 5: Invert Dict (Group by length)"""
words = ["python", "java", "javascript", "go", "rust", "ruby"]
length_to_words = defaultdict(list)
for word in words:
    length_to_words[len(word)].append(word)
length_to_words = dict(length_to_words)
print(f"Ex 5: {length_to_words}")


"""Exercise 6: Nested Dict Comprehension"""
multiples = {n: {i: n*i for i in range(1, 4)} for n in range(1, 6)}
print(f"Ex 6: {multiples}")


"""Exercise 7: Set Comprehension"""
sentences = [
    "The quick brown fox",
    "jumps over the lazy dog",
    "The dog barks"
]
unique_words = {word.lower() for sentence in sentences for word in sentence.split()}
print(f"Ex 7: {unique_words}")


"""Exercise 8: Generator Expression"""
squares_gen = (x**2 for x in range(1, 1000001))
total = sum(x for x in (i**2 for i in range(1, 1000001)) if x < 10000)
# Or more simply:
total = sum(x**2 for x in range(1, 100) if x**2 < 10000)  # 99^2 = 9801 < 10000
print(f"Ex 8: {total}")


"""Exercise 9: Parse CSV Data"""
csv_data = """name,age,city
Alice,30,NYC
Bob,25,LA
Charlie,35,Chicago"""

lines = csv_data.strip().split("\n")
header = lines[0].split(",")
records = [dict(zip(header, line.split(","))) for line in lines[1:]]
print(f"Ex 9: {records}")


"""Exercise 10: Complex Transformation"""
products = [
    {"name": "Laptop", "price": 1000, "in_stock": True},
    {"name": "Mouse", "price": 50, "in_stock": True},
    {"name": "Keyboard", "price": 100, "in_stock": False},
    {"name": "Monitor", "price": 500, "in_stock": True},
]
discounted = {p["name"]: p["price"] * 0.8 for p in products if p["in_stock"]}
print(f"Ex 10: {discounted}")


"""BONUS: Matrix Operations"""
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# 1. Transpose
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
print(f"Bonus 1 (transpose): {transposed}")

# 2. Diagonal
diagonal = [matrix[i][i] for i in range(len(matrix))]
print(f"Bonus 2 (diagonal): {diagonal}")

# 3. Diagonal v2 using enumerate
diagonal_v2 = [val for i, row in enumerate(matrix) for j, val in enumerate(row) if i == j]
print(f"Bonus 3 (diagonal v2): {diagonal_v2}")
