// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance with the baseURL set from environment variables
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
});

export default api;
