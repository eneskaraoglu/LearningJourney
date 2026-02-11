import { useState, useEffect, useRef, useCallback } from 'react'

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

// useToggle Hook - Toggle boolean state
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  return [value, toggle, setValue]
}

// useLocalStorage Hook - Sync state with localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// useFetch Hook - Data fetching with loading and error states
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if (!url) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// useDebounce Hook - Debounce value changes
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// usePrevious Hook - Store previous value
function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// useWindowSize Hook - Track window dimensions
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// useOnClickOutside Hook - Detect clicks outside element
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

// useForm Hook - Manage form state
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (callback) => (e) => {
    e.preventDefault()
    callback(values)
  }

  const reset = () => {
    setValues(initialValues)
  }

  return { values, handleChange, handleSubmit, reset }
}

// ============================================================================
// DEMO COMPONENTS
// ============================================================================

// Toggle Demo
function ToggleDemo() {
  const [isDarkMode, toggleDarkMode] = useToggle(false)
  const [showDetails, toggleDetails] = useToggle(false)

  return (
    <div className="demo-section">
      <h3>useToggle Hook</h3>
      <div className={`toggle-demo ${isDarkMode ? 'dark' : 'light'}`}>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && (
          <p className="details">
            This demonstrates toggling boolean state with a custom hook.
          </p>
        )}
      </div>
    </div>
  )
}

// LocalStorage Demo
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('user-name', '')
  const [theme, setTheme] = useLocalStorage('user-theme', 'blue')

  return (
    <div className="demo-section">
      <h3>useLocalStorage Hook</h3>
      <div className="storage-demo">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name (persisted)"
        />
        <p>Stored Name: {name || 'Not set'}</p>

        <div className="theme-selector">
          <button
            className={theme === 'blue' ? 'active blue' : 'blue'}
            onClick={() => setTheme('blue')}
          >
            Blue
          </button>
          <button
            className={theme === 'green' ? 'active green' : 'green'}
            onClick={() => setTheme('green')}
          >
            Green
          </button>
          <button
            className={theme === 'purple' ? 'active purple' : 'purple'}
            onClick={() => setTheme('purple')}
          >
            Purple
          </button>
        </div>
        <p>Selected Theme: {theme}</p>
        <small>Refresh the page to see persistence!</small>
      </div>
    </div>
  )
}

// Fetch Demo
function FetchDemo() {
  const [userId, setUserId] = useState(1)
  const { data, loading, error, refetch } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )

  return (
    <div className="demo-section">
      <h3>useFetch Hook</h3>
      <div className="fetch-demo">
        <div className="user-selector">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              className={userId === id ? 'active' : ''}
              onClick={() => setUserId(id)}
            >
              User {id}
            </button>
          ))}
        </div>

        {loading && <div className="loading">Loading user data...</div>}
        {error && <div className="error">Error: {error}</div>}
        {data && (
          <div className="user-card">
            <h4>{data.name}</h4>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>Website:</strong> {data.website}
            </p>
            <button onClick={refetch}>Refetch</button>
          </div>
        )}
      </div>
    </div>
  )
}

