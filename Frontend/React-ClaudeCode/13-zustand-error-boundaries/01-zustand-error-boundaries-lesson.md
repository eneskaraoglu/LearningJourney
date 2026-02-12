# Zustand & Error Boundaries

## Zustand State Management

Zustand is a small, fast, and scalable state management solution for React. It's simpler than Redux but powerful enough for complex applications.

### Why Zustand?

- Minimal boilerplate
- No providers needed
- TypeScript friendly
- DevTools support
- Small bundle size (~1KB)
- Works with React hooks

### Installation

```bash
npm install zustand
```

## Basic Store

### Creating a Store

```jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));

function Counter() {
  const { count, increment, decrement, reset } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Async Actions

```jsx
const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addUser: async (user) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
    const newUser = await response.json();
    set((state) => ({ users: [...state.users, newUser] }));
  },

  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter(user => user.id !== id)
    }));
  }
}));
```

## Advanced Patterns

### Slices Pattern

Organize large stores into slices:

```jsx
const createUserSlice = (set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null })
});

const createCartSlice = (set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearCart: () => set({ items: [] })
});

const useStore = create((...args) => ({
  ...createUserSlice(...args),
  ...createCartSlice(...args)
}));
```

### Computed Values

```jsx
const useCartStore = create((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),

  // Computed value using get()
  get total() {
    return get().items.reduce((sum, item) => sum + item.price, 0);
  },

  get itemCount() {
    return get().items.length;
  }
}));

function Cart() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: ${total}</p>
    </div>
  );
}
```

### Middleware

#### Persist Middleware

```jsx
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null })
    }),
    {
      name: 'auth-storage', // localStorage key
      getStorage: () => localStorage
    }
  )
);
```

#### DevTools Middleware

```jsx
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 }))
  }))
);
```

### Selectors

Optimize re-renders with selectors:

```jsx
// ❌ Bad: Component re-renders on any state change
function Component() {
  const store = useStore();
  return <div>{store.count}</div>;
}

// ✅ Good: Only re-renders when count changes
function Component() {
  const count = useStore((state) => state.count);
  return <div>{count}</div>;
}

// Select multiple values
function Component() {
  const { count, user } = useStore((state) => ({
    count: state.count,
    user: state.user
  }));
  return <div>{count} - {user.name}</div>;
}
```

## Error Boundaries

Error Boundaries catch JavaScript errors in component trees and display fallback UI.

### Basic Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <p>{this.state.error?.toString()}</p>
            <pre>{this.state.errorInfo?.componentStack}</pre>
          </details>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Error Boundary with Reset

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback({ resetError: this.resetError });
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary
      fallback={({ resetError }) => (
        <div>
          <h2>Error occurred</h2>
          <button onClick={resetError}>Try Again</button>
        </div>
      )}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Multiple Error Boundaries

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<MainError />}>
      <Header />

      <ErrorBoundary fallback={<SidebarError />}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ContentError />}>
        <MainContent />
      </ErrorBoundary>

      <Footer />
    </ErrorBoundary>
  );
}
```

### Error Boundary Hook (Custom)

```jsx
function useErrorBoundary() {
  const [error, setError] = useState(null);

  const showBoundary = useCallback((error) => {
    setError(error);
  }, []);

  const resetBoundary = useCallback(() => {
    setError(null);
  }, []);

  if (error) {
    throw error;
  }

  return { showBoundary, resetBoundary };
}

function Component() {
  const { showBoundary } = useErrorBoundary();

  const handleClick = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      showBoundary(error);
    }
  };

  return <button onClick={handleClick}>Click</button>;
}
```

## Combining Zustand with Error Handling

```jsx
const useStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      // Optionally throw to trigger Error Boundary
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

function DataComponent() {
  const { data, loading, error, fetchData, clearError } = useStore();

  useEffect(() => {
    fetchData().catch(() => {
      // Error handled in store, optionally handle here too
    });
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={clearError}>Dismiss</button>
        <button onClick={fetchData}>Retry</button>
      </div>
    );
  }

  return <div>{data && JSON.stringify(data)}</div>;
}
```

## Best Practices

### Zustand
1. **Use selectors** - Prevent unnecessary re-renders
2. **Split large stores** - Use slice pattern
3. **Keep actions pure** - Side effects in async actions
4. **Use middleware** - Persist, devtools for better DX
5. **TypeScript** - Define interfaces for better type safety

### Error Boundaries
1. **Place strategically** - Protect critical parts
2. **Log errors** - Send to error tracking service
3. **Provide recovery** - Reset buttons, retry actions
4. **User-friendly messages** - Don't show stack traces to users
5. **Multiple boundaries** - Isolate errors to specific sections

## Summary

- **Zustand**: Lightweight state management with minimal boilerplate
- **Async actions**: Handle API calls in store
- **Middleware**: Persist state, use DevTools
- **Selectors**: Optimize performance
- **Error Boundaries**: Catch and handle React errors
- **Graceful degradation**: Show fallback UI on errors
- **Combined approach**: Use both for robust applications

## Next Steps

Module 14 covers authentication patterns and protected routes for securing your React applications.

---

## Q&A

### 1) What is Zustand used for?
**Answer:** Lightweight global state management with simple store-based APIs.

### 2) Why are error boundaries important?
**Answer:** They prevent a component crash from taking down the entire app view.

### 3) What errors do error boundaries catch?
**Answer:** Rendering and lifecycle errors in descendant components, not event handler errors.

### 4) How does Zustand differ from Context-only state?
**Answer:** Zustand can reduce provider nesting and improve selective subscriptions.

### 5) What is a robust error handling strategy?
**Answer:** Catch errors, show fallback UI, log details, and provide recovery actions.
