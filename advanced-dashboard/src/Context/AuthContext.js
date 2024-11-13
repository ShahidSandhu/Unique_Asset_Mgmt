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
  const [loading, setLoading] = useState(false);
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
    localStorage.getItem("access")
  );
  const [error, setError] = useState(null);

  const setAuthData = (userData, accessToken, refreshToken) => {
    if (userData && accessToken) {
      setUser(userData);
      if (!isAuthenticated) {
        setIsAuthenticated(true);
      }
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData)); // Ensure user is stringified
    } else {
      console.error("Invalid user or access token data");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
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
      setAuthData(user, access, refresh);
      setIsAuthenticated(true);
      // localStorage.setItem("refresh", refresh);
      // setIsAuthenticated(true); // Ensure this doesn't trigger re-renders unexpectedly.
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      setError("Invalid credentials. Please try again.");
      // logout(); // This should be controlled to avoid re-triggering the effect.
    } finally {
      setLoading(false); // Ensure this runs after everything is handled.
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
      setLoading(true); // Ensure loading state is set
      const accessToken = localStorage.getItem("access");
      const refreshTokenValue = localStorage.getItem("refresh");

      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          throw new Error("Invalid user data");
        }

        if (accessToken) {
          const isValid = await verifyToken(accessToken);
          if (isValid) {
            setAuthData(storedUser, accessToken, refreshTokenValue);
          } else if (refreshTokenValue) {
            const newAccessToken = await refreshToken(refreshTokenValue);
            if (newAccessToken) {
              setAuthData(storedUser, newAccessToken, refreshTokenValue);
            } else {
              logout();
            }
          } else {
            logout();
          }
        } else {
          logout();
        }
      } catch (error) {
        console.error("Initialization error:", error);
        // localStorage.removeItem("user"); // More selective cleanup
        logout();
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    };

    initializeAuth();
  }, []);


  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
