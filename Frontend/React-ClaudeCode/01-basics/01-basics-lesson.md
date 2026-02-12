# React Basics

## What is React?

React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage application state efficiently.

**Key Concepts:**
- **Components**: Reusable pieces of UI
- **JSX**: JavaScript syntax extension that looks like HTML
- **Props**: Data passed from parent to child components
- **State**: Data that changes over time within a component

## JSX Fundamentals

JSX lets you write HTML-like syntax in JavaScript:

```jsx
const element = <h1>Hello, React!</h1>;
```

**JSX Rules:**
1. Must return a single parent element (use fragments `<>...</>` if needed)
2. Use `className` instead of `class`
3. Use camelCase for attributes (e.g., `onClick`, `backgroundColor`)
4. JavaScript expressions go in curly braces `{}`

```jsx
const name = "World";
const element = <h1>Hello, {name}!</h1>;
```

## Components

Components are the building blocks of React apps. There are two types:

### Function Components (Modern approach)

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Arrow Function Components

```jsx
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};
```

## Props

Props (properties) let you pass data to components:

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="Alice" />
```

**Props are:**
- Read-only (immutable)
- Passed from parent to child
- Can be any JavaScript value (strings, numbers, objects, functions)

### Destructuring Props

```jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
```

## Rendering Lists

Use `.map()` to render arrays:

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Important:** Always provide a unique `key` prop when rendering lists.

## Conditional Rendering

### Using && operator

```jsx
function Welcome({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn && <h1>Welcome back, {username}!</h1>}
    </div>
  );
}
```

### Using ternary operator

```jsx
function Status({ isActive }) {
  return (
    <div>
      Status: {isActive ? 'Active' : 'Inactive'}
    </div>
  );
}
```

## Events

Handle events with camelCase event handlers:

```jsx
function Button() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

**Common events:**
- `onClick` - button clicks
- `onChange` - input changes
- `onSubmit` - form submission
- `onMouseEnter`, `onMouseLeave` - mouse events

## Creating a React App

### Using Vite (Recommended)

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── src/
│   ├── App.jsx      # Main component
│   ├── main.jsx     # Entry point
│   └── styles.css   # Styles
├── index.html       # HTML template
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## Summary

- React uses **components** to build UIs
- **JSX** allows HTML-like syntax in JavaScript
- **Props** pass data from parent to child (immutable)
- Use `.map()` for lists (with unique `key`)
- Use `&&` or ternary for conditional rendering
- Handle events with camelCase handlers (`onClick`, `onChange`)

## Next Steps

Practice creating components, passing props, and rendering dynamic content. In the next module, we'll dive deeper into component composition and styling.

---

## Q&A

### 1) What is the main idea behind React?
**Answer:** Build UIs as reusable components that manage their own state and can be composed together.

### 2) Why do we use JSX?
**Answer:** JSX makes component UI easier to read and write by combining markup-like syntax with JavaScript expressions.

### 3) What is the difference between props and state?
**Answer:** Props are read-only inputs from a parent; state is internal data a component can update.

### 4) Why is key important in lists?
**Answer:** key helps React identify which items changed, were added, or removed for efficient re-rendering.

### 5) How are events handled in React?
**Answer:** Events use camelCase props like onClick, and handlers are passed as functions.
