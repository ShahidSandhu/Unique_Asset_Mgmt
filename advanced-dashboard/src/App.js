// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppProviders from "./context/Providers";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AppProviders>
      <Router>
        <ErrorBoundary>
          <Routes>
            {/* Login Route with Redirect if Authenticated */}
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
            {/* Fallback Route for Undefined Paths */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </AppProviders>
  );
}

export default App;
