// Performance Optimization - Solutions

import React, { useState, useMemo, useCallback, lazy, Suspense, Profiler, createContext, useContext } from 'react';

// Exercise 1: useMemo - Expensive Calculation
function FibonacciCalculator() {
  const [number, setNumber] = useState(35);
  const [count, setCount] = useState(0);

  const calculateFib = (n) => {
    console.log('Calculating fibonacci...');
    if (n <= 1) return n;
    return calculateFib(n - 1) + calculateFib(n - 2);
  };

  // Memoize expensive calculation
  const result = useMemo(() => {
    return calculateFib(number);
  }, [number]); // Only recalculate when number changes

  return (
    <div className="calculator">
      <h3>Fibonacci Calculator</h3>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
        min="0"
        max="40"
      />
      <p>Fibonacci({number}) = {result}</p>
      <button onClick={() => setCount(count + 1)}>
        Re-render count: {count}
      </button>
      <p className="hint">
        Try changing the count - fibonacci won't recalculate!
      </p>
    </div>
  );
}

// Exercise 2: useCallback - Event Handler
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Memoize add handler - doesn't depend on todos
  const handleAdd = useCallback(() => {
    if (text.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text }]);
      setText('');
    }
  }, [text]); // Only recreate when text changes

  // Memoize delete handler - no dependencies needed
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []); // Never recreated

  return (
    <div className="todo-list">
      <h3>Optimized Todo List</h3>
      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo..."
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="todos">
        {todos.map(todo => (
          <MemoizedTodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

// Memoized todo item - only re-renders when props change
const MemoizedTodoItem = React.memo(({ todo, onDelete }) => {
  console.log('TodoItem rendered:', todo.text);
  return (
    <div className="todo-item">
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
});

// Exercise 3: React.memo
function Parent() {
  const [count, setCount] = useState(0);
  const [name] = useState('John');

  return (
    <div className="parent">
      <h3>React.memo Example</h3>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <p className="hint">
        Click the button - ExpensiveChild won't re-render!
      </p>
      <MemoizedExpensiveChild name={name} />
    </div>
  );
}

// Wrapped with React.memo to prevent unnecessary re-renders
const MemoizedExpensiveChild = React.memo(({ name }) => {
  console.log('ExpensiveChild rendered');

  // Simulate expensive rendering
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }

  return (
    <div className="expensive-child">
      <p>Hello, {name}!</p>
      <p>Expensive calculation result: {sum}</p>
    </div>
  );
});

// Exercise 4: Combine useMemo and React.memo
function FilteredList({ items }) {
  const [filter, setFilter] = useState('');
  const [count, setCount] = useState(0);

  // Memoize filtered items
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // Only recalculate when items or filter change

  return (
    <div className="filtered-list">
      <h3>Filtered List</h3>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <button onClick={() => setCount(count + 1)}>
        Re-render: {count}
      </button>
      <p className="hint">
        Change count - list won't re-render if filter hasn't changed!
      </p>
      <MemoizedList items={filteredItems} />
    </div>
  );
}

// Memoized list component
const MemoizedList = React.memo(({ items }) => {
  console.log('List rendered with', items.length, 'items');
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
});

// Exercise 5: Lazy Loading
// Simulated heavy component
const HeavyComponent = lazy(() => {
  // Simulate loading delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="heavy-component">
            <h3>Heavy Component Loaded!</h3>
            <p>This component was loaded on demand.</p>
            <p>Check the network tab to see it load separately.</p>
          </div>
        )
      });
    }, 1000);
  });
});

