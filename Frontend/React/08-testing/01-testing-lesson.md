# Module 08: Testing React Applications

## Table of Contents
1. [Introduction to Testing](#introduction)
2. [Testing Philosophy](#testing-philosophy)
3. [React Testing Library](#react-testing-library)
4. [Jest Basics](#jest-basics)
5. [Testing Components](#testing-components)
6. [Testing User Interactions](#testing-interactions)
7. [Testing Async Code](#testing-async)
8. [Testing Hooks](#testing-hooks)
9. [Best Practices](#best-practices)

---

## Introduction to Testing

Testing ensures your React applications work as expected and helps catch bugs before they reach production.

### Why Test?

- **Confidence**: Deploy with confidence knowing code works
- **Documentation**: Tests serve as living documentation
- **Refactoring**: Change code safely without breaking functionality
- **Bug Prevention**: Catch regressions early
- **Better Design**: Testable code is usually better designed

### Types of Tests

1. **Unit Tests**: Test individual functions/components in isolation
2. **Integration Tests**: Test how multiple components work together
3. **End-to-End Tests**: Test complete user flows

**Focus**: We'll primarily cover **Unit** and **Integration** tests with React Testing Library.

---

## Testing Philosophy

### Test User Behavior, Not Implementation

```jsx
// ❌ Bad - Testing implementation details
test('counter state increments', () => {
  const { result } = renderHook(() => useState(0));
  expect(result.current[0]).toBe(0);
});

// ✅ Good - Testing user behavior
test('clicking button increments counter', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### The Testing Trophy

```
    /\
   /  \    E2E Tests (Few)
  /____\
  /    \   Integration Tests (Some)
 /______\
 /      \  Unit Tests (Many)
/________\
```

**Strategy**: Write mostly integration tests, some unit tests, few E2E tests.

---

## React Testing Library

React Testing Library (RTL) encourages testing from the user's perspective.

### Core Principles

1. Test what users see and do
2. Avoid testing implementation details
3. Find elements the way users do (by text, label, role)

### Installation

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Basic Setup

```javascript
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

---

## Jest Basics

Jest is a JavaScript testing framework that works seamlessly with React.

### Test Structure

```javascript
describe('ComponentName', () => {
  test('does something', () => {
    // Arrange: Set up test data
    const value = 1 + 1;

    // Act: Perform the action
    const result = value;

    // Assert: Check the result
    expect(result).toBe(2);
  });

  it('does something else', () => {
    // 'it' is an alias for 'test'
    expect(true).toBeTruthy();
  });
});
```

### Common Matchers

```javascript
// Equality
expect(value).toBe(2);              // Strict equality (===)
expect(obj).toEqual({ a: 1 });      // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.3);     // Floating point

// Strings
expect(str).toMatch(/pattern/);
expect(str).toContain('substring');

// Arrays
expect(arr).toContain('item');
expect(arr).toHaveLength(3);

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('error message');
```

### Setup and Teardown

```javascript
describe('Component Tests', () => {
  beforeAll(() => {
    // Runs once before all tests
    console.log('Starting tests');
  });

  afterAll(() => {
    // Runs once after all tests
    console.log('All tests complete');
  });

  beforeEach(() => {
    // Runs before each test
    // Setup fresh state
  });

  afterEach(() => {
    // Runs after each test
    // Cleanup
  });

  test('example test', () => {
    expect(true).toBe(true);
  });
});
```

---

## Testing Components

### Basic Component Test

```jsx
// Button.jsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with role', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Testing Props

```jsx
// Greeting.jsx
function Greeting({ name, isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}

// Greeting.test.jsx
describe('Greeting', () => {
  test('shows welcome message when logged in', () => {
    render(<Greeting name="John" isLoggedIn={true} />);
    expect(screen.getByText('Welcome back, John!')).toBeInTheDocument();
  });

  test('shows login prompt when not logged in', () => {
    render(<Greeting name="John" isLoggedIn={false} />);
    expect(screen.getByText('Please log in')).toBeInTheDocument();
  });
});
```

### Querying Elements

```javascript
// Recommended Query Priority:
// 1. getByRole        - Accessible to screen readers
// 2. getByLabelText   - Form elements
// 3. getByPlaceholderText
// 4. getByText        - Non-interactive elements
// 5. getByDisplayValue
// 6. getByAltText     - Images
// 7. getByTitle
// 8. getByTestId      - Last resort

// Examples:
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Username');
screen.getByPlaceholderText('Enter email');
screen.getByText('Welcome');
screen.getByAltText('Profile picture');
screen.getByTestId('custom-element');

// Query variants:
getBy...    // Throws error if not found
queryBy...  // Returns null if not found
findBy...   // Async, waits for element (Promise)

// Multiple elements:
getAllBy...
queryAllBy...
findAllBy...
```

---

## Testing User Interactions

### Click Events

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Counter.jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Counter.test.jsx
test('increments counter on click', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole('button', { name: /increment/i });

  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  await user.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();

  await user.click(button);
  expect(screen.getByText('Count: 2')).toBeInTheDocument();
});
```

### Form Input

```jsx
// LoginForm.jsx
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

// LoginForm.test.jsx
test('submits form with user input', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<LoginForm onSubmit={handleSubmit} />);

  // Type in email
  await user.type(screen.getByLabelText('Email'), 'test@example.com');

  // Type in password
  await user.type(screen.getByLabelText('Password'), 'password123');

  // Click submit
  await user.click(screen.getByRole('button', { name: /login/i }));

  // Check if function was called with correct data
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

### Checkbox and Select

```jsx
test('handles checkbox', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);

  const checkbox = screen.getByRole('checkbox', { name: /agree/i });

  expect(checkbox).not.toBeChecked();
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('handles select', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);

  const select = screen.getByRole('combobox');

  await user.selectOptions(select, 'option2');
  expect(screen.getByRole('option', { name: 'Option 2' }).selected).toBe(true);
});
```

---

## Testing Async Code

### Waiting for Elements

```jsx
// UserProfile.jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>User: {user.name}</div>;
}

// UserProfile.test.jsx
test('loads and displays user', async () => {
  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: 'John Doe' })
    })
  );

  render(<UserProfile userId="123" />);

  // Initially shows loading
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for user to load
  expect(await screen.findByText('User: John Doe')).toBeInTheDocument();

  // Verify fetch was called
  expect(fetch).toHaveBeenCalledWith('/api/users/123');
});
```

### waitFor Utility

```jsx
import { waitFor } from '@testing-library/react';

test('data appears after delay', async () => {
  render(<DelayedComponent />);

  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});

// With options
await waitFor(
  () => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  },
  { timeout: 3000 } // Wait up to 3 seconds
);
```

### Mocking API Calls

```jsx
// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('handles API error', async () => {
  // Mock failed fetch
  fetch.mockRejectedValueOnce(new Error('API Error'));

  render(<DataComponent />);

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});

