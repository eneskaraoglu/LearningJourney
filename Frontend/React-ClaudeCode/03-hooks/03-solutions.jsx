// React Hooks - Solutions

import { useState, useEffect } from 'react';

// Exercise 1: Simple Counter
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Alternative with functional updates
function CounterAlt() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Exercise 2: Input Mirror
function InputMirror() {
  const [text, setText] = useState('');

  return (
    <div className="input-mirror">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      <p>Characters: {text.length}</p>
    </div>
  );
}

// Exercise 3: Toggle Visibility
function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="toggle-message">
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide Message' : 'Show Message'}
      </button>
      {isVisible && <p>Hello! This is a toggled message.</p>}
    </div>
  );
}

// Alternative with separate toggle function
function ToggleMessageAlt() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="toggle-message">
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide Message' : 'Show Message'}
      </button>
      {isVisible && (
        <div className="message">
          <p>Hello! This is a toggled message.</p>
        </div>
      )}
    </div>
  );
}

// Exercise 4: Todo List with State
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p className="empty">No todos yet. Add one above!</p>}
    </div>
  );
}

// Exercise 5: Form with Multiple Inputs
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration successful! Check console.');
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="form-data">
        <h3>Form Data:</h3>
        <p>Username: {formData.username}</p>
        <p>Email: {formData.email}</p>
        <p>Password: {formData.password ? '••••••' : ''}</p>
      </div>
    </div>
  );
}

// Exercise 6: Document Title Updater
function TitleUpdater() {
  const [text, setText] = useState('');

  useEffect(() => {
    if (text) {
      document.title = `React App - ${text}`;
    } else {
      document.title = 'React App';
    }

    // Cleanup: reset title when component unmounts
    return () => {
      document.title = 'React App';
    };
  }, [text]);

  return (
    <div className="title-updater">
      <h2>Document Title Updater</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to update page title..."
      />
      <p>Current title: {document.title}</p>
    </div>
  );
}

// Exercise 7: Timer Component
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="timer">
      <h2>Timer</h2>
      <div className="time-display">{formatTime(seconds)}</div>
      <button onClick={toggleTimer}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

// Exercise 8: Data Fetcher (Mock)
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchUser = () => {
      setTimeout(() => {
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        };
        setUser(mockUser);
        setLoading(false);
      }, 2000);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="user-card">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

// Alternative with error handling
function UserProfileAlt() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        };
        setUser(mockUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="user-card">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

// Bonus Exercise 9: Color Picker
function ColorPicker() {
  const [red, setRed] = useState(128);
  const [green, setGreen] = useState(128);
  const [blue, setBlue] = useState(128);

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const hexColor = rgbToHex(red, green, blue);
  const rgbColor = `rgb(${red}, ${green}, ${blue})`;

  return (
    <div className="color-picker">
      <h2>Color Picker</h2>
      <div
        className="color-display"
        style={{
          backgroundColor: rgbColor,
          width: '200px',
          height: '200px',
          border: '2px solid #333',
          marginBottom: '20px'
        }}
      />
      <div className="sliders">
        <div className="slider-group">
          <label>Red: {red}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={(e) => setRed(Number(e.target.value))}
          />
        </div>
        <div className="slider-group">
          <label>Green: {green}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={green}
            onChange={(e) => setGreen(Number(e.target.value))}
          />
        </div>
        <div className="slider-group">
          <label>Blue: {blue}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={blue}
            onChange={(e) => setBlue(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="color-info">
        <p><strong>RGB:</strong> {rgbColor}</p>
        <p><strong>HEX:</strong> {hexColor}</p>
      </div>
    </div>
  );
}

// Bonus Exercise 10: Local Storage Counter
function PersistentCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  const clearStorage = () => {
    localStorage.removeItem('count');
    setCount(0);
  };

  return (
    <div className="persistent-counter">
      <h2>Persistent Counter</h2>
      <p className="count-display">Count: {count}</p>
      <div className="button-group">
        <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
        <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
        <button onClick={clearStorage}>Clear Storage</button>
      </div>
      <p className="info">This counter persists even after page refresh!</p>
    </div>
  );
}

export {
  Counter,
  CounterAlt,
  InputMirror,
  ToggleMessage,
  ToggleMessageAlt,
  TodoList,
  RegistrationForm,
  TitleUpdater,
  Timer,
  UserProfile,
  UserProfileAlt,
  ColorPicker,
  PersistentCounter
};
