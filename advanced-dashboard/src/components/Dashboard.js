// src/components/Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <NavbarComponent />
      <div className="dashboard-content">
        <Sidebar />
        <main className="dashboard-main">
          <Outlet /> {/* Renders child routes here */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
