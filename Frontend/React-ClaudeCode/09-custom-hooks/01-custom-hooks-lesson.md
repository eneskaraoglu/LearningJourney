# Module 09: Custom Hooks

## Table of Contents
1. [Introduction to Custom Hooks](#introduction)
2. [Why Custom Hooks?](#why-custom-hooks)
3. [Creating Custom Hooks](#creating-custom-hooks)
4. [Hook Patterns](#hook-patterns)
5. [Common Custom Hooks](#common-hooks)
6. [Best Practices](#best-practices)

---

## Introduction to Custom Hooks

Custom hooks let you extract component logic into reusable functions. They're JavaScript functions that can use other hooks.

### What Are Custom Hooks?

- Functions that start with "use" (naming convention)
- Can call other hooks (useState, useEffect, etc.)
- Encapsulate reusable stateful logic
- Share logic between components without wrapper components

### Example: Without Custom Hook

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  // ... render logic
}

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  // ... render logic
}
```

**Problem**: Duplicated logic!

### Example: With Custom Hook

```jsx
// Custom hook
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}

// Usage
function UserProfile() {
  const { user, loading } = useUser();
  // ... render logic
}

function AdminDashboard() {
  const { user, loading } = useUser();
  // ... render logic
}
```

**Solution**: Reusable logic!

---

## Why Custom Hooks?

### Benefits

1. **Code Reusability**: Share logic across components
2. **Separation of Concerns**: Separate logic from UI
3. **Testability**: Test hooks independently
4. **Readability**: Components focus on rendering
5. **Composition**: Combine hooks for complex logic

### When to Create Custom Hooks

✅ **Good candidates:**
- Repeated logic across components
- Complex useEffect logic
- Form handling
- API data fetching
- Browser APIs (localStorage, geolocation)
- Event listeners
- Timers and intervals

❌ **Not good candidates:**
- One-time use logic
- Simple state that doesn't repeat
- Component-specific logic

---

## Creating Custom Hooks

### Basic Structure

```jsx
function useCustomHook(initialValue) {
  // 1. Use built-in hooks
  const [state, setState] = useState(initialValue);

  // 2. Define helper functions
  const helper = () => {
    // logic here
  };

  // 3. Side effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);

  // 4. Return values/functions
  return { state, helper };
}
```

### Example: useToggle

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// Usage
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      <button onClick={toggleOpen}>Open Modal</button>
      {isOpen && <div>Modal Content</div>}
    </>
  );
}
```

### Example: useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  // Get stored value or use initial
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

---

## Hook Patterns

### Pattern 1: State + Handler

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

### Pattern 2: Fetch + Loading + Error

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (!cancelled) {
          setError(error);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
```

### Pattern 3: Event Listener

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

### Pattern 4: Interval/Timer

```jsx
function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// Usage
function Timer() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <div>Count: {count}</div>;
}
```

---

## Common Custom Hooks

### useDebounce

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call here
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  );
}
```

### usePrevious

```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useOnClickOutside

```jsx
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Usage
function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  useOnClickOutside(modalRef, () => setIsOpen(false));

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && (
        <div ref={modalRef} className="modal">
          Modal Content
        </div>
      )}
    </>
  );
}
```

### useForm

```jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    setErrors
  };
}

// Usage
function ContactForm() {
  const { values, handleChange, handleSubmit, reset } = useForm({
    name: '',
    email: '',
    message: ''
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <textarea
        name="message"
        value={values.message}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### useAsync

```jsx
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setData(null);
    setError(null);

    return asyncFunction()
      .then(response => {
        setData(response);
        setStatus('success');
      })
      .catch(error => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// Usage
function UserProfile({ userId }) {
  const { status, data, error } = useAsync(
    () => fetch(`/api/users/${userId}`).then(r => r.json())
  );

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;
  if (status === 'success') return <div>User: {data.name}</div>;

  return null;
}
```

---

## Best Practices

### 1. Start with "use"

```jsx
// ✅ Good
function useCounter() {}
function useLocalStorage() {}

// ❌ Bad
function counter() {}
function getLocalStorage() {}
```

### 2. Return Arrays or Objects

```jsx
// Array - for simpler hooks (like useState)
function useToggle() {
  const [value, setValue] = useState(false);
  const toggle = () => setValue(!value);
  return [value, toggle];
}

// Object - for complex hooks with many returns
function useFetch(url) {
  // ... logic
  return { data, loading, error, refetch };
}
```

### 3. Keep Hooks Focused

```jsx
// ❌ Bad - does too much
function useEverything() {
  // user logic
  // theme logic
  // form logic
  // etc...
}

// ✅ Good - focused hooks
function useUser() { /* user logic */ }
function useTheme() { /* theme logic */ }
function useForm() { /* form logic */ }
```

### 4. Handle Cleanup

```jsx
function useEventListener(event, handler) {
  useEffect(() => {
    window.addEventListener(event, handler);

    // Always clean up!
    return () => {
      window.removeEventListener(event, handler);
    };
  }, [event, handler]);
}
```

### 5. Optimize Dependencies

```jsx
// Use useCallback for functions
function useData() {
  const fetchData = useCallback(() => {
    // fetch logic
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Safe because fetchData is memoized
}
```

### 6. Provide Good Defaults

```jsx
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);

  return { count, increment, decrement };
}
```

### 7. Document Your Hooks

```jsx
/**
 * Custom hook for managing localStorage
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Default value if key doesn't exist
 * @returns {[any, function]} Current value and setter function
 */
function useLocalStorage(key, initialValue) {
  // implementation
}
```

---

## Summary

### Key Takeaways

1. **Custom hooks** extract reusable logic from components
2. **Naming**: Always start with "use"
3. **Composition**: Combine built-in hooks
4. **Return values**: Arrays for simple, objects for complex
5. **Cleanup**: Always clean up side effects
6. **Testing**: Test hooks independently
7. **Documentation**: Document parameters and return values

### Common Use Cases

- Data fetching
- Form handling
- Local storage
- Window/document events
- Timers and intervals
- Previous values
- Debouncing/throttling
- Media queries
- Geolocation
- Online/offline status

### Hook Library Resources

- [usehooks.com](https://usehooks.com/)
- [react-use](https://github.com/streamich/react-use)
- [ahooks](https://ahooks.js.org/)

---

## Practice Exercises

The exercises in `02-exercises.jsx` will help you practice:

1. Creating basic custom hooks
2. Hooks with parameters
3. Hooks with cleanup
4. Form handling hooks
5. API fetching hooks
6. Event listener hooks
7. Complex custom hooks
8. Hook composition

Complete all exercises to master custom hooks!

---

## Q&A

### 1) Why create a custom hook?
**Answer:** To reuse stateful logic across components without duplicating code.

### 2) What should a custom hook return?
**Answer:** A minimal API (state + actions) that hides internal implementation details.

### 3) Can custom hooks call other hooks?
**Answer:** Yes, as long as hooks rules are followed.

### 4) How do you name custom hooks?
**Answer:** Start with use (for example, useFetchUsers).

### 5) What is a good custom hook design principle?
**Answer:** Keep hooks focused on one responsibility and easy to test.
