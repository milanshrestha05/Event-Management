import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../auth";
import { FaUserShield } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setFadeIn(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin123") {
      loginUser("adminToken123", "admin");
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 to-purple-200 transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-10 bg-white border border-indigo-200 shadow-2xl rounded-2xl"
      >
        <div className="flex items-center justify-center mb-6">
          <FaUserShield className="mr-2 text-4xl text-indigo-700" />
          <h2 className="text-3xl font-extrabold text-indigo-700">
            Admin Portal
          </h2>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm font-semibold text-center text-red-600 bg-red-100 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="admin@gmail.com"
          className="w-full p-3 mb-4 text-gray-900 rounded-lg shadow-sm bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 mb-6 text-gray-900 rounded-lg shadow-sm bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white transition-transform bg-indigo-700 rounded-lg hover:bg-indigo-800 hover:scale-105"
        >
          Log In
        </button>
      </form>
    </section>
  );
}
