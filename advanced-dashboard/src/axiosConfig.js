// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance with the baseURL set
const api = axios.create({
  baseURL: process.env.REACT_APP_API_PATH || "http://localhost:8000", // Set your API base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers for each request
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access"); // Retrieve access from local storage
    if (access) {
      config.headers.Authorization = `Bearer ${access}`; // Add access to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/*
// Add a response interceptor to handle token refresh logic
api.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Add new token to the original request
        return api(originalRequest); // Retry the original request
      }
    }

    return Promise.reject(error); // Reject the promise if no handling was done
  }
);*/


// Set a default timeout of 5 seconds (5000 milliseconds)
api.defaults.timeout = 5000;

export default api;
