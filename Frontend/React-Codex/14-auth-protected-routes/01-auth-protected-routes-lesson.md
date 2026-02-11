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
