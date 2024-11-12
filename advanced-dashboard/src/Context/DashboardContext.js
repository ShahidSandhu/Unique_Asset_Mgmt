// src/context/DashboardContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../axiosConfig";
import { toast } from "react-toastify";

export const DashboardContext = createContext({
  assets: [],
  employees: [],
  users: [],
  theme: "light",
  toggleTheme: () => {},
});

export function DashboardProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsResponse = await api.get("/api/assets/");
        const employeesResponse = await api.get("/api/employees/");
        const usersResponse = await api.get("/api/users/");
        setAssets(assetsResponse.data);
        setEmployees(employeesResponse.data);
        setUsers(usersResponse.data);
        toast.success("Data fetched successfully!");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data.");
      }
    };

    fetchData();
    // Remove the interval for fetching data every 10 seconds
    // const interval = setInterval(fetchData, 10000);
    // return () => clearInterval(interval);
  }, []); // The useEffect with an empty dependency array ([]) runs once when the component mounts, which includes when the page is loaded.

  return (
    <DashboardContext.Provider
      value={{ assets, employees, users, theme, toggleTheme }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
