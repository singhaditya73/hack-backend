import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import './SessionMonitor.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SessionMonitor = () => {
  const barData = {
    labels: [...Array(24).keys()].map((h) => `${h}:00`), // Hours of the day
    datasets: [
      {
        label: "Mobile",
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50)), // Random data
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Desktop",
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50)),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#eaeaea" }, beginAtZero: true },
    },
    plugins: { legend: { position: "top" } },
  };

  const pieData = {
    labels: ["Mobile", "Desktop", "Tablet"],
    datasets: [
      {
        data: [55, 40, 5],
        backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(75, 192, 192, 0.7)", "rgba(255, 206, 86, 0.7)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
  };

  return (
    <div className="session-monitor">
      <h2>Active Sessions Monitor</h2>
      <div className="charts">
        <div className="chart-container">
          <h3>Hourly Sessions</h3>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="chart-container">
          <h3>Device Usage</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default SessionMonitor;
