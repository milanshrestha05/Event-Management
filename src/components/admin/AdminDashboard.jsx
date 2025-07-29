import React, { useState, useEffect } from "react";
import { logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const LOCAL_STORAGE_KEY = "eventful_events";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Load events on first mount
  useEffect(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (Array.isArray(storedEvents)) {
        setEvents(storedEvents);
      }
    } catch (err) {
      console.error("Error loading events from localStorage:", err);
    }
    setIsLoaded(true);
  }, []);

  // Save events when updated, after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    }
  }, [events, isLoaded]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location) return;

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

    setTimeout(() => setSuccessMsg(""), 5000);
  };

  const handleEdit = (index) => {
    setFormData(events[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {successMsg && (
          <div className="p-2 mb-4 text-center text-green-700 bg-green-100 rounded">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleAddOrEdit} className="mb-10 space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            {editIndex !== null ? "Update Event" : "Add Event"}
          </button>
        </form>

        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold">Event Stats</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-4 text-center rounded bg-indigo-50">
              <h4 className="text-2xl font-bold text-indigo-700">{events.length}</h4>
              <p className="text-sm text-gray-600">Total Events</p>
            </div>
            <div className="p-4 text-center rounded bg-indigo-50">
              <h4 className="text-2xl font-bold text-indigo-700">
                {events.filter((e) => new Date(e.date) >= new Date()).length}
              </h4>
              <p className="text-sm text-gray-600">Upcoming Events</p>
            </div>
            <div className="p-4 text-center rounded bg-indigo-50">
              <h4 className="text-2xl font-bold text-indigo-700">
                {new Set(events.map((e) => e.location)).size}
              </h4>
              <p className="text-sm text-gray-600">Unique Locations</p>
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search events by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border rounded"
        />

        <div>
          <h3 className="mb-4 text-xl font-semibold">All Events</h3>
          {filteredEvents.length === 0 ? (
            <p className="text-gray-500">No matching events found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredEvents.map((event, index) => (
                <li
                  key={index}
                  className="flex flex-col items-start justify-between p-4 border rounded bg-gray-50 md:flex-row md:items-center"
                >
                  <div className="mb-2 md:mb-0">
                    <h4 className="text-lg font-bold">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {event.date} - {event.location}
                    </p>
                    {event.description && (
                      <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                    )}
                  </div>
                  <div className="mt-2 space-x-2 md:mt-0">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
