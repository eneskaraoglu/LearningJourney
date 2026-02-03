# Virtual Environments - Exercises

"""
These exercises involve command-line operations.
Run them in your terminal, not in Python!

Exercise 1: Create Your First Virtual Environment
-------------------------------------------------
1. Create a new project directory called 'test_project'
2. Create a virtual environment called 'venv' inside it
3. Activate the virtual environment
4. Verify activation by checking which python is being used

Commands to run:
"""
exercise_1_commands = """
mkdir test_project
cd test_project
python -m venv venv

# Linux/Mac:
source venv/bin/activate

# Windows:
venv\\Scripts\\activate

# Verify:
which python  # Linux/Mac
where python  # Windows
python --version
"""


"""
Exercise 2: Package Management Basics
-------------------------------------
With your venv activated:
1. Install the 'requests' package
2. Install 'numpy' version 1.24.0 specifically
3. List all installed packages
4. Show details about the requests package
5. Create requirements.txt

Commands to run:
"""
exercise_2_commands = """
pip install requests
pip install numpy==1.24.0
pip list
pip show requests
pip freeze > requirements.txt
cat requirements.txt  # or type requirements.txt on Windows
"""


"""
Exercise 3: Working with requirements.txt
-----------------------------------------
1. Deactivate your current venv
2. Delete the venv folder
3. Create a fresh venv
4. Install packages from requirements.txt
5. Verify all packages are installed

Commands to run:
"""
exercise_3_commands = """
deactivate
rm -rf venv  # Linux/Mac
rmdir /s /q venv  # Windows

python -m venv venv
source venv/bin/activate  # or venv\\Scripts\\activate on Windows

pip install -r requirements.txt
pip list
"""


"""
Exercise 4: Create a requirements.txt Manually
----------------------------------------------
Create a requirements.txt file with:
- requests (any version >= 2.25)
- pandas (exactly version 2.0.0)
- pytest (for development, any version)
"""

requirements_content = """
# Production dependencies
requests>=2.25.0
pandas==2.0.0

# Development dependencies
pytest
black
flake8
"""

# Save this to: requirements.txt


"""
Exercise 5: Project Structure Setup
-----------------------------------
Set up a proper project structure with:
- Virtual environment
- Source code directory
- Tests directory
- requirements.txt
- .gitignore

Directory structure to create:
"""
project_structure = """
myproject/
├── venv/               # Virtual environment (don't commit!)
├── src/
│   └── myproject/
│       ├── __init__.py
│       └── main.py
├── tests/
│   └── test_main.py
├── requirements.txt
├── requirements-dev.txt
├── .gitignore
└── README.md
"""

gitignore_content = """
# Virtual environments
venv/
.venv/
ENV/

# Python
__pycache__/
*.py[cod]
*.so
.Python
*.egg-info/
dist/
build/

# IDE
.idea/
.vscode/
*.swp
*.swo

# Testing
.pytest_cache/
.coverage
htmlcov/

# Environment variables
.env
"""


"""
Exercise 6: Using Different Python Versions
-------------------------------------------
If you have multiple Python versions installed:
1. Check available Python versions
2. Create a venv with a specific version

Commands:
"""
exercise_6_commands = """
# Check installed versions
python --version
python3 --version
python3.10 --version  # if installed

# Create venv with specific version
python3.10 -m venv venv310

# Verify
source venv310/bin/activate
python --version
"""


"""
Exercise 7: Simulate Real Project Setup
---------------------------------------
Create a complete data science project setup.

1. Create project directory
2. Create and activate venv
3. Install data science packages
4. Create project structure
5. Save requirements

Packages to install:
- numpy
- pandas
- matplotlib
- scikit-learn
- jupyter

Commands:
"""
exercise_7_commands = """
mkdir datascience_project
cd datascience_project
python -m venv venv
source venv/bin/activate  # or venv\\Scripts\\activate

pip install numpy pandas matplotlib scikit-learn jupyter
pip freeze > requirements.txt

mkdir -p src notebooks data
touch src/__init__.py
touch README.md
echo "venv/" > .gitignore
"""


"""
BONUS: Compare venv vs conda
----------------------------
If you have conda installed, try these comparisons:

With conda:
"""
conda_commands = """
# Create conda environment
conda create -n myenv python=3.10

# Activate
conda activate myenv

# Install packages (conda packages)
conda install numpy pandas scikit-learn

# Install packages (pip packages)
pip install some-package-not-in-conda

# Export environment
conda env export > environment.yml

# Deactivate
conda deactivate

# List environments
conda env list

# Remove environment
conda env remove -n myenv
"""


"""
Verification Checklist
----------------------
After completing exercises, verify:
"""
verification = """
□ Can create virtual environment with: python -m venv venv
□ Can activate venv (prompt shows (venv))
□ 'which python' points to venv/bin/python
□ Can install packages with pip
□ Can create requirements.txt with pip freeze
□ Can install from requirements.txt
□ Know to add venv/ to .gitignore
□ Can deactivate with: deactivate
"""

print("Virtual Environments Exercises")
print("="*50)
print("These are command-line exercises.")
print("Run the commands in your terminal!")
print("\nStart with Exercise 1 and work through each one.")
print("\nVerification checklist at the end to confirm understanding.")
