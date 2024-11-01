// src/components/NavbarComponent.js
import React from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css";

function NavbarComponent({ toggleSidebar }) {
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
        <Button
          onClick={toggleSidebar}
          variant="outline-light"
          className="mr-3"
        >
          <FiMenu size={20} /> {/* Toggle Sidebar Icon */}
        </Button>
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
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
