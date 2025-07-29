import React from "react";
import Navbar from "./Navbar";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function PromoteWebsite() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 text-center text-white bg-indigo-600">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-4xl font-bold">Promote Your Events</h2>
          <p className="max-w-xl mx-auto text-lg">
            Increase your event's reach and visibility with our built-in promotional tools.
          </p>
        </div>
      </section>

      {/* Promotional Tools Section */}
      <section className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Social Media Card */}
            <div className="p-8 bg-white shadow-md rounded-xl hover:shadow-xl transition duration-300">
              <h3 className="mb-3 text-2xl font-semibold text-black">Share on Social Media</h3>
              <p className="mb-4 text-gray-700">
                Easily share your events on Facebook, Twitter, and Instagram to reach a wider audience.
              </p>
              <div className="flex space-x-4 text-2xl text-indigo-600">
                <FaFacebook />
                <FaTwitter />
                <FaInstagram />
              </div>
            </div>

            {/* Email Campaigns Card */}
            <div className="p-8 bg-white shadow-md rounded-xl hover:shadow-xl transition duration-300">
              <h3 className="mb-3 text-2xl font-semibold text-black">Send Email Campaigns</h3>
              <p className="mb-4 text-gray-700">
                Send custom email invitations to your contacts or previous attendees with ease.
              </p>
              <div className="text-2xl text-indigo-600">
                <FaEnvelope />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-sm text-center text-gray-500 bg-gray-100 border-t">
        © 2025 Eventful. All rights reserved.
      </footer>
    </>
  );
}
