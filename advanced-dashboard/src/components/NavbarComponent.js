import React, { useContext } from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css";
import { DashboardContext } from "../context/DashboardContext"; // Import the context
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function NavbarComponent({ toggleSidebar }) {
  const { isAuthenticated, logout } = useAuth();
  const dashboardContext = useContext(DashboardContext);
  const theme = dashboardContext?.theme || "light";
  const toggleTheme = dashboardContext?.toggleTheme || (() => {});
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login");
  };


  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="navbar fixed-top"
    >
      {/* Sidebar Toggle Button on the Left */}
      <Button
        onClick={toggleSidebar}
        variant="outline-light"
        className="mr-3 navbar-toggle"
      >
        <FiMenu size={20} />
      </Button>

      {/* Navbar Brand */}
      <Navbar.Brand href="/dashboard/home" className="navbar-brand">
        Asset Management System
      </Navbar.Brand>

      {/* Right Aligned Profile and Theme Toggle */}
      <Nav className="ms-auto navbar-icons">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            className="profile-dropdown-toggle"
          >
            <FaUserCircle size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/user">
              user
            </Dropdown.Item>
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            {/* {isAuthenticated && <button onClick={logout}>Logout</button>} */}
            {isAuthenticated && (
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Button onClick={toggleTheme} variant="outline-light" className="ms-3">
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </Button>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
