// src/components/pages/Signup.jsx
import { useState } from "react";
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
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!fullName || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set displayName in Firebase Auth user profile
      await updateProfile(user, {
        displayName: fullName,
      });

      // Save fullName and other info in Firestore
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
          alert("This email is already registered. Please log in.");
          navigate("/login");
          break;
        case "auth/invalid-email":
          alert("Invalid email address.");
          break;
        case "auth/weak-password":
          alert("Password is too weak. Use at least 6 characters.");
          break;
        default:
          alert("Signup failed: " + error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save or update user info in Firestore
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
      alert("Google sign-in failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md p-8 bg-white rounded shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-700">
          Create an Eventful Account
        </h2>

        <label className="block mb-2 font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <button
          type="submit"
          className="w-full py-3 mb-4 text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Sign Up
        </button>

        <div className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log In
          </Link>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 mt-4 text-indigo-700 bg-white border border-indigo-600 rounded hover:bg-indigo-50"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
