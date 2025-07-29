// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVKtYkxPwlOyngZcAPdmyMESifcZ4fELM",
  authDomain: "event-management-16.firebaseapp.com",
  projectId: "event-management-16",
  storageBucket: "event-management-16.appspot.com", // ✅ correct
  messagingSenderId: "348785065975",
  appId: "1:348785065975:web:90a2484f960db4e44cb8f2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
