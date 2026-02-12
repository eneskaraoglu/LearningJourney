# useReducer, useRef & Form Validation

## useReducer Hook

`useReducer` is an alternative to `useState` for managing complex state logic. It's similar to Redux's reducer pattern.

### When to Use useReducer

- Complex state logic with multiple sub-values
- Next state depends on previous state
- State updates involve multiple actions
- Want to optimize performance for components that trigger deep updates

### Basic Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `reducer`: Function that determines how state changes
- `initialState`: Initial state value
- `state`: Current state
- `dispatch`: Function to trigger state updates

### Simple Counter Example

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

### Complex State Management

```jsx
const initialState = {
  user: null,
  loading: false,
  error: null
};

function userReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { user: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

function UserProfile() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fetchUser()
      .then(user => dispatch({ type: 'FETCH_SUCCESS', payload: user }))
      .catch(error => dispatch({ type: 'FETCH_ERROR', payload: error }));
  }, []);

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  return <div>User: {state.user?.name}</div>;
}
```

### useReducer with Payload

```jsx
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  return (/* ... */);
}
```

## useRef Hook

`useRef` creates a mutable reference that persists across renders without causing re-renders.

### Use Cases

1. Accessing DOM elements
2. Storing mutable values that don't trigger re-renders
3. Keeping track of previous values
4. Storing timers/intervals

### Accessing DOM Elements

```jsx
function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

### Storing Mutable Values

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
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
      <p>Count: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### Previous Value Tracking

```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}, Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Form Validation

Comprehensive form validation patterns for real-world applications.

### Basic Validation

```jsx
function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (/* form with error messages */);
}
```

### Real-time Validation

```jsx
function validateField(name, value, formData) {
  switch (name) {
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
}

function RealTimeValidationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value, { ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value, formData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields
    const allErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key], formData);
      if (error) allErrors[key] = error;
    });

    if (Object.keys(allErrors).length === 0) {
      console.log('Form is valid!', formData);
    } else {
      setErrors(allErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    }
  };

  return (/* form with real-time validation */);
}
```

### useReducer for Complex Forms

```jsx
const formReducer = (state, action) => {
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
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true }
      };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':
      return { ...initialFormState, submitSuccess: true };
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, submitError: action.error };
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
};

const initialFormState = {
  values: { email: '', password: '' },
  errors: {},
  touched: {},
  isSubmitting: false,
  submitSuccess: false,
  submitError: null
};

function ComplexForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });

    if (state.touched[name]) {
      const error = validateField(name, value);
      dispatch({ type: 'SET_ERROR', field: name, error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_TOUCHED', field: name });
    const error = validateField(name, value);
    dispatch({ type: 'SET_ERROR', field: name, error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });

    try {
      await submitForm(state.values);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', error: error.message });
    }
  };

  return (/* form */);
}
```

## Best Practices

### useReducer
1. Keep reducer pure - no side effects
2. Use action types as constants
3. Always include default case
4. Structure actions consistently
5. Consider using TypeScript for type safety

### useRef
1. Don't read/write ref.current during render
2. Clean up refs in useEffect cleanup
3. Use for values that don't affect rendering
4. Combine with useEffect for DOM manipulation

### Form Validation
1. Validate on blur for better UX
2. Show errors only after field is touched
3. Disable submit while validating/submitting
4. Provide clear, specific error messages
5. Consider using libraries for complex forms (Formik, React Hook Form)

## Summary

- **useReducer**: For complex state with multiple actions
- **useRef**: For mutable values and DOM access without re-renders
- **Form Validation**: Real-time validation, touched fields, clear errors
- **Combine patterns**: useReducer + useRef for sophisticated forms
- **Consider libraries**: For production apps with many forms

## Next Steps

In Module 11, we'll build a complete user management system with full CRUD operations and API integration.

---

## Q&A

### 1) When is useReducer better than useState?
**Answer:** When state transitions are complex, related, or driven by many action types.

### 2) What is the purpose of useRef?
**Answer:** Store mutable values or DOM references without triggering re-renders.

### 3) Why model reducer updates as actions?
**Answer:** Actions keep updates explicit, traceable, and easier to debug.

### 4) What is the value of form validation architecture?
**Answer:** It centralizes rules and improves consistency across fields.

### 5) How do reducer and validation work together?
**Answer:** Reducers manage form state transitions while validation derives errors from current state.
