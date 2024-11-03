// src/components/Login.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import api from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import "./Login.css"; // Importing the new CSS file


function Login() {
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login } = auth;
  const navigate = useNavigate();

  const [email, setEmail] = useState()  // useState('ss@gmail.com');
  const [password, setPassword] = useState() // useState('admin');
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const resetErrors = () => {
    setError(null);
    setValidationError(null);
  };

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();

    // Client-side validation
    if (!email || !password) {
      setValidationError("Email and password are required.");
      return;
    }

    setLoading(true); // Set loading to true while processing

    try {
      // Try logging in with API call
      const response = await api.post("/api/login/", { email, password });
      // Check for success status
      if (response.status === 200) {
        login(response.data.token);
        navigate("/dashboard");
        // navigate(from, { replace: true }); // Navigate to intended path
      }
    } catch (error) {
      // Handle server and network errors
      if (error.response) {
        // Server-side error (4xx, 5xx)
        if (error.response.status === 400) {
          setError(
            error.response.data.message ||
              "Invalid input. Please check your details and try again."
          );
        } else if (error.response.status === 401) {
          setError("Unauthorized: Please check your email and password.");
        } else if (error.response.status === 403) {
          setError(
            "Your account is restricted. Please contact support for more information."
          );
        } else if (error.response.status === 429) {
          setError(
            "Too many login attempts. Please try again after a few minutes."
          );
        } else if (error.response.status >= 500) {
          setError("Our server is currently down. Please try again later.");
        } else if (error.response.data.message === "Account not verified") {
          setError(
            "Your account is restricted. Please contact support for more information."
          );
        } else {
          setError("An error occurred. Please try again.");
        }
      } else if (error.request) {
        // Network error
        setError("Network error. Please check your connection.", error.request);
        console.log("Network error. Please check your connection", error);
      } else {
        // Unexpected error
        setError("An unexpected error occurred.");
      }
    } finally {
      // Reset loading state after processing
      setLoading(false);
    }
      
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {validationError && <p className="error-message">{validationError}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
