# Session 3: Hooks

## Learning Objectives
By the end of this session, you will:
1. Use useState for local state
2. Use useEffect for side effects
3. Use useMemo and useCallback for optimization
4. Use useRef for mutable values

---

## 1. useState

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## 2. useEffect

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <div>{seconds}s</div>;
}
```

---

## 3. useMemo and useCallback

```jsx
import { useMemo, useCallback } from "react";

const expensive = (n) => {
  let total = 0;
  for (let i = 0; i < n; i += 1) total += i;
  return total;
};

function Demo({ n }) {
  const value = useMemo(() => expensive(n), [n]);
  const handle = useCallback(() => console.log(value), [value]);
  return <button onClick={handle}>Log</button>;
}
```

---

## 4. useRef

```jsx
import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </div>
  );
}
```

---

## Summary
1. useState manages component state
2. useEffect runs side effects
3. useMemo and useCallback help with performance
4. useRef stores mutable values without re-rendering
