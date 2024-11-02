import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const authContext = useContext(AuthContext);
  if (!authContext) 
    return <p>Auth service not available.</p>;
  const login = authContext?.login; // Safe handling for null context
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login) {
      setError("Authentication service unavailable.");
      return;
    }
    try {
      await login(email, password);
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("Unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
