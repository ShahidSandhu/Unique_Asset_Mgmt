// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../axiosConfig";

// Define default values for the AuthContext to prevent null errors if the provider is missing
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  access: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [user, setUser] = useState(null);
  const [access, setAccessToken] = useState(localStorage.getItem("access") || null);

  // Login function to handle authentication logic and update state
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/login", { email, password });
      const { access, user } = response.data;
      setAccessToken(access);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("access", access);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
    }
  };

  // Registration function to handle user registration and update state
  const register = async (email, password) => {
    try {
      const response = await api.post("/api/register", { email, password });
      const { access, user } = response.data;
      setAccessToken(access);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("access", access);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsAuthenticated(false);
    }
  };

  // Function to check and validate the access on initial load
  const checkToken = async () => {
    if (access) {
      try {
        const response = await api.get("/api/validate-token", {
          headers: { Authorization: `Bearer ${access}` },
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

  // Automatically validate access on initial load if it exists
  useEffect(() => {
    checkToken();
  }, [access]);

  // Logout function to clear user session and remove access from storage
  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("access");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        access,
        login,
        logout,
        register,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
