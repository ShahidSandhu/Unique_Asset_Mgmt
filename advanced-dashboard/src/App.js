// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";
import Assets from "./pages/Assets";
import Employees from "./pages/Employees";
import AppProviders from "./context/Providers";
import ErrorBoundary from "./components/ErrorBoundary"; // New Error Boundary component

function App() {
  return (
    <AppProviders>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="assets" element={<Assets />} />
              <Route path="employees" element={<Employees />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </AppProviders>
  );
}

export default App;
