import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import event1 from "../../assets/Event 1.jpg";
import event2 from "../../assets/Event 2.jpg";
import event3 from "../../assets/Event 3.jpg";
import event4 from "../../assets/Event 4.jpg";

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

  const events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "August 15, 2025",
      location: "Kathmandu, Nepal",
      image: event1,
    },
    {
      id: 2,
      title: "Startup Pitch Night",
      date: "September 10, 2025",
      location: "Lalitpur, Nepal",
      image: event2,
    },
    {
      id: 3,
      title: "Music Fest",
      date: "October 5, 2025",
      location: "Pokhara, Nepal",
      image: event3,
    },
    {
      id: 4,
      title: "Designers Meetup",
      date: "November 12, 2025",
      location: "Bhaktapur, Nepal",
      image: event4,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className={`relative flex items-center justify-center py-32 text-center text-white transition-opacity duration-1000 ${
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
            className="px-10 py-3 font-semibold text-indigo-600 transition duration-300 bg-white rounded-lg shadow-lg hover:bg-gray-200 hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Why Choose Section */}
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

      {/* Events Section */}
      <section className="px-6 py-20 bg-gradient-to-tr from-indigo-100 to-purple-200">
        <div className="container max-w-6xl mx-auto mb-12 text-center">
          <h2 className="mb-6 text-3xl font-bold text-indigo-800">
            Upcoming Events
          </h2>
          <p className="max-w-xl mx-auto mb-12 text-gray-700">
            Check out some of our exciting events happening soon.
          </p>
        </div>
        <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-2 lg:grid-cols-4">
          {events.map(({ id, title, date, location, image }) => (
            <div
              key={id}
              className="flex flex-col overflow-hidden transition transform bg-white shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105"
            >
              <img
                src={image}
                alt={title}
                className="object-cover w-full h-48 rounded-t-2xl"
                loading="lazy"
              />
              <div className="flex flex-col justify-center p-6 text-left">
                <h3 className="mb-2 text-xl font-bold text-indigo-700">
                  {title}
                </h3>
                <p className="mb-1 text-gray-600">{date}</p>
                <p className="text-gray-600">{location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
<section
  id="contact"
  className="relative py-20 text-center bg-indigo-50 bg-gradient-to-tr from-indigo-100 via-white to-indigo-50"
>
  <div className="max-w-xl px-6 mx-auto">
    <h2 className="mb-6 text-4xl font-extrabold text-indigo-700 drop-shadow-md">
      Contact Us
    </h2>
    <p className="mb-10 text-lg text-indigo-900">
      Have questions? We're here to help!
    </p>

    <div className="mb-12 space-y-6 text-left text-indigo-800">
      <div>
        <strong className="block mb-1">📧 Email</strong>
        <a
          href="mailto:sthamilan0000@gmail.com"
          className="text-indigo-600 hover:underline"
        >
          eventful0000@gmail.com
        </a>
      </div>
      <div>
        <strong className="block mb-1">📞 Phone</strong>
        <p>+977 9848054690</p>
      </div>
      <div>
        <strong className="block mb-1">📍 Address</strong>
        <p>Kathmandu, Nepal</p>
      </div>
    </div>

    <a
      href="mailto:sthamilan0000@gmail.com"
      className="inline-block px-10 py-4 text-lg font-semibold transition transform bg-indigo-700 rounded-full shadow-lg text-indigo-50 hover:bg-indigo-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
      aria-label="Send email"
    >
      Send Us an Email
    </a>
  </div>
</section>


      {/* Footer */}
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
