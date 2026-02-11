# React Starter Template

A clean, minimal React starter template using Vite for fast development.

## Features

- React 18
- Vite for blazing fast HMR
- Modern JavaScript (ES modules)
- Clean, organized structure
- Example component with styling
- Ready to extend

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone or copy this starter template
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is busy)

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
react-starter/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── styles.css       # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Customization

### Adding Components

Create new components in `src/`:

```jsx
// src/MyComponent.jsx
function MyComponent() {
  return <div>Hello from MyComponent!</div>
}

export default MyComponent
```

Use in App.jsx:

```jsx
import MyComponent from './MyComponent'

function App() {
  return (
    <div>
      <MyComponent />
    </div>
  )
}
```

### Adding Routing

Install React Router:

```bash
npm install react-router-dom
```

Update main.jsx:

```jsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

### Adding State Management

For Context API - already available in React!

For Zustand:
```bash
npm install zustand
```

For Redux Toolkit:
```bash
npm install @reduxjs/toolkit react-redux
```

### Adding UI Libraries

Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Material-UI:
```bash
npm install @mui/material @emotion/react @emotion/styled
```

Chakra UI:
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Environment Variables

Create `.env` file in project root:

```
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App
```

Access in code:

```jsx
const apiUrl = import.meta.env.VITE_API_URL
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)

## Next Steps

1. Customize the starter content in `App.jsx`
2. Add your own components
3. Install additional packages as needed
4. Build your application!

Happy coding!
