// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Create the context
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
  // Load initial auth state from localStorage or default to false
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Function to log in and save token
  const login = (token) => {
    localStorage.setItem("authToken", token); // Save token to localStorage
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Persist login state
  };

  // Function to log out and clear token
  const logout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Clear login state
    Navigate("/login"); // Redirect to login page immediately
  };

  // Sync state with localStorage whenever isAuthenticated changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // Set authenticated if token exists
    }
  }, [isAuthenticated]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
