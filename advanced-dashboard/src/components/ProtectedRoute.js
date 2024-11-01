// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, roleRequired }) {
  const { user } = useContext(AuthContext); // Ensure AuthContext is provided in app tree

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && !user.roles.includes(roleRequired)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;



// import React, { useContext } from 'react';
// import { DashboardContext } from './path/to/DashboardContext';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
    // const { user } = useContext(AuthContext);
// 
    // return user ? children : <Navigate to="/login" />;
// }
// export default ProtectedRoute;
