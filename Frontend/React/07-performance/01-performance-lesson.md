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
