# React Hooks - Sample Project

This is a working React application demonstrating the concepts from Module 03: React Hooks.

## What's Demonstrated

- **useState Hook**: Managing component state
  - Simple counter with increment/decrement
  - Search filter with real-time updates
  - Todo list with add/remove/toggle
  - Form inputs and controlled components

- **useEffect Hook**: Managing side effects
  - Timer with intervals
  - Window resize event listener
  - Local storage persistence
  - Cleanup functions

- **Combined Patterns**
  - State management with objects and arrays
  - Functional state updates
  - Event handling
  - Conditional rendering

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (usually http://localhost:5173)

## Project Structure

```
sample/
├── src/
│   ├── App.jsx      # Main component with all examples
│   ├── main.jsx     # React entry point
│   └── styles.css   # Comprehensive styling
├── index.html       # HTML template
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## Features

### Counter
- Increment/decrement with custom step size
- Reset functionality
- Demonstrates basic useState

### Search Filter
- Real-time filtering of a list
- Shows useState for controlled inputs
- Dynamic list rendering

### Timer
- Start/stop/reset functionality
- Uses useEffect with intervals
- Demonstrates cleanup functions
- Time formatting

### Window Size Tracker
- Tracks and displays window dimensions
- Uses useEffect for event listeners
- Shows proper cleanup on unmount

### Todo List
- Add, complete, and delete todos
- Persists to localStorage
- Combines useState and useEffect
- Demonstrates array state management

## Try It Yourself

- Modify the initial state values
- Add new features to existing components
- Create your own components using hooks
- Experiment with different useEffect dependencies
- Try implementing a new feature like a countdown timer

## Key Concepts

1. **State Management**: Using useState for component state
2. **Side Effects**: Using useEffect for timers, events, and storage
3. **Dependency Arrays**: Controlling when effects run
4. **Cleanup Functions**: Preventing memory leaks
5. **Functional Updates**: Using previous state safely

## Next Steps

After mastering hooks, move on to Module 04 to learn about React Router for navigation and building multi-page applications.
