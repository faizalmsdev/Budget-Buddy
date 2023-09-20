// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6wXv5hkRmpmW-8LxB2ugrSctd6bQXM7w",
  authDomain: "budget-buddy-f8e94.firebaseapp.com",
  projectId: "budget-buddy-f8e94",
  storageBucket: "budget-buddy-f8e94.appspot.com",
  messagingSenderId: "88365616054",
  appId: "1:88365616054:web:5f53e9e82fa170f8770f17",
  measurementId: "G-5M81D98G9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
