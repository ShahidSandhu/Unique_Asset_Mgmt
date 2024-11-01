// src/components/ChartCard.js
import React from "react";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";




// Register the scale
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function ChartCard() {
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 30, 40],
      },
    ],
  };

  return <Bar data={data} />;
}

export default ChartCard;
