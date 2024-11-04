// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../axiosConfig";

// Define default values for the AuthContext to prevent null errors if the provider is missing
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);

  // Login function to handle authentication logic and update state
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/login", { email, password });
      const { accessToken, user } = response.data;
      setAccessToken(accessToken);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
    }
  };

  // Registration function to handle user registration and update state
  const register = async (email, password) => {
    try {
      const response = await api.post("/api/register", { email, password });
      const { accessToken, user } = response.data;
      setAccessToken(accessToken);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsAuthenticated(false);
    }
  };

  // Function to check and validate the accessToken on initial load
  const checkToken = async () => {
    if (accessToken) {
      try {
        const response = await api.get("/api/validate-token", {
          headers: { Authorization: `Bearer ${accessToken}` },
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

  // Automatically validate accessToken on initial load if it exists
  useEffect(() => {
    checkToken();
  }, [accessToken]);

  // Logout function to clear user session and remove accessToken from storage
  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        accessToken,
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
