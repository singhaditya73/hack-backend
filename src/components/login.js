import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Default credentials for login
    const defaultUsername = "admin";
    const defaultPassword = "password";

    // Check if entered credentials match the default
    if (credentials.username === defaultUsername && credentials.password === defaultPassword) {
      // Storing user info in localStorage on successful login
      localStorage.setItem("user", JSON.stringify({ username: defaultUsername, role: "Admin" }));
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials!"); // Show error for invalid login
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
