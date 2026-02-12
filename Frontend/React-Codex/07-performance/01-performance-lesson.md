# Session 7: Performance

## Learning Objectives
By the end of this session, you will:
1. Use React.memo to prevent unnecessary renders
2. Use useMemo and useCallback strategically
3. Apply code splitting with lazy and Suspense

---

## 1. React.memo

```jsx
const Item = React.memo(function Item({ value }) {
  return <li>{value}</li>;
});
```

---

## 2. useMemo and useCallback

```jsx
const value = useMemo(() => compute(data), [data]);
const onClick = useCallback(() => handle(value), [value]);
```

---

## 3. Code Splitting

```jsx
import { lazy, Suspense } from "react";

const Settings = lazy(() => import("./Settings"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Settings />
    </Suspense>
  );
}
```

---

## Summary
1. Memoize expensive computations and stable callbacks
2. Use React.memo for pure components
3. Lazy load heavy routes or components

---

## Q&A

### 1) What causes unnecessary re-renders?
**Answer:** Changing props/state references and parent re-renders that cascade to children.

### 2) When is React.memo useful?
**Answer:** For pure components that receive the same props frequently.

### 3) Why use useMemo and useCallback carefully?
**Answer:** They can reduce expensive recalculation but add complexity if overused.

### 4) How does list virtualization improve performance?
**Answer:** It renders only visible items instead of the full list.

### 5) What should guide performance optimization?
**Answer:** Measure first, optimize bottlenecks second, and keep code maintainable.
