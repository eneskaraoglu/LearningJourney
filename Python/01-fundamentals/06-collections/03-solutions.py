# Collections - Exercise Solutions

"""Exercise 1: List Manipulation"""
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
result = sorted(list(set(numbers)), reverse=True)
print(f"Ex 1: {result}")

"""Exercise 2: List Comprehension - Squares"""
odd_squares = [x**2 for x in range(1, 11) if x % 2 == 1]
print(f"Ex 2: {odd_squares}")

"""Exercise 3: List Comprehension - Filter Strings"""
words = ["hi", "hello", "hey", "world", "python", "go", "java"]
result = [w.upper() for w in words if len(w) > 3]
print(f"Ex 3: {result}")

"""Exercise 4: Dictionary Basics"""
def char_frequency(text):
    freq = {}
    for char in text:
        freq[char] = freq.get(char, 0) + 1
    return freq

# Or using dict comprehension:
def char_frequency_v2(text):
    return {char: text.count(char) for char in set(text)}

print(f"Ex 4: {char_frequency('hello')}")

"""Exercise 5: Dict Comprehension"""
cubes = {x: x**3 for x in range(1, 6)}
print(f"Ex 5: {cubes}")

"""Exercise 6: Nested Dict Access"""
students = {
    "class_a": [{"name": "Alice", "score": 85}, {"name": "Bob", "score": 72}],
    "class_b": [{"name": "Charlie", "score": 90}, {"name": "Diana", "score": 68}]
}
top_students = [s["name"] for cls in students.values() for s in cls if s["score"] > 80]
print(f"Ex 6: {top_students}")

"""Exercise 7: Set Operations"""
assignment1 = [1, 2, 3, 4, 5]
assignment2 = [3, 4, 5, 6, 7]
set1, set2 = set(assignment1), set(assignment2)

both = set1 & set2
at_least_one = set1 | set2
only_first = set1 - set2

print(f"Ex 7: Both: {both}, At least one: {at_least_one}, Only first: {only_first}")

"""Exercise 8: Word Frequency Counter"""
text = "The quick brown fox jumps over the lazy dog the fox"
words = text.lower().split()
word_count = {word: words.count(word) for word in set(words)}
print(f"Ex 8: {word_count}")

"""BONUS: Flatten and Unique"""
nested = [[1, 2, 3], [2, 3, 4], [3, 4, 5], [1, 5, 6]]
unique_sorted = sorted(set(num for sublist in nested for num in sublist))
print(f"Bonus: {unique_sorted}")
