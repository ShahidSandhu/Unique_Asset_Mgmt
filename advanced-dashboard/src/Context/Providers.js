// src/context/Providers.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { DashboardProvider } from "./DashboardContext";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <DashboardProvider>{children}</DashboardProvider>
  </AuthProvider>
);

export default AppProviders;
