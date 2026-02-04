// Authentication and Protected Routes - Exercise Solutions

import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

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

function useAuth() {
  return useContext(AuthContext);
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login("Ada");
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Log In</button>;
}
