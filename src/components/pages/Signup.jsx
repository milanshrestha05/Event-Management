import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email: user.email,
        createdAt: new Date(),
      });

      console.log("Signup and Firestore write successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please log in.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Use at least 6 characters.");
          break;
        default:
          setError("Signup failed: " + error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: user.displayName || "Google User",
        email: user.email,
        createdAt: new Date(),
      });

      console.log("Google sign-in successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSignUp}
        className={`w-full max-w-md bg-white bg-opacity-90 rounded-2xl p-10 shadow-2xl transform transition-all duration-700 ease-out
          ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        `}
      >
        <h2 className="mb-8 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
          Create Your Eventful Account
        </h2>

        {error && (
          <div className="p-3 mb-6 font-semibold text-center text-red-700 bg-red-100 rounded-lg animate-pulse">
            {error}
          </div>
        )}

        <label
          htmlFor="fullName"
          className="block mb-2 text-sm font-semibold text-gray-700"
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          className="w-full px-5 py-3 mb-6 placeholder-gray-400 transition duration-300 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />

        <label
          htmlFor="email"
          className="block mb-2 text-sm font-semibold text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-5 py-3 mb-6 placeholder-gray-400 transition duration-300 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label
          htmlFor="password"
          className="block mb-2 text-sm font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-5 py-3 mb-6 placeholder-gray-400 transition duration-300 border border-gray-300 shadow-sm rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full py-3 mb-5 font-semibold text-white transition-transform duration-300 transform shadow-lg rounded-xl bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 hover:from-indigo-700 hover:via-purple-800 hover:to-pink-700 hover:scale-105"
        >
          Sign Up
        </button>

        <div className="mb-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-700 transition-colors duration-300 hover:underline hover:text-indigo-900"
          >
            Log In
          </Link>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-3 text-indigo-700 transition duration-300 transform bg-white border-2 border-indigo-700 shadow-md rounded-xl hover:bg-indigo-50 hover:scale-105"
        >
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4285F4"
              d="M24 9.5c3.44 0 6.54 1.22 8.89 3.23l6.65-6.65C34.28 2.53 29.5 0 24 0 14.67 0 6.79 6.12 3.69 14.94l7.75 6.03C12.82 15.43 18.95 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.5 24c0-1.61-.15-3.15-.44-4.62H24v8.75h12.74c-.55 2.95-2.23 5.44-4.74 7.12l7.37 5.7C43.46 36.5 46.5 30.81 46.5 24z"
            />
            <path
              fill="#FBBC05"
              d="M10.43 28.97a14.5 14.5 0 010-9.93l-7.75-6.03A23.998 23.998 0 000 24c0 3.87 1 7.5 2.75 10.74l7.68-5.77z"
            />
            <path
              fill="#EA4335"
              d="M24 48c6.48 0 11.93-2.15 15.9-5.85l-7.37-5.7c-2.16 1.46-4.9 2.32-8.53 2.32-5.06 0-9.35-3.42-10.87-8.02l-7.75 5.77C6.81 41.89 14.65 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
}
