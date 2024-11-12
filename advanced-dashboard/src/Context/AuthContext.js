import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../axiosConfig";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access")
  );
  const [error, setError] = useState(null);

  const setAuthData = (userData, accessToken) => {
    if (userData && accessToken) {
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("access", accessToken);
      localStorage.setItem("user", JSON.stringify(userData)); // Ensure user is stringified
    } else {
      console.error("Invalid user or access token data");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.clear();
  };

  const login = async (identifier, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        identifier,
        password,
      });
      const { user, access, refresh } = response.data;
      setAuthData(user, access);
      setIsAuthenticated(true);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login error:", error.response || error);
      setError("Invalid credentials. Please try again.");
      logout();
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (accessToken) => {
    try {
      const response = await api.post("/api/token/verify/", {
        access: accessToken,
      });
      return response.status === 200;
    } catch (error) {
      console.error("Token verification failed:", error.response || error);
      return false;
    }
  };

  const refreshToken = async (refreshToken) => {
    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        const newAccessToken = response.data.access;
        localStorage.setItem("access", newAccessToken);
        return newAccessToken;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Token refresh failed:", error.response || error);
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem("access");
      const refreshTokenValue = localStorage.getItem("refresh");
      let storedUser = null;

      try {
        storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) throw new Error("Invalid user data");
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }

      if (accessToken && storedUser) {
        try {
          const isValid = await verifyToken(accessToken);
          if (isValid) {
            setAuthData(storedUser, accessToken);
          } else if (refreshTokenValue) {
            const newAccessToken = await refreshToken(refreshTokenValue);
            if (newAccessToken) {
              setAuthData(storedUser, newAccessToken);
            } else {
              logout();
            }
          } else {
            logout();
          }
        } catch (error) {
          console.error("Initialization error:", error);
          logout();
        }
      } else {
        logout();
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}
