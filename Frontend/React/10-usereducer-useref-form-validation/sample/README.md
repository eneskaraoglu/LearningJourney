# useReducer, useRef & Form Validation - Sample Project

This project demonstrates advanced React patterns including useReducer for complex state management, useRef for DOM access and mutable values, and comprehensive form validation.

## Features Demonstrated

### useReducer
- **Todo List**: Complete CRUD operations with reducer pattern
- Actions: ADD, TOGGLE, DELETE, CLEAR_COMPLETED
- Centralized state logic

### useRef
- **Stopwatch**: Persist interval ID without causing re-renders
- **Focus Management**: Programmatic input focus
- Accessing DOM elements directly

### Form Validation
- **Registration Form**: Comprehensive validation example
- Real-time validation on blur
- Multiple validation rules per field
- Touched field tracking
- Error message display
- Form submit validation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser to http://localhost:5173

## Validation Rules

### Username
- Required
- Minimum 3 characters
- Alphanumeric only

### Email
- Required
- Valid email format

### Password
- Required
- Minimum 8 characters
- Must contain lowercase letter
- Must contain uppercase letter
- Must contain number

### Confirm Password
- Must match password

## Key Concepts

### When to Use useReducer
- Complex state logic with multiple sub-values
- Next state depends on previous state
- Want to optimize performance for deep updates
- State updates involve multiple related actions

### When to Use useRef
- Accessing DOM elements
- Storing mutable values that don't need re-renders
- Keeping track of previous values
- Storing timers/intervals

### Form Validation Best Practices
- Validate on blur for better UX
- Show errors only after field is touched
- Provide clear, specific error messages
- Disable submit while invalid
- Consider using libraries for complex forms (Formik, React Hook Form)

## Project Structure

```
sample/
├── src/
│   ├── App.jsx        # Main component with all examples
│   ├── main.jsx       # Entry point
│   └── styles.css     # Complete styling
├── index.html
├── package.json
└── vite.config.js
```

## Exercises

Try these challenges:
1. Add EDIT action to todo reducer
2. Create a countdown timer using useRef
3. Add email uniqueness check to validation
4. Implement multi-step form with navigation
5. Add password strength indicator

## Next Steps

Move on to Module 11 to learn about full API integration with a complete user management system including CRUD operations.
