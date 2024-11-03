// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Custom hook for accessing the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider component
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  // Load initial auth state from localStorage or default to false
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  // Function to log in and save token
  const login = (token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  // Function to log out and clear token
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };


  // Wait for loading state to resolve before rendering children
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
