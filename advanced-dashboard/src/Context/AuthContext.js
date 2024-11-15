import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import api from "../axiosConfig";

const AuthContext = createContext(null);

function authReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: Boolean(localStorage.getItem("access")),
    loading: false,
    error: null,
  });

  const setAuthData = (userData, accessToken, refreshToken) => {
    if (userData && accessToken) {
      dispatch({ type: "SET_USER", payload: userData });
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
  };

  const login = async (identifier, password) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        identifier,
        password,
      });
      const { user, access, refresh } = response.data;
      setAuthData(user, access, refresh);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Invalid credentials. Please try again.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const verifyToken = async (accessToken) => {
    try {
      const response = await api.post("/api/token/verify/", {
        access: accessToken,
      });
      return response.status === 200;
    } catch (error) {
      console.error(
        "Token verification failed:",
        error.response ? error.response.data : error.message
      );
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
        console.warn("Unexpected response status:", response.status);
        return null;
      }
    } catch (error) {
      console.error(
        "Token refresh failed:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };


  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      const accessToken = localStorage.getItem("access");
      const refreshTokenValue = localStorage.getItem("refresh");

      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) throw new Error("Invalid user data");

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
        logout();
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
