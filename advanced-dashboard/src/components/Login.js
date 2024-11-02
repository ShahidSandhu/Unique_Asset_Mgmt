// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import api from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

function Login() {
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/login/', { email, password });
      if (response.status === 200) {
        const token = response.data.token;
        login(token); // Store token and set authenticated
        navigate('/dashboard');
      }
    } catch (error) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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


/* AI LOGIN LOGIN
import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext"; // AI LOGIN
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Login() {
  
  const authContext = useContext(AuthContext);
  // if (!authContext) // 
    // return <p>Auth service not available.</p>;
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
*/
//AI LOGIN ENDS
