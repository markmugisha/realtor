// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXtggDRLljX6BqNWH7-SOuLlIkLf4k4io",
  authDomain: "realtor-71c6e.firebaseapp.com",
  projectId: "realtor-71c6e",
  storageBucket: "realtor-71c6e.appspot.com",
  messagingSenderId: "1046186225476",
  appId: "1:1046186225476:web:9bc5848bf4bbdc6ebbf111"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();