import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../utils/axiosSetup";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { getAccessToken } = useAuth();
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Assuming you have this in your AuthContext
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { login } = auth;


  // Removed early clearing of tokens before login attempt
  const resetErrors = () => {
    setError(null);
    setValidationError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // Effect to manage body class
  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();

    // Check if identifier or password is missing
    if (!identifier || !password) {
      setValidationError("Username or email and password are required.");
      return;
    }

    setLoading(true);

    try {
      console.log("in LoginPage, Login called successfully");

      // Perform login API call
      const response = await apiClient.post("/api/login/", {
        username: identifier,
        password: password,
      });
      console.log("in LoginPage, after login request");
      // Store the tokens in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setIsAuthenticated(true);
      navigate("/dashboard/home");
      // Check if login is successful

      // Store the tokens in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setIsAuthenticated(true);
      navigate("/dashboard/home");

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("Invalid input. Please check your details and try again.");
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
        setError("An unexpected error occurred. Login attempt");
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
            type="text"
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
