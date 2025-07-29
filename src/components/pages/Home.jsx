import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import event2 from "../../assets/Event 4.jpg";
import Navbar from "../pages/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem("userToken");
    navigate(isLoggedIn ? "/dashboard" : "/login");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setFadeIn(true);
  }, []);

  return (
    <>
      <Navbar />

      <section
        id="home"
        className={`relative flex items-center justify-center py-32 text-center text-white animate-fade-in-down transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(75, 0, 130, 0.75), rgba(139, 0, 139, 0.75)),
            url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container max-w-4xl px-4 mx-auto">
          <h1 className="mb-6 text-5xl font-extrabold leading-tight drop-shadow-lg">
            Host Events. Seamlessly.
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-xl drop-shadow-md">
            Create, promote, and manage events with ease — all in one platform.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-10 py-3 font-semibold text-indigo-600 transition duration-300 transform bg-white rounded-lg shadow-lg hover:bg-gray-200 hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      <section
        className={`px-6 py-20 text-center bg-white animate-fade-in-up transition duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="mb-6 text-3xl font-bold text-indigo-700">
          Why Choose Eventful?
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 mb-14">
          We're simplifying event hosting. Whether it's a workshop, conference,
          or party — Eventful saves you time and boosts your reach.
        </p>
        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
          {[
            {
              title: "⚡ Instant Booking",
              text: "Enable fast and secure registrations.",
            },
            {
              title: "🔔 Real-Time Updates",
              text: "Stay in the loop with live status and alerts.",
            },
            {
              title: "👌 User Friendly",
              text: "Modern UI for organizers and attendees alike.",
            },
          ].map(({ title, text }, i) => (
            <div
              key={i}
              className="p-6 transition duration-300 transform rounded-lg shadow-lg cursor-default bg-indigo-50 hover:shadow-2xl hover:scale-105"
            >
              <div className="mb-5 text-5xl">{title.split(" ")[0]}</div>
              <h3 className="mb-3 text-xl font-semibold">{title.slice(2)}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`py-20 bg-gradient-to-tr from-indigo-100 to-purple-200 animate-fade-in transition duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-indigo-800">
            Everything You Need
          </h2>
          <p className="text-gray-700">From creation to check-in.</p>
        </div>

        <div className="grid max-w-4xl gap-10 px-6 mx-auto md:grid-cols-1">
          <div className="flex flex-col overflow-hidden transition transform bg-white shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 md:flex-row">
            <img
              src={event2}
              alt="Promote Events"
              className="object-cover w-full h-56 rounded-t-2xl md:rounded-t-none md:rounded-l-2xl md:w-1/2"
              loading="lazy"
            />
            <div className="flex flex-col justify-center p-8 text-left md:w-1/2">
              <Link
                to="/promoteevents"
                className="mb-4 text-3xl font-bold text-indigo-700 hover:underline"
              >
                Promote Events
              </Link>
              <p className="leading-relaxed text-gray-700">
                Use built-in tools to maximize event visibility across
                platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`px-6 py-20 text-center bg-white animate-fade-in-up transition duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="mb-12 text-3xl font-bold text-indigo-700">
          What Our Users Say
        </h2>
        <div className="grid max-w-4xl gap-8 mx-auto font-serif md:grid-cols-3">
          {[
            { name: "Ram", feedback: "Eventful makes my life easier." },
            {
              name: "Shyam",
              feedback:
                "Booking and managing attendees has been easier with Eventful.",
            },
            {
              name: "Hari",
              feedback: "The platform's interface is user-friendly.",
            },
          ].map(({ name, feedback }, i) => (
            <blockquote
              key={i}
              className="p-6 transition duration-300 transform shadow-lg rounded-2xl bg-indigo-50 hover:shadow-2xl hover:scale-105"
            >
              <p className="mb-6 italic text-gray-700">
                &quot;{feedback}&quot;
              </p>
              <footer className="font-semibold text-indigo-700">
                - {name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative py-20 bg-indigo-50 bg-gradient-to-tr from-indigo-100 via-white to-indigo-50"
      >
        <div className="relative max-w-xl px-6 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-extrabold text-indigo-700 drop-shadow-md">
            Contact Us
          </h2>
          <p className="mb-10 text-lg text-indigo-900">
            We're here to help you.
          </p>

          <a
            href="sthamilan0000@gmail.com"
            className="inline-block px-10 py-4 text-lg font-semibold transition transform bg-indigo-700 rounded-full shadow-lg text-indigo-50 hover:bg-indigo-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
            aria-label="Send email to sthamilan0000@gmail.com"
          >
            eventful0000@gmail.com
          </a>
        </div>
      </section>

      <footer className="py-8 bg-indigo-900">
        <div className="px-6 mx-auto text-center max-w-7xl">
          <p className="text-sm font-light text-indigo-300 select-none">
            © 2025 Eventful. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
