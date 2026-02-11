import { create } from 'zustand'
import { Component } from 'react'

/*
  ZUSTAND & ERROR BOUNDARIES EXERCISES

  Learn Zustand for state management and Error Boundaries for error handling.
*/

// ============================================================================
// Exercise 1: Basic Zustand Store
// ============================================================================
/*
  Create a simple counter store using Zustand.

  Requirements:
  - Create a store with count state (initial: 0)
  - Add increment, decrement, and reset actions
  - Use the store in a component

  Hint: Use create() from zustand
*/

// TODO: Create counter store
const useCounterStore = create((set) => ({
  // Your code here
}))

export function Counter() {
  // TODO: Use the counter store
}

// ============================================================================
// Exercise 2: Todo Store with Actions
// ============================================================================
/*
  Create a todo list store with CRUD operations.

  Requirements:
  - State: todos array
  - Actions: addTodo, toggleTodo, deleteTodo, clearCompleted
  - Each todo has: id, text, completed
  - Component that uses the store

  Hint: Use Date.now() for unique IDs
*/

// TODO: Create todo store

export function TodoList() {
  // TODO: Use the todo store
}

// ============================================================================
// Exercise 3: Zustand with Middleware (Persist)
// ============================================================================
/*
  Create a theme store that persists to localStorage.

  Requirements:
  - State: theme ('light' or 'dark')
  - Action: toggleTheme
  - Use persist middleware to save to localStorage
  - Component that shows current theme

  Hint: import { persist } from 'zustand/middleware'
*/

// TODO: Create theme store with persist middleware

export function ThemeToggle() {
  // TODO: Use the theme store
}

// ============================================================================
// Exercise 4: Multiple Stores
// ============================================================================
/*
  Create separate stores for user and cart.

  Requirements:
  - User store: user object (name, email), login, logout
  - Cart store: items array, addItem, removeItem, total
  - Component that uses both stores

  This demonstrates multiple independent stores.
*/

// TODO: Create user store

// TODO: Create cart store

export function UserCart() {
  // TODO: Use both stores
}

// ============================================================================
// Exercise 5: Basic Error Boundary
// ============================================================================
/*
  Create an Error Boundary class component.

  Requirements:
  - Catch errors in child components
  - Display fallback UI on error
  - Log error details
  - Provide reset functionality

  Hint: Use componentDidCatch and getDerivedStateFromError
*/

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    // TODO: Initialize state
  }

  static getDerivedStateFromError(error) {
    // TODO: Update state
  }

  componentDidCatch(error, errorInfo) {
    // TODO: Log error
  }

  render() {
    // TODO: Render fallback or children
  }
}

// Component that throws an error for testing
export function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('This is a test error!')
  }

  return (
    <div>
      <p>This component can throw an error</p>
      <button onClick={() => setShouldThrow(true)}>Throw Error</button>
    </div>
  )
}

// ============================================================================
// Exercise 6: Multiple Error Boundaries
// ============================================================================
/*
  Use multiple Error Boundaries for isolated error handling.

  Requirements:
  - Wrap different sections with separate Error Boundaries
  - Errors in one section don't affect others
  - Each boundary has custom fallback UI

  This demonstrates error isolation.
*/

export function MultipleErrorBoundaries() {
  // TODO: Implement multiple error boundaries
}

// ============================================================================
// Exercise 7: Error Boundary with Zustand
// ============================================================================
/*
  Combine Error Boundary with Zustand for error state management.

  Requirements:
  - Create error store to track errors
  - Log errors to the store
  - Display error list
  - Clear errors action

  This demonstrates centralized error management.
*/

// TODO: Create error store

export function ErrorLogger() {
  // TODO: Use error store to display errors
}

// ============================================================================
// Exercise 8: Async Error Handling
// ============================================================================
/*
  Create a data fetching component with error handling.

  Requirements:
  - Fetch data from API
  - Handle network errors with Error Boundary
  - Use Zustand to manage loading/error state
  - Display appropriate UI for each state

  Combine Zustand state management with Error Boundaries.
*/

// TODO: Create API store

export function DataFetcher() {
  // TODO: Implement data fetching with error handling
}

// ============================================================================
// Main App Component
// ============================================================================

export default function App() {
  const [activeExercise, setActiveExercise] = useState(1)

  const exercises = [
    { number: 1, title: 'Basic Zustand Store', Component: Counter },
    { number: 2, title: 'Todo Store', Component: TodoList },
    { number: 3, title: 'Persist Middleware', Component: ThemeToggle },
    { number: 4, title: 'Multiple Stores', Component: UserCart },
    {
      number: 5,
      title: 'Error Boundary',
      Component: () => (
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      ),
    },
    { number: 6, title: 'Multiple Boundaries', Component: MultipleErrorBoundaries },
    { number: 7, title: 'Error with Zustand', Component: ErrorLogger },
    { number: 8, title: 'Async Errors', Component: DataFetcher },
  ]

  const currentExercise = exercises.find((ex) => ex.number === activeExercise)

  return (
    <div className="app">
      <header>
        <h1>Zustand & Error Boundaries</h1>
        <p>State management and error handling in React</p>
      </header>

      <nav className="exercise-nav">
        {exercises.map((ex) => (
          <button
            key={ex.number}
            className={activeExercise === ex.number ? 'active' : ''}
            onClick={() => setActiveExercise(ex.number)}
          >
            {ex.number}. {ex.title}
          </button>
        ))}
      </nav>

      <main>
        <div className="exercise-container">
          <h2>
            Exercise {currentExercise.number}: {currentExercise.title}
          </h2>
          <div className="exercise-demo">
            <currentExercise.Component />
          </div>
        </div>
      </main>

      <footer>
        <p>Master Zustand and Error Boundaries!</p>
      </footer>
    </div>
  )
}
