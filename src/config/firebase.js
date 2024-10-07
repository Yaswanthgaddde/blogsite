// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKprXEZxrwBqpVzt4ySwMoai7rF-5e31A",
  authDomain: "first-fa438.firebaseapp.com",
  projectId: "first-fa438",
  storageBucket: "first-fa438.appspot.com",
  messagingSenderId: "488833416999",
  appId: "1:488833416999:web:72224daba7da4fc1a3b302",
  measurementId: "G-95DVR3V7YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);