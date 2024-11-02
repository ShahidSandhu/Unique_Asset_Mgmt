// src/pages/Employees.jstext } from "react";
import React, { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import DataTable from "../components/DataTable";

function Employees() {
  const { employees } = useContext(DashboardContext);

  const columns = [
    // { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    // { Header: "Serial Number", accessor: "serial_number" },
    { Header: "Created on", accessor: "created_at" },
  ];

  return (
    <div className="employees-page">
      <h2>Employees</h2>
      <DataTable columns={columns} data={employees} />
    </div>
  );
}

export default Employees;
