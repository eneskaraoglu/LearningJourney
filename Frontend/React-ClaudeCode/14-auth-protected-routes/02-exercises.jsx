import { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'

/*
  AUTHENTICATION & PROTECTED ROUTES EXERCISES

  Learn to implement authentication flows and protected routes in React.
*/

// ============================================================================
// Exercise 1: Auth Context
// ============================================================================
/*
  Create an authentication context to manage auth state globally.

  Requirements:
  - Create AuthContext with user state
  - Provide login, logout, and isAuthenticated
  - Wrap app with AuthProvider
  - Export useAuth hook

  Hint: Store user object and token
*/

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // TODO: Implement auth state and methods
}

export function useAuth() {
  // TODO: Return auth context
}

// ============================================================================
// Exercise 2: Login Form
// ============================================================================
/*
  Create a login form component.

  Requirements:
  - Form with username and password fields
  - Call login from useAuth on submit
  - Show loading state during login
  - Display error messages
  - Redirect to home after successful login

  Hint: Use useNavigate for redirection
*/

export function LoginPage() {
  // TODO: Implement login form
}

// ============================================================================
// Exercise 3: Protected Route Component
// ============================================================================
/*
  Create a ProtectedRoute component that checks authentication.

  Requirements:
  - Check if user is authenticated
  - If authenticated, render children
  - If not, redirect to login page
  - Preserve intended destination

  Hint: Use Navigate component from react-router-dom
*/

export function ProtectedRoute({ children }) {
  // TODO: Implement protected route logic
}

// ============================================================================
// Exercise 4: Public Route (Auth Redirect)
// ============================================================================
/*
  Create a PublicRoute that redirects authenticated users.

  Requirements:
  - If user is authenticated, redirect to home
  - If not authenticated, render children (login page)
  - Useful for login/register pages

  This prevents logged-in users from accessing login page.
*/

export function PublicRoute({ children }) {
  // TODO: Implement public route logic
}

// ============================================================================
// Exercise 5: User Profile Page
// ============================================================================
/*
  Create a protected user profile page.

  Requirements:
  - Display current user info
  - Show logout button
  - Only accessible when authenticated
  - Redirect to login if not authenticated
*/

export function ProfilePage() {
  // TODO: Implement profile page
}

// ============================================================================
// Exercise 6: Role-Based Access Control
// ============================================================================
/*
  Implement role-based route protection.

  Requirements:
  - Extend auth context to include user roles
  - Create RoleProtectedRoute component
  - Check if user has required role
  - Redirect to unauthorized page if no permission

  Roles: 'user', 'admin'
*/

export function RoleProtectedRoute({ children, requiredRole }) {
  // TODO: Implement role-based protection
}

export function AdminPage() {
  // TODO: Admin-only page
}

// ============================================================================
// Exercise 7: Persistent Authentication
// ============================================================================
/*
  Implement auth persistence using localStorage.

  Requirements:
  - Save token to localStorage on login
  - Load token from localStorage on mount
  - Auto-logout on token expiration
  - Clear localStorage on logout

  This maintains login state across page refreshes.
*/

export function PersistentAuthProvider({ children }) {
  // TODO: Implement persistent auth
}

// ============================================================================
// Exercise 8: Complete Auth Flow
// ============================================================================
/*
  Build a complete authentication flow.

  Requirements:
  - Login page (public route)
  - Home page (protected)
  - Profile page (protected)
  - Admin page (role protected)
  - Logout functionality
  - Navigation with conditional links
  - Token-based authentication

  This combines all previous exercises into a full app.
*/

export function CompleteAuthApp() {
  // TODO: Implement complete auth app with routing
}

// ============================================================================
// Main App Component
// ============================================================================

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Auth & Protected Routes Exercises</h1>
        <p>Implement secure authentication flows</p>
      </header>

      <main>
        <div className="exercise-list">
          <div className="exercise-card">
            <h3>Exercise 1: Auth Context</h3>
            <p>Create authentication context and provider</p>
          </div>

          <div className="exercise-card">
            <h3>Exercise 2: Login Form</h3>
            <p>Build login form with validation</p>
          </div>

          <div className="exercise-card">
            <h3>Exercise 3: Protected Route</h3>
            <p>Create route component for authenticated users</p>
          </div>

          <div className="exercise-card">
            <h3>Exercise 4: Public Route</h3>
            <p>Redirect authenticated users away from login</p>
          </div>

          <div className="exercise-card">
            <h3>Exercise 5: User Profile</h3>
            <p>Build protected profile page</p>
          </div>

          <div className="exercise-card">
            <h3>Exercise 6: Role-Based Access</h3>
            <p>Implement role-based route protection</p>
          </div>

          <div className="exercise-card">
            <h3>Exercise 7: Persistent Auth</h3>
            <p>Maintain auth state across refreshes</p>
          </div>

          <div className="exercise-card">
            <h3>Exercise 8: Complete Flow</h3>
            <p>Build full authentication system</p>
          </div>
        </div>
      </main>

      <footer>
        <p>Implement each component to build a secure authentication system!</p>
      </footer>
    </div>
  )
}
