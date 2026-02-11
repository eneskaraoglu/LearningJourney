// Custom Hooks - Exercise Solutions

import { useEffect, useState } from "react";

/*
Exercise 1: useToggle
*/
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}

function ToggleDemo() {
  const [on, toggle] = useToggle(false);
  return <button onClick={toggle}>{on ? "On" : "Off"}</button>;
}


/*
Exercise 2: useLocalStorage
*/
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

function Username() {
  const [name, setName] = useLocalStorage("username", "");
  return (
    <input value={name} onChange={(e) => setName(e.target.value)} />
  );
}


/*
Exercise 3: useDebounce
*/
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
