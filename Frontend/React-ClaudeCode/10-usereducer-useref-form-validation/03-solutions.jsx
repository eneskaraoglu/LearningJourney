// useReducer, useRef & Form Validation - Solutions

import { useReducer, useRef, useState, useEffect } from 'react';

// Exercise 1: Basic useReducer Counter
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function CounterReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>Set to 10</button>
    </div>
  );
}

// Exercise 2: Todo List with useReducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

function TodoReducer() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear Completed
      </button>
    </div>
  );
}

// Exercise 3: Form with useReducer
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      };
    case 'RESET_FORM':
      return {
        values: { name: '', email: '', password: '' },
        errors: {}
      };
    default:
      return state;
  }
}

function FormWithReducer() {
  const [state, dispatch] = useReducer(formReducer, {
    values: { name: '', email: '', password: '' },
    errors: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', state.values);
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={state.values.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={state.values.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={state.values.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Exercise 4: useRef for Focus Management
function FocusManagementForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  const handleNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      emailRef.current.focus();
    }
  };

  const handleEmailKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitRef.current.focus();
    }
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <form>
      <input ref={nameRef} placeholder="Name" onKeyPress={handleNameKeyPress} />
      <input ref={emailRef} placeholder="Email" onKeyPress={handleEmailKeyPress} />
      <input ref={passwordRef} type="password" placeholder="Password" onKeyPress={handlePasswordKeyPress} />
      <button ref={submitRef} type="submit">Submit</button>
    </form>
  );
}

// Exercise 5: useRef for Timer
function Stopwatch() {
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
    <div>
      <h2>Time: {time}s</h2>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Exercise 6: useRef for Previous Value
function PreviousValueTracker() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current ?? 'None'}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Exercise 7: Complex Form Validation
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain number';
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
      console.log('Form is valid!', formData);
      alert('Registration successful!');
    } else {
      setErrors(allErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Username"
        />
        {touched.username && errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        />
        {touched.email && errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
        />
        {touched.password && errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm Password"
        />
        {touched.confirmPassword && errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}

// Exercise 8: Real-time Validation
function RealTimeValidationForm() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!username) {
      setStatus('idle');
      setMessage('');
      return;
    }

    setStatus('validating');
    const timer = setTimeout(async () => {
      // Mock API call
      const isAvailable = !['admin', 'user', 'test'].includes(username.toLowerCase());

      if (isAvailable) {
        setStatus('valid');
        setMessage('Username is available!');
      } else {
        setStatus('invalid');
        setMessage('Username is taken');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const getStatusColor = () => {
    switch (status) {
      case 'validating': return 'orange';
      case 'valid': return 'green';
      case 'invalid': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        style={{ borderColor: getStatusColor() }}
      />
      {status !== 'idle' && (
        <p style={{ color: getStatusColor() }}>
          {status === 'validating' ? 'Checking...' : message}
        </p>
      )}
    </div>
  );
}

// Exercise 9: Shopping Cart with useReducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

function ShoppingCartReducer() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ];

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>
            Add to Cart
          </button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <span>{item.name} x {item.quantity} = ${item.price * item.quantity}</span>
          <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${total}</h3>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
    </div>
  );
}

// Exercise 10: Scroll to Section with useRef
function ScrollToSectionNav() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <nav style={{ position: 'fixed', top: 0, background: 'white', padding: '10px' }}>
        <button onClick={() => scrollToSection(section1Ref)}>Section 1</button>
        <button onClick={() => scrollToSection(section2Ref)}>Section 2</button>
        <button onClick={() => scrollToSection(section3Ref)}>Section 3</button>
      </nav>

      <div ref={section1Ref} style={{ height: '100vh', padding: '20px', marginTop: '50px' }}>
        <h2>Section 1</h2>
        <p>Content for section 1...</p>
      </div>

      <div ref={section2Ref} style={{ height: '100vh', padding: '20px', background: '#f0f0f0' }}>
        <h2>Section 2</h2>
        <p>Content for section 2...</p>
      </div>

      <div ref={section3Ref} style={{ height: '100vh', padding: '20px', background: '#e0e0e0' }}>
        <h2>Section 3</h2>
        <p>Content for section 3...</p>
      </div>
    </div>
  );
}

export {
  CounterReducer,
  TodoReducer,
  FormWithReducer,
  FocusManagementForm,
  Stopwatch,
  PreviousValueTracker,
  RegistrationForm,
  RealTimeValidationForm,
  ShoppingCartReducer,
  ScrollToSectionNav
};
