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

---

## Q&A

### 1) Why use React Router?
**Answer:** It maps URLs to UI so users can navigate views in a single-page app.

### 2) What is a route parameter?
**Answer:** A dynamic segment in a path (like /users/:id) used to load route-specific data.

### 3) What is the difference between link navigation and full page reload?
**Answer:** Router links update UI client-side without refreshing the whole page.

### 4) Why are nested routes useful?
**Answer:** They let related layouts and pages share structure while rendering child content.

### 5) What is protected routing?
**Answer:** It conditionally allows access to certain routes based on auth or permissions.
