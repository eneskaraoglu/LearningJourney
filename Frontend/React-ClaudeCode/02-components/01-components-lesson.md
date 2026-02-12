# Components & Composition

## Component Composition

Component composition is the practice of building complex UIs by combining smaller, reusable components. This is a core principle in React.

### The Children Prop

The `children` prop is special - it represents the content between component opening and closing tags:

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <h2>Title</h2>
  <p>Content goes here</p>
</Card>
```

### Container Components

Create wrapper components that provide structure:

```jsx
function Container({ children }) {
  return <div className="container max-width">{children}</div>;
}

function Page() {
  return (
    <Container>
      <Header />
      <MainContent />
      <Footer />
    </Container>
  );
}
```

## Component Patterns

### Presentational vs Container Components

**Presentational Components** (Dumb/Stateless):
- Focus on how things look
- Receive data via props
- Don't manage state
- Reusable and simple

```jsx
function UserProfile({ user }) {
  return (
    <div className="profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}
```

**Container Components** (Smart/Stateful):
- Focus on how things work
- Manage state and logic
- Pass data to presentational components
- Handle data fetching

```jsx
function UserProfileContainer({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <UserProfile user={user} /> : <Loading />;
}
```

### Compound Components

Components that work together to form a complete UI:

```jsx
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        })
      )}
    </div>
  );
}

function Tab({ isActive, onClick, children }) {
  return (
    <button className={isActive ? 'active' : ''} onClick={onClick}>
      {children}
    </button>
  );
}

// Usage
<Tabs>
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
  <Tab>Tab 3</Tab>
</Tabs>
```

## Props Patterns

### Default Props

Provide fallback values for props:

```jsx
function Button({ text = "Click me", variant = "primary" }) {
  return <button className={`btn btn-${variant}`}>{text}</button>;
}
```

### Prop Spreading

Pass all props to a child component:

```jsx
function Input(props) {
  return <input className="custom-input" {...props} />;
}

// Usage - all props are passed through
<Input type="email" placeholder="Enter email" required />
```

### Rest Props

Separate specific props from the rest:

```jsx
function Button({ variant, children, ...rest }) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}
```

### Render Props Pattern

Pass a function as a prop to control rendering:

```jsx
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData);
  }, [url]);

  return render(data);
}

// Usage
<DataFetcher
  url="/api/users"
  render={(data) => data ? <UserList users={data} /> : <Loading />}
/>
```

## Component Organization

### File Structure

```
components/
├── common/          # Shared components
│   ├── Button.jsx
│   ├── Input.jsx
│   └── Card.jsx
├── layout/          # Layout components
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Sidebar.jsx
└── features/        # Feature-specific
    ├── UserProfile.jsx
    └── ProductCard.jsx
```

### Naming Conventions

- **PascalCase** for component names: `UserProfile`, `NavBar`
- **camelCase** for props and handlers: `onClick`, `isActive`
- **Descriptive names**: `SubmitButton` not `Button1`
- **Prefix handlers** with `handle`: `handleClick`, `handleSubmit`

## Styling Approaches

### Inline Styles

```jsx
function Box() {
  const style = {
    backgroundColor: 'blue',
    padding: '20px',
    borderRadius: '8px'
  };

  return <div style={style}>Content</div>;
}
```

### CSS Modules (Scoped CSS)

```jsx
// Button.module.css
.button {
  padding: 10px 20px;
  background: blue;
}

// Button.jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click</button>;
}
```

### Conditional Classes

```jsx
function Button({ primary, disabled }) {
  const classes = [
    'btn',
    primary && 'btn-primary',
    disabled && 'btn-disabled'
  ].filter(Boolean).join(' ');

  return <button className={classes}>Click</button>;
}
```

## Props Validation

Use PropTypes for runtime validation (or TypeScript):

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email }) {
  return (/* ... */);
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string.isRequired
};

UserCard.defaultProps = {
  age: 0
};
```

## Best Practices

1. **Keep components small** - Single responsibility
2. **Reuse components** - DRY principle
3. **Props over state** - Prefer controlled components
4. **Composition over inheritance** - Use composition patterns
5. **Meaningful names** - Clear, descriptive component names
6. **Consistent structure** - Follow team conventions

## Summary

- **Composition** builds complex UIs from simple components
- **children prop** enables flexible component wrapping
- **Presentational components** handle display
- **Container components** handle logic and state
- **Props patterns** (default, spreading, rest) improve flexibility
- **Component organization** keeps code maintainable
- **Styling approaches** range from inline to CSS modules

## Next Steps

In the next module, we'll learn about React Hooks (useState, useEffect) to add state and side effects to functional components.

---

## Q&A

### 1) Why split UI into components?
**Answer:** Components improve reuse, readability, and maintainability by isolating responsibilities.

### 2) What makes a good component boundary?
**Answer:** A boundary is good when one component has one clear responsibility and a stable public API.

### 3) When should a component receive data via props?
**Answer:** Use props when data is owned by a parent and only needs to be read by the child.

### 4) What is component composition?
**Answer:** Composition means building larger UIs by combining smaller components together.

### 5) Why avoid very large components?
**Answer:** Large components are harder to test, reason about, and reuse.
