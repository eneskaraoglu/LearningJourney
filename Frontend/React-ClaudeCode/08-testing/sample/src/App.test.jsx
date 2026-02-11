import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Button,
  Counter,
  Greeting,
  LoginForm,
  UserProfile,
  TodoList,
  SearchBox,
} from './App'

// ============================================================================
// Button Component Tests
// ============================================================================
describe('Button Component', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })

  it('applies correct variant class', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByTestId('button')).toHaveClass('btn-primary')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByTestId('button')).toHaveClass('btn-secondary')
  })
})

// ============================================================================
// Counter Component Tests
// ============================================================================
describe('Counter Component', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />)
    expect(screen.getByText('Counter: 0')).toBeInTheDocument()
  })

  it('increments count when Increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByText('Increment'))
    expect(screen.getByText('Counter: 1')).toBeInTheDocument()

    await user.click(screen.getByText('Increment'))
    expect(screen.getByText('Counter: 2')).toBeInTheDocument()
  })

  it('decrements count when Decrement button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByText('Decrement'))
    expect(screen.getByText('Counter: -1')).toBeInTheDocument()
  })

  it('resets count to 0 when Reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByText('Increment'))
    await user.click(screen.getByText('Increment'))
    expect(screen.getByText('Counter: 2')).toBeInTheDocument()

    await user.click(screen.getByText('Reset'))
    expect(screen.getByText('Counter: 0')).toBeInTheDocument()
  })
})

// ============================================================================
// Greeting Component Tests
// ============================================================================
describe('Greeting Component', () => {
  it('shows login message when not logged in', () => {
    render(<Greeting isLoggedIn={false} />)
    expect(screen.getByText('Please log in')).toBeInTheDocument()
  })

  it('shows welcome message when logged in with name', () => {
    render(<Greeting name="John" isLoggedIn={true} />)
    expect(screen.getByText('Welcome, John!')).toBeInTheDocument()
  })

  it('shows Guest when logged in without name', () => {
    render(<Greeting isLoggedIn={true} />)
    expect(screen.getByText('Welcome, Guest!')).toBeInTheDocument()
  })

  it('uses testid for reliable selection', () => {
    render(<Greeting isLoggedIn={false} />)
    expect(screen.getByTestId('greeting')).toBeInTheDocument()
  })
})

// ============================================================================
// LoginForm Component Tests
// ============================================================================
describe('LoginForm Component', () => {
  it('renders form with username and password inputs', () => {
    render(<LoginForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText('Username:')).toBeInTheDocument()
    expect(screen.getByLabelText('Password:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument()
  })

  it('updates input values when typing', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)

    const usernameInput = screen.getByLabelText('Username:')
    const passwordInput = screen.getByLabelText('Password:')

    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'password123')

    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('password123')
  })

  it('shows error when submitting with empty fields', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<LoginForm onSubmit={handleSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Log In' }))

    expect(screen.getByText('Both fields are required')).toBeInTheDocument()
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('shows error when password is too short', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<LoginForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Username:'), 'testuser')
    await user.type(screen.getByLabelText('Password:'), '12345')
    await user.click(screen.getByRole('button', { name: 'Log In' }))

    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with correct data when form is valid', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<LoginForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Username:'), 'testuser')
    await user.type(screen.getByLabelText('Password:'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Log In' }))

    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('clears error when correcting input', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)

    // Trigger error
    await user.click(screen.getByRole('button', { name: 'Log In' }))
    expect(screen.getByRole('alert')).toBeInTheDocument()

    // Fix by entering valid data
    await user.type(screen.getByLabelText('Username:'), 'testuser')
    await user.type(screen.getByLabelText('Password:'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Log In' }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

// ============================================================================
// UserProfile Component Tests (Async)
// ============================================================================
describe('UserProfile Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn()
  })

  it('shows no user selected message when userId is not provided', () => {
    render(<UserProfile userId={null} />)
    expect(screen.getByText('No user selected')).toBeInTheDocument()
  })

  it('shows Load User button initially', () => {
    render(<UserProfile userId={1} />)
    expect(screen.getByText('Load User')).toBeInTheDocument()
  })

  it('loads and displays user data when button is clicked', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'johndoe.com',
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    })

    const user = userEvent.setup()
    render(<UserProfile userId={1} />)

    await user.click(screen.getByText('Load User'))

    // Check loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument()

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    expect(screen.getByText('johndoe.com')).toBeInTheDocument()
  })

  it('shows error message when fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    })

    const user = userEvent.setup()
    render(<UserProfile userId={1} />)

    await user.click(screen.getByText('Load User'))

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })

    expect(screen.getByText(/Failed to fetch user/)).toBeInTheDocument()
  })

  it('handles network errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    const user = userEvent.setup()
    render(<UserProfile userId={1} />)

    await user.click(screen.getByText('Load User'))

    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument()
    })
  })
})

