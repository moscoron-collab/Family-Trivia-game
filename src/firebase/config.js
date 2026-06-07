// ============================================================
// FAMILY TRIVIA BATTLE — Firebase Configuration
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project called "family-trivia-battle"
// 3. Add a Web App to the project
// 4. Copy your config values below
// 5. In Firebase Console, enable:
//    - Authentication → Google provider + Anonymous provider
//    - Realtime Database → Start in test mode
//    - Firestore Database → Start in test mode
// ============================================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// These Firebase web values are safe to ship in the browser (Google secures
// your data with Auth + Database Rules, not by hiding these). Environment
// variables override them when present (see .env / .env.example), otherwise
// the project defaults below are used so a fresh deploy always works.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCbXeyqkQCksvmUVx1FKVrZOeB6AxJs-ro",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "family-trivia-f9231.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://family-trivia-f9231-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "family-trivia-f9231",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "family-trivia-f9231.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "516529562520",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:516529562520:web:73f5bfbcb3121589a1c1ed",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);

export default app;
