// src/components/Sidebar.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import {
  FaHome,
  FaDatabase,
  FaUsers,
  FaMoon,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const { theme, toggleTheme } = useContext(DashboardContext);
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Actions</h2>
      <nav className="sidebar-links">
        <Link
          to="home"
          className={`sidebar-link ${
            location.pathname.includes("home") ? "active" : ""
          }`}
        >
          <FaHome className="icon" />
          Home
        </Link>
        <Link
          to="assets"
          className={`sidebar-link ${
            location.pathname.includes("assets") ? "active" : ""
          }`}
        >
          <FaDatabase className="icon" />
          Assets
        </Link>
        <Link
          to="employees"
          className={`sidebar-link ${
            location.pathname.includes("employees") ? "active" : ""
          }`}
        >
          <FaUsers className="icon" />
          Employee
        </Link>
        <Link
          to="users"
          className={`sidebar-link ${
            location.pathname.includes("users") ? "active" : ""
          }`}
        >
          <FaUserCircle className="icon" />
          User
        </Link>
        <Link
          to="TestScroll"
          className={`sidebar-link ${
            location.pathname.includes("TestScroll") ? "active" : ""
          }`}
        >
          <FaUserCircle className="icon" />
          TestScroll
        </Link>
        <Link
          to="TestPage"
          className={`sidebar-link ${
            location.pathname.includes("TestPage") ? "active" : ""
          }`}
        >
          <FaUserCircle className="icon" />
          TestPage
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
