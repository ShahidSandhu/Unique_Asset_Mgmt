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
import { useAuth } from "./context/AuthContext";
import Users from "./components/Users"; // Import the UserProfile component
// import React from "react";
import UserList from "../src/components/UserList";
import CreateUser from "../src/components/CreateUser";
import UpdateUser from "../src/components/UpdateUser";
import DeleteUser from "./components/DeleteUser";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppProviders>
      <Router>
        <ErrorBoundary>
          <Routes>
            {isAuthenticated ? (
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            <Route  path="*" element={ <Navigate to={isAuthenticated ? "/dashboard/home" : "/login"} /> }  />
          </Routes>
        </ErrorBoundary>
      </Router>
    </AppProviders>
  );
}

export default App;
