// src/components/NavbarComponent.js

import React, { useContext } from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { DashboardContext } from "../context/DashboardContext";

function NavbarComponent() {
  // Check if DashboardContext is available, otherwise, provide fallback values
  const dashboardContext = useContext(DashboardContext);
  const theme = dashboardContext?.theme || "light"; // Defaults to "light"
  const toggleTheme = dashboardContext?.toggleTheme || (() => {}); // No-op function if undefined

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="navbar">
      <Navbar.Brand href="/" className="navbar-brand">
        Asset Management System
      </Navbar.Brand>
      <Nav className="ml-auto navbar-icons">
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            className="profile-dropdown-toggle"
          >
            <FaUserCircle size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          onClick={toggleTheme}
          variant="outline-light"
          className="ml-auto"
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </Button>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
