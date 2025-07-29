import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../../utils/auth";

export default function PrivateRoute({ children }) {

  const token = isAuthenticated();
  const role = getUserRole();

  if (!token || role !== "admin") {

    return <Navigate to="/adminlogin" replace />;
  }

  return children;
}
