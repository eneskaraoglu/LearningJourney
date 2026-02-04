// useReducer, useRef, and Form Validation - Exercise Solutions

import { useReducer, useRef, useState } from "react";

/*
Exercise 1: useReducer Todo List
*/
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((t) => t !== action.payload);
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    dispatch({ type: "add", payload: text.trim() });
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t}>
            {t} <button onClick={() => dispatch({ type: "remove", payload: t })}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


/*
Exercise 2: useRef Focus
*/
function FocusInput() {
  const ref = useRef(null);
  return (
    <div>
      <input ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
    </div>
  );
}


/*
Exercise 3: Form Validation
*/
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isValid = email.includes("@") && password.length >= 8;

  return (
    <form>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button type="submit" disabled={!isValid}>Sign Up</button>
      {!isValid && <p>Enter a valid email and 8+ char password</p>}
    </form>
  );
}
