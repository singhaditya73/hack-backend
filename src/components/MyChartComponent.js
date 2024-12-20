import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./MyChartComponent.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const MyChartComponent = ({ chartData, chartType = "pie", title = "My Chart" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      // Destroy any existing chart to prevent conflicts
      if (window.myChart) {
        window.myChart.destroy();
      }

      // Validate chartData
      console.log("Chart Data:", chartData);

      // Create a new chart
      window.myChart = new ChartJS(ctx, {
        type: chartType,
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: title,
              font: {
                size: 18,
                family: "'Roboto', sans-serif",
              },
            },
            tooltip: {
              backgroundColor: "#ffffff",
              borderColor: "#dddddd",
              borderWidth: 1,
              titleColor: "#000000",
              bodyColor: "#333333",
            },
            legend: {
              position: "top",
              labels: {
                color: "#333333",
                font: {
                  size: 14,
                  family: "'Roboto', sans-serif",
                },
              },
            },
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (window.myChart) {
        window.myChart.destroy();
      }
    };
  }, [chartData, chartType, title]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MyChartComponent;
