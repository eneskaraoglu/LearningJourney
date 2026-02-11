# React Testing Sample Project

A comprehensive demonstration of testing React components using React Testing Library and Vitest.

## Features

This sample project demonstrates testing various React patterns:

- **Button Component**: Basic component rendering and event handling
- **Counter Component**: State updates and user interactions
- **Greeting Component**: Conditional rendering based on props
- **LoginForm Component**: Form handling and validation
- **UserProfile Component**: Async data fetching with loading and error states
- **TodoList Component**: Complex integration testing with multiple interactions
- **SearchBox Component**: Debounced search functionality

## Technologies

- **React 18.2.0**: UI library
- **Vite 5.0.8**: Build tool and dev server
- **Vitest 1.1.0**: Testing framework
- **React Testing Library 14.1.2**: Component testing utilities
- **@testing-library/user-event 14.5.1**: User interaction simulation
- **@testing-library/jest-dom 6.1.5**: Custom matchers for DOM assertions

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Testing Patterns Demonstrated

### 1. Basic Component Testing

```javascript
it('renders with children text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

### 2. User Interaction Testing

```javascript
it('calls onClick handler when clicked', async () => {
  const handleClick = vi.fn()
  const user = userEvent.setup()

  render(<Button onClick={handleClick}>Click me</Button>)
  await user.click(screen.getByText('Click me'))

  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### 3. State Updates

```javascript
it('increments count when Increment button is clicked', async () => {
  const user = userEvent.setup()
  render(<Counter />)

  await user.click(screen.getByText('Increment'))
  expect(screen.getByText('Counter: 1')).toBeInTheDocument()
})
```

### 4. Conditional Rendering

```javascript
it('shows login message when not logged in', () => {
  render(<Greeting isLoggedIn={false} />)
  expect(screen.getByText('Please log in')).toBeInTheDocument()
})
```

### 5. Form Testing

```javascript
it('updates input values when typing', async () => {
  const user = userEvent.setup()
  render(<LoginForm onSubmit={vi.fn()} />)

  const input = screen.getByLabelText('Username:')
  await user.type(input, 'testuser')

  expect(input).toHaveValue('testuser')
})
```

### 6. Async Operations

```javascript
it('loads and displays user data', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ name: 'John Doe' })
  })

  render(<UserProfile userId={1} />)
  await user.click(screen.getByText('Load User'))

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
```

### 7. Integration Testing

```javascript
it('adds and deletes todos', async () => {
  const user = userEvent.setup()
  render(<TodoList />)

  await user.type(screen.getByTestId('todo-input'), 'Test todo')
  await user.click(screen.getByText('Add'))
  expect(screen.getByText('Test todo')).toBeInTheDocument()

  await user.click(screen.getByText('Delete'))
  expect(screen.queryByText('Test todo')).not.toBeInTheDocument()
})
```

## Testing Best Practices

### 1. Query Priority

Use queries in this order of preference:

1. **getByRole**: Most accessible queries
2. **getByLabelText**: Good for form fields
3. **getByText**: For non-interactive content
4. **getByTestId**: Last resort when other queries don't work

### 2. User-Event vs FireEvent

Always prefer `userEvent` over `fireEvent`:

```javascript
// ✅ Good - Simulates real user interaction
const user = userEvent.setup()
await user.click(button)

// ❌ Avoid - Lower-level API
fireEvent.click(button)
```

### 3. Async Testing

Use `waitFor` for async operations:

```javascript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})
```

### 4. Accessibility

Test with roles and labels:

```javascript
expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
expect(screen.getByLabelText('Email:')).toBeInTheDocument()
```

### 5. Data Test IDs

Use `data-testid` as a last resort:

```javascript
<div data-testid="user-profile">...</div>
expect(screen.getByTestId('user-profile')).toBeInTheDocument()
```

## Test Structure

Each test file follows this structure:

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Component Name', () => {
  beforeEach(() => {
    // Setup before each test
  })

  it('does something', async () => {
    // Arrange
    const user = userEvent.setup()
    const mockFn = vi.fn()

    // Act
    render(<Component prop={mockFn} />)
    await user.click(screen.getByText('Click'))

    // Assert
    expect(mockFn).toHaveBeenCalled()
  })
})
```

## Common Testing Utilities

### Queries

- `getByText`: Find element by text content
- `getByRole`: Find element by ARIA role
- `getByLabelText`: Find form element by label
- `getByPlaceholderText`: Find input by placeholder
- `getByTestId`: Find element by data-testid attribute

### Variants

- `getBy*`: Throws error if not found
- `queryBy*`: Returns null if not found
- `findBy*`: Returns promise, waits for element

### Multiple Elements

- `getAllBy*`: Returns array
- `queryAllBy*`: Returns array, empty if not found
- `findAllBy*`: Returns promise of array

## Mocking

### Mock Functions

```javascript
const handleClick = vi.fn()
expect(handleClick).toHaveBeenCalledTimes(1)
expect(handleClick).toHaveBeenCalledWith(expectedValue)
```

### Mock Fetch

```javascript
global.fetch = vi.fn()
global.fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: 'value' })
})
```

### Mock Timers

```javascript
vi.useFakeTimers()
vi.advanceTimersByTime(1000)
vi.useRealTimers()
```

## Coverage

Run tests with coverage to see which parts of your code are tested:

```bash
npm run test:coverage
```

This generates a coverage report showing:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

## Project Structure

```
sample/
├── src/
│   ├── test/
│   │   └── setup.js          # Test configuration
│   ├── App.jsx               # All components
│   ├── App.test.jsx          # All tests
│   ├── main.jsx              # Entry point
│   └── styles.css            # Styling
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Learning Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Vitest Docs](https://vitest.dev/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Tips

1. **Test behavior, not implementation**: Focus on what users see and do
2. **Avoid testing implementation details**: Don't test internal state or methods
3. **Keep tests simple**: One assertion per test when possible
4. **Use descriptive test names**: Clearly state what is being tested
5. **Setup and cleanup**: Use beforeEach and afterEach for common operations
6. **Mock external dependencies**: API calls, timers, etc.
7. **Test edge cases**: Empty states, errors, loading states
8. **Maintain accessibility**: Use semantic HTML and ARIA roles

## Next Steps

After mastering this sample:

1. Add tests for your own components
2. Practice testing custom hooks
3. Learn snapshot testing
4. Explore testing context providers
5. Study testing with React Router
6. Test components with complex state management

Happy Testing!
