// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEMcRQPe4mppdDGOaqSUyzk2rL6KXSH8o",
  authDomain: "namaste-food-app-46e1f.firebaseapp.com",
  projectId: "namaste-food-app-46e1f",
  storageBucket: "namaste-food-app-46e1f.appspot.com",
  messagingSenderId: "1075805604919",
  appId: "1:1075805604919:web:1f1f4c9e94ca729eeac3b2",
  measurementId: "G-5V6HV1X5SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  getAnalytics(app);
}

// Initialize Firebase Authentication & Google Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
