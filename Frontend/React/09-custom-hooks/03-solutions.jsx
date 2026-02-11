import { useState, useEffect, useRef, useCallback } from 'react'

/*
  CUSTOM HOOKS SOLUTIONS

  Complete implementations of reusable custom hooks.
  Study these solutions to understand best practices for creating custom hooks.
*/

// Exercise 1: useToggle Hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle];
}

// Exercise 2: useLocalStorage Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Exercise 3: useFetch Hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Exercise 4: useDebounce Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Exercise 5: useWindowSize Hook
function useWindowSize() {
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

  return windowSize;
}

// Exercise 6: useOnClickOutside Hook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Exercise 7: useForm Hook
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(values);
  };

  const reset = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleSubmit, reset };
}

// Exercise 8: usePrevious Hook
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Demo Components
function ToggleDemo() {
  const [isOn, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isOn ? 'ON' : 'OFF'}
      </button>
      <p>Status: {isOn ? 'Active' : 'Inactive'}</p>
    </div>
  );
}

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('username', '');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name (persisted to localStorage)"
      />
      <p>Stored name: {name}</p>
      <button onClick={() => setName('')}>Clear</button>
    </div>
  );
}

function FetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data && data.slice(0, 5).map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search (debounced)"
      />
      <p>Immediate value: {searchTerm}</p>
      <p>Debounced value: {debouncedSearchTerm}</p>
    </div>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
    </div>
  );
}

function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Menu</button>
      {isOpen && (
        <div ref={ref} style={{ padding: '20px', background: '#f0f0f0', marginTop: '10px' }}>
          <p>Click outside to close</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

function FormDemo() {
  const { values, handleChange, handleSubmit, reset } = useForm({
    name: '',
    email: ''
  });

  const onSubmit = (formValues) => {
    console.log('Form submitted:', formValues);
    alert(`Name: ${formValues.name}, Email: ${formValues.email}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
}

function PreviousDemo() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Key Takeaways:
// 1. Custom hooks start with "use" prefix
// 2. Can use other hooks inside custom hooks
// 3. Return values in convenient format (array, object)
// 4. Encapsulate reusable logic
// 5. Make components cleaner and more focused

export {
  useToggle,
  useLocalStorage,
  useFetch,
  useDebounce,
  useWindowSize,
  useOnClickOutside,
  useForm,
  usePrevious,
  ToggleDemo,
  LocalStorageDemo,
  FetchDemo,
  DebounceDemo,
  WindowSizeDemo,
  ClickOutsideDemo,
  FormDemo,
  PreviousDemo
};
