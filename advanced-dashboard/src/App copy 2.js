// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";
import Assets from "./pages/Assets";
import Employees from "./pages/Employees";
import AppProviders from "./context/Providers";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext"; // AI login
import Login from "./components/Login"; // AI login
import PrivateRoute from "./components/PrivateRoute"; // AI login

function App() {
  return (
    <AppProviders>
      <Router>
        <ErrorBoundary>
          <Routes>
            {/* Public Route for Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Route for Dashboard */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* Redirect to Login by Default */}
            <Route path="*" element={<Navigate to="/login" />} />
            {/* another scheme of routes  */}
            <Route path="/" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/employees" element={<Employees />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </AppProviders>
  );
}

export default App;
