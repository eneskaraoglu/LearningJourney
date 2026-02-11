# Authentication & Protected Routes

## Authentication in React

Authentication is the process of verifying user identity. This module covers implementing auth flows and protecting routes.

## Authentication Flow

### Basic Flow
1. User submits credentials (login)
2. Server validates and returns token
3. Client stores token (localStorage, cookie)
4. Client includes token in subsequent requests
5. Server validates token on each request

### Logout Flow
1. User clicks logout
2. Client removes token
3. Redirect to login page

## Token Storage

### LocalStorage

```jsx
const authService = {
  login: async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) throw new Error('Login failed');

    const { token, user } = await response.json();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
```

## Auth Context

Create a context to manage auth state globally:

```jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = authService.getToken();
    const savedUser = authService.getUser();

    if (token && savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const { user } = await authService.login(credentials);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## Protected Routes

### Basic Protected Route

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
function App() {
  return (
    <Routes>
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

### Protected Route with Redirect Location

```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Login component redirects back after auth
function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (credentials) => {
    await login(credentials);
    navigate(from, { replace: true });
  };

  return (/* login form */);
}
```

### Role-Based Protection

```jsx
function ProtectedRoute({ children, requiredRoles = [] }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Usage
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRoles={['admin']}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

## Login Component

```jsx
function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({
          ...credentials,
          email: e.target.value
        })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value
        })}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## API Interceptor

Add token to all API requests:

```jsx
async function apiRequest(url, options = {}) {
  const token = authService.getToken();

  const config = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };

  const response = await fetch(url, config);

  if (response.status === 401) {
    // Token expired or invalid
    authService.logout();
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Usage
const users = await apiRequest('/api/users');
```

## JWT Token Handling

### Decode JWT

```jsx
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token) {
  const decoded = parseJwt(token);
  if (!decoded) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

// In AuthProvider
useEffect(() => {
  const token = authService.getToken();

  if (token && isTokenExpired(token)) {
    authService.logout();
    setUser(null);
  }
}, []);
```

### Auto Refresh Token

```jsx
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch('/api/refresh', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authService.getToken()}` }
        });

        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem('token', token);
        } else {
          authService.logout();
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to refresh token');
      }
    };

    // Refresh token every 14 minutes (if expires in 15)
    const interval = setInterval(refreshToken, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (/* ... */);
}
```

## Complete Auth Example

```jsx
// App.jsx
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Layout with navigation
function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        {user.role === 'admin' && <Link to="/admin">Admin</Link>}
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

## Security Best Practices

1. **HTTPS Only**: Always use HTTPS in production
2. **HttpOnly Cookies**: For sensitive tokens (prevents XSS)
3. **Token Expiration**: Set reasonable expiration times
4. **Refresh Tokens**: Implement for better security
5. **CSRF Protection**: Use CSRF tokens for state-changing requests
6. **Input Validation**: Validate and sanitize all inputs
7. **Rate Limiting**: Prevent brute force attacks
8. **Secure Storage**: Use httpOnly cookies over localStorage when possible
9. **Logout on Inactivity**: Auto-logout after period of inactivity
10. **Don't Store Sensitive Data**: Keep minimal data in client storage

## Summary

- **Auth Context**: Manage authentication state globally
- **Protected Routes**: Restrict access based on auth status
- **Role-Based Access**: Control features by user roles
- **Token Management**: Store, refresh, and validate tokens
- **API Interceptors**: Automatically include auth headers
- **Security**: Follow best practices for secure authentication

## Congratulations!

You've completed the React Learning Journey! You now have comprehensive knowledge of React from basics to advanced patterns. Keep building projects and exploring the ecosystem!
