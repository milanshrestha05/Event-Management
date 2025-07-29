import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function PromoteEvents() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFadeIn(true);
  }, []);

  return (
    <>
      <Navbar />
      <section
        className={`relative flex items-center justify-center py-32 text-center text-white transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(75, 0, 130, 0.85), rgba(139, 0, 139, 0.85)),
            url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=80')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container max-w-4xl px-4 mx-auto">
          <h2 className="mb-6 text-5xl font-extrabold leading-tight drop-shadow-lg">
            Promote Your Events
          </h2>
          <p className="max-w-2xl mx-auto text-xl drop-shadow-md">
            Boost your event’s visibility with built-in tools for social sharing
            and email campaigns.
          </p>
        </div>
      </section>

      <section
        className={`px-6 py-20 text-center bg-white animate-fade-in-up transition duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="mb-6 text-3xl font-bold text-indigo-700">
          Get the Word Out
        </h3>
        <p className="max-w-xl mx-auto text-gray-600 mb-14">
          Share your events far and wide using our integrated promotion
          features.
        </p>

        <div className="grid max-w-5xl gap-10 mx-auto md:grid-cols-2">
          <div className="p-8 transition duration-300 transform shadow-lg bg-indigo-50 rounded-2xl hover:shadow-2xl hover:scale-105">
            <h4 className="mb-4 text-2xl font-semibold text-indigo-800">
              Share on Social Media
            </h4>
            <p className="mb-6 text-gray-700">
              Instantly share your event on platforms like Facebook, Twitter,
              and Instagram with pre-built templates.
            </p>
            <div className="flex justify-center space-x-6 text-3xl text-indigo-600">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>

          <div className="p-8 transition duration-300 transform shadow-lg bg-indigo-50 rounded-2xl hover:shadow-2xl hover:scale-105">
            <h4 className="mb-4 text-2xl font-semibold text-indigo-800">
              Send Email Campaigns
            </h4>
            <p className="mb-6 text-gray-700">
              Engage your audience with beautiful, customizable email invites
              sent directly from the platform.
            </p>
            <div className="flex justify-center text-3xl text-indigo-600">
              <FaEnvelope />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-20 bg-gradient-to-tr from-indigo-100 to-purple-200 text-center animate-fade-in transition duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-3xl px-6 mx-auto">
          <h3 className="mb-6 text-3xl font-bold text-indigo-800">
            Maximize Your Reach
          </h3>
          <p className="mb-10 text-lg text-gray-700">
            Let us help you connect with the right audience through strategic
            promotion tools and insights.
          </p>
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
