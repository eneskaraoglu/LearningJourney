// Components & Composition - Solutions

// Exercise 1: Children Prop
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">{children}</div>
    </div>
  );
}

// Exercise 2: Layout Component
function Container({ children }) {
  return <div className="container">{children}</div>;
}

// Exercise 3: Button with Variants
function Button({ variant = "primary", children, ...rest }) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}

// Alternative with conditional classes
function ButtonAlt({ variant = "primary", children, ...rest }) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;

  return (
    <button className={`${baseClass} ${variantClass}`} {...rest}>
      {children}
    </button>
  );
}

// Exercise 4: Input Wrapper
function InputField({ label, error, ...rest }) {
  return (
    <div className="input-field">
      {label && <label>{label}</label>}
      <input {...rest} className={error ? 'input-error' : 'input'} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// Exercise 5: List with Empty State
function ItemList({ items, renderItem }) {
  if (!items || items.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <div className="item-list">
      {items.map((item, index) => (
        <div key={item.id || index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

// Exercise 6: Conditional Wrapper
function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">{children}</div>
    </div>
  );
}

// Alternative with && operator
function ModalAlt({ isOpen, children }) {
  return (
    isOpen && (
      <div className="modal-backdrop">
        <div className="modal-content">{children}</div>
      </div>
    )
  );
}

// Exercise 7: Composition Pattern
function UserCard({ user }) {
  return (
    <Card title={user.name}>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </Card>
  );
}

// Exercise 8: Flexible Component with Slots
function PageLayout({ header, sidebar, children }) {
  return (
    <div className="page-layout">
      <header className="page-header">{header}</header>
      <div className="page-body">
        <aside className="page-sidebar">{sidebar}</aside>
        <main className="page-main">{children}</main>
      </div>
    </div>
  );
}

// Complete Example: Putting it all together
function CompleteExample() {
  const user = {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer"
  };

  const items = [
    { id: 1, name: "Task 1", status: "completed" },
    { id: 2, name: "Task 2", status: "pending" },
    { id: 3, name: "Task 3", status: "in-progress" }
  ];

  return (
    <Container>
      <PageLayout
        header={<h1>Dashboard</h1>}
        sidebar={
          <nav>
            <Button variant="primary">Home</Button>
            <Button variant="secondary">Profile</Button>
            <Button variant="danger">Logout</Button>
          </nav>
        }
      >
        <UserCard user={user} />

        <Card title="Tasks">
          <ItemList
            items={items}
            renderItem={(item) => (
              <div>
                <strong>{item.name}</strong> - {item.status}
              </div>
            )}
          />
        </Card>

        <Card title="Add Task">
          <InputField
            label="Task Name"
            type="text"
            placeholder="Enter task name"
          />
          <InputField
            label="Priority"
            type="select"
            error="Priority is required"
          />
          <Button variant="primary">Add Task</Button>
        </Card>
      </PageLayout>
    </Container>
  );
}

// Key Takeaways:
// 1. Use children prop for flexible composition
// 2. Spread props (...rest) for reusable wrappers
// 3. Conditional rendering with &&, ternary, or early return
// 4. Default props for better API
// 5. Composition over complex single components

export {
  Card,
  Container,
  Button,
  ButtonAlt,
  InputField,
  ItemList,
  Modal,
  ModalAlt,
  UserCard,
  PageLayout,
  CompleteExample
};
