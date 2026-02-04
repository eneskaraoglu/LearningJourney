# Session 1: React Basics

## Learning Objectives
By the end of this session, you will:
1. Understand JSX and component structure
2. Render lists and conditionals
3. Handle basic events
4. Use props to pass data

---

## 1. What Is React?

React is a UI library for building component-based interfaces.

---

## 2. JSX Essentials

```jsx
const name = "Ada";

return <h1>Hello, {name}</h1>;
```

---

## 3. Components

```jsx
function Welcome() {
  return <p>Welcome to React</p>;
}

export default function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}
```

---

## 4. Props

```jsx
function Badge({ label }) {
  return <span>{label}</span>;
}

<Badge label="New" />
```

---

## 5. Lists

```jsx
const items = ["One", "Two", "Three"];

<ul>
  {items.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>
```

---

## 6. Conditionals

```jsx
const isLoggedIn = true;

return <div>{isLoggedIn ? "Welcome" : "Please log in"}</div>;
```

---

## 7. Events

```jsx
function Button() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

## Summary
1. JSX mixes HTML-like syntax with JavaScript
2. Components are reusable building blocks
3. Props pass data into components
4. Lists and conditionals render dynamic UI
