// src/utils/authUtils.js
import React from "react";
import apiClient from "../utils/axiosSetup";

// Check if the token is expired
function isTokenExpired(token) {
  if (!token) return true;

  const tokenParts = JSON.parse(atob(token.split(".")[1]));
  const expiryTime = tokenParts.exp * 1000; // Convert expiry time from seconds to milliseconds

  return Date.now() > expiryTime;
}

// Function to fetch a new access token using the refresh token

// Main function to get a valid access token

// return default getAccessToken;
// return default getAccessToken;
