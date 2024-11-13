import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import "./Login.css"; // Import custom styling

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Navigating to the dashboard");
      navigate("/dashboard/home");
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    await login(identifier, password);
    // setLoading(false);
    if (isAuthenticated) {
      console.log("Navigating to the dashboard");
      navigate("/dashboard/home");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {loading ? ( // Display the spinner when loading is true
            <LoadingSpinner />
          ) : (
            <>
              <h2>Login</h2>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="identifier">Identifier:</label>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your identifier"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
