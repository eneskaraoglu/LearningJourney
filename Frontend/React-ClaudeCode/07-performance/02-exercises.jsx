// Performance Optimization - Exercises

// Exercise 1: useMemo - Expensive Calculation
// TODO: Optimize this component using useMemo
// The fibonacci calculation is expensive and shouldn't run on every render
function FibonacciCalculator() {
  // Calculate fibonacci number (expensive operation)
  const calculateFib = (n) => {
    if (n <= 1) return n;
    return calculateFib(n - 1) + calculateFib(n - 2);
  };

  // Your code here: Use useMemo to optimize this
  const [number, setNumber] = useState(35);
  const [count, setCount] = useState(0);

  const result = calculateFib(number);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <p>Fibonacci: {result}</p>
      <button onClick={() => setCount(count + 1)}>
        Re-render count: {count}
      </button>
    </div>
  );
}

// Exercise 2: useCallback - Event Handler
// TODO: Optimize using useCallback
// The handleClick function creates a new reference on every render
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Your code here: Wrap in useCallback
  const handleAdd = () => {
    setTodos([...todos, { id: Date.now(), text }]);
    setText('');
  };

  // Your code here: Wrap in useCallback
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </div>
  );
}

function TodoItem({ todo, onDelete }) {
  console.log('TodoItem rendered:', todo.text);
  return (
    <div>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

// Exercise 3: React.memo
// TODO: Prevent unnecessary re-renders using React.memo
// ExpensiveChild re-renders even when its props don't change
function Parent() {
  const [count, setCount] = useState(0);
  const [name] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild name={name} />
    </div>
  );
}

// Your code here: Wrap with React.memo
function ExpensiveChild({ name }) {
  console.log('ExpensiveChild rendered');

  // Simulate expensive rendering
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }

  return <div>Hello, {name}! Sum: {sum}</div>;
}

// Exercise 4: Combine useMemo and React.memo
// TODO: Optimize this component using both useMemo and React.memo
// The filtered list should only recalculate when items or filter change
function FilteredList({ items }) {
  const [filter, setFilter] = useState('');
  const [count, setCount] = useState(0);

  // Your code here: Use useMemo
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <button onClick={() => setCount(count + 1)}>
        Re-render: {count}
      </button>
      <List items={filteredItems} />
    </div>
  );
}

// Your code here: Wrap with React.memo
function List({ items }) {
  console.log('List rendered');
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Exercise 5: Lazy Loading
// TODO: Implement lazy loading for the HeavyComponent
// Component should only load when button is clicked
function App() {
  const [showComponent, setShowComponent] = useState(false);

  // Your code here: Use lazy() and Suspense
  // const HeavyComponent = lazy(() => import('./HeavyComponent'));

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        Toggle Component
      </button>

      {showComponent && (
        // Your code here: Wrap with Suspense
        <div>Heavy Component Here</div>
      )}
    </div>
  );
}

// Exercise 6: Optimize Context
// TODO: Split this context to prevent unnecessary re-renders
// Currently, any update causes all consumers to re-render
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({ name: 'John', email: 'john@example.com' });
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  // Your code here: Split into separate contexts
  const value = {
    user,
    setUser,
    theme,
    setTheme,
    count,
    setCount
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Exercise 7: Debounced Search
// TODO: Add debouncing to the search input
// API should only be called after user stops typing for 500ms
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Your code here: Implement debouncing
  const performSearch = async (searchQuery) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults([`Result for: ${searchQuery}`]);
      setLoading(false);
    }, 500);
  };

  // This should be debounced
  const handleSearch = (value) => {
    setQuery(value);
    performSearch(value);
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Searching...</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

// Exercise 8: Performance Profiler
// TODO: Add Profiler to measure rendering performance
// Log render times to console
function Dashboard() {
  const [data, setData] = useState([]);

  // Your code here: Wrap components with Profiler
  // and implement onRender callback

  return (
    <div>
      <h1>Dashboard</h1>
      <ExpensiveChart data={data} />
      <ExpensiveTable data={data} />
    </div>
  );
}

function ExpensiveChart({ data }) {
  // Simulate expensive rendering
  const processedData = data.map(item => item * 2);
  return <div>Chart with {processedData.length} points</div>;
}

function ExpensiveTable({ data }) {
  // Simulate expensive rendering
  return (
    <table>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export {
  FibonacciCalculator,
  TodoList,
  TodoItem,
  Parent,
  ExpensiveChild,
  FilteredList,
  List,
  App,
  SearchComponent,
  Dashboard,
  ExpensiveChart,
  ExpensiveTable
};
