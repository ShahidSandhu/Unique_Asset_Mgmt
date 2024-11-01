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
      <h2 className="sidebar-title">Asset Management System</h2>
      <nav className="sidebar-links">
        <Link
          to="/"
          className={`sidebar-link ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <FaHome className="icon" /> Dashboard Home
        </Link>
        <Link
          to="/assets"
          className={`sidebar-link ${
            location.pathname === "/assets" ? "active" : ""
          }`}
        >
          <FaDatabase className="icon" /> Assets
        </Link>
        <Link
          to="/employees"
          className={`sidebar-link ${
            location.pathname === "/employees" ? "active" : ""
          }`}
        >
          <FaUsers className="icon" /> Employees
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
