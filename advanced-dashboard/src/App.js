// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppProviders from "./context/Providers"; // Ensure this file exists or remove if not needed
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
// import { useAuth } from "./context/AuthProvider";
// import AuthProvider from "./context/AuthProvider";
import { setupAxiosInterceptors } from "./utils/axiosSetup";
import AuthProvider from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

function App() {
  // Use `useAuth` only if necessary, otherwise remove
  const { getAccessToken, logout } = useAuth();

  // Set up axios interceptors on mount
  useEffect(() => {
    setupAxiosInterceptors(getAccessToken, logout);
  }, [getAccessToken, logout]);

  return (
    // <Router>
    // <AuthProvider>
      <AppProviders>
        <Router>
          <ErrorBoundary>
            <Routes>
              {/* Login Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Dashboard Route */}
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              {/* Redirect from root to dashboard if authenticated */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              {/* Fallback Route for Undefined Paths */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </AppProviders>
    // </AuthProvider>
    // </Router>
  );
}

export default App;
