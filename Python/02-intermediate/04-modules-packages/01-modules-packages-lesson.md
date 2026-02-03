# Session 4: Modules and Packages

## 🎯 Learning Objectives
- Understand Python's module system
- Create and organize packages
- Use different import styles
- Work with __init__.py and __all__
- Understand Python's import path

---

## 1. What is a Module?

A module is simply a Python file (.py) containing code.

```python
# mymodule.py
"""This is my module's docstring."""

PI = 3.14159  # Module-level variable

def greet(name):
    """Greet someone."""
    return f"Hello, {name}!"

class Calculator:
    def add(self, a, b):
        return a + b
```

```python
# Using the module
import mymodule

print(mymodule.PI)
print(mymodule.greet("Alice"))
calc = mymodule.Calculator()
```

---

## 2. Import Styles

### Import Entire Module
```python
import math

print(math.sqrt(16))
print(math.pi)
```

### Import with Alias
```python
import numpy as np
import pandas as pd

arr = np.array([1, 2, 3])
df = pd.DataFrame()
```

### Import Specific Items
```python
from math import sqrt, pi

print(sqrt(16))  # No need for math.sqrt
print(pi)
```

### Import with Alias (Specific Items)
```python
from math import sqrt as square_root

print(square_root(16))
```

### Import All (Avoid This!)
```python
from math import *  # Imports everything - pollutes namespace!

# Hard to know where functions come from
# May overwrite existing names
```

---

## 3. Module Search Path

Python looks for modules in this order:

```python
import sys
print(sys.path)

# 1. Current directory
# 2. PYTHONPATH environment variable
# 3. Standard library
# 4. Site-packages (third-party)
```

### Add to Path Temporarily
```python
import sys
sys.path.append('/path/to/my/modules')
```

---

## 4. Creating a Package

A package is a directory containing modules and a special `__init__.py` file.

```
mypackage/
├── __init__.py          # Makes it a package
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── module3.py
```

### __init__.py
```python
# mypackage/__init__.py

# Can be empty, or can contain:

# 1. Package-level imports
from .module1 import function1
from .module2 import Class2

# 2. Package-level variables
__version__ = "1.0.0"

# 3. __all__ - controls 'from package import *'
__all__ = ["function1", "Class2", "module1"]
```

### Using the Package
```python
# Import entire package
import mypackage

# Import specific module
from mypackage import module1

# Import from module
from mypackage.module1 import function1

# Import from subpackage
from mypackage.subpackage import module3
```

---

## 5. Relative vs Absolute Imports

### Absolute Imports (Preferred)
```python
# Always use full path from project root
from mypackage.module1 import function1
from mypackage.subpackage.module3 import function3
```

### Relative Imports (Inside Package Only)
```python
# Inside mypackage/module2.py
from .module1 import function1        # Same directory
from .subpackage import module3       # Child directory
from ..otherpackage import something  # Parent's sibling
```

**Note:** Relative imports only work inside packages, not in scripts run directly.

---

## 6. The __name__ Variable

Every module has a `__name__` variable:
- If imported: `__name__` = module name
- If run directly: `__name__` = `"__main__"`

```python
# mymodule.py
def main():
    print("Running as main program")

def helper():
    return "I'm a helper"

# This block only runs if file is executed directly
if __name__ == "__main__":
    main()

# If imported, main() doesn't auto-run
```

This pattern is used for:
1. Creating executable modules
2. Running tests
3. Demo code

---

## 7. Standard Library Highlights

### os - Operating System Interface
```python
import os

os.getcwd()              # Current directory
os.listdir('.')          # List directory
os.path.exists('file')   # Check if exists
os.path.join('a', 'b')   # Join paths
os.environ['HOME']       # Environment variable
os.makedirs('a/b/c')     # Create directories
```

### sys - System-Specific
```python
import sys

sys.argv          # Command line arguments
sys.path          # Module search path
sys.version       # Python version
sys.exit(1)       # Exit program
```

### pathlib - Modern Path Handling
```python
from pathlib import Path

p = Path('folder/file.txt')
p.exists()
p.is_file()
p.parent
p.name
p.suffix
p.read_text()
p.write_text('content')

# Path operations
Path.cwd()
Path.home()
list(Path('.').glob('*.py'))
```

### json - JSON Handling
```python
import json

# Parse JSON
data = json.loads('{"key": "value"}')
data = json.load(open('file.json'))

# Create JSON
text = json.dumps(data, indent=2)
json.dump(data, open('file.json', 'w'))
```

### datetime - Date and Time
```python
from datetime import datetime, timedelta

now = datetime.now()
today = datetime.today()
specific = datetime(2024, 12, 25, 10, 30)

# Formatting
now.strftime('%Y-%m-%d %H:%M:%S')

# Parsing
datetime.strptime('2024-12-25', '%Y-%m-%d')

# Arithmetic
tomorrow = now + timedelta(days=1)
```

### collections - Specialized Containers
```python
from collections import Counter, defaultdict, namedtuple, deque

# Counter - count occurrences
counts = Counter(['a', 'b', 'a', 'c', 'a'])
counts.most_common(2)  # [('a', 3), ('b', 1)]

# defaultdict - dict with default values
d = defaultdict(list)
d['key'].append('value')  # No KeyError!

# namedtuple - lightweight class
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)

# deque - double-ended queue
q = deque([1, 2, 3])
q.appendleft(0)
q.append(4)
q.popleft()
```

### itertools - Iterator Utilities
```python
from itertools import chain, cycle, repeat, combinations, permutations

list(chain([1,2], [3,4]))  # [1, 2, 3, 4]
list(combinations('ABC', 2))  # [('A','B'), ('A','C'), ('B','C')]
```

### functools - Function Utilities
```python
from functools import lru_cache, partial, reduce

@lru_cache(maxsize=128)
def expensive_function(n):
    return n ** 2

# partial - fix some arguments
def power(base, exp):
    return base ** exp
square = partial(power, exp=2)
```

---

## 8. Creating Installable Packages

### Project Structure
```
myproject/
├── mypackage/
│   ├── __init__.py
│   └── module.py
├── tests/
│   └── test_module.py
├── setup.py
├── pyproject.toml
├── README.md
└── requirements.txt
```

### pyproject.toml (Modern Way)
```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "mypackage"
version = "0.1.0"
description = "My awesome package"
readme = "README.md"
requires-python = ">=3.8"
dependencies = [
    "requests>=2.25.0",
    "numpy>=1.20.0",
]
```

### Install Locally
```bash
pip install -e .  # Editable install for development
```

---

## 9. Best Practices

### Import Order (PEP 8)
```python
# 1. Standard library
import os
import sys

# 2. Third-party packages
import numpy as np
import pandas as pd

# 3. Local/project imports
from mypackage import mymodule
```

### Avoid Circular Imports
```python
# module_a.py
from module_b import func_b  # module_b imports module_a!

# Solutions:
# 1. Move import inside function
# 2. Restructure code
# 3. Use import at end of file
```

### Use __all__ for Public API
```python
# mymodule.py
__all__ = ['public_function', 'PublicClass']

def public_function():
    pass

def _private_function():  # Convention: underscore = private
    pass
```

---

## Summary

1. **Module** = single .py file
2. **Package** = directory with __init__.py
3. **Prefer absolute imports**
4. **Use `if __name__ == "__main__"`** for scripts
5. **Know the standard library** - it's powerful!
6. **Follow import order** (stdlib, third-party, local)
