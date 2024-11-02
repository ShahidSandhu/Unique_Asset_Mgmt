// src/components/CustomLogin.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../axiosConfig";
import { AuthContext } from "./context/AuthContext";

function CustomLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser, setToken } = useContext(AuthContext); // Assuming AuthContext manages `user` and `token`
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login/", {
        email,
        password,
      });

      const { token, user } = response.data; // Extract the access token and user info from response
      setToken(token);
      setUser(user); // Update user context with returned user data

      // Store token in localStorage
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/"); // Redirect to dashboard on success
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CustomLogin;
