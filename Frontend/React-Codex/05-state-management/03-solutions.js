// State Management - Exercise Solutions

import { createContext, useContext, useReducer, useState } from "react";

/*
Exercise 1: Lift State
*/
function Preview({ text }) {
  return <p>{text}</p>;
}

function Parent() {
  const [text, setText] = useState("");
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <Preview text={text} />
    </div>
  );
}


/*
Exercise 2: Context
*/
const ThemeContext = createContext({ theme: "light", setTheme: () => {} });

function ThemeProvider() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeButton />
    </ThemeContext.Provider>
  );
}

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </button>
  );
}


/*
Exercise 3: useReducer
*/
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

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <button onClick={() => dispatch({ type: "dec" })}>-</button>
      <span> {state.count} </span>
      <button onClick={() => dispatch({ type: "inc" })}>+</button>
    </div>
  );
}
