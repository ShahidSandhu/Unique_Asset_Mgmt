// src/components/Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <NavbarComponent /> {/* Navbar at the top */}
      <div className="dashboard-body">
        <Sidebar /> {/* Sidebar on the left */}
        <main className="dashboard-main">
          <Outlet /> {/* Main content */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
