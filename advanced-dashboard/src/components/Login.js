// src/components/Login.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login } = auth;
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); // Changed from email to identifier
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const resetErrors = () => {
    setError(null);
    setValidationError(null);
  };

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // Effect to manage body class
  useEffect(() => {
    document.body.classList.add("login-page");

    // Cleanup function to remove the class on unmount
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();

    // Client-side validation
    if (!identifier || !password) {
      setValidationError("Username or email and password are required.");
      return;
    }

    setLoading(true);

    try {
      // API call with identifier (username or email)
      const response = await api.post("/api/login/", { identifier, password });
      if (response.status === 200) {
        login(response.data.accessToken);
        
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle errors as before
      if (error.response) {
        if (error.response.status === 400) {
          setError(
            error.response.data.message ||
              "Invalid input. Please check your details and try again."
          );
        } else if (error.response.status === 401) {
          setError(
            "Unauthorized: Please check your username/email and password."
          );
        } else if (error.response.status === 403) {
          setError("Your account is restricted. Please contact support.");
        } else if (error.response.status === 429) {
          setError("Too many login attempts. Please try again later.");
        } else if (error.response.status >= 500) {
          setError("Our server is currently down. Please try again later.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
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
            type="text" // Changed type to text to accept both email and username
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
