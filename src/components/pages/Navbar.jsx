import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-800">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-white transition duration-300 hover:text-indigo-300"
        >
          Eventful
        </Link>

        <div className="flex items-center space-x-8">
          <nav className="hidden space-x-6 font-semibold text-white md:flex">
            <a
              href="#home"
              className="relative px-3 py-2 transition rounded-md group hover:text-indigo-300"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-300 transition-all group-hover:w-full"></span>
            </a>

            <a
              href="#contact"
              className="relative px-3 py-2 transition rounded-md group hover:text-indigo-300"
            >
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-300 transition-all group-hover:w-full"></span>
            </a>

            <Link
              to="/feedback"
              className="relative px-3 py-2 transition rounded-md group hover:text-indigo-300"
            >
              Feedback
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-300 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className="text-4xl text-white transition rounded hover:scale-110"
              aria-label="User menu"
              type="button"
            >
              <FaUserCircle />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 rounded-lg shadow-lg bg-slate-900 w-25 ring-1 ring-white ring-opacity-5 animate-fade-in-up">
                <Link
                  to="/login"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-center text-white hover:scale-105 hover:text-indigo-600"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-center text-white hover:scale-105 hover:text-indigo-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
