// Hooks - Exercise Solutions

import { useEffect, useMemo, useRef, useState } from "react";

/*
Exercise 1: Counter
*/
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span> {count} </span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}


/*
Exercise 2: Toggle
*/
function ThemeToggle() {
  const [theme, setTheme] = useState("Light");
  return (
    <button onClick={() => setTheme((t) => (t === "Light" ? "Dark" : "Light"))}>
      {theme}
    </button>
  );
}


/*
Exercise 3: useEffect
*/
function MountLogger() {
  useEffect(() => {
    console.log("Mounted");
  }, []);
  return <div>Check console</div>;
}


/*
Exercise 4: useRef
*/
function FocusInput() {
  const inputRef = useRef(null);
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </div>
  );
}


/*
Exercise 5: useMemo
*/
const numbers = [1, 2, 3, 4, 5];

function Total() {
  const total = useMemo(() => numbers.reduce((a, b) => a + b, 0), []);
  return <div>Total: {total}</div>;
}
