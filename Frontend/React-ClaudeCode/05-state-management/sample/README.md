# State Management - Sample Project

This project demonstrates state management patterns in React, including lifting state up and using Context API.

## Concepts Demonstrated

- **Lifting State Up**: Temperature converter shows how sibling components share state
- **Context API**: Theme and shopping cart use Context to avoid prop drilling
- **Provider Pattern**: ThemeProvider and CartProvider manage global state
- **useContext Hook**: Components consume context without prop drilling
- **Multiple Contexts**: Different contexts for different concerns

## Features

### 1. Theme Switcher
- Light/Dark mode toggle
- Context-based theme management
- All components respond to theme changes

### 2. Shopping Cart
- Add products to cart
- Remove items from cart
- Calculate total price
- Cart state shared across components
- Context-based cart management

### 3. Temperature Converter
- Live Celsius to Fahrenheit conversion
- Demonstrates lifting state up
- Shared state between sibling components

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser to http://localhost:5173

## Project Structure

```
sample/
├── src/
│   ├── App.jsx        # Main app with all contexts and components
│   ├── main.jsx       # Entry point
│   └── styles.css     # Styling with theme support
├── index.html
├── package.json
└── vite.config.js
```

## Key Patterns

### Context Creation
```jsx
const ThemeContext = createContext();
```

### Provider Component
```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Consuming Context
```jsx
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme('dark')}>{theme}</button>;
}
```

## When to Use What

- **Local State**: Component-specific data (useState)
- **Lifted State**: Shared between siblings (lift to common parent)
- **Context**: Deeply nested or global data (theme, auth, cart)
- **External Library**: Complex state logic (Redux, Zustand - later modules)

## Next Steps

Move on to Module 06 to learn about data fetching and form handling with React.
