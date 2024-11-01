// src/components/NavbarComponent.js

import React, { useContext } from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { DashboardContext } from "../context/DashboardContext";

function NavbarComponent() {
  const dashboardContext = useContext(DashboardContext);
  const theme = dashboardContext?.theme || "light";
  const toggleTheme = dashboardContext?.toggleTheme || (() => {});

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="navbar fixed-top"
    >
      <Navbar.Brand href="/" className="navbar-brand">
        Asset Management System
      </Navbar.Brand>
      <Nav className="ml-auto navbar-icons">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            className="profile-dropdown-toggle"
          >
            <FaUserCircle size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button onClick={toggleTheme} variant="outline-light" className="ml-3">
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </Button>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
