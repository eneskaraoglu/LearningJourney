# React Router - Navigation and Routing

## What is React Router?

React Router is the standard routing library for React. It enables navigation between different views or pages in your React application, manages browser history, and keeps the UI in sync with the URL.

**Key Benefits:**
- Dynamic routing based on URL
- Browser history management
- Nested routes for complex layouts
- Programmatic navigation
- URL parameters and query strings

## Installation

```bash
npm install react-router-dom
```

## Basic Setup

### BrowserRouter

Wrap your app with `BrowserRouter` to enable routing:

```jsx
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### Routes and Route

Define routes using `Routes` and `Route` components:

```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
```

## Navigation

### Link Component

Use `Link` instead of `<a>` tags for client-side navigation:

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

**Why Link over `<a>`?**
- Prevents page reload
- Maintains application state
- Faster navigation
- Better user experience

### NavLink Component

`NavLink` is like `Link` but can style active links:

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black'
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

## URL Parameters

### Dynamic Routes

```jsx
<Routes>
  <Route path="/users/:userId" element={<UserProfile />} />
  <Route path="/products/:productId" element={<Product />} />
  <Route path="/blog/:category/:postId" element={<BlogPost />} />
</Routes>
```

### useParams Hook

Access URL parameters in your components:

```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}
```

**Example with data fetching:**

```jsx
function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(setProduct);
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
```

## Nested Routes

Create layouts with nested content:

```jsx
import { Routes, Route, Outlet } from 'react-router-dom';

// Layout component
function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/billing">Billing</Link>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}

// Route configuration
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="billing" element={<Billing />} />
      </Route>
    </Routes>
  );
}
```

### Index Routes

Default route for a parent path:

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

Now `/dashboard` renders `DashboardHome` inside `DashboardLayout`.

## Programmatic Navigation

### useNavigate Hook

Navigate programmatically in response to events:

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic
    navigate('/dashboard');
  };

  const goBack = () => {
    navigate(-1); // Go back one page
  };

  const goForward = () => {
    navigate(1); // Go forward one page
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <button type="button" onClick={goBack}>Back</button>
    </form>
  );
}
```

**Navigate with options:**

```jsx
// Replace history entry (can't go back)
navigate('/dashboard', { replace: true });

// Pass state
navigate('/profile', { state: { from: 'login' } });
```

### Navigate Component

Declarative navigation (useful for redirects):

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

## useLocation Hook

Access current location information:

```jsx
import { useLocation } from 'react-router-dom';

function CurrentPage() {
  const location = useLocation();

  return (
    <div>
      <p>Current path: {location.pathname}</p>
      <p>Search params: {location.search}</p>
      <p>Hash: {location.hash}</p>
      <p>State: {JSON.stringify(location.state)}</p>
    </div>
  );
}
```

## Query Parameters

### useSearchParams Hook

Work with query strings:

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q');
  const page = searchParams.get('page') || 1;

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: 1 });
  };

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <p>Page: {page}</p>
      <input
        defaultValue={query}
        onChange={(e) => updateSearch(e.target.value)}
      />
    </div>
  );
}

// URL: /search?q=react&page=2
```

## 404 Not Found

Handle unknown routes:

```jsx
function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

## Layout Pattern

Create a shared layout for multiple routes:

```jsx
// Layout component
function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Page content */}
      </main>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

// App with layout
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}
```

## Protected Routes

Implement authentication-based routing:

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth(); // Custom hook

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

## Lazy Loading Routes

Code split your routes for better performance:

```jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
```

## Common Patterns

### Breadcrumbs

```jsx
function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(x => x);

  return (
    <nav>
      <Link to="/">Home</Link>
      {paths.map((path, index) => {
        const to = `/${paths.slice(0, index + 1).join('/')}`;
        return (
          <span key={to}>
            {' > '}
            <Link to={to}>{path}</Link>
          </span>
        );
      })}
    </nav>
  );
}
```

### Scroll to Top

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Add to your app
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Your routes */}
      </Routes>
    </>
  );
}
```

## Best Practices

1. **Use absolute paths** - Start routes with `/`
2. **Organize routes** - Keep route definitions in one place
3. **Use layouts** - Share common UI across routes
4. **Lazy load** - Split large routes into chunks
5. **Handle 404s** - Always have a catch-all route
6. **Type safety** - Use TypeScript for route parameters
7. **Avoid inline functions** - In route elements when possible

## Common Pitfalls

### Missing BrowserRouter

```jsx
// ❌ Bad
ReactDOM.render(<App />, root);

// ✅ Good
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);
```

### Using `<a>` instead of `<Link>`

```jsx
// ❌ Bad - causes full page reload
<a href="/about">About</a>

// ✅ Good - client-side navigation
<Link to="/about">About</Link>
```

### Forgetting Outlet

```jsx
// ❌ Bad - nested routes won't render
function Layout() {
  return <div><nav>...</nav></div>;
}

// ✅ Good - includes Outlet
function Layout() {
  return (
    <div>
      <nav>...</nav>
      <Outlet />
    </div>
  );
}
```

## Summary

- **BrowserRouter** wraps your app to enable routing
- **Routes and Route** define path-to-component mappings
- **Link and NavLink** provide client-side navigation
- **useParams** accesses URL parameters
- **useNavigate** enables programmatic navigation
- **useLocation** provides current location info
- **useSearchParams** handles query strings
- **Outlet** renders nested routes
- **Nested routes** create complex layouts
- **Protected routes** implement authentication

## Next Steps

In the next module, we'll learn about state management, including lifting state up, React Context, and when to use different state management approaches.

---

## Q&A

### 1) Why use React Router?
**Answer:** It maps URLs to UI so users can navigate views in a single-page app.

### 2) What is a route parameter?
**Answer:** A dynamic segment in a path (like /users/:id) used to load route-specific data.

### 3) What is the difference between link navigation and full page reload?
**Answer:** Router links update UI client-side without refreshing the whole page.

### 4) Why are nested routes useful?
**Answer:** They let related layouts and pages share structure while rendering child content.

### 5) What is protected routing?
**Answer:** It conditionally allows access to certain routes based on auth or permissions.
