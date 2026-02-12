# Session 13: Zustand and Error Boundaries

## Learning Objectives
By the end of this session, you will:
1. Use Zustand for global state
2. Create a store and update state
3. Use error boundaries for graceful failures

---

## 1. Zustand Store

```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: s.count - 1 }))
}));
```

---

## 2. Using the Store

```jsx
function Counter() {
  const { count, inc, dec } = useStore();
  return (
    <div>
      <button onClick={dec}>-</button>
      <span>{count}</span>
      <button onClick={inc}>+</button>
    </div>
  );
}
```

---

## 3. Error Boundaries

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

---

## Summary
1. Zustand is a lightweight global state library
2. Error boundaries prevent UI crashes

---

## Q&A

### 1) What is Zustand used for?
**Answer:** Lightweight global state management with simple store-based APIs.

### 2) Why are error boundaries important?
**Answer:** They prevent a component crash from taking down the entire app view.

### 3) What errors do error boundaries catch?
**Answer:** Rendering and lifecycle errors in descendant components, not event handler errors.

### 4) How does Zustand differ from Context-only state?
**Answer:** Zustand can reduce provider nesting and improve selective subscriptions.

### 5) What is a robust error handling strategy?
**Answer:** Catch errors, show fallback UI, log details, and provide recovery actions.
