// src/context/DashboardContext.js
import React, { createContext, useState, useEffect } from "react";
// import api from "../axiosConfig";
import apiClient from "../utils/axiosSetup";
import { toast } from "react-toastify";

export const DashboardContext = createContext({
  assets: [],
  employees: [],
  theme: "light",
  toggleTheme: () => {},
});

export function DashboardProvider({ children }) {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  const fetchData = async () => {
    try {
      const assetsResponse = await apiClient.get("/api/assets/");
      const employeesResponse = await apiClient.get("/api/employees/");
      setAssets(assetsResponse.data);
      setEmployees(employeesResponse.data);
      toast.success("Data fetched successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
      // Optionally handle specific error status codes
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized - Please log in again.");
        // Redirect to login or clear session if needed
      }
    }
  };

  useEffect(() => {

    fetchData();
    // Remove the interval for fetching data every 10 seconds
    // const interval = setInterval(fetchData, 10000);
    // return () => clearInterval(interval);
  }, []); // The useEffect with an empty dependency array ([]) runs once when the component mounts, which includes when the page is loaded.

  return (
    <DashboardContext.Provider
      value={{ assets, employees, theme, toggleTheme }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