test('handles successful fetch', async () => {
  // Mock successful fetch
  fetch.mockResolvedValueOnce({
    json: async () => ({ data: 'test data' })
  });

  render(<DataComponent />);

  expect(await screen.findByText('test data')).toBeInTheDocument();
});
```

---

## Testing Hooks

### Custom Hook Testing

```jsx
// useCounter.js
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// useCounter.test.js
import { renderHook, act } from '@testing-library/react';

test('should use counter', () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);

  act(() => {
    result.current.decrement();
  });
  expect(result.current.count).toBe(0);

  act(() => {
    result.current.reset();
  });
  expect(result.current.count).toBe(0);
});

test('should use counter with initial value', () => {
  const { result } = renderHook(() => useCounter(10));

  expect(result.current.count).toBe(10);

  act(() => {
    result.current.reset();
  });
  expect(result.current.count).toBe(10);
});
```

### Testing Hook Dependencies

```jsx
test('should reset when initialValue changes', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    { initialProps: { initialValue: 0 } }
  );

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);

  // Change prop
  rerender({ initialValue: 10 });

  act(() => {
    result.current.reset();
  });
  expect(result.current.count).toBe(10);
});
```

---

## Best Practices

### 1. Test Behavior, Not Implementation

```jsx
// ❌ Bad - Tests internal state
test('sets loading to true', () => {
  const { result } = renderHook(() => useData());
  expect(result.current.loading).toBe(true);
});

// ✅ Good - Tests visible behavior
test('shows loading indicator', () => {
  render(<DataComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

### 2. Use Accessible Queries

```jsx
// ❌ Avoid
screen.getByTestId('submit-button');

// ✅ Prefer
screen.getByRole('button', { name: /submit/i });
```

### 3. Keep Tests Simple

```jsx
// ❌ Bad - Testing too much at once
test('complete user flow', async () => {
  // 50 lines of test code...
});

// ✅ Good - Focused tests
test('shows error for invalid email', () => {
  // Specific test for one thing
});

test('submits form with valid data', () => {
  // Specific test for another thing
});
```

### 4. Use Setup Functions

```jsx
describe('UserForm', () => {
  const renderForm = (props = {}) => {
    const defaultProps = {
      onSubmit: jest.fn(),
      initialData: {}
    };

    return render(<UserForm {...defaultProps} {...props} />);
  };

  test('renders form fields', () => {
    renderForm();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  test('calls onSubmit', async () => {
    const onSubmit = jest.fn();
    renderForm({ onSubmit });
    // ... test code
  });
});
```

### 5. Clean Up After Tests

```jsx
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});
```

### 6. Test Edge Cases

```jsx
describe('Counter', () => {
  test('handles normal increment', () => {
    // Normal case
  });

  test('handles max value', () => {
    // Edge case: maximum
  });

  test('handles min value', () => {
    // Edge case: minimum
  });

  test('handles rapid clicks', () => {
    // Edge case: multiple quick actions
  });
});
```

---

## Summary

### Key Takeaways

1. **Test user behavior**: Focus on what users see and do
2. **Use accessible queries**: Find elements the way users do
3. **Test integration**: Test components working together
4. **Handle async**: Use findBy queries and waitFor
5. **Mock external dependencies**: Control API responses
6. **Keep tests maintainable**: Simple, focused, readable

### Testing Checklist

- [ ] Render component successfully
- [ ] Display correct initial content
- [ ] Handle user interactions (click, type, etc.)
- [ ] Update UI based on state changes
- [ ] Handle async operations (loading, success, error)
- [ ] Validate form input
- [ ] Call callbacks with correct data
- [ ] Handle edge cases
- [ ] Accessible to screen readers

### Common Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test Button.test.jsx

# Run tests with coverage
npm test -- --coverage

# Update snapshots
npm test -- -u
```

### Tools and Libraries

- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: Simulate user interactions
- **@testing-library/jest-dom**: Custom matchers
- **MSW**: Mock Service Worker for API mocking

---

## Practice Exercises

The exercises in `02-exercises.jsx` will help you practice:

1. Basic component rendering tests
2. Testing user interactions
3. Form submission tests
4. Async data fetching
5. Error handling
6. Custom hook testing
7. Integration tests
8. Accessibility testing

Complete all exercises to master React testing!
