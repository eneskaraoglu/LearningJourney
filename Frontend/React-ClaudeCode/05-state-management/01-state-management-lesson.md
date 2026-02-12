# State Management - Lifting State & Context API

## Understanding State Management

State management is crucial in React applications. As apps grow, managing state becomes more complex. This module covers fundamental state management patterns before moving to external libraries.

**Key Concepts:**
- Lifting state up
- Prop drilling problem
- React Context API
- When to use different approaches

## Lifting State Up

When multiple components need to share state, lift it to their common parent.

### Basic Example

```jsx
// Bad - Separate state in each component
function Counter1() {
  const [count, setCount] = useState(0);
  return <div>Count: {count}</div>;
}

function Counter2() {
  const [count, setCount] = useState(0); // Separate state!
  return <div>Count: {count}</div>;
}

// Good - Shared state in parent
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Counter count={count} />
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function Counter({ count }) {
  return <div>Count: {count}</div>;
}
```

### Form State Example

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <NameInput value={formData.name} onChange={handleChange} />
      <EmailInput value={formData.email} onChange={handleChange} />
      <MessageInput value={formData.message} onChange={handleChange} />
      <FormSummary data={formData} />
    </div>
  );
}

function NameInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange('name', e.target.value)}
      placeholder="Name"
    />
  );
}
```

## The Prop Drilling Problem

Passing props through many levels becomes cumbersome:

```jsx
// Prop drilling example
function App() {
  const [user, setUser] = useState({ name: 'John' });

  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return <div>Welcome, {user.name}</div>;
}
```

This becomes difficult to maintain with deep component trees.

## React Context API

Context provides a way to share values between components without prop drilling.

### Creating Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext();

// 2. Create provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const value = {
    theme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create custom hook for consuming context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in components
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </header>
  );
}
```

### User Authentication Example

```jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Multiple Contexts

You can use multiple contexts in the same app:

```jsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <RouterProvider>
            <AppContent />
          </RouterProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

## Context with Reducer

Combine Context with useReducer for complex state:

```jsx
const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.items.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount: state.items.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
```

## Performance Considerations

### Context Re-renders

Context causes re-renders for all consumers when value changes:

```jsx
// Bad - Creates new object every render
function Provider({ children }) {
  const [state, setState] = useState(0);

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  );
}

// Good - Memoize value
function Provider({ children }) {
  const [state, setState] = useState(0);

  const value = useMemo(() => ({ state, setState }), [state]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
```

### Splitting Contexts

Split contexts to minimize re-renders:

```jsx
// Bad - One context for everything
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  // Any change causes all consumers to re-render
  return (
    <AppContext.Provider value={{ user, theme, language, ... }}>
      {children}
    </AppContext.Provider>
  );
}

// Good - Separate contexts
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
```

## When to Use What?

### Use Local State When:
- State is only used in one component
- State doesn't need to be shared
- Simple, independent state

### Use Lifted State When:
- 2-3 components need to share state
- Components are close in the tree
- State relationship is clear

### Use Context When:
- Many components need the same data
- Components are far apart in the tree
- Data is truly global (theme, auth, language)

### Don't Use Context For:
- Frequently changing values (use state management library)
- Every piece of state (causes performance issues)
- Simple parent-child communication (use props)

## Best Practices

1. **Keep Context Focused** - One context per concern
2. **Memoize Context Values** - Prevent unnecessary re-renders
3. **Provide Default Values** - Make context work standalone
4. **Custom Hooks** - Always create custom hooks for context
5. **Error Boundaries** - Add error handling for context
6. **Documentation** - Document context usage and structure

## Common Patterns

### Combining Providers

```jsx
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
    </AppProviders>
  );
}
```

### Context with LocalStorage

```jsx
function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
```

## Summary

- **Lifting state** solves simple state sharing
- **Prop drilling** becomes problematic with deep trees
- **Context API** provides global state solution
- **useContext** hook consumes context values
- **Multiple contexts** organize different concerns
- **Performance** considerations are important
- **Choose the right tool** for the job

## Next Steps

In the next module, we'll learn about data fetching, API integration, and form handling with validation.

---

## Q&A

### 1) When is local state enough?
**Answer:** Local state is enough when data is used by a single component or a small subtree.

### 2) What is prop drilling?
**Answer:** Passing props through many intermediate components that do not need the data.

### 3) How does Context help state management?
**Answer:** Context provides shared values without manually threading props through every level.

### 4) When should you consider external state libraries?
**Answer:** Use them when app-wide state and update logic become complex or repetitive.

### 5) What is the key goal of state design?
**Answer:** Keep a single source of truth and predictable update flows.
