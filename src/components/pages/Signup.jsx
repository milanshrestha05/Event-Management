import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../utils/auth";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (
        fullName.trim() === "" ||
        email.trim() === "" ||
        password.length < 6
      ) {
        setError(
          "Please fill in all fields and use a password with 6+ characters."
        );
        setLoading(false);
        return;
      }

      const fakeToken = "user123token";
      loginUser(fakeToken, "user");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-700">Create an Eventful Account</h2>
        {error && (
          <div className="px-4 py-2 mb-4 text-sm text-center text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}

        <label className="block mb-2 font-medium text-gray-700">Full Name</label>
        <input type="text" className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required/>

        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input type="email" className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/>

        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input type="password" className="w-full p-3 mb-4 border border-gray-300 rounded"value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>

        <button type="submit"
          disabled={loading}
          className={`w-full text-white p-3 rounded ${
          loading ? "bg-indigo-300 cursor-not-allowed" 
          : "bg-indigo-600 hover:bg-indigo-700"}`} >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">Log In</Link>
        </div>
      </form>
    </div>
  );
}
