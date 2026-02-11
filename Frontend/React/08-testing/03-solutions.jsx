// Testing React Applications - Solutions

import React, { useState, useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Exercise 1: Basic Rendering Test
function Button({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

// Exercise 2: Testing Props and Conditional Rendering
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
    render(<Greeting name="John" isLoggedIn={true} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Welcome back, John!');
  });

  test('shows sign in message when not logged in', () => {
    render(<Greeting name="John" isLoggedIn={false} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Please sign in');
  });
});

// Exercise 3: Testing Form Input
function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    const handleSubmit = jest.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  test('updates input values', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    await user.type(emailInput, 'user@test.com');
    await user.type(passwordInput, 'secret');

    expect(emailInput).toHaveValue('user@test.com');
    expect(passwordInput).toHaveValue('secret');
  });
});

// Exercise 4: Testing Counter Component
function Counter() {
  const [count, setCount] = useState(0);

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
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('increments count', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });

  test('decrements count', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByText('Count: -1')).toBeInTheDocument();
  });

  test('resets count', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});

// Exercise 5: Testing Async Data Fetching
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.example.com/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
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
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('shows loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<UserProfile userId="123" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays user data after loading', async () => {
    const mockUser = { name: 'John Doe' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    });

    render(<UserProfile userId="123" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('User: John Doe')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/123');
  });

  test('displays error message on failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<UserProfile userId="123" />);

    expect(await screen.findByText('Error: Network error')).toBeInTheDocument();
  });
});

// Exercise 6: Testing Custom Hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

describe('useToggle', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  test('initializes with custom value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  test('toggles value', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current.value).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
  });

  test('sets value to true', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
  });

  test('sets value to false', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });
});

// Exercise 7: Testing Todo List (Integration Test)
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

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
        aria-label="Todo input"
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
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText('Todo input');
    const addButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'Buy groceries');
    await user.click(addButton);

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Add a todo first
    await user.type(screen.getByLabelText('Todo input'), 'Test todo');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkbox = screen.getByLabelText('Toggle Test todo');
    const todoText = screen.getByText('Test todo');

    expect(checkbox).not.toBeChecked();
    expect(todoText).not.toHaveStyle('text-decoration: line-through');

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Add a todo
    await user.type(screen.getByLabelText('Todo input'), 'Delete me');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Delete me')).toBeInTheDocument();

    // Delete it
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });

  test('clears input after adding', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText('Todo input');

    await user.type(input, 'New todo');
    expect(input).toHaveValue('New todo');

    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(input).toHaveValue('');
  });

  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});

// Exercise 8: Testing Accessibility
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
    render(<AccessibleForm />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test('has accessible button', () => {
    render(<AccessibleForm />);

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
  });

  test('has required fields', () => {
    render(<AccessibleForm />);

    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
  });

  test('inputs have correct types', () => {
    render(<AccessibleForm />);

    expect(screen.getByLabelText('Name')).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });
});

// Bonus: Testing Component with Context
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}

describe('ThemedButton with Context', () => {
  test('displays current theme', () => {
    render(
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );

    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();
  });

  test('toggles theme on click', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Current theme: light');

    await user.click(button);
    expect(button).toHaveTextContent('Current theme: dark');

    await user.click(button);
    expect(button).toHaveTextContent('Current theme: light');
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
  AccessibleForm,
  ThemeProvider,
  ThemedButton
};
