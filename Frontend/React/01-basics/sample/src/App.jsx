// React Basics Sample App
// This demonstrates all the concepts from the lesson

// Simple component
function Header() {
  return <h1>React Basics Demo</h1>;
}

// Component with props
function UserCard({ name, email, role }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}

// Conditional rendering
function Status({ isOnline }) {
  return (
    <div className="status">
      {isOnline ? (
        <span className="online">● Online</span>
      ) : (
        <span className="offline">● Offline</span>
      )}
    </div>
  );
}

// List rendering
function TodoList({ todos }) {
  return (
    <div className="todo-section">
      <h2>My Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Event handling
function InteractiveButton() {
  const handleClick = () => {
    alert('Hello from React!');
  };

  const handleHover = () => {
    console.log('Mouse entered the button!');
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleHover}
      className="interactive-btn"
    >
      Click Me!
    </button>
  );
}

// Main App component
function App() {
  // Sample data
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Developer" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer" },
    { id: 3, name: "Carol White", email: "carol@example.com", role: "Manager" }
  ];

  const todos = [
    { id: 1, text: "Learn React basics", completed: true },
    { id: 2, text: "Build a sample project", completed: true },
    { id: 3, text: "Master React hooks", completed: false },
    { id: 4, text: "Create a portfolio", completed: false }
  ];

  return (
    <div className="app">
      <Header />

      <section className="intro">
        <p>Welcome to React! This demo shows basic concepts:</p>
        <ul>
          <li>Components and Props</li>
          <li>Conditional Rendering</li>
          <li>List Rendering</li>
          <li>Event Handling</li>
        </ul>
      </section>

      <section className="users-section">
        <h2>Team Members</h2>
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id}>
              <UserCard name={user.name} email={user.email} role={user.role} />
              <Status isOnline={user.id === 1} />
            </div>
          ))}
        </div>
      </section>

      <TodoList todos={todos} />

      <section className="interaction-section">
        <h2>Try It Out</h2>
        <InteractiveButton />
      </section>

      <footer>
        <p>Open the console to see event logs!</p>
      </footer>
    </div>
  );
}

export default App;
