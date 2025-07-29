import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = "username@gmail.com";
    const validPassword = "user123";

    if (email === validEmail && password === validPassword) {
      loginUser("userToken123", "user");

      navigate("/dashboard");
    } else {
      setError("Invalid user credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-700">Login to EventFul</h2>

        {error && (
          <div className="p-2 mb-4 text-center text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}
        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/>
          
        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>

        <button type="submit" className="w-full p-3 text-white bg-indigo-600 rounded hover:bg-indigo-700">Log In</button>

        <div className="mt-6 text-sm text-center text-gray-600">
          New to EventFul?
          <Link to="/signup" className="text-indigo-600 hover:underline">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
