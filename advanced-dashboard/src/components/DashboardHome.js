// src/components/DashboardHome.js
import React from "react";
import ChartCard from "./ChartCard";
import DataCard from "./DataCard";

function DashboardHome() {
  const sampleData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <DataCard title="Total Assets" value="120" />
        </div>
        <div className="col-md-6">
          <DataCard title="Total Employees" value="45" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ChartCard data={sampleData} title="Monthly Revenue" />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
