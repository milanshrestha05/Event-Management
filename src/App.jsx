// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Dashboard from "./components/pages/Dashboard";
import PromoteEvents from "./components/pages/PromoteEvents";
import AdminDashboard from "./components/admin/AdminDashboard";
import PrivateRoute from "./components/admin/PrivateRoute";
import AdminLogin from "./components/admin/AdminLogin";
import Feedback from "./components/pages/Feedback"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/promoteevents" element={<PromoteEvents />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute> } />
      </Routes>
    </Router>
  );
}

