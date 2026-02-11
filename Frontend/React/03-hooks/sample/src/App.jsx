// React Hooks Sample App
// Demonstrates useState and useEffect

import { useState, useEffect } from 'react';

// Counter with useState
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="card">
      <h2>Counter with State</h2>
      <div className="count-display">{count}</div>
      <div className="controls">
        <button onClick={() => setCount(count - step)}>-{step}</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + step)}>+{step}</button>
      </div>
      <div className="step-control">
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          min="1"
        />
      </div>
    </div>
  );
}

// Real-time search filter
function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
  ];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Search Filter</h2>
      <input
        type="text"
        placeholder="Search fruits..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="filtered-list">
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {filteredItems.length === 0 && (
        <p className="no-results">No results found</p>
      )}
    </div>
  );
}

// Timer with useEffect
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="card">
      <h2>Timer</h2>
      <div className="timer-display">{formatTime(seconds)}</div>
      <div className="controls">
        <button onClick={toggle} className={isActive ? 'stop' : 'start'}>
          {isActive ? 'Stop' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

// Window size tracker
function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="card">
      <h2>Window Size Tracker</h2>
      <p className="size-info">Width: {windowSize.width}px</p>
      <p className="size-info">Height: {windowSize.height}px</p>
      <p className="hint">Resize the browser window to see live updates!</p>
    </div>
  );
}

// Todo list combining multiple concepts
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === '') return;

    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false
    }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="card todo-card">
      <h2>Persistent Todo List</h2>
      <div className="todo-stats">
        <span>Total: {todos.length}</span>
        <span>Completed: {completedCount}</span>
      </div>
      <div className="todo-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-btn"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p className="empty-state">No todos yet. Add one above!</p>
      )}
    </div>
  );
}

// Main App
function App() {
  return (
    <div className="app">
      <header>
        <h1>React Hooks Demo</h1>
        <p>Exploring useState and useEffect</p>
      </header>

      <div className="grid">
        <Counter />
        <SearchFilter />
        <Timer />
        <WindowSizeTracker />
      </div>

      <div className="full-width">
        <TodoList />
      </div>

      <footer>
        <p>All components use React Hooks for state management and side effects</p>
      </footer>
    </div>
  );
}

export default App;
