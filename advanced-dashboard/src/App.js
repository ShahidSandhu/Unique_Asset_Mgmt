// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";
import Assets from "./pages/Assets";
import Employees from "./pages/Employees";
import AppProviders from "./context/Providers";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute"; // Authentication guard
import Login from "./components/Login";

function App() {
  return (
    <AppProviders>
      <Router>
        <ErrorBoundary>
          <Routes>
            {/* Public Route for Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes under Dashboard */}
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              {/* Nested Dashboard Routes */}
              <Route index element={<DashboardHome />} /> {/* Dashboard home */}
              <Route path="assets" element={<Assets />} />
              <Route path="employees" element={<Employees />} />
            </Route>

            {/* Default Redirect */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </AppProviders>
  );
}

export default App;
