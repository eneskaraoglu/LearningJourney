import { createContext, useContext, useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom'

/*
  AUTHENTICATION & PROTECTED ROUTES SOLUTIONS

  Complete implementations of authentication and route protection.
*/

// ============================================================================
// Exercise 1: Auth Context
// ============================================================================

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (username, password) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication
      if (username && password) {
        const userData = {
          id: 1,
          username,
          email: `${username}@example.com`,
          role: username === 'admin' ? 'admin' : 'user',
          token: 'mock-jwt-token-' + Date.now(),
        }
        setUser(userData)
        return { success: true, user: userData }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = () => !!user

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// ============================================================================
// Exercise 2: Login Form
// ============================================================================

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = await login(username, password)

    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="hint">
          <p>Hint: Any username/password works</p>
          <p>Use "admin" as username for admin role</p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Exercise 3: Protected Route Component
// ============================================================================

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// ============================================================================
// Exercise 4: Public Route (Auth Redirect)
// ============================================================================

export function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return children
}

// ============================================================================
// Exercise 5: User Profile Page
// ============================================================================

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="profile-page">
      <h2>User Profile</h2>

      <div className="profile-info">
        <div className="info-row">
          <strong>Username:</strong> {user.username}
        </div>
        <div className="info-row">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="info-row">
          <strong>Role:</strong> {user.role}
        </div>
        <div className="info-row">
          <strong>User ID:</strong> {user.id}
        </div>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  )
}

// ============================================================================
// Exercise 6: Role-Based Access Control
// ============================================================================

export function RoleProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export function AdminPage() {
  const { user } = useAuth()

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user.username}! This is the admin-only area.</p>

      <div className="admin-content">
        <div className="admin-card">
          <h3>User Management</h3>
          <p>Manage all users in the system</p>
        </div>

        <div className="admin-card">
          <h3>System Settings</h3>
          <p>Configure application settings</p>
        </div>

        <div className="admin-card">
          <h3>Analytics</h3>
          <p>View system analytics and reports</p>
        </div>
      </div>
    </div>
  )
}

export function UnauthorizedPage() {
  return (
    <div className="unauthorized-page">
      <h2>Unauthorized Access</h2>
      <p>You don't have permission to access this page.</p>
      <Link to="/">Go to Home</Link>
    </div>
  )
}

// ============================================================================
// Exercise 7: Persistent Authentication
// ============================================================================

const PersistentAuthContext = createContext(null)

export function PersistentAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth-user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('auth-user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (username && password) {
        const userData = {
          id: 1,
          username,
          email: `${username}@example.com`,
          role: username === 'admin' ? 'admin' : 'user',
          token: 'mock-jwt-token-' + Date.now(),
        }

        setUser(userData)
        localStorage.setItem('auth-user', JSON.stringify(userData))

        return { success: true, user: userData }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth-user')
  }

  const isAuthenticated = () => !!user

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <PersistentAuthContext.Provider value={value}>
      {children}
    </PersistentAuthContext.Provider>
  )
}

export function usePersistentAuth() {
  const context = useContext(PersistentAuthContext)
  if (!context) {
    throw new Error('usePersistentAuth must be used within PersistentAuthProvider')
  }
  return context
}

// ============================================================================
// Exercise 8: Complete Auth Flow
// ============================================================================

function HomePage() {
  const { user } = useAuth()

  return (
    <div className="home-page">
      <h2>Welcome, {user.username}!</h2>
      <p>You are successfully logged in.</p>

      <div className="home-content">
        <div className="info-card">
          <h3>Your Dashboard</h3>
          <p>Access your personalized dashboard and settings.</p>
        </div>

        <div className="info-card">
          <h3>Quick Actions</h3>
          <ul>
            <li>View your profile</li>
            <li>Update settings</li>
            <li>Manage account</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function Navigation() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">MyApp</Link>
      </div>

      <div className="nav-links">
        {isAuthenticated() ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout} className="nav-logout">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export function CompleteAuthApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="complete-auth-app">
          <Navigation />

          <main className="main-content">
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <RoleProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </RoleProtectedRoute>
                }
              />

              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

// ============================================================================
// Main App Component
// ============================================================================

export default function App() {
  const [activeDemo, setActiveDemo] = useState('complete')

  return (
    <div className="app">
      <header>
        <h1>Auth & Protected Routes Solutions</h1>
        <p>Complete authentication system implementations</p>
      </header>

      <main>
        <div className="demo-selector">
          <button
            className={activeDemo === 'complete' ? 'active' : ''}
            onClick={() => setActiveDemo('complete')}
          >
            Complete Auth Flow
          </button>
        </div>

        {activeDemo === 'complete' && <CompleteAuthApp />}
      </main>

      <footer>
        <p>Authentication & Authorization - Production-ready patterns</p>
      </footer>
    </div>
  )
}
