// src/components/ChartCard.js
import React from "react";
import { Bar } from "react-chartjs-2";

function ChartCard({ data, title }) {
  return (
    <div className="card mb-3">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default ChartCard;
