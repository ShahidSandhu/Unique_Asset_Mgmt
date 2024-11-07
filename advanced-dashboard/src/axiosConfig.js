// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance with the baseURL set
const api = axios.create({
  baseURL: "http://localhost:8000", // Set your API base URL here
});

// Add a request interceptor to include the token in headers for each request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve accessToken from local storage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Add accessToken to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken"); // Retrieve refresh token from local storage
  if (!refreshToken) return null;

  try {
    const response = await api.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    // Store the new access token
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken; // Return the new access token
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.removeItem("accessToken"); // Clear tokens on error
    localStorage.removeItem("refreshToken");
    throw error; // Rethrow the error for further handling
  }
};

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
);


export default api;
