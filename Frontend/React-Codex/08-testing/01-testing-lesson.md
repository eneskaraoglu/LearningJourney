# Session 8: Testing

## Learning Objectives
By the end of this session, you will:
1. Write basic component tests
2. Use React Testing Library queries
3. Test user interactions

---

## 1. Simple Render Test

```jsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders heading", () => {
  render(<App />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
```

---

## 2. User Interaction

```jsx
import userEvent from "@testing-library/user-event";

test("increments counter", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByRole("button", { name: "+" }));
  expect(screen.getByText("1")).toBeInTheDocument();
});
```

---

## Summary
1. Render components and assert visible output
2. Prefer queries by role and text
3. Simulate user actions with userEvent
