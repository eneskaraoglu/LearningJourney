# Session 14: Authentication and Protected Routes

## Learning Objectives
By the end of this session, you will:
1. Track auth state in React
2. Create protected routes
3. Redirect unauthenticated users

---

## 1. Auth State

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ user: null });

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (name) => setUser({ name });
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 2. Protected Route

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

---

## Summary
1. Track auth with context
2. Guard routes with redirects

---

## Q&A

### 1) What is a protected route?
**Answer:** A route that requires authentication (and sometimes authorization) before access.

### 2) What is the difference between authentication and authorization?
**Answer:** Authentication verifies identity; authorization checks permissions.

### 3) Why preserve intended destination after login?
**Answer:** It improves UX by returning users to the page they originally requested.

### 4) What is a common token lifecycle concern?
**Answer:** Handling expiration and refresh without creating security gaps.

### 5) What should protected-route UX include?
**Answer:** Clear redirects, loading states during checks, and friendly access-denied messaging.
