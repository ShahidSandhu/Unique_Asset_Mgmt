// src/components/PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

   if (!isAuthenticated) {
     return <Navigate to="/login" state={{ from: location }} />;
   }
  
  return children;
}

export default PrivateRoute;