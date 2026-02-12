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

---

## Q&A

### 1) Why create a custom hook?
**Answer:** To reuse stateful logic across components without duplicating code.

### 2) What should a custom hook return?
**Answer:** A minimal API (state + actions) that hides internal implementation details.

### 3) Can custom hooks call other hooks?
**Answer:** Yes, as long as hooks rules are followed.

### 4) How do you name custom hooks?
**Answer:** Start with use (for example, useFetchUsers).

### 5) What is a good custom hook design principle?
**Answer:** Keep hooks focused on one responsibility and easy to test.
