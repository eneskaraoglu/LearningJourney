// Testing React Applications - Exercises

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Exercise 1: Basic Rendering Test
// TODO: Write tests for this Button component
function Button({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Your tests here:
describe('Button', () => {
  test('renders button with text', () => {
    // TODO: Render button and check if text appears
  });

  test('calls onClick when clicked', () => {
    // TODO: Test that onClick is called
  });

  test('is disabled when disabled prop is true', () => {
    // TODO: Test disabled state
  });
});

// Exercise 2: Testing Props and Conditional Rendering
// TODO: Write tests for conditional rendering
function Greeting({ name, isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {name}!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}

describe('Greeting', () => {
  test('shows welcome message when logged in', () => {
    // TODO: Test logged in state
  });

  test('shows sign in message when not logged in', () => {
    // TODO: Test logged out state
  });
});

// Exercise 3: Testing Form Input
// TODO: Write tests for form interactions
function LoginForm({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

describe('LoginForm', () => {
  test('submits form with correct data', async () => {
    // TODO: Test form submission with user input
  });

  test('updates input values', async () => {
    // TODO: Test that inputs update as user types
  });
});

// Exercise 4: Testing Counter Component
// TODO: Write tests for state changes
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

describe('Counter', () => {
  test('starts at 0', () => {
    // TODO: Test initial state
  });

  test('increments count', async () => {
    // TODO: Test increment button
  });

  test('decrements count', async () => {
    // TODO: Test decrement button
  });

  test('resets count', async () => {
    // TODO: Test reset button
  });
});

// Exercise 5: Testing Async Data Fetching
// TODO: Write tests for async operations
function UserProfile({ userId }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://api.example.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>User: {user.name}</div>;
}

describe('UserProfile', () => {
  beforeEach(() => {
    // TODO: Setup fetch mock
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('shows loading state initially', () => {
    // TODO: Test loading state
  });

  test('displays user data after loading', async () => {
    // TODO: Mock successful API call and test
  });

  test('displays error message on failure', async () => {
    // TODO: Mock failed API call and test
  });
});

// Exercise 6: Testing Custom Hook
// TODO: Write tests for this custom hook
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);

  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

// Your tests here:
describe('useToggle', () => {
  test('initializes with default value', () => {
    // TODO: Test initial state
  });

  test('toggles value', () => {
    // TODO: Test toggle function
  });

  test('sets value to true', () => {
    // TODO: Test setTrue function
  });

  test('sets value to false', () => {
    // TODO: Test setFalse function
  });
});

// Exercise 7: Testing Todo List (Integration Test)
// TODO: Write integration tests
function TodoList() {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              aria-label={`Toggle ${todo.text}`}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

describe('TodoList Integration', () => {
  test('adds a new todo', async () => {
    // TODO: Test adding a todo
  });

  test('toggles todo completion', async () => {
    // TODO: Test toggling a todo
  });

  test('deletes a todo', async () => {
    // TODO: Test deleting a todo
  });

  test('clears input after adding', async () => {
    // TODO: Test input clearing
  });
});

// Exercise 8: Testing Accessibility
// TODO: Write accessibility tests
function AccessibleForm() {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" required />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" required />

      <button type="submit">Submit</button>
    </form>
  );
}

describe('AccessibleForm', () => {
  test('has accessible labels', () => {
    // TODO: Test that labels are associated with inputs
  });

  test('has accessible button', () => {
    // TODO: Test button accessibility
  });

  test('has required fields', () => {
    // TODO: Test required attributes
  });
});

export {
  Button,
  Greeting,
  LoginForm,
  Counter,
  UserProfile,
  useToggle,
  TodoList,
  AccessibleForm
};
