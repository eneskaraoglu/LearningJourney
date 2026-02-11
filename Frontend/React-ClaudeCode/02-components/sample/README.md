# React Components & Composition - Sample Project

This project demonstrates advanced component patterns and composition techniques in React.

## Concepts Demonstrated

- **Children Prop**: Flexible component wrapping
- **Prop Spreading**: Reusable component wrappers
- **Composition**: Building complex UIs from simple components
- **Conditional Rendering**: Dynamic content display
- **Compound Components**: Tabs component pattern
- **Presentational Components**: Pure display components
- **Layout Components**: Structural components

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

## Components Included

### Reusable Components
- **Card**: Flexible container with optional title
- **Button**: Multiple variants (primary, secondary, danger)
- **Badge**: Status indicators
- **Container**: Max-width wrapper

### Layout Components
- **PageHeader**: Page title and subtitle
- **Section**: Content sections with titles

### Feature Components
- **ProductCard**: Product display with image, price, stock status
- **StatCard**: Dashboard statistics card
- **NotificationList**: List of notifications with empty state

### Compound Components
- **Tabs**: Tab navigation with multiple panels

## Project Structure

```
sample/
├── src/
│   ├── App.jsx        # Main component with all examples
│   ├── main.jsx       # Entry point
│   └── styles.css     # Component styles
├── index.html
├── package.json
└── vite.config.js
```

## Exercises

Try these challenges:
1. Add a new variant to the Button component
2. Create a Modal component with children prop
3. Build a Grid layout component
4. Add more tabs to the Tabs component
5. Create a Form component composition

## Next Steps

Move on to Module 03 to learn about React Hooks (useState and useEffect) for adding state and side effects to components.
