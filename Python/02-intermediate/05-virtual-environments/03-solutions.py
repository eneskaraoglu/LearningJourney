# Virtual Environments - Solutions and Walkthrough

"""
This file contains the complete solutions and explanations
for the virtual environments exercises.

Since these are terminal exercises, I'll show the commands
and expected outputs.
"""

# ============================================================
# Exercise 1: Create Your First Virtual Environment
# ============================================================

exercise_1_solution = """
# Step 1: Create project directory
$ mkdir test_project
$ cd test_project

# Step 2: Create virtual environment
$ python -m venv venv

# Step 3: Activate (Linux/Mac)
$ source venv/bin/activate
(venv) $

# Step 3: Activate (Windows)
> venv\\Scripts\\activate
(venv) >

# Step 4: Verify
(venv) $ which python
/path/to/test_project/venv/bin/python

(venv) $ python --version
Python 3.10.x

# Your prompt should show (venv) prefix!
"""


# ============================================================
# Exercise 2: Package Management Basics
# ============================================================

exercise_2_solution = """
# Install requests
(venv) $ pip install requests
Successfully installed certifi charset-normalizer idna requests urllib3

# Install specific numpy version
(venv) $ pip install numpy==1.24.0
Successfully installed numpy-1.24.0

# List packages
(venv) $ pip list
Package            Version
------------------ ---------
certifi            2023.x.x
charset-normalizer 3.x.x
idna               3.x
numpy              1.24.0
pip                23.x.x
requests           2.31.x
urllib3            2.x.x

# Show package info
(venv) $ pip show requests
Name: requests
Version: 2.31.0
Summary: Python HTTP for Humans.
Home-page: https://requests.readthedocs.io
...

# Create requirements.txt
(venv) $ pip freeze > requirements.txt

# View requirements.txt
(venv) $ cat requirements.txt
certifi==2023.7.22
charset-normalizer==3.2.0
idna==3.4
numpy==1.24.0
requests==2.31.0
urllib3==2.0.4
"""


# ============================================================
# Exercise 3: Working with requirements.txt
# ============================================================

exercise_3_solution = """
# Deactivate
(venv) $ deactivate
$

# Delete venv
$ rm -rf venv  # Linux/Mac
> rmdir /s /q venv  # Windows

# Create fresh venv
$ python -m venv venv

# Activate
$ source venv/bin/activate

# Install from requirements
(venv) $ pip install -r requirements.txt
Successfully installed certifi-2023.7.22 charset-normalizer-3.2.0 ...

# Verify
(venv) $ pip list
# Should show all packages from requirements.txt
"""


# ============================================================
# Exercise 4: Create requirements.txt Manually
# ============================================================

requirements_txt_content = """# requirements.txt
# Production dependencies
requests>=2.25.0
pandas==2.0.0

# Development dependencies (could be in separate file)
pytest
black
flake8
"""

requirements_dev_txt_content = """# requirements-dev.txt
-r requirements.txt  # Include base requirements

# Testing
pytest>=7.0.0
pytest-cov>=4.0.0

# Code quality
black>=23.0.0
flake8>=6.0.0
mypy>=1.0.0

# Documentation
sphinx>=6.0.0
"""


# ============================================================
# Exercise 5: Project Structure Setup
# ============================================================

exercise_5_solution = """
# Create directories
$ mkdir -p myproject/src/myproject myproject/tests
$ cd myproject

# Create venv
$ python -m venv venv
$ source venv/bin/activate

# Create files
(venv) $ touch src/myproject/__init__.py
(venv) $ touch src/myproject/main.py
(venv) $ touch tests/test_main.py
(venv) $ touch requirements.txt requirements-dev.txt README.md

# Create .gitignore
(venv) $ cat > .gitignore << 'EOF'
# Virtual environments
venv/
.venv/
ENV/

# Python
__pycache__/
*.py[cod]
*.egg-info/
dist/
build/

# IDE
.idea/
.vscode/

# Testing
.pytest_cache/
.coverage
EOF

# Final structure
$ tree myproject/
myproject/
├── .gitignore
├── README.md
├── requirements.txt
├── requirements-dev.txt
├── src/
│   └── myproject/
│       ├── __init__.py
│       └── main.py
├── tests/
│   └── test_main.py
└── venv/
    └── ...
"""


# ============================================================
# Exercise 7: Data Science Project Setup
# ============================================================

exercise_7_solution = """
# Create and setup
$ mkdir datascience_project
$ cd datascience_project
$ python -m venv venv
$ source venv/bin/activate

# Install packages
(venv) $ pip install numpy pandas matplotlib scikit-learn jupyter

# This installs many dependencies!
# Check with pip list - you'll see 50+ packages

# Save requirements
(venv) $ pip freeze > requirements.txt

# Create structure
(venv) $ mkdir -p src notebooks data
(venv) $ touch src/__init__.py
(venv) $ touch README.md

# Create .gitignore
(venv) $ cat > .gitignore << 'EOF'
venv/
__pycache__/
*.pyc
.ipynb_checkpoints/
data/*.csv
data/*.xlsx
EOF

# Test jupyter
(venv) $ jupyter notebook
# Opens browser with Jupyter interface
"""


# ============================================================
# Verification Script
# ============================================================

def verify_venv_setup():
    """Run this inside an activated venv to verify setup."""
    import sys
    import os
    
    print("Virtual Environment Verification")
    print("=" * 50)
    
    # Check if in venv
    in_venv = hasattr(sys, 'real_prefix') or (
        hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix
    )
    print(f"✓ In virtual environment: {in_venv}")
    
    # Check Python location
    print(f"✓ Python location: {sys.executable}")
    
    # Check Python version
    print(f"✓ Python version: {sys.version}")
    
    # Check pip
    try:
        import pip
        print(f"✓ pip available: {pip.__version__}")
    except ImportError:
        print("✗ pip not available")
    
    # List installed packages
    print("\nInstalled packages:")
    os.system("pip list")


# Run verification
if __name__ == "__main__":
    print("\nRun this inside your activated virtual environment!")
    print("Commands to test your understanding:\n")
    
    commands = [
        "python -m venv test_env",
        "source test_env/bin/activate  # Linux/Mac",
        "test_env\\Scripts\\activate  # Windows",
        "pip install requests",
        "pip freeze > requirements.txt",
        "deactivate",
    ]
    
    for cmd in commands:
        print(f"  $ {cmd}")
    
    print("\n" + "=" * 50)
    print("Key Takeaways:")
    print("=" * 50)
    print("""
1. ALWAYS use virtual environments
2. One venv per project
3. Activate BEFORE installing packages
4. Use requirements.txt to track dependencies
5. NEVER commit venv/ to git
6. For data science, consider conda
""")
