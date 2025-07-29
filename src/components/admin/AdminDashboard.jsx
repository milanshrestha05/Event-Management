import React, { useState, useEffect } from "react";
import { logoutUser } from "../../auth";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";

const LOCAL_STORAGE_KEY = "eventful_events";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setEvents(storedEvents);
    setFadeIn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...events];
      updated[editIndex] = formData;
      setEvents(updated);
      setSuccessMsg("Event updated successfully!");
    } else {
      setEvents([...events, formData]);
      setSuccessMsg("Event added successfully!");
    }
    setFormData({ title: "", date: "", location: "", description: "" });
    setEditIndex(null);
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const handleEdit = (index) => {
    setFormData(events[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updated = [...events];
      updated.splice(index, 1);
      setEvents(updated);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/adminlogin");
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      className={`min-h-screen px-4 py-10 bg-gradient-to-tr from-indigo-100 to-purple-200 transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-5xl p-8 mx-auto bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-indigo-700">
            Admin Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {successMsg && (
          <div className="p-3 mb-4 font-medium text-center text-green-800 bg-green-100 border border-green-200 rounded-lg">
            {successMsg}
          </div>
        )}

        <form
          onSubmit={handleAddOrEdit}
          className="grid gap-4 mb-10 md:grid-cols-2"
        >
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 border border-transparent rounded-lg bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-3 border border-transparent rounded-lg bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="p-3 border border-transparent rounded-lg bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="p-3 border border-transparent rounded-lg bg-indigo-50 focus:ring-2 focus:ring-indigo-500 md:col-span-2"
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 md:col-span-2"
          >
            {editIndex !== null ? "Update Event" : "Add Event"}
          </button>
        </form>

        <div className="mb-10">
          <h3 className="mb-4 text-xl font-semibold text-indigo-700">
            Event Stats
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 text-center shadow bg-indigo-50 rounded-xl">
              <h4 className="text-2xl font-bold text-indigo-700">
                {events.length}
              </h4>
              <p className="text-sm text-gray-600">Total Events</p>
            </div>
            <div className="p-4 text-center shadow bg-indigo-50 rounded-xl">
              <h4 className="text-2xl font-bold text-indigo-700">
                {events.filter((e) => new Date(e.date) >= new Date()).length}
              </h4>
              <p className="text-sm text-gray-600">Upcoming Events</p>
            </div>
            <div className="p-4 text-center shadow bg-indigo-50 rounded-xl">
              <h4 className="text-2xl font-bold text-indigo-700">
                {new Set(events.map((e) => e.location)).size}
              </h4>
              <p className="text-sm text-gray-600">Locations</p>
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search events by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 bg-white border rounded-lg shadow focus:ring-2 focus:ring-indigo-500"
        />

        <h3 className="mb-4 text-xl font-semibold text-indigo-700">
          All Events
        </h3>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500">No matching events found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredEvents.map((event, index) => (
              <li
                key={index}
                className="flex flex-col justify-between p-4 border shadow-md bg-gray-50 rounded-xl md:flex-row md:items-center"
              >
                <div className="mb-2 md:mb-0">
                  <h4 className="text-lg font-bold text-indigo-800">
                    {event.title}
                  </h4>
                  <p className="flex items-center gap-1 text-sm text-gray-600">
                    <FaCalendarAlt className="text-indigo-500" /> {event.date}{" "}
                    &nbsp;
                    <FaMapMarkerAlt className="ml-4 text-indigo-500" />{" "}
                    {event.location}
                  </p>
                  {event.description && (
                    <p className="mt-1 text-sm text-gray-500">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-4 py-1 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-4 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
