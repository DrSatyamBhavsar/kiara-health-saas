import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <--- NEW: Database import

const firebaseConfig = {
  // --- PASTE YOUR FIREBASE CONFIG HERE IF IT'S DIFFERENT ---
  // (I am using the one you likely have, but check your Console if unsure)
  apiKey: "AIzaSyCkhc690wnjBDWo9tFOYMEd15p6wKhxwrk", // Ensure this is your real API Key from before
  authDomain: "kiara-health-saas.firebaseapp.com",
  projectId: "kiara-health-saas",
  storageBucket: "kiara-health-saas.firebasestorage.app",
  messagingSenderId: "419058216674", // Optional
  appId: "1:419058216674:web:084ae0e9dcb8500239f8bb" // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication AND Database
export const auth = getAuth(app);
export const db = getFirestore(app); // <--- NEW: This exports the database connection