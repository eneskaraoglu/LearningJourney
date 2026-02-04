# Session 9: Custom Hooks

## Learning Objectives
By the end of this session, you will:
1. Create reusable custom hooks
2. Encapsulate logic with hooks
3. Use hooks for local storage and toggles

---

## 1. Why Custom Hooks?

Custom hooks let you reuse stateful logic across components.

---

## 2. Example: useToggle

```jsx
import { useState } from "react";

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}
```

---

## 3. Example: useLocalStorage

```jsx
import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

---

## Summary
1. Custom hooks reuse logic cleanly
2. Hooks can wrap storage, events, and side effects
