import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { getAuth, signOut } from "firebase/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("eventful_events")) || [];
    setEvents(storedEvents);
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const today = new Date();

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return activeTab === "upcoming" ? eventDate >= today : eventDate < today;
  });

  return (
    <>
      <Navbar />

      <section className="text-center text-white py-28 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 animate-fade-in-down">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-4xl font-extrabold">Welcome to Your Dashboard</h2>
          <p className="mb-6 text-lg">Stay updated with all your upcoming events.</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 font-semibold text-indigo-700 transition bg-white rounded shadow hover:bg-gray-100 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </section>

      <section className="pt-20 pb-10 text-center bg-white">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Your Events</h3>
        <div className="flex justify-center mb-8 space-x-6">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "upcoming"
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "past"
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Past Events
          </button>
        </div>

        <div className="container px-4 mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <p className="text-gray-500">No events to show.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
              {filteredEvents.map((event, i) => (
                <div
                  key={i}
                  className="p-6 transition duration-300 bg-white border border-gray-100 shadow rounded-xl hover:shadow-md hover:scale-105"
                >
                  <h4 className="mb-2 text-xl font-semibold text-indigo-700">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-700">📅 {event.date}</p>
                  <p className="text-sm text-gray-700">📍 {event.location}</p>
                  {event.description && (
                    <p className="mt-2 text-sm text-gray-500">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 text-center bg-indigo-50">
        <h3 className="mb-6 text-3xl font-bold text-indigo-800">Your Stats</h3>
        <div className="grid max-w-5xl grid-cols-1 gap-6 px-6 mx-auto md:grid-cols-3">
          <div className="p-6 transition bg-white rounded-lg shadow-md hover:shadow-xl">
            <h4 className="text-3xl font-bold text-indigo-700">🎉 12</h4>
            <p className="mt-2 text-gray-600">Events Attending</p>
          </div>
          <div className="p-6 transition bg-white rounded-lg shadow-md hover:shadow-xl">
            <h4 className="text-3xl font-bold text-indigo-700">👥 240+</h4>
            <p className="mt-2 text-gray-600">Total Attendees</p>
          </div>
          <div className="p-6 transition bg-white rounded-lg shadow-md hover:shadow-xl">
            <h4 className="text-3xl font-bold text-indigo-700">📆 8</h4>
            <p className="mt-2 text-gray-600">Events This Month</p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-white">
        <h3 className="mb-4 text-3xl font-bold text-gray-800">Need Help?</h3>
        <p className="mb-6 text-gray-600">Our support team is here to assist you.</p>
        <a
          href="mailto:sthamilan0000@gmail.com"
          className="inline-block px-6 py-3 text-white transition bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700"
        >
          eventful0000@gmail.com
        </a>
      </section>

      <footer className="py-6 text-sm text-center text-gray-500 bg-gray-100 border-t">
        © 2025 Eventful. All rights reserved.
      </footer>
    </>
  );
}