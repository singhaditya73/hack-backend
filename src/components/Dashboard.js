import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleManagement from '../pages/RoleManagement';
import SessionMonitor from '../pages/SessionMonitor';
import SecurityAuditLog from '../pages/SecurityAuditLog';
import './Dashboard.css';

const DashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // If no user is found in localStorage, redirect to login page
      navigate("/login");
    } else {
      setIsAuthenticated(true); // User is authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null; // Don't render the dashboard content if the user is not authenticated
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>SecureOps</h1>
        <div className="security-status">
          Security Status: <span>Low</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </header>
      <main>
        <section className="top-section">
          <RoleManagement />
          <SessionMonitor />
        </section>
        <section className="bottom-section">
          <SecurityAuditLog />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
