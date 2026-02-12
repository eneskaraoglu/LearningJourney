# Module 07: Performance Optimization in React

## Table of Contents
1. [Introduction to React Performance](#introduction)
2. [Understanding React Rendering](#understanding-rendering)
3. [useMemo Hook](#usememo)
4. [useCallback Hook](#usecallback)
5. [React.memo](#react-memo)
6. [Code Splitting](#code-splitting)
7. [Lazy Loading](#lazy-loading)
8. [Performance Best Practices](#best-practices)

---

## Introduction to React Performance

Performance optimization is crucial for creating smooth, responsive React applications. Poor performance can lead to:

- Slow UI updates
- Laggy interactions
- High CPU usage
- Poor user experience

React provides several built-in tools to optimize performance:

- **useMemo**: Memoize expensive calculations
- **useCallback**: Memoize function references
- **React.memo**: Prevent unnecessary re-renders
- **Code Splitting**: Load code on demand
- **Lazy Loading**: Defer component loading

---

## Understanding React Rendering

### When Components Re-render

A React component re-renders when:

1. **State changes**: Component's own state updates
2. **Props change**: Parent passes new props
3. **Parent re-renders**: Even if props don't change
4. **Context changes**: Context value updates

### The Rendering Process

```
State/Props Change → Component Re-renders → Virtual DOM Diff → DOM Update
```

### Example: Unnecessary Re-renders

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      {/* Child re-renders even though it doesn't use count */}
      <ExpensiveChild />
    </div>
  );
}

function ExpensiveChild() {
  console.log('ExpensiveChild rendered');
  // Expensive calculations here...
  return <div>I'm expensive to render!</div>;
}
```

**Problem**: Every time `count` changes, `ExpensiveChild` re-renders unnecessarily.

---

## useMemo Hook

`useMemo` memoizes the result of an expensive computation. It only recalculates when dependencies change.

### Syntax

```jsx
const memoizedValue = useMemo(() => {
  // Expensive computation
  return computeExpensiveValue(a, b);
}, [a, b]); // Dependencies
```

### Example: Without useMemo

```jsx
function ProductList({ products, filter }) {
  // This filters on EVERY render, even if products/filter haven't changed
  const filteredProducts = products.filter(product =>
    product.category === filter
  );

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### Example: With useMemo

```jsx
function ProductList({ products, filter }) {
  // Only re-filters when products or filter change
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product =>
      product.category === filter
    );
  }, [products, filter]);

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### Real-World Example: Expensive Calculations

```jsx
function DataDashboard({ data }) {
  // Expensive statistics calculation
  const statistics = useMemo(() => {
    console.log('Calculating statistics...');

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const average = total / data.length;
    const max = Math.max(...data.map(item => item.value));
    const min = Math.min(...data.map(item => item.value));

    return { total, average, max, min };
  }, [data]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total: {statistics.total}</p>
      <p>Average: {statistics.average.toFixed(2)}</p>
      <p>Max: {statistics.max}</p>
      <p>Min: {statistics.min}</p>
    </div>
  );
}
```

### When to Use useMemo

✅ **Good use cases:**
- Expensive calculations (sorting, filtering large arrays)
- Complex object transformations
- Preventing referential equality issues

❌ **Avoid for:**
- Simple calculations
- Primitive values
- Over-optimization (adds complexity)

---

## useCallback Hook

`useCallback` memoizes a function reference. It prevents function recreation on every render.

### Syntax

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // Dependencies
```

### Why It Matters

```jsx
// Without useCallback - new function every render
function Parent() {
  const [count, setCount] = useState(0);

  // New function reference on every render
  const handleClick = () => {
    console.log('Clicked');
  };

  return <Child onClick={handleClick} />;
}
```

When `Parent` re-renders, `handleClick` is a new function reference, causing `Child` to re-render even with `React.memo`.

### Example: With useCallback

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Same function reference across renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // No dependencies

  return <MemoizedChild onClick={handleClick} />;
}

const MemoizedChild = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

### Real-World Example: Event Handlers with Dependencies

```jsx
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');

  // Memoize toggle function
  const handleToggle = useCallback((id) => {
    // Update todo logic...
    console.log('Toggling todo:', id);
  }, []); // No dependencies needed

  // Memoize delete function with dependency
  const handleDelete = useCallback((id) => {
    if (filter === 'completed') {
      console.log('Cannot delete completed items');
      return;
    }
    console.log('Deleting todo:', id);
  }, [filter]); // Depends on filter

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

### useCallback vs useMemo

```jsx
// These are equivalent:
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);

// But useCallback is clearer for functions
```

---

## React.memo

`React.memo` is a Higher-Order Component that prevents re-renders when props haven't changed.

### Basic Usage

```jsx
// Without memo - re-renders every time parent renders
function ChildComponent({ name }) {
  console.log('Child rendered');
  return <div>Hello, {name}!</div>;
}

// With memo - only re-renders when name changes
const ChildComponent = React.memo(({ name }) => {
  console.log('Child rendered');
  return <div>Hello, {name}!</div>;
});
```

### Example: Preventing Unnecessary Re-renders

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [name] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      {/* UserProfile only re-renders if name changes */}
      <UserProfile name={name} />
    </div>
  );
}

const UserProfile = React.memo(({ name }) => {
  console.log('UserProfile rendered');
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {name}</p>
    </div>
  );
});
```

### Custom Comparison Function

```jsx
const UserCard = React.memo(
  ({ user }) => {
    return (
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id &&
           prevProps.user.name === nextProps.user.name;
  }
);
```

### Complete Example: Optimized List

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Memoize delete handler
  const handleDelete = useCallback((id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />

      {filteredUsers.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

// Memoized child component
const UserItem = React.memo(({ user, onDelete }) => {
  console.log('Rendering user:', user.name);

  return (
    <div>
      <span>{user.name}</span>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
});
```

---

## Code Splitting

Code splitting allows you to split your bundle into smaller chunks that can be loaded on demand.

### Why Code Splitting?

- **Faster Initial Load**: Load only necessary code
- **Better Performance**: Reduce JavaScript bundle size
- **Improved UX**: Users don't wait for code they don't need

### Dynamic Import

```jsx
// Instead of static import:
import HeavyComponent from './HeavyComponent';

// Use dynamic import:
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Route-Based Code Splitting

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Component-Based Code Splitting

```jsx
import { lazy, Suspense, useState } from 'react';

const HeavyChart = lazy(() => import('./components/HeavyChart'));
const HeavyTable = lazy(() => import('./components/HeavyTable'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => setShowChart(!showChart)}>
        Toggle Chart
      </button>

      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

---

## Lazy Loading

Lazy loading defers component loading until they're needed.

### Basic Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
}

function LoadingSpinner() {
  return <div className="spinner">Loading...</div>;
}
```

### Loading Component with Retry

```jsx
function lazyWithRetry(componentImport) {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      // Retry once on failure
      console.log('Retrying import...');
      return await componentImport();
    }
  });
}

const MyComponent = lazyWithRetry(() => import('./MyComponent'));
```

### Preloading Components

```jsx
import { lazy, Suspense } from 'react';

// Create lazy component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  // Preload on hover
  const handleMouseEnter = () => {
    import('./HeavyComponent');
  };

  return (
    <div>
      <button onMouseEnter={handleMouseEnter}>
        Show Heavy Component
      </button>

      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

---

## Performance Best Practices

### 1. Avoid Inline Object Creation

```jsx
// ❌ Bad - new object every render
function MyComponent() {
  return <Child style={{ color: 'red' }} />;
}

// ✅ Good - memoize or move outside
const style = { color: 'red' };
function MyComponent() {
  return <Child style={style} />;
}
```

### 2. Use Keys Properly

```jsx
// ❌ Bad - index as key
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// ✅ Good - stable unique identifier
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### 3. Debounce Expensive Operations

```jsx
import { useState, useEffect } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Debounce search
    const timeoutId = setTimeout(() => {
      if (query) {
        performSearch(query).then(setResults);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

### 4. Virtualize Long Lists

```jsx
// For very long lists (1000+ items), use virtualization
// Libraries: react-window, react-virtualized

import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 5. Optimize Context Usage

```jsx
// ❌ Bad - entire tree re-renders
const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      <Component />
    </AppContext.Provider>
  );
}

// ✅ Good - split contexts
const UserContext = createContext();
const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Component />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

### 6. Use Production Build

```bash
# Development build (slower, with warnings)
npm run dev

# Production build (optimized, minified)
npm run build
```

### 7. Measure Performance

```jsx
import { Profiler } from 'react';

function App() {
  const onRenderCallback = (
    id, // Component id
    phase, // "mount" or "update"
    actualDuration, // Time spent rendering
    baseDuration, // Estimated time without memoization
    startTime,
    commitTime
  ) => {
    console.log(`${id} (${phase}) took ${actualDuration}ms`);
  };

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}
```

---

## Summary

### Key Takeaways

1. **useMemo**: Memoize expensive calculations
2. **useCallback**: Memoize function references
3. **React.memo**: Prevent unnecessary component re-renders
4. **Code Splitting**: Split bundle into smaller chunks
5. **Lazy Loading**: Load components on demand

### Optimization Checklist

- [ ] Identify performance bottlenecks with React DevTools Profiler
- [ ] Use `React.memo` for pure components
- [ ] Wrap callbacks in `useCallback` when passed to memoized children
- [ ] Use `useMemo` for expensive calculations
- [ ] Implement code splitting for large applications
- [ ] Lazy load heavy components
- [ ] Avoid inline object/array creation in render
- [ ] Use stable keys for lists
- [ ] Debounce/throttle expensive operations
- [ ] Test with production build

### When to Optimize

⚠️ **Premature optimization is the root of all evil**

Only optimize when:
1. You have measured performance issues
2. Users are experiencing lag or slowness
3. Component is rendering too frequently
4. Calculations are noticeably slow

### Tools for Performance Analysis

- **React DevTools Profiler**: Measure component render times
- **Chrome DevTools Performance**: Record and analyze performance
- **Lighthouse**: Overall performance auditing
- **why-did-you-render**: Debug unnecessary re-renders

---

## Practice Exercises

The exercises in `02-exercises.jsx` will help you practice:

1. Optimizing expensive calculations with `useMemo`
2. Memoizing callbacks with `useCallback`
3. Preventing re-renders with `React.memo`
4. Implementing code splitting
5. Lazy loading components
6. Measuring and improving performance

Complete all exercises to master React performance optimization!

---

## Q&A

### 1) What causes unnecessary re-renders?
**Answer:** Changing props/state references and parent re-renders that cascade to children.

### 2) When is React.memo useful?
**Answer:** For pure components that receive the same props frequently.

### 3) Why use useMemo and useCallback carefully?
**Answer:** They can reduce expensive recalculation but add complexity if overused.

### 4) How does list virtualization improve performance?
**Answer:** It renders only visible items instead of the full list.

### 5) What should guide performance optimization?
**Answer:** Measure first, optimize bottlenecks second, and keep code maintainable.
