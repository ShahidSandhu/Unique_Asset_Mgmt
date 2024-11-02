// src/components/Dashboard.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Sidebar from "./Sidebar";
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
            <Outlet />{"  "}
            {/* Main content displayed here with a dedicated scrollbar */}
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
