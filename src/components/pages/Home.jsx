import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import event2 from "../../assets/Event 4.jpg";
import Navbar from "../pages/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem("userToken");
    navigate(isLoggedIn ? "/dashboard" : "/login");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <section id="home" className="py-32 text-center text-white bg-indigo-600 animate-fade-in-down">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-5xl font-extrabold tracking-tight">
            Host Events. Seamlessly.
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Create, promote, and manage events with ease – all in one platform.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 font-semibold text-indigo-600 transition bg-white rounded-lg hover:bg-gray-200 hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      <section className="px-6 py-20 text-center bg-white animate-fade-in-up">
        <h3 className="mb-4 text-3xl font-bold">Why Choose Eventful?</h3>
        <p className="max-w-xl mx-auto mb-12 text-gray-600">
          We're simplifying event hosting. Whether it's a workshop, conference, or party – Eventful is designed to save you time and boost your reach.
        </p>
        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
          {[
            { title: "Instant Booking", icon: "⚡", text: "Enable fast and secure registrations." },
            { title: "Real-Time Updates", icon: "🔔", text: "Stay in the loop with live status and alerts." },
            { title: "User Friendly", icon: "👌", text: "Modern UI for organizers and attendees alike." },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 transition rounded-lg shadow bg-indigo-50 hover:shadow-md"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h4 className="mb-2 text-xl font-semibold">{feature.title}</h4>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-100 animate-fade-in">
        <div className="container mx-auto mb-12 text-center">
          <h3 className="text-3xl font-bold">Everything You Need</h3>
          <p className="text-gray-600">From creation to check-in.</p>
        </div>
        <div className="grid max-w-4xl gap-10 px-6 mx-auto md:grid-cols-1">

          <div className="flex flex-col overflow-hidden transition transform bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-105 md:flex-row">
            <img src={event2} alt="Promote Events" className="object-cover w-full h-56 md:w-1/2 rounded-t-xl md:rounded-t-none md:rounded-l-xl" />
            <div className="flex flex-col justify-center p-6 text-left md:w-1/2">
              <Link to="/promoteevents" className="mb-2 text-2xl font-bold text-indigo-700 hover:underline">
                Promote Events
              </Link>
              <p className="text-gray-600">
                Use built-in tools to maximize event visibility across platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center bg-white animate-fade-in-up">
        <h3 className="mb-8 text-3xl font-bold">What Our Users Say</h3>
        <div className="grid max-w-4xl gap-8 mx-auto font-serif md:grid-cols-3">
          {[
            {
              name: "Ram",
              feedback:
                "Eventful makes my life easier.",
            },
            {
              name: "Shyam",
              feedback:
                "With the help to Eventful, Booking and managing attendees has been easier.",
            },
            {
              name: "Hari",
              feedback:
                "The platform's interface is  user-friendly.",
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="p-6 transition rounded-lg shadow bg-indigo-50 hover:shadow-md"
            >
              <p className="mb-4 italic text-gray-700">"{testimonial.feedback}"</p>
              <p className="font-semibold text-indigo-700">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-20 text-center bg-white animate-fade-in-up">
        <h3 className="mb-4 text-3xl font-bold">CONTACT US</h3>
        <p className="mb-6 text-gray-600">We're here to help you.</p>
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
