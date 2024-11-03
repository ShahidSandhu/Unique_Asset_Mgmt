// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance with the baseURL set from environment variables
const api = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  baseURL: "http://localhost:8000", // Set your API base URL here
});

/*
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Use this if the server requires cookies to be sent with requests
});
*/


// Add a request interceptor to include the token in headers for each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
