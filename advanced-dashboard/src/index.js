// src/index.js
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client in React 18+
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

// Get the root element from the DOM
const rootElement = document.getElementById("root");

// Create a root using React 18's createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the application wrapped in AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
