import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../utils/axiosSetup";

/*
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  login: () => {},
  logout: () => {},
  setAccessToken: () => {},
});*/
const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Utility function to check token expiry
function isTokenExpired(token) {
  if (!token) return true;

  const tokenParts = JSON.parse(atob(token.split(".")[1]));
  const expiryTime = tokenParts.exp * 1000; // Convert expiry time to milliseconds

  return Date.now() > expiryTime; // Return true if token is expired
}

// Provider component
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Function to refresh the access token using the refresh token
  const refreshAccessToken = async () => {
    if (isTokenExpired(refreshToken)) {
      console.log("Refresh token expired, please log in again.");
      logout(); // Trigger logout only after confirming refresh token expiration
      return null;
    }

    try {
      const response = await apiClient.post("/api/token/refresh", {
        refreshToken,
      });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      // Update tokens in local storage
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("isAuthenticated", "true");

      console.log("In AuthContext, newAccessToken: " + newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      logout();
      return null;
    }
  };

  // Function to get a valid access token
  const getAccessToken = async () => {
    if (accessToken && !isTokenExpired(accessToken)) {
      return accessToken;
    }
    return await refreshAccessToken();
  };

  const login = ({ accessToken, refreshToken }) => {
    console.log("login called with accessToken: " + accessToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    console.log("logout called");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    // When the app loads, try to refresh the token if possible
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // If we have an access token, try to validate it and refresh if needed
    if (token) {
      setIsAuthenticated(true);
      setLoading(false);
    } else if (refreshToken) {
      // If we have a refresh token but no access token, try to refresh
      refreshToken();
    } else {
      // If no tokens are found, log the user out
      logout();
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, getAccessToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
