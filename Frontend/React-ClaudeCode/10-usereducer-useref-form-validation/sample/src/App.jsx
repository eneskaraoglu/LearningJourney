import { useReducer, useRef, useState, useEffect } from 'react';

// ========== useReducer Examples ==========

// Todo Reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

function TodoSection() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'ADD', payload: input });
      setInput('');
    }
  };

  return (
    <div className="section">
      <h2>📝 Todo List (useReducer)</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
            />
            <span>{todo.text}</span>
            <button onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}>
              ✕
            </button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })} className="clear-btn">
          Clear Completed
        </button>
      )}
    </div>
  );
}

// ========== useRef Examples ==========

function StopwatchSection() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="section">
      <h2>⏱️ Stopwatch (useRef)</h2>
      <div className="stopwatch">
        <div className="time-display">{time}s</div>
        <div className="stopwatch-controls">
          <button onClick={start} disabled={isRunning}>Start</button>
          <button onClick={stop} disabled={!isRunning}>Stop</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

function FocusInputSection() {
  const inputRef = useRef(null);

  return (
    <div className="section">
      <h2>🎯 Focus Management (useRef)</h2>
      <div className="focus-demo">
        <input ref={inputRef} placeholder="Click button to focus me" />
        <button onClick={() => inputRef.current?.focus()}>
          Focus Input
        </button>
      </div>
    </div>
  );
}

// ========== Form Validation ==========

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (name, value) => {
    switch (name) {
      case 'username':
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Username must be alphanumeric';
        return '';

      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        return '';

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Must contain lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Must contain uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Must contain number';
        return '';

      case 'confirmPassword':
        if (value !== formData.password) return 'Passwords do not match';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validate(key, formData[key]);
      if (error) allErrors[key] = error;
    });

    if (Object.keys(allErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setTouched({});
      }, 3000);
    } else {
      setErrors(allErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    }
  };

  const isValid = Object.values(errors).every(error => !error) &&
                  Object.values(formData).every(value => value);

  return (
    <div className="section">
      <h2>✅ Registration Form (Validation)</h2>
      {submitted && (
        <div className="success-message">
          ✓ Registration successful!
        </div>
      )}
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.username && errors.username ? 'error' : ''}
          />
          {touched.username && errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.email && errors.email ? 'error' : ''}
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.password && errors.password ? 'error' : ''}
          />
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" disabled={!isValid || submitted}>
          {submitted ? 'Registered!' : 'Register'}
        </button>
      </form>
    </div>
  );
}

// ========== Main App ==========

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>useReducer, useRef & Form Validation</h1>
        <p>Comprehensive examples of advanced React hooks and form handling</p>
      </header>

      <div className="container">
        <div className="grid">
          <TodoSection />
          <StopwatchSection />
        </div>

        <div className="grid">
          <FocusInputSection />
        </div>

        <RegistrationForm />

        <div className="section">
          <h2>🎯 Key Concepts</h2>
          <div className="concepts">
            <div className="concept">
              <h3>useReducer</h3>
              <p>Manage complex state logic with actions and reducers. Perfect for state with multiple sub-values.</p>
            </div>
            <div className="concept">
              <h3>useRef</h3>
              <p>Access DOM elements and persist mutable values across renders without causing re-renders.</p>
            </div>
            <div className="concept">
              <h3>Form Validation</h3>
              <p>Real-time validation with touched fields, error messages, and comprehensive validation rules.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