// Debounce Demo
function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearch) {
      setSearchHistory((prev) => [...prev, debouncedSearch].slice(-5))
    }
  }, [debouncedSearch])

  return (
    <div className="demo-section">
      <h3>useDebounce Hook</h3>
      <div className="debounce-demo">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search (500ms delay)..."
        />
        <div className="values">
          <p>
            <strong>Immediate:</strong> {searchTerm || '(empty)'}
          </p>
          <p>
            <strong>Debounced:</strong> {debouncedSearch || '(empty)'}
          </p>
        </div>
        {searchHistory.length > 0 && (
          <div className="history">
            <strong>Search History:</strong>
            <ul>
              {searchHistory.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// Previous Demo
function PreviousDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const previousCount = usePrevious(count)
  const previousName = usePrevious(name)

  return (
    <div className="demo-section">
      <h3>usePrevious Hook</h3>
      <div className="previous-demo">
        <div className="counter">
          <h4>Counter</h4>
          <p>Current: {count}</p>
          <p>Previous: {previousCount ?? 'undefined'}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>

        <div className="name-tracker">
          <h4>Name Tracker</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
          />
          <p>Current: {name || '(empty)'}</p>
          <p>Previous: {previousName || '(empty)'}</p>
        </div>
      </div>
    </div>
  )
}

// Window Size Demo
function WindowSizeDemo() {
  const { width, height } = useWindowSize()

  const getDeviceType = () => {
    if (width < 768) return 'Mobile'
    if (width < 1024) return 'Tablet'
    return 'Desktop'
  }

  return (
    <div className="demo-section">
      <h3>useWindowSize Hook</h3>
      <div className="window-demo">
        <div className="size-display">
          <div className="dimension">
            <strong>Width:</strong> {width}px
          </div>
          <div className="dimension">
            <strong>Height:</strong> {height}px
          </div>
          <div className="device-type">
            <strong>Device:</strong> {getDeviceType()}
          </div>
        </div>
        <small>Resize the window to see updates</small>
      </div>
    </div>
  )
}

// Click Outside Demo
function ClickOutsideDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const menuRef = useRef()
  const modalRef = useRef()

  useOnClickOutside(menuRef, () => setIsMenuOpen(false))
  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  return (
    <div className="demo-section">
      <h3>useOnClickOutside Hook</h3>
      <div className="click-outside-demo">
        <div className="dropdown">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          {isMenuOpen && (
            <div ref={menuRef} className="menu">
              <div className="menu-item">Profile</div>
              <div className="menu-item">Settings</div>
              <div className="menu-item">Logout</div>
              <small>Click outside to close</small>
            </div>
          )}
        </div>

        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div ref={modalRef} className="modal">
              <h4>Modal Dialog</h4>
              <p>Click outside this box to close</p>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Form Demo
function FormDemo() {
  const [submissions, setSubmissions] = useState([])
  const { values, handleChange, handleSubmit, reset } = useForm({
    name: '',
    email: '',
    message: '',
  })

  const onSubmit = (formValues) => {
    setSubmissions((prev) => [...prev, { ...formValues, id: Date.now() }])
    reset()
  }

  return (
    <div className="demo-section">
      <h3>useForm Hook</h3>
      <div className="form-demo">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Message"
            rows="4"
            required
          />
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={reset}>
              Reset
            </button>
          </div>
        </form>

        {submissions.length > 0 && (
          <div className="submissions">
            <h4>Submissions:</h4>
            {submissions.map((sub) => (
              <div key={sub.id} className="submission-card">
                <p>
                  <strong>{sub.name}</strong> ({sub.email})
                </p>
                <p>{sub.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [activeDemo, setActiveDemo] = useState('toggle')

  const demos = [
    { id: 'toggle', title: 'Toggle', Component: ToggleDemo },
    { id: 'storage', title: 'LocalStorage', Component: LocalStorageDemo },
    { id: 'fetch', title: 'Fetch', Component: FetchDemo },
    { id: 'debounce', title: 'Debounce', Component: DebounceDemo },
    { id: 'previous', title: 'Previous', Component: PreviousDemo },
    { id: 'window', title: 'Window Size', Component: WindowSizeDemo },
    { id: 'outside', title: 'Click Outside', Component: ClickOutsideDemo },
    { id: 'form', title: 'Form', Component: FormDemo },
  ]

  const currentDemo = demos.find((demo) => demo.id === activeDemo)

  return (
    <div className="app">
      <header>
        <h1>Custom Hooks Showcase</h1>
        <p>Reusable React hooks for common patterns</p>
      </header>

      <nav className="demo-nav">
        {demos.map((demo) => (
          <button
            key={demo.id}
            className={activeDemo === demo.id ? 'active' : ''}
            onClick={() => setActiveDemo(demo.id)}
          >
            {demo.title}
          </button>
        ))}
      </nav>

      <main>
        <currentDemo.Component />
      </main>

      <footer>
        <p>Custom Hooks - Building reusable React logic</p>
      </footer>
    </div>
  )
}
