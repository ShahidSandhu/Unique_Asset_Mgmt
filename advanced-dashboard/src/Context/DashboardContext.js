// src/context/DashboardContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsResponse = await axios.get("/api/assets");
        const employeesResponse = await axios.get("/api/employees");
        setAssets(assetsResponse.data);
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Initial fetch
    fetchData();

    // Set interval for polling every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContext.Provider value={{ assets, employees }}>
      {children}
    </DashboardContext.Provider>
  );
}
