import React from "react";
import { Navigate } from "react-router-dom";
import './ProtectedRoute.css'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
