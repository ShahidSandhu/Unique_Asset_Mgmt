// src/components/Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Nav
      className="flex-column p-3"
      style={{ width: "250px", backgroundColor: "#343a40", color: "white" }}
    >
      <Nav.Link as={Link} to="/" style={{ color: "white" }}>
        Dashboard Home
      </Nav.Link>
      <Nav.Link as={Link} to="/assets" style={{ color: "white" }}>
        Assets
      </Nav.Link>
      <Nav.Link as={Link} to="/employees" style={{ color: "white" }}>
        Employees
      </Nav.Link>
    </Nav>
  );
}

export default Sidebar;
