# Session 4: Routing

## Learning Objectives
By the end of this session, you will:
1. Set up routes with React Router
2. Navigate with Link
3. Use route params
4. Create nested routes

---

## 1. Basic Setup

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 2. Links

```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```

---

## 3. Route Params

```jsx
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <div>User {id}</div>;
}
```

---

## 4. Nested Routes

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="settings" element={<Settings />} />
</Route>
```

---

## Summary
1. Routes map paths to components
2. Link handles navigation
3. Params pass URL data into components
