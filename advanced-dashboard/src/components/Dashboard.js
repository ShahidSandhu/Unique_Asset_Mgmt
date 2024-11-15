// src/components/Dashboard.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Assets from "../pages/Assets";
import Employees from "../pages/Employees";
import Users from "./Users"; // Users component import
import "./Dashboard.css";
import TestScroll from "../components/TestScroll"; // Adjust path if needed
import TestPage from "./TestPage";
import AssetForm from "./AssetForm";
import AssetList from "./AssetList";

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
              <Route path="home" element={<Home />} />
              {/* Assets page and nested routes for editing */}
              {/* <Route path="assets" element={<Assets />} /> */}
              <Route path="assets/:assetId" element={<Assets />} />{" "}
              {/* Route for listing all assets */}
              <Route path="/assets" element={<AssetList />} />
              {/* Route for creating a new asset */}
              <Route path="/assets/new" element={<AssetForm />} />
              {/* Route for editing an asset by ID */}
              <Route path="/assets/:assetId" element={<AssetForm />} />
              {/* This handles both creating and editing assets */}
              <Route path="employees" element={<Employees />} />
              <Route path="users" element={<Users />} />
              <Route path="testscroll" element={<TestScroll />} />
              <Route path="testpage" element={<TestPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
