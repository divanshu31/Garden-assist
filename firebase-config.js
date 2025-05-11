import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBhQv2w5KN0BpcJt9vEitH1u6xSIlpALXA",
  authDomain: "login-signup-3b9ba.firebaseapp.com",
  projectId: "login-signup-3b9ba",
  storageBucket: "login-signup-3b9ba.firebasestorage.app",
  messagingSenderId: "561319252676",
  appId: "1:561319252676:web:83748a27f70311eaa72f91",
  measurementId: "G-2Z9XLWR32W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
