# Custom Hooks Sample Project

A comprehensive demonstration of reusable custom React hooks for common patterns.

## Features

This sample project showcases 8 essential custom hooks:

1. **useToggle**: Boolean state management with toggle functionality
2. **useLocalStorage**: Sync state with browser localStorage
3. **useFetch**: Data fetching with loading and error states
4. **useDebounce**: Delay value updates for performance
5. **usePrevious**: Access previous value of state/props
6. **useWindowSize**: Track window dimensions
7. **useOnClickOutside**: Detect clicks outside an element
8. **useForm**: Simplified form state management

## Technologies

- **React 18.2.0**: UI library
- **Vite 5.0.8**: Build tool and dev server

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

## Custom Hooks Explained

### 1. useToggle

Manages boolean state with convenient toggle function.

```javascript
const [isOn, toggle, setIsOn] = useToggle(false)
```

**Use Cases:**
- Dark mode toggle
- Modal open/close
- Show/hide content
- Feature flags

### 2. useLocalStorage

Persists state to localStorage automatically.

```javascript
const [name, setName] = useLocalStorage('username', 'Guest')
```

**Use Cases:**
- User preferences
- Theme selection
- Form data persistence
- User settings

**Features:**
- JSON serialization
- Error handling
- Works like useState

### 3. useFetch

Handles data fetching with loading and error states.

```javascript
const { data, loading, error, refetch } = useFetch('/api/users')
```

**Use Cases:**
- API data fetching
- Loading indicators
- Error handling
- Manual refetch

**Features:**
- Automatic fetching on mount
- Loading state management
- Error handling
- Refetch function

### 4. useDebounce

Delays value updates to improve performance.

```javascript
const debouncedSearch = useDebounce(searchTerm, 500)
```

**Use Cases:**
- Search input
- Auto-save forms
- API call optimization
- Resize handlers

**Benefits:**
- Reduces API calls
- Improves performance
- Better user experience

### 5. usePrevious

Stores the previous value of a variable.

```javascript
const previousCount = usePrevious(count)
```

**Use Cases:**
- Comparing values
- Animation triggers
- Conditional effects
- Value change detection

**Implementation:**
- Uses useRef for persistence
- Updates in useEffect

### 6. useWindowSize

Tracks window dimensions in real-time.

```javascript
const { width, height } = useWindowSize()
```

**Use Cases:**
- Responsive behavior
- Device detection
- Dynamic layouts
- Breakpoint logic

**Features:**
- Automatic updates on resize
- SSR-safe
- Cleanup on unmount

### 7. useOnClickOutside

Detects clicks outside a referenced element.

```javascript
useOnClickOutside(ref, () => setIsOpen(false))
```

**Use Cases:**
- Dropdown menus
- Modal dialogs
- Popover menus
- Context menus

**Features:**
- Mouse and touch support
- Proper cleanup
- Ref-based detection

### 8. useForm

Simplifies form state management.

```javascript
const { values, handleChange, handleSubmit, reset } = useForm({
  name: '',
  email: ''
})
```

**Use Cases:**
- Contact forms
- Login forms
- Multi-field forms
- Form validation

**Features:**
- Automatic state updates
- Submit handler
- Reset functionality
- Works with controlled inputs

## Best Practices

### Naming Convention

All custom hooks must start with "use":

```javascript
// ✅ Good
useToggle()
useLocalStorage()

// ❌ Bad
toggleHook()
localStorage()
```

### Hook Rules

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Don't call hooks conditionally
4. Clean up side effects

### Composition

Custom hooks can use other hooks:

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue) // ✅ Can use hooks

  useEffect(() => {
    // Save to localStorage
  }, [key, value])

  return [value, setValue]
}
```

### Return Values

Choose appropriate return formats:

```javascript
// Array for simple values (like useState)
const [value, setValue] = useToggle(false)

// Object for multiple values
const { data, loading, error } = useFetch(url)
```

## Creating Your Own Hooks

### Steps to Create a Custom Hook:

1. **Identify reusable logic**: Find code you repeat
2. **Extract to function**: Create a function starting with "use"
3. **Use built-in hooks**: Leverage useState, useEffect, etc.
4. **Return values**: Choose array or object format
5. **Add cleanup**: Use useEffect return for cleanup

### Example:

```javascript
function useOnline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}
```

## Common Patterns

### State + Effect Pattern

Many hooks combine useState and useEffect:

```javascript
function useData(url) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
  }, [url])

  return data
}
```

### Ref Pattern

Use refs for values that persist but don't trigger re-renders:

```javascript
function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
```

### Event Listener Pattern

Add/remove event listeners with cleanup:

```javascript
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) setKeyPressed(true)
    }
    const upHandler = ({ key }) => {
      if (key === targetKey) setKeyPressed(false)
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}
```

## Testing Custom Hooks

Use React Testing Library's `renderHook`:

```javascript
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './useToggle'

test('useToggle toggles value', () => {
  const { result } = renderHook(() => useToggle(false))

  expect(result.current[0]).toBe(false)

  act(() => {
    result.current[1]() // Call toggle
  })

  expect(result.current[0]).toBe(true)
})
```

## Benefits of Custom Hooks

1. **Reusability**: Share logic across components
2. **Separation of Concerns**: Extract business logic
3. **Testability**: Test logic independently
4. **Readability**: Components stay focused
5. **Maintainability**: Update logic in one place

## Project Structure

```
sample/
├── src/
│   ├── App.jsx        # All demos and hooks
│   ├── main.jsx       # Entry point
│   └── styles.css     # Styling
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Learning Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [usehooks.com](https://usehooks.com/) - Collection of hooks
- [React Hooks Cheatsheet](https://react-hooks-cheatsheet.com/)

## Next Steps

After mastering these hooks:

1. Create your own custom hooks
2. Combine multiple hooks
3. Build a hooks library
4. Learn advanced patterns (useReducer, useContext)
5. Explore community hooks libraries

## Tips

1. **Start simple**: Don't over-engineer your hooks
2. **One responsibility**: Each hook should do one thing well
3. **Document well**: Add clear comments and examples
4. **Handle errors**: Always consider error cases
5. **Clean up**: Remove event listeners and subscriptions
6. **Type safety**: Consider TypeScript for better DX

Happy Hooking!
