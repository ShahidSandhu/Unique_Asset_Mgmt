import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [identifier, setIdentifier] = useState(""); // Renaming username to identifier
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to dashboard if login successful
    }
  }, [isAuthenticated, navigate]);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(identifier, password);
    navigate("/dashboard/home"); // Or whatever page you want the user to be redirected to
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div>
            <label htmlFor="identifier">Identifier:</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
