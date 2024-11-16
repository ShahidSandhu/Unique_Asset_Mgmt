// src/components/Home.js
import React from "react";
import DataCard from "./DataCard";
import ChartCard from "./ChartCard"; // Assume this component renders a chart

function Home() {
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
    <div className="dashboard-home">
      <h2>Dashboard Overview</h2>
      <div className="data-cards">
        <DataCard title="Total Assets" value="120" />
        <DataCard title="Total Employees" value="45" />
      </div>
      <div className="chart-section">
        <ChartCard data={sampleData} title="Monthly Revenue" />
      </div>
    </div>
  );
}

export default Home;
