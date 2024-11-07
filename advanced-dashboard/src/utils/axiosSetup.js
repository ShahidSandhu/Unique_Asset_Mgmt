// src/utils/axiosSetup.js

import axios from "axios";
// import { getAccessToken } from "./authUtils";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}` || "http://localhost:8000" // Accessing the base URL from .env
});


// Function to set up Axios interceptors with access to `getAccessToken`
export const setupAxiosInterceptors = (getAccessToken, logout) => {
  apiClient.interceptors.request.use(
    async (config) => {
      // Add the access token to the Authorization header if it's available
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken"); // Retrieve token
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Check if the error is due to an expired token (401 Unauthorized)
      if (error.response.status === 401) {
        // Try refreshing the token
        try {
          const refreshResponse = await apiClient.post("/api/token/refresh", {
            refreshToken: localStorage.getItem("refreshToken"),
          });
          const newAccessToken = refreshResponse.data.accessToken;

          // Update the access token and retry the original request
          localStorage.setItem("accessToken", newAccessToken);
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(error.config); // Retry the original request
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          logout(); // Log out if refresh fails
        }
      }
      return Promise.reject(error);
    }
  );
};

export default apiClient;
