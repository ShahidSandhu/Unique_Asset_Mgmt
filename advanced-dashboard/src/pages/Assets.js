// src/pages/Assets.js
import React, { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import DataTable from "../components/DataTable";

function Assets() {
  const { assets } = useContext(DashboardContext);

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Value", accessor: "value" },
    { Header: "Serial Number", accessor: "serial_number" },
    { Header: "Date Acquired", accessor: "date_acquired" },
  ];

  return (
    <div>
      <h1>Assets</h1>
      <DataTable columns={columns} data={assets} />
    </div>
  );
}

export default Assets;
