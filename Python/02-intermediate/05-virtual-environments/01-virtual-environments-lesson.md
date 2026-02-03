# Session 5: Virtual Environments

## 🎯 Learning Objectives
- Understand why virtual environments are essential
- Create and manage virtual environments
- Use pip for package management
- Work with requirements.txt
- Know tools like venv, virtualenv, conda

---

## 1. Why Virtual Environments?

### The Problem
```
Project A needs: requests==2.25.0
Project B needs: requests==2.28.0

Without virtual environments:
- Both projects share the same Python installation
- Can only have one version of a package
- Upgrading for one project breaks the other!
```

### The Solution
Each project gets its own isolated Python environment with its own packages.

```
project_a/
├── venv/           # Project A's Python + packages
├── src/
└── requirements.txt

project_b/
├── venv/           # Project B's Python + packages  
├── src/
└── requirements.txt
```

---

## 2. Creating Virtual Environments

### Using venv (Built-in, Python 3.3+)
```bash
# Create virtual environment
python -m venv myenv

# On Windows
python -m venv myenv

# Create with specific Python version (if multiple installed)
python3.10 -m venv myenv
```

### Directory Structure Created
```
myenv/
├── bin/            # Linux/Mac: activate scripts, python, pip
│   ├── activate
│   ├── python
│   └── pip
├── Scripts/        # Windows: same as bin/
├── lib/            # Installed packages go here
├── include/
└── pyvenv.cfg      # Configuration
```

---

## 3. Activating/Deactivating

### Linux/Mac
```bash
# Activate
source myenv/bin/activate

# Your prompt changes:
(myenv) $ python --version

# Deactivate
deactivate
```

### Windows (Command Prompt)
```cmd
# Activate
myenv\Scripts\activate.bat

# Deactivate
deactivate
```

### Windows (PowerShell)
```powershell
# Activate
myenv\Scripts\Activate.ps1

# If you get execution policy error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Deactivate
deactivate
```

### Verify Activation
```bash
# Should point to venv
which python        # Linux/Mac
where python        # Windows

# Check pip location
which pip
pip --version
```

---

## 4. Installing Packages with pip

### Basic Commands
```bash
# Install package
pip install requests

# Install specific version
pip install requests==2.28.0

# Install minimum version
pip install requests>=2.25.0

# Install from requirements file
pip install -r requirements.txt

# Upgrade package
pip install --upgrade requests

# Uninstall
pip uninstall requests

# List installed packages
pip list

# Show package info
pip show requests

# Search (deprecated, use pypi.org)
# pip search requests
```

### Install from Different Sources
```bash
# From Git repository
pip install git+https://github.com/user/repo.git

# From local directory
pip install ./mypackage

# From wheel file
pip install package.whl

# Install in editable/development mode
pip install -e ./myproject
```

---

## 5. requirements.txt

### Creating requirements.txt
```bash
# Export all installed packages
pip freeze > requirements.txt

# Contents look like:
# certifi==2023.7.22
# charset-normalizer==3.2.0
# requests==2.31.0
# urllib3==2.0.4
```

### Manual requirements.txt
```txt
# requirements.txt

# Exact versions (reproducible)
requests==2.31.0
numpy==1.24.0

# Minimum versions (flexible)
pandas>=2.0.0
scikit-learn>=1.0

# Version ranges
flask>=2.0,<3.0

# Development dependencies (optional)
pytest>=7.0
black>=23.0

# From Git
git+https://github.com/user/repo.git@v1.0.0
```

### Installing from requirements.txt
```bash
pip install -r requirements.txt
```

### Separate Dev Requirements
```
requirements/
├── base.txt        # Production dependencies
├── dev.txt         # Development dependencies
└── test.txt        # Testing dependencies
```

```txt
# dev.txt
-r base.txt         # Include base requirements
pytest>=7.0
black>=23.0
mypy>=1.0
```

---

## 6. Common Project Setup

### New Project Workflow
```bash
# 1. Create project directory
mkdir myproject
cd myproject

# 2. Create virtual environment
python -m venv venv

# 3. Activate it
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# 4. Install packages
pip install requests pandas numpy

# 5. Save requirements
pip freeze > requirements.txt

# 6. Add venv to .gitignore
echo "venv/" >> .gitignore
```

### Clone Existing Project
```bash
# 1. Clone repository
git clone https://github.com/user/project.git
cd project

# 2. Create virtual environment
python -m venv venv

# 3. Activate
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt
```

---

## 7. IDE Integration

### VS Code
1. Open project folder
2. Ctrl+Shift+P → "Python: Select Interpreter"
3. Choose the venv Python
4. Terminal will auto-activate venv

### PyCharm
1. File → Settings → Project → Python Interpreter
2. Add Interpreter → Existing Environment
3. Browse to venv/bin/python

---

## 8. Alternative Tools

### virtualenv (Third-party, more features)
```bash
pip install virtualenv
virtualenv myenv
virtualenv -p python3.10 myenv  # Specific version
```

### conda (Anaconda/Miniconda)
```bash
# Create environment
conda create -n myenv python=3.10

# Activate
conda activate myenv

# Install packages
conda install numpy pandas
pip install other-package  # Can mix with pip

# Export environment
conda env export > environment.yml

# Create from file
conda env create -f environment.yml

# List environments
conda env list

# Deactivate
conda deactivate
```

### pipenv (Combines pip + virtualenv)
```bash
pip install pipenv

# Create environment and install
pipenv install requests

# Activate
pipenv shell

# Install dev dependencies
pipenv install --dev pytest

# Creates Pipfile and Pipfile.lock
```

### poetry (Modern dependency management)
```bash
pip install poetry

# New project
poetry new myproject

# Add dependencies
poetry add requests
poetry add --dev pytest

# Install from pyproject.toml
poetry install

# Run in environment
poetry run python script.py

# Activate shell
poetry shell
```

---

## 9. Best Practices

### DO ✅
```bash
# Always use virtual environments
python -m venv venv

# Keep requirements.txt updated
pip freeze > requirements.txt

# Add venv to .gitignore
echo "venv/" >> .gitignore

# Use specific versions in production
requests==2.31.0

# Document Python version needed
# README: Requires Python 3.8+
```

### DON'T ❌
```bash
# Don't install globally
sudo pip install package  # NO!

# Don't commit venv folder
git add venv/  # NO!

# Don't use pip install without venv
pip install requests  # Creates global mess!
```

---

## 10. Troubleshooting

### Common Issues

**"pip not found" after activation**
```bash
# Reinstall pip in venv
python -m ensurepip --upgrade
```

**Permission errors on Linux/Mac**
```bash
# Don't use sudo! Create venv properly
python -m venv venv --clear
```

**PowerShell execution policy**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Wrong Python version**
```bash
# Check version
python --version

# Create with specific version
python3.10 -m venv venv
```

---

## 11. Quick Reference

| Task | Command |
|------|---------|
| Create venv | `python -m venv venv` |
| Activate (Linux/Mac) | `source venv/bin/activate` |
| Activate (Windows) | `venv\Scripts\activate` |
| Deactivate | `deactivate` |
| Install package | `pip install package` |
| Install from file | `pip install -r requirements.txt` |
| Save requirements | `pip freeze > requirements.txt` |
| List packages | `pip list` |
| Upgrade pip | `pip install --upgrade pip` |

---

## Summary

1. **Always use virtual environments** - one per project
2. **venv is built-in** - no extra install needed
3. **Activate before working** - check your prompt
4. **requirements.txt** - tracks dependencies
5. **Never commit venv/** - add to .gitignore
6. **Consider conda** for data science/ML projects
