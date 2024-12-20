import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import DashboardPage from "./components/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import MyChartComponent from "./components/MyChartComponent";  

const App = () => {
  const [chartData, setChartData] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  });

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Effect to apply the theme (dark or light) on mount
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`App ${isDarkMode ? "dark" : "light"}`}>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
                {/* Include the chart component here as part of the dashboard */}
                <MyChartComponent
                  chartData={{
                    labels: ["Red", "Blue", "Yellow", "Green"],
                    datasets: [
                      {
                        label: "Votes",
                        data: [12, 19, 3, 5],
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                      },
                    ],
                  }}
                  chartType="bar"
                  title="Dashboard Chart"
                />
              </ProtectedRoute>
            }
          />

          {/* Standalone Chart Demo */}
          <Route
            path="/chart-demo"
            element={
              <div>
                <h1 style={{ textAlign: "center", fontFamily: "'Roboto', sans-serif" }}>
                  My Chart Demo
                </h1>
                <MyChartComponent
                  chartData={{
                    labels: ["Red", "Blue", "Yellow", "Green"],
                    datasets: [
                      {
                        label: "Votes",
                        data: [12, 19, 3, 5],
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                      },
                    ],
                  }}
                  chartType="pie"
                  title="Sample Pie Chart"
                />
              </div>
            }
          />

          {/* Redirect unknown routes to Login */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
