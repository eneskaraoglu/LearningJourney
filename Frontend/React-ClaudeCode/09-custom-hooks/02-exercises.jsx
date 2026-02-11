import { useState, useEffect, useRef, useCallback } from 'react'

/*
  CUSTOM HOOKS EXERCISES

  Create reusable custom hooks following React best practices.
  Each exercise builds a custom hook that can be used across components.
*/

// ============================================================================
// Exercise 1: useToggle Hook
// ============================================================================
/*
  Create a useToggle hook that manages boolean state with a toggle function.

  Requirements:
  - Should accept an initial value (default false)
  - Should return [value, toggle, setValue]
  - toggle() should flip the boolean
  - setValue() should set it to a specific value

  Example usage:
    const [isOn, toggle, setIsOn] = useToggle(false)
    <button onClick={toggle}>Toggle</button>
    <button onClick={() => setIsOn(true)}>Turn On</button>
*/

export function useToggle(initialValue = false) {
  // TODO: Implement useToggle hook
}

// Test Component
export function ToggleExample() {
  const [isOn, toggle, setIsOn] = useToggle(false)

  return (
    <div>
      <p>Status: {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setIsOn(true)}>Turn On</button>
      <button onClick={() => setIsOn(false)}>Turn Off</button>
    </div>
  )
}

// ============================================================================
// Exercise 2: useLocalStorage Hook
// ============================================================================
/*
  Create a useLocalStorage hook that syncs state with localStorage.

  Requirements:
  - Should accept a key and initial value
  - Should return [value, setValue]
  - Should persist value to localStorage
  - Should load initial value from localStorage if it exists
  - Should handle JSON serialization/deserialization
  - Should handle errors gracefully

  Example usage:
    const [name, setName] = useLocalStorage('username', 'Guest')
*/

export function useLocalStorage(key, initialValue) {
  // TODO: Implement useLocalStorage hook
}

// Test Component
export function LocalStorageExample() {
  const [name, setName] = useLocalStorage('username', '')

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name || 'Guest'}!</p>
      <button onClick={() => setName('')}>Clear</button>
    </div>
  )
}

// ============================================================================
// Exercise 3: useFetch Hook
// ============================================================================
/*
  Create a useFetch hook for data fetching with loading and error states.

  Requirements:
  - Should accept a URL
  - Should return { data, loading, error, refetch }
  - Should fetch data on mount
  - Should handle loading state
  - Should handle errors
  - Should provide a refetch function
  - Should cleanup on unmount

  Example usage:
    const { data, loading, error, refetch } = useFetch('/api/users')
*/

export function useFetch(url) {
  // TODO: Implement useFetch hook
}

// Test Component
export function FetchExample() {
  const { data, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/users/1'
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch}>Refetch</button>
    </div>
  )
}

// ============================================================================
// Exercise 4: useDebounce Hook
// ============================================================================
/*
  Create a useDebounce hook that delays updating a value.

  Requirements:
  - Should accept a value and delay (default 500ms)
  - Should return the debounced value
  - Should only update after delay has passed
  - Should cancel previous timeouts
  - Should cleanup on unmount

  Example usage:
    const debouncedSearch = useDebounce(searchTerm, 500)

  Hint: Use useEffect to set a timeout that updates the debounced value
*/

export function useDebounce(value, delay = 500) {
  // TODO: Implement useDebounce hook
}

// Test Component
export function DebounceExample() {
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text, 500)

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>Immediate: {text}</p>
      <p>Debounced (500ms): {debouncedText}</p>
    </div>
  )
}

// ============================================================================
// Exercise 5: usePrevious Hook
// ============================================================================
/*
  Create a usePrevious hook that stores the previous value of a variable.

  Requirements:
  - Should accept a value
  - Should return the previous value
  - Should use useRef to persist value across renders
  - Should update after render using useEffect

  Example usage:
    const previousCount = usePrevious(count)

  Hint: Store current value in a ref, then update it in useEffect
*/

export function usePrevious(value) {
  // TODO: Implement usePrevious hook
}

// Test Component
export function PreviousExample() {
  const [count, setCount] = useState(0)
  const previousCount = usePrevious(count)

  return (
    <div>
      <h3>Count: {count}</h3>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// ============================================================================
// Exercise 6: useWindowSize Hook
// ============================================================================
/*
  Create a useWindowSize hook that tracks window dimensions.

  Requirements:
  - Should return { width, height }
  - Should update on window resize
  - Should add/remove event listener properly
  - Should cleanup on unmount
  - Should handle SSR safely (check if window exists)

  Example usage:
    const { width, height } = useWindowSize()
*/

export function useWindowSize() {
  // TODO: Implement useWindowSize hook
}

// Test Component
export function WindowSizeExample() {
  const { width, height } = useWindowSize()

  return (
    <div>
      <h3>Window Size</h3>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      <p>
        {width < 768 ? 'Mobile' : width < 1024 ? 'Tablet' : 'Desktop'}
      </p>
    </div>
  )
}

// ============================================================================
// Exercise 7: useOnClickOutside Hook
// ============================================================================
/*
  Create a useOnClickOutside hook for detecting clicks outside an element.

  Requirements:
  - Should accept a ref and handler function
  - Should call handler when click occurs outside the ref element
  - Should handle both mouse and touch events
  - Should cleanup event listeners on unmount

  Example usage:
    const ref = useRef()
    useOnClickOutside(ref, () => setIsOpen(false))
*/

export function useOnClickOutside(ref, handler) {
  // TODO: Implement useOnClickOutside hook
}

// Test Component
export function ClickOutsideExample() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()

  useOnClickOutside(ref, () => setIsOpen(false))

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Menu</button>
      {isOpen && (
        <div ref={ref} className="menu">
          <p>Click outside to close</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Exercise 8: useForm Hook
// ============================================================================
/*
  Create a useForm hook for managing form state.

  Requirements:
  - Should accept initial values object
  - Should return { values, handleChange, handleSubmit, reset }
  - handleChange should update the correct field
  - handleSubmit should accept a callback and prevent default
  - reset should restore initial values

  Example usage:
    const { values, handleChange, handleSubmit, reset } = useForm({
      name: '',
      email: ''
    })
*/

export function useForm(initialValues) {
  // TODO: Implement useForm hook
}

// Test Component
export function FormExample() {
  const { values, handleChange, handleSubmit, reset } = useForm({
    name: '',
    email: '',
  })

  const onSubmit = (formValues) => {
    alert(`Name: ${formValues.name}, Email: ${formValues.email}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  )
}

// ============================================================================
// Main App Component
// ============================================================================

export default function App() {
  const [activeExercise, setActiveExercise] = useState(1)

  const exercises = [
    { number: 1, title: 'useToggle', Component: ToggleExample },
    { number: 2, title: 'useLocalStorage', Component: LocalStorageExample },
    { number: 3, title: 'useFetch', Component: FetchExample },
    { number: 4, title: 'useDebounce', Component: DebounceExample },
    { number: 5, title: 'usePrevious', Component: PreviousExample },
    { number: 6, title: 'useWindowSize', Component: WindowSizeExample },
    { number: 7, title: 'useOnClickOutside', Component: ClickOutsideExample },
    { number: 8, title: 'useForm', Component: FormExample },
  ]

  const currentExercise = exercises.find((ex) => ex.number === activeExercise)

  return (
    <div className="app">
      <header>
        <h1>Custom Hooks Exercises</h1>
        <p>Build reusable React custom hooks</p>
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
        <p>Complete each custom hook implementation to see the examples work!</p>
      </footer>
    </div>
  )
}
