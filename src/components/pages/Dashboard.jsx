import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { logoutUser } from "../../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [events, setMyEvents] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("eventful_events")) || [];
    setMyEvents(events);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <section className="py-32 text-center text-white bg-indigo-700">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-4xl font-bold">Welcome to Your Dashboard</h2>
          <p className="mb-6 text-lg">Look your events, view stats, and stay organized.</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 font-semibold text-indigo-700 transition bg-white rounded hover:bg-gray-200 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </section>

      <section className="py-20 text-center bg-gray-100">
        <h3 className="mb-4 text-3xl font-bold">Events</h3>
        <p className="mb-8 text-gray-600">Join us and make memories that last a lifetime.</p>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {events.map((event, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl hover:scale-105 group"
              >
                <h2 className="mb-2 text-2xl font-semibold text-indigo-700 group-hover:underline">
                  {event.title}
                </h2>
                <p className="mb-1 text-black">Date: {event.date}</p>
                <p className="mb-4 text-black">Location: {event.location}</p>
                {event.description && (
                  <p className="text-sm text-gray-500">{event.description}</p>
                )}
              </div>
            ))}
          </div>
      </section>

      <section className="py-20 text-center bg-white">
        <h3 className="mb-6 text-3xl font-bold">Event Stats</h3>
        <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-3">
          <div className="p-6 rounded-lg shadow bg-indigo-50 hover:shadow-md">
            <h4 className="text-2xl font-bold text-indigo-700">12</h4>
            <p className="mt-2 text-gray-600">Events Created</p>
          </div>
          <div className="p-6 rounded-lg shadow bg-indigo-50 hover:shadow-md">
            <h4 className="text-2xl font-bold text-indigo-700">240+</h4>
            <p className="mt-2 text-gray-600">Total Attendees</p>
          </div>
          <div className="p-6 rounded-lg shadow bg-indigo-50 hover:shadow-md">
            <h4 className="text-2xl font-bold text-indigo-700">8</h4>
            <p className="mt-2 text-gray-600">Events This Month</p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-gray-50">
        <h3 className="mb-4 text-3xl font-bold">Need Help?</h3>
        <p className="mb-4 text-gray-600">Our team is always here to support your events.</p>
        <a href="mailto:sthamilan0000@gmail.com" className="font-semibold text-indigo-600 underline">
          eventful0000@gmail.com
        </a>
      </section>

      <footer className="py-6 text-sm text-center text-gray-500 bg-gray-100 border-t">
        © 2025 Eventful. All rights reserved.
      </footer>
    </>
  );
}

