// src/components/Sidebar.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { FaHome, FaDatabase, FaUsers, FaMoon, FaSun } from "react-icons/fa"; // Icons for sidebar items
import "./Sidebar.css";

function Sidebar() {
  const { theme, toggleTheme } = useContext(DashboardContext);
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Actions</h2>
      <nav className="sidebar-links">
        <Link to="home" className="sidebar-link">
          <FaHome className="icon" />
          Home
        </Link>
        <Link to="assets" className="sidebar-link">
          <FaDatabase className="icon" />
          Assets
        </Link>
        <Link to="employees" className="sidebar-link">
          <FaUsers className="icon" />
          Assets
        </Link>
      </nav>
      <div className="sidebar-footer">
        <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === "light" ? (
            <>
              <FaMoon className="icon" /> Dark Mode
            </>
          ) : (
            <>
              <FaSun className="icon" /> Light Mode
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
