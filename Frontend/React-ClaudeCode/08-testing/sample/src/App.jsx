import { useState } from 'react'

// Button Component - Simple, testable component
export function Button({ children, onClick, disabled = false, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      data-testid="button"
    >
      {children}
    </button>
  )
}

// Counter Component - Testing state updates
export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="counter" data-testid="counter">
      <h3>Counter: {count}</h3>
      <div className="button-group">
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
        <Button onClick={() => setCount(0)} variant="secondary">Reset</Button>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    </div>
  )
}

// Greeting Component - Testing conditional rendering
export function Greeting({ name, isLoggedIn }) {
  if (!isLoggedIn) {
    return <div data-testid="greeting">Please log in</div>
  }

  return (
    <div data-testid="greeting">
      Welcome, {name || 'Guest'}!
    </div>
  )
}

// LoginForm Component - Testing forms and events
export function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username || !password) {
      setError('Both fields are required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setError('')
    onSubmit({ username, password })
  }

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <h3>Login</h3>

      {error && (
        <div className="error" role="alert" data-testid="error-message">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <Button type="submit">Log In</Button>
    </form>
  )
}

// UserProfile Component - Testing async operations
export function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUser = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!userId) {
    return <div data-testid="user-profile">No user selected</div>
  }

  return (
    <div className="user-profile" data-testid="user-profile">
      <h3>User Profile</h3>

      {!user && !loading && (
        <Button onClick={fetchUser}>Load User</Button>
      )}

      {loading && <div data-testid="loading">Loading...</div>}

      {error && (
        <div className="error" data-testid="error">
          Error: {error}
        </div>
      )}

      {user && (
        <div data-testid="user-data">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      )}
    </div>
  )
}

// TodoList Component - Integration testing
export function TodoList() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="todo-list" data-testid="todo-list">
      <h3>Todo List</h3>

      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          data-testid="todo-input"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <ul data-testid="todo-items">
        {todos.map(todo => (
          <li key={todo.id} data-testid={`todo-item-${todo.id}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid={`todo-checkbox-${todo.id}`}
            />
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn-delete"
              data-testid={`todo-delete-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <p data-testid="todo-count">
          {todos.filter(t => !t.completed).length} of {todos.length} todos remaining
        </p>
      )}
    </div>
  )
}

// SearchBox Component - Testing debounced search
export function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setSearching(true)

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`
      )
      const data = await response.json()
      setResults(data.slice(0, 5))

      if (onSearch) {
        onSearch(searchQuery, data)
      }
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    // Simple debounce simulation
    const timer = setTimeout(() => {
      handleSearch(value)
    }, 300)

    return () => clearTimeout(timer)
  }

  return (
    <div className="search-box" data-testid="search-box">
      <h3>Search Posts</h3>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        data-testid="search-input"
      />

      {searching && <div data-testid="searching">Searching...</div>}

      <ul data-testid="search-results">
        {results.map(result => (
          <li key={result.id} data-testid={`result-${result.id}`}>
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('counter')
  const [userId, setUserId] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  const handleLogin = ({ username }) => {
    setCurrentUser(username)
    setIsLoggedIn(true)
  }

  return (
    <div className="app">
      <header>
        <h1>React Testing Sample Application</h1>
        <p>Demonstrating testable React components</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'counter' ? 'active' : ''}
          onClick={() => setActiveTab('counter')}
        >
          Counter
        </button>
        <button
          className={activeTab === 'greeting' ? 'active' : ''}
          onClick={() => setActiveTab('greeting')}
        >
          Greeting
        </button>
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          User Profile
        </button>
        <button
          className={activeTab === 'todos' ? 'active' : ''}
          onClick={() => setActiveTab('todos')}
        >
          Todos
        </button>
        <button
          className={activeTab === 'search' ? 'active' : ''}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
      </nav>

      <main>
        {activeTab === 'counter' && <Counter />}

        {activeTab === 'greeting' && (
          <div className="section">
            <Greeting name={currentUser} isLoggedIn={isLoggedIn} />
            {isLoggedIn && (
              <Button onClick={() => setIsLoggedIn(false)} variant="secondary">
                Log Out
              </Button>
            )}
          </div>
        )}

        {activeTab === 'login' && (
          <div className="section">
            {!isLoggedIn ? (
              <LoginForm onSubmit={handleLogin} />
            ) : (
              <div>
                <p>You are already logged in as {currentUser}</p>
                <Button onClick={() => setIsLoggedIn(false)}>Log Out</Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="section">
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input
                id="userId"
                type="number"
                value={userId}
                onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
                min="1"
                max="10"
              />
            </div>
            <UserProfile userId={userId} />
          </div>
        )}

        {activeTab === 'todos' && <TodoList />}

        {activeTab === 'search' && <SearchBox />}
      </main>

      <footer>
        <p>React Testing Sample - Testing Library + Vitest</p>
      </footer>
    </div>
  )
}
