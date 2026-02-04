# Session 5: State Management

## Learning Objectives
By the end of this session, you will:
1. Lift state up between components
2. Use Context for shared state
3. Use useReducer for complex updates

---

## 1. Lifting State Up

```jsx
function Parent() {
  const [value, setValue] = useState("");
  return <Child value={value} onChange={setValue} />;
}
```

---

## 2. Context

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme("dark")}>{theme}</button>;
}
```

---

## 3. useReducer

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

---

## Summary
1. Lift state for shared data
2. Context avoids prop drilling
3. useReducer helps manage complex state
