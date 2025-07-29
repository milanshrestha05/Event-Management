import React, { useState, useEffect } from "react";

const defaultAddTestimonial = (name, feedback) => {
  console.log("New Feedback:", { name, feedback });
};

export default function Feedback({ addTestimonial = defaultAddTestimonial }) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFadeIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && feedback.trim()) {
      addTestimonial(name.trim(), feedback.trim());
      setName("");
      setFeedback("");
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 2000);
    }
  };

  return (
    <section
      className={`py-20 px-4 transition-opacity duration-1000 animate-fade-in-up ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } bg-gradient-to-tr from-indigo-100 to-purple-200`}
    >
      <div className="max-w-3xl p-10 mx-auto bg-white shadow-2xl rounded-2xl md:p-14">
        <h3 className="mb-8 text-4xl font-extrabold text-center text-indigo-800 drop-shadow-sm">
          Share Your Feedback
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-lg font-semibold text-black"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 text-gray-900 border border-transparent rounded-lg shadow-md bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block mb-2 text-lg font-semibold text-black"
            >
              Your Opinion
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="6"
              className="w-full p-4 text-gray-900 border border-transparent rounded-lg shadow-md bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Share your experience"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition-transform bg-indigo-700 rounded-lg hover:bg-indigo-800 hover:scale-105"
          >
            Submit Feedback
          </button>

          {isSubmitted && (
            <p className="mt-4 font-semibold text-center text-black">
              Thank you for your feedback!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
