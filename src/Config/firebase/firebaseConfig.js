import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5fvUZEcxa352ulHqarLIq17tKVnQzMDQ",
  authDomain: "react-project-d8655.firebaseapp.com",
  projectId: "react-project-d8655",
  storageBucket: "react-project-d8655.appspot.com",
  messagingSenderId: "558895599377",
  appId: "1:558895599377:web:b559ebd79786a45ff706b0",
  measurementId: "G-L1XD93J8RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
