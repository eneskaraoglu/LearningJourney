# Session 10: useReducer, useRef, and Form Validation

## Learning Objectives
By the end of this session, you will:
1. Use useReducer for complex state
2. Use useRef for DOM access and mutable values
3. Build and validate a controlled form

---

## 1. useReducer

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((x) => x !== action.payload);
    default:
      return state;
  }
}
```

---

## 2. useRef

```jsx
import { useRef } from "react";

function FocusInput() {
  const ref = useRef(null);
  return (
    <div>
      <input ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
    </div>
  );
}
```

---

## 3. Form Validation

```jsx
const isValid = email.includes("@") && password.length >= 8;
```

---

## Summary
1. useReducer helps manage structured state
2. useRef targets DOM elements
3. Validation improves form quality

---

## Q&A

### 1) When is useReducer better than useState?
**Answer:** When state transitions are complex, related, or driven by many action types.

### 2) What is the purpose of useRef?
**Answer:** Store mutable values or DOM references without triggering re-renders.

### 3) Why model reducer updates as actions?
**Answer:** Actions keep updates explicit, traceable, and easier to debug.

### 4) What is the value of form validation architecture?
**Answer:** It centralizes rules and improves consistency across fields.

### 5) How do reducer and validation work together?
**Answer:** Reducers manage form state transitions while validation derives errors from current state.
