import React, { useState } from "react";
const defaultAddTestimonial = (name, feedback) => {
  console.log("New Feedback:", { name, feedback });
};

export default function Feedback({ addTestimonial = defaultAddTestimonial }) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <div className="max-w-xl p-10 mx-auto mt-10 text-white shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl">
      <h3 className="mb-8 text-4xl font-semibold text-center">Share Your Feedback</h3>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-lg font-medium">Your Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 text-gray-800 bg-white border-2 border-transparent rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="feedback" className="mb-2 text-lg font-medium">Your Opinion</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-4 text-gray-800 bg-white border-2 border-transparent rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            rows="6"
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
          <p className="mt-4 font-semibold text-center text-green-400">
            Thank you for your feedback!
          </p>
        )}
      </form>
    </div>
  );
}
