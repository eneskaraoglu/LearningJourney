# Session 7: File Handling

## 🎯 Learning Objectives
- Read and write text files
- Work with CSV and JSON (essential for data work!)
- Use context managers (with statement)
- Handle file paths properly

---

## 1. Basic File Operations

### Opening Files
```python
# Basic syntax
file = open("filename.txt", "mode")
# ... do stuff ...
file.close()

# BETTER - Use context manager (auto-closes!)
with open("filename.txt", "mode") as file:
    # do stuff
# File automatically closed here
```

### File Modes
| Mode | Description |
|------|-------------|
| `"r"` | Read (default) |
| `"w"` | Write (overwrites!) |
| `"a"` | Append |
| `"x"` | Create (fails if exists) |
| `"r+"` | Read and write |
| `"b"` | Binary mode (add to above: `"rb"`, `"wb"`) |

---

## 2. Reading Files

```python
# Read entire file as string
with open("data.txt", "r") as f:
    content = f.read()
    print(content)

# Read all lines as list
with open("data.txt", "r") as f:
    lines = f.readlines()  # Includes \n
    lines = [line.strip() for line in lines]  # Remove \n

# Read line by line (memory efficient for large files!)
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())

# Read specific number of characters
with open("data.txt", "r") as f:
    chunk = f.read(100)  # First 100 chars
```

---

## 3. Writing Files

```python
# Write string (overwrites file!)
with open("output.txt", "w") as f:
    f.write("Hello, World!\n")
    f.write("Second line\n")

# Write multiple lines
lines = ["Line 1", "Line 2", "Line 3"]
with open("output.txt", "w") as f:
    f.writelines(line + "\n" for line in lines)

# Append to file
with open("output.txt", "a") as f:
    f.write("Appended line\n")

# Write with print
with open("output.txt", "w") as f:
    print("Hello", "World", file=f)
```

---

## 4. Working with CSV (Critical for Data!)

### Using csv module
```python
import csv

# Read CSV
with open("data.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    for row in reader:
        print(row)  # row is a list

# Read CSV as dictionaries
with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])  # Access by column name

# Write CSV
data = [
    ["name", "age", "city"],
    ["Alice", 30, "NYC"],
    ["Bob", 25, "LA"]
]
with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(data)

# Write CSV from dictionaries
users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
]
with open("output.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "age"])
    writer.writeheader()
    writer.writerows(users)
```

---

## 5. Working with JSON (Critical for APIs/Data!)

```python
import json

# Read JSON file
with open("data.json", "r") as f:
    data = json.load(f)  # Returns dict or list

# Write JSON file
data = {"name": "Alice", "age": 30, "scores": [85, 90, 95]}
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)  # indent for pretty print

# JSON string <-> Python object
json_string = '{"name": "Alice", "age": 30}'
data = json.loads(json_string)      # String to dict
json_string = json.dumps(data)      # Dict to string
```

### JSON Type Mapping
| Python | JSON |
|--------|------|
| dict | object |
| list | array |
| str | string |
| int, float | number |
| True/False | true/false |
| None | null |

---

## 6. File Path Handling

```python
from pathlib import Path  # Modern way (Python 3.4+)

# Create path object
p = Path("folder/subfolder/file.txt")

# Path operations
p.exists()          # Check if exists
p.is_file()         # Is it a file?
p.is_dir()          # Is it a directory?
p.name              # "file.txt"
p.stem              # "file"
p.suffix            # ".txt"
p.parent            # Path("folder/subfolder")

# Join paths
data_dir = Path("data")
file_path = data_dir / "users" / "data.csv"  # data/users/data.csv

# Create directories
Path("new_folder").mkdir(exist_ok=True)
Path("a/b/c").mkdir(parents=True, exist_ok=True)

# List files
for file in Path(".").iterdir():
    print(file)

# Find files by pattern
for csv_file in Path(".").glob("*.csv"):
    print(csv_file)

for py_file in Path(".").glob("**/*.py"):  # Recursive
    print(py_file)
```

### Cross-platform (Old way with os)
```python
import os

os.path.join("folder", "file.txt")  # folder/file.txt or folder\file.txt
os.path.exists("file.txt")
os.listdir(".")
os.makedirs("a/b/c", exist_ok=True)
```

---

## 7. Error Handling for Files

```python
from pathlib import Path

# Check before opening
path = Path("data.txt")
if path.exists():
    with open(path) as f:
        content = f.read()

# Or use try/except
try:
    with open("data.txt", "r") as f:
        content = f.read()
except FileNotFoundError:
    print("File not found!")
except PermissionError:
    print("Permission denied!")
except IOError as e:
    print(f"IO error: {e}")
```

---

## 8. Common Patterns

### Read Config File
```python
import json

def load_config(path="config.json"):
    with open(path) as f:
        return json.load(f)

config = load_config()
print(config["database"]["host"])
```

### Process Large CSV
```python
import csv

def process_large_csv(filename):
    with open(filename, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Process one row at a time (memory efficient)
            yield process_row(row)
```

### Log to File
```python
def log(message, filename="app.log"):
    with open(filename, "a") as f:
        from datetime import datetime
        timestamp = datetime.now().isoformat()
        f.write(f"[{timestamp}] {message}\n")
```

---

## Summary

1. **Always use `with`** - auto-closes files
2. **csv module** - for CSV files
3. **json module** - for JSON files
4. **pathlib.Path** - modern path handling
5. **Handle errors** - FileNotFoundError, etc.
6. **Iterate for large files** - don't read all at once
