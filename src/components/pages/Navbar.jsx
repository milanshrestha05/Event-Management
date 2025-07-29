import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Optional: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 text-white shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-extrabold tracking-tight transition duration-300 hover:text-gray-200"
        >
          Eventful
        </Link>

        {/* Nav Links */}
        <nav className="relative flex items-center space-x-8">
          <a
            href="#home"
            className="text-lg font-medium transition duration-200 hover:text-gray-200"
          >
            Home
          </a>
          <a
            href="#contact"
            className="text-lg font-medium transition duration-200 hover:text-gray-200"
          >
            Contact
          </a>
          <Link
            to="/feedback"
            className="text-lg font-medium transition duration-200 hover:text-gray-200"
          >
            Feedback
          </Link>

          {/* User Icon + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-3xl transition duration-200 hover:text-gray-200 focus:outline-none"
              aria-label="User menu"
            >
              <FaUserCircle />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-3 w-36 overflow-hidden text-gray-800 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link
                  to="/login"
                  className="block px-4 py-2 transition hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 transition hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
