// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../axiosConfig";

// Define default values for the AuthContext to prevent null errors if the provider is missing
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Login function to handle authentication logic and update state
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/login", { email, password });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
    }
  };

  // Registration function to handle user registration and update state
  const register = async (email, password) => {
    try {
      const response = await api.post("/api/register", { email, password });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsAuthenticated(false);
    }
  };

  // Function to check and validate the token on initial load
  const checkToken = async () => {
    if (token) {
      try {
        const response = await api.get("/api/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        logout();
      }
    }
  };

  // Automatically validate token on initial load if it exists
  useEffect(() => {
    checkToken();
  }, [token]);

  // Logout function to clear user session and remove token from storage
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
        register,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