function LazyLoadingApp() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className="lazy-loading">
      <h3>Lazy Loading Example</h3>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? 'Hide' : 'Show'} Component
      </button>

      {showComponent && (
        <Suspense fallback={<div className="loading">Loading component...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}

// Exercise 6: Optimize Context
// Split contexts to prevent unnecessary re-renders
const UserContext = createContext();
const ThemeContext = createContext();
const CountContext = createContext();

function OptimizedAppProvider({ children }) {
  const [user, setUser] = useState({ name: 'John', email: 'john@example.com' });
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CountContext.Provider value={{ count, setCount }}>
          {children}
        </CountContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Individual consumers only re-render when their context changes
function UserDisplay() {
  const { user } = useContext(UserContext);
  console.log('UserDisplay rendered');
  return <div>User: {user.name}</div>;
}

function ThemeDisplay() {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log('ThemeDisplay rendered');
  return (
    <div>
      Theme: {theme}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

function CountDisplay() {
  const { count, setCount } = useContext(CountContext);
  console.log('CountDisplay rendered');
  return (
    <div>
      Count: {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function ContextExample() {
  return (
    <OptimizedAppProvider>
      <div className="context-example">
        <h3>Optimized Context</h3>
        <p className="hint">
          Each component only re-renders when its context changes!
        </p>
        <UserDisplay />
        <ThemeDisplay />
        <CountDisplay />
      </div>
    </OptimizedAppProvider>
  );
}

// Exercise 7: Debounced Search
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce the query
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Perform search when debounced query changes
  React.useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const performSearch = async (searchQuery) => {
    console.log('Searching for:', searchQuery);
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        `Result 1 for: ${searchQuery}`,
        `Result 2 for: ${searchQuery}`,
        `Result 3 for: ${searchQuery}`
      ];
      setResults(mockResults);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="search-component">
      <h3>Debounced Search</h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search... (500ms delay)"
      />
      {loading && <p className="loading">Searching...</p>}
      {!loading && results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
      <p className="hint">
        Type quickly - search only happens after you stop typing!
      </p>
    </div>
  );
}

// Exercise 8: Performance Profiler
function Dashboard() {
  const [data, setData] = useState([1, 2, 3, 4, 5]);

  const onRenderCallback = (
    id, // Component id
    phase, // "mount" or "update"
    actualDuration, // Time spent rendering
    baseDuration, // Estimated time without memoization
    startTime,
    commitTime,
    interactions
  ) => {
    console.log(`${id} (${phase}) rendering:`, {
      actualDuration: `${actualDuration.toFixed(2)}ms`,
      baseDuration: `${baseDuration.toFixed(2)}ms`,
      difference: `${(baseDuration - actualDuration).toFixed(2)}ms saved`
    });
  };

  const addData = () => {
    setData(prev => [...prev, Math.floor(Math.random() * 100)]);
  };

  return (
    <div className="dashboard">
      <h3>Performance Profiler</h3>
      <button onClick={addData}>Add Data Point</button>
      <p className="hint">Check console for render times!</p>

      <Profiler id="Chart" onRender={onRenderCallback}>
        <OptimizedChart data={data} />
      </Profiler>

      <Profiler id="Table" onRender={onRenderCallback}>
        <OptimizedTable data={data} />
      </Profiler>
    </div>
  );
}

// Optimized chart component
const OptimizedChart = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    console.log('Processing chart data...');
    return data.map(item => item * 2);
  }, [data]);

  return (
    <div className="chart">
      <h4>Chart</h4>
      <p>Data points: {processedData.length}</p>
      <div className="chart-bars">
        {processedData.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${value}px`, width: '20px', background: '#3b82f6' }}
          />
        ))}
      </div>
    </div>
  );
});

// Optimized table component
const OptimizedTable = React.memo(({ data }) => {
  console.log('Rendering table...');

  return (
    <div className="table">
      <h4>Table</h4>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Value</th>
            <th>Double</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>{item * 2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// Complete Demo App
function PerformanceDemo() {
  const [activeDemo, setActiveDemo] = useState('fibonacci');

  const demos = {
    fibonacci: { component: <FibonacciCalculator />, title: 'useMemo' },
    todo: { component: <TodoList />, title: 'useCallback' },
    parent: { component: <Parent />, title: 'React.memo' },
    filter: { component: <FilteredList items={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']} />, title: 'useMemo + React.memo' },
    lazy: { component: <LazyLoadingApp />, title: 'Lazy Loading' },
    context: { component: <ContextExample />, title: 'Optimized Context' },
    search: { component: <SearchComponent />, title: 'Debounced Search' },
    profiler: { component: <Dashboard />, title: 'Performance Profiler' }
  };

  return (
    <div className="performance-demo">
      <h2>Performance Optimization Demos</h2>

      <nav className="demo-nav">
        {Object.keys(demos).map(key => (
          <button
            key={key}
            onClick={() => setActiveDemo(key)}
            className={activeDemo === key ? 'active' : ''}
          >
            {demos[key].title}
          </button>
        ))}
      </nav>

      <div className="demo-content">
        {demos[activeDemo].component}
      </div>

      <div className="instructions">
        <h4>Instructions:</h4>
        <ul>
          <li>Open browser console to see optimization effects</li>
          <li>Watch for "rendered" logs to track re-renders</li>
          <li>Try interacting with components to see memoization in action</li>
        </ul>
      </div>
    </div>
  );
}

export {
  FibonacciCalculator,
  TodoList,
  MemoizedTodoItem,
  Parent,
  MemoizedExpensiveChild,
  FilteredList,
  MemoizedList,
  LazyLoadingApp,
  HeavyComponent,
  OptimizedAppProvider,
  UserDisplay,
  ThemeDisplay,
  CountDisplay,
  ContextExample,
  SearchComponent,
  Dashboard,
  OptimizedChart,
  OptimizedTable,
  PerformanceDemo
};
