// src/components/Dashboard.js
import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Assets from "../pages/Assets";
import Employees from "../pages/Employees";
import "./Dashboard.css";

function Dashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="dashboard-container">
      <NavbarComponent toggleSidebar={toggleSidebar} />
      <div className="dashboard-body">
        {isSidebarVisible && <Sidebar />} {/* Conditionally render Sidebar */}
        <main
          className={`dashboard-main ${isSidebarVisible ? "" : "full-width"}`}
        >
          <div className="scrollable-content">
            <Routes>
              <Route path="dashboardhome" element={<DashboardHome />} />{" "}
              {/* Dashboard home */}
              <Route path="assets" element={<Assets />} />
              <Route path="employees" element={<Employees />} />
            </Routes>
            <Outlet /> {/* Renders nested routes */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
