# React Hooks - useState & useEffect

## What are Hooks?

Hooks are functions that let you "hook into" React features in functional components. They were introduced in React 16.8 to allow state and lifecycle features without writing class components.

**Key Rules:**
1. Only call hooks at the top level (not inside loops, conditions, or nested functions)
2. Only call hooks from React function components or custom hooks

## useState Hook

`useState` adds state to functional components.

### Basic Syntax

```jsx
const [state, setState] = useState(initialValue);
```

- `state`: current state value
- `setState`: function to update state
- `initialValue`: initial state value

### Simple Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Multiple State Variables

```jsx
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (/* form fields */);
}
```

### State with Objects

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (newName) => {
    setUser({ ...user, name: newName });  // Spread to preserve other properties
  };

  return (/* ... */);
}
```

### State with Arrays

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (/* ... */);
}
```

### Functional Updates

When new state depends on previous state:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Recommended: use function form
    setCount(prevCount => prevCount + 1);
  };

  return (/* ... */);
}
```

### Lazy Initialization

For expensive computations:

```jsx
function ExpensiveComponent() {
  // Function only runs on initial render
  const [data, setData] = useState(() => {
    return computeExpensiveValue();
  });
}
```

## useEffect Hook

`useEffect` handles side effects (data fetching, subscriptions, DOM manipulation, timers).

### Basic Syntax

```jsx
useEffect(() => {
  // Side effect code here

  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

### useEffect Runs

- After every render (if no dependencies array)
- After initial render only (if empty dependencies array `[]`)
- When dependencies change (if dependencies listed)

### Examples

#### Run Once on Mount

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Runs once after initial render
    fetchUser().then(setUser);
  }, []); // Empty array = run once

  return (/* ... */);
}
```

#### Run on Dependency Change

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Runs when query changes
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(setResults);
  }, [query]); // Re-run when query changes

  return (/* ... */);
}
```

#### Cleanup Function

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: runs before effect re-runs or component unmounts
    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

#### Event Listeners

```jsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>Width: {width}px</div>;
}
```

## Common Patterns

### Fetching Data

```jsx
function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user.name}</div>;
}
```

### Form Handling

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Toggle State

```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(prev => !prev);

  return (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

### Derived State

Don't use state for values you can calculate:

```jsx
function Cart({ items }) {
  // ❌ Bad: storing derived value in state
  const [total, setTotal] = useState(0);

  // ✅ Good: calculate during render
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return <div>Total: ${total}</div>;
}
```

## Common Mistakes

### 1. Forgetting Dependencies

```jsx
// ❌ Missing dependency
useEffect(() => {
  console.log(count);
}, []); // count is missing!

// ✅ Include all dependencies
useEffect(() => {
  console.log(count);
}, [count]);
```

### 2. Infinite Loops

```jsx
// ❌ Causes infinite loop
useEffect(() => {
  setData(newData);
}); // No dependency array!

// ✅ Add dependency array
useEffect(() => {
  setData(newData);
}, []);
```

### 3. Stale Closures

```jsx
// ❌ Uses stale count value
const increment = () => {
  setTimeout(() => {
    setCount(count + 1); // count may be stale
  }, 1000);
};

// ✅ Use functional update
const increment = () => {
  setTimeout(() => {
    setCount(prev => prev + 1); // Always current
  }, 1000);
};
```

## Best Practices

1. **One piece of state per concern** - Don't combine unrelated state
2. **Use functional updates** when state depends on previous state
3. **Include all dependencies** in useEffect
4. **Clean up effects** (intervals, listeners, subscriptions)
5. **Avoid derived state** - calculate during render instead
6. **Keep effects focused** - one effect per concern

## Summary

- **useState** adds state to functional components
- **State updates are asynchronous** - use functional updates for dependent state
- **useEffect** handles side effects (data fetching, subscriptions, timers)
- **Dependencies array** controls when effects run
- **Cleanup functions** prevent memory leaks
- **Follow rules of hooks** - call at top level only

## Next Steps

In the next module, we'll learn about React Router for building multi-page applications with client-side routing.
