// Testing - Exercise Solutions

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/*
Exercise 1: Render Test
*/
function Heading() {
  return <h1>Welcome</h1>;
}

test("renders heading", () => {
  render(<Heading />);
  expect(screen.getByText("Welcome")).toBeInTheDocument();
});


/*
Exercise 2: Button Click
*/
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

test("increments counter", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByRole("button"));
  expect(screen.getByText("1")).toBeInTheDocument();
});


/*
Exercise 3: Form Input
*/
function NameInput() {
  const [value, setValue] = useState("");
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-label="name"
    />
  );
}

test("updates input value", async () => {
  const user = userEvent.setup();
  render(<NameInput />);
  const input = screen.getByLabelText("name");
  await user.type(input, "Ada");
  expect(input).toHaveValue("Ada");
});
