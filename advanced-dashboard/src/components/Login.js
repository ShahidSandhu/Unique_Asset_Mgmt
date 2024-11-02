// src/components/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Import Axios
import { useAuth } from "../context/AuthContext";
import { AuthContext } from "../context/AuthContext";
import api from "../axiosConfig";


function Login() {
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const { setUser, setToken } = useContext(AuthContext); // Assuming AuthContext manages `user` and `token`

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmail("ss@gmail.com");
    setPassword("admin"); // Replace with actual password
    // Basic validation (ensure fields are not empty)
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Axios request to authenticate user (replace with actual API endpoint)
      const response = await api.post("/api/login/", {
        email,
        password,
      });
      // const url = `${process.env.REACT_APP_API_BASE_URL}`;
      // console.log("test url form env URL:", url); // Log URL before request
      // const response = await api.post("http://localhost:8000/api/login/", { email, password });
      // console.log("test url form axios api:", api); // Log URL before request

      // Assuming response contains a success status
      if (response.status === 200) {
        const { token, user } = response.data; // Extract the access token and user info from response
        setToken(token);
        // setUser(user); // Update user context with returned user data
        // Store token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem('authToken', token); // to be used in axiosConfig.js only
        // console.log("token : ", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        login(); // Set user as authenticated in context
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        console.log("Server responded with status:", error.response.status);
        console.log("Response data:", error.response.data);
        if (error.response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
        setError("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request
        // console.log("Error", error.message);
        setError("An unexpected error occurred.");
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