// ============================================================================
// TodoList Component Tests (Integration)
// ============================================================================
describe('TodoList Component', () => {
  it('renders empty todo list initially', () => {
    render(<TodoList />)

    expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    expect(screen.getByTestId('todo-items')).toBeEmptyDOMElement()
  })

  it('adds a new todo when Add button is clicked', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    await user.type(input, 'Buy groceries')
    await user.click(screen.getByText('Add'))

    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('adds todo when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    await user.type(input, 'Learn React{Enter}')

    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })

  it('does not add empty todos', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    await user.click(screen.getByText('Add'))

    expect(screen.getByTestId('todo-items')).toBeEmptyDOMElement()
  })

  it('toggles todo completion', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    // Add a todo
    await user.type(screen.getByTestId('todo-input'), 'Test todo')
    await user.click(screen.getByText('Add'))

    // Get the checkbox (there will be only one)
    const checkbox = screen.getByRole('checkbox')
    const todoText = screen.getByText('Test todo')

    expect(checkbox).not.toBeChecked()
    expect(todoText).not.toHaveStyle({ textDecoration: 'line-through' })

    // Toggle completion
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(todoText).toHaveStyle({ textDecoration: 'line-through' })
  })

  it('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    // Add a todo
    await user.type(screen.getByTestId('todo-input'), 'Delete me')
    await user.click(screen.getByText('Add'))

    expect(screen.getByText('Delete me')).toBeInTheDocument()

    // Delete it
    await user.click(screen.getByText('Delete'))

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
  })

  it('shows correct todo count', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    // Add multiple todos
    const input = screen.getByTestId('todo-input')

    await user.type(input, 'Todo 1{Enter}')
    await user.type(input, 'Todo 2{Enter}')
    await user.type(input, 'Todo 3{Enter}')

    expect(screen.getByTestId('todo-count')).toHaveTextContent('3 of 3 todos remaining')

    // Complete one todo
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    expect(screen.getByTestId('todo-count')).toHaveTextContent('2 of 3 todos remaining')
  })

  it('handles multiple todos correctly', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    const input = screen.getByTestId('todo-input')

    // Add three todos
    await user.type(input, 'First{Enter}')
    await user.type(input, 'Second{Enter}')
    await user.type(input, 'Third{Enter}')

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()

    // Complete second todo
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[1])

    // Delete first todo
    const deleteButtons = screen.getAllByText('Delete')
    await user.click(deleteButtons[0])

    // Verify state
    expect(screen.queryByText('First')).not.toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })
})

// ============================================================================
// SearchBox Component Tests
// ============================================================================
describe('SearchBox Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders search input', () => {
    render(<SearchBox />)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

  it('updates input value when typing', async () => {
    const user = userEvent.setup({ delay: null })
    render(<SearchBox />)

    const input = screen.getByTestId('search-input')
    await user.type(input, 'react')

    expect(input).toHaveValue('react')
  })

  it('calls onSearch callback when search is performed', async () => {
    const mockResults = [
      { id: 1, title: 'React Post 1' },
      { id: 2, title: 'React Post 2' },
    ]

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResults,
    })

    const handleSearch = vi.fn()
    const user = userEvent.setup({ delay: null })

    render(<SearchBox onSearch={handleSearch} />)

    const input = screen.getByTestId('search-input')
    await user.type(input, 'react')

    // Fast-forward timers for debounce
    vi.advanceTimersByTime(300)

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('react', mockResults)
    })
  })

  it('does not search with empty query', async () => {
    const user = userEvent.setup({ delay: null })
    render(<SearchBox />)

    const input = screen.getByTestId('search-input')
    await user.type(input, '   ')

    vi.advanceTimersByTime(300)

    expect(global.fetch).not.toHaveBeenCalled()
  })
})
