// src/components/NavbarComponent.js
import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function NavbarComponent() {
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
          {/* Replace alignRight with align="end" here */}
          <Dropdown.Menu align="end">
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
