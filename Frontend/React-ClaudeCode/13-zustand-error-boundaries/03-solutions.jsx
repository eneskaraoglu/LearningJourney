import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Component, useState } from 'react'

/*
  ZUSTAND & ERROR BOUNDARIES SOLUTIONS

  Complete implementations of Zustand stores and Error Boundaries.
*/

// ============================================================================
// Exercise 1: Basic Zustand Store
// ============================================================================

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

export function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="counter">
      <h3>Count: {count}</h3>
      <div className="button-group">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

// ============================================================================
// Exercise 2: Todo Store with Actions
// ============================================================================

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}))

export function TodoList() {
  const [input, setInput] = useState('')
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoStore()

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input)
      setInput('')
    }
  }

  return (
    <div className="todo-list">
      <h3>Zustand Todo List</h3>

      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add todo..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {todos.some((t) => t.completed) && (
        <button onClick={clearCompleted} className="clear-btn">
          Clear Completed
        </button>
      )}

      <p>
        {todos.filter((t) => !t.completed).length} of {todos.length} remaining
      </p>
    </div>
  )
}

// ============================================================================
// Exercise 3: Zustand with Middleware (Persist)
// ============================================================================

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage', // localStorage key
    }
  )
)

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className={`theme-toggle theme-${theme}`}>
      <h3>Current Theme: {theme}</h3>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <p>Theme persists across page refreshes!</p>
    </div>
  )
}

// ============================================================================
// Exercise 4: Multiple Stores
// ============================================================================

const useUserStore = create((set) => ({
  user: null,
  login: (name, email) => set({ user: { name, email } }),
  logout: () => set({ user: null }),
}))

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  total: 0,
  updateTotal: () =>
    set((state) => ({
      total: state.items.reduce((sum, item) => sum + item.price, 0),
    })),
}))

export function UserCart() {
  const { user, login, logout } = useUserStore()
  const { items, addItem, removeItem, total, updateTotal } = useCartStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    login(name, email)
    setName('')
    setEmail('')
  }

  const handleAddItem = () => {
    const item = {
      id: Date.now(),
      name: `Product ${items.length + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
    }
    addItem(item)
    updateTotal()
  }

  return (
    <div className="user-cart">
      <div className="user-section">
        <h3>User</h3>
        {!user ? (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <div>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>

      <div className="cart-section">
        <h3>Shopping Cart</h3>
        <button onClick={handleAddItem}>Add Random Item</button>

        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => { removeItem(item.id); updateTotal(); }}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <p className="total">Total: ${total}</p>
      </div>
    </div>
  )
}

// ============================================================================
// Exercise 5: Basic Error Boundary
// ============================================================================

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h3>Something went wrong!</h3>
          <details>
            <summary>Error Details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
          <button onClick={this.resetError}>Try Again</button>
        </div>
      )
    }

    return this.props.children
  }
}

// Component that throws an error for testing
export function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('This is a test error!')
  }

  return (
    <div className="buggy-component">
      <p>This component can throw an error</p>
      <button onClick={() => setShouldThrow(true)}>Throw Error</button>
    </div>
  )
}

// ============================================================================
// Exercise 6: Multiple Error Boundaries
// ============================================================================

function Section1() {
  const [error, setError] = useState(false)
  if (error) throw new Error('Section 1 error!')
  return (
    <div className="section">
      <h4>Section 1</h4>
      <p>This is section 1 content</p>
      <button onClick={() => setError(true)}>Break Section 1</button>
    </div>
  )
}

function Section2() {
  const [error, setError] = useState(false)
  if (error) throw new Error('Section 2 error!')
  return (
    <div className="section">
      <h4>Section 2</h4>
      <p>This is section 2 content</p>
      <button onClick={() => setError(true)}>Break Section 2</button>
    </div>
  )
}

export function MultipleErrorBoundaries() {
  return (
    <div className="multiple-boundaries">
      <h3>Multiple Error Boundaries</h3>
      <p>Errors in one section don't affect others</p>

      <ErrorBoundary>
        <Section1 />
      </ErrorBoundary>

      <ErrorBoundary>
        <Section2 />
      </ErrorBoundary>
    </div>
  )
}

// ============================================================================
// Exercise 7: Error Boundary with Zustand
// ============================================================================

const useErrorStore = create((set) => ({
  errors: [],
  addError: (error) =>
    set((state) => ({
      errors: [...state.errors, { id: Date.now(), message: error.toString() }],
    })),
  clearErrors: () => set({ errors: [] }),
  removeError: (id) =>
    set((state) => ({
      errors: state.errors.filter((e) => e.id !== id),
    })),
}))

class ErrorBoundaryWithStore extends Component {
  componentDidCatch(error) {
    const addError = useErrorStore.getState().addError
    addError(error)
  }

  render() {
    return this.props.children
  }
}

export function ErrorLogger() {
  const { errors, clearErrors, removeError } = useErrorStore()
  const [count, setCount] = useState(0)

  const triggerError = () => {
    if (count === 3) {
      throw new Error(`Error triggered at count ${count}!`)
    }
  }

  return (
    <div className="error-logger">
      <h3>Error Logging with Zustand</h3>

      <ErrorBoundaryWithStore>
        <div>
          <p>Count: {count}</p>
          <button
            onClick={() => {
              setCount(count + 1)
              triggerError()
            }}
          >
            Increment (throws at 3)
          </button>
        </div>
      </ErrorBoundaryWithStore>

      {errors.length > 0 && (
        <div className="error-log">
          <h4>Error Log ({errors.length})</h4>
          <button onClick={clearErrors}>Clear All</button>
          <ul>
            {errors.map((error) => (
              <li key={error.id}>
                {error.message}
                <button onClick={() => removeError(error.id)}>×</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Exercise 8: Async Error Handling
// ============================================================================

const useApiStore = create((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchData: async (url) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('API request failed')
      const data = await response.json()
      set({ data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
}))

export function DataFetcher() {
  const { data, loading, error, fetchData } = useApiStore()

  const handleFetch = () => {
    fetchData('https://jsonplaceholder.typicode.com/users/1')
  }

  const handleFetchError = () => {
    fetchData('https://invalid-url-that-will-fail.com/data')
  }

  return (
    <div className="data-fetcher">
      <h3>Async Error Handling</h3>

      <div className="button-group">
        <button onClick={handleFetch} disabled={loading}>
          Fetch Valid Data
        </button>
        <button onClick={handleFetchError} disabled={loading}>
          Fetch Invalid Data (Error)
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">Error: {error}</div>}

      {data && (
        <div className="data-display">
          <h4>User Data:</h4>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
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
        <h1>Zustand & Error Boundaries Solutions</h1>
        <p>Complete implementations of state management and error handling</p>
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
        <p>Zustand & Error Boundaries - Production-ready patterns</p>
      </footer>
    </div>
  )
}
