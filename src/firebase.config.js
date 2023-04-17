// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV6x1TTgWzQXhd_9jQIckCYwrhBFX6PCs",
  authDomain: "mlbbapp.firebaseapp.com",
  projectId: "mlbbapp",
  storageBucket: "mlbbapp.appspot.com",
  messagingSenderId: "535832969060",
  appId: "1:535832969060:web:2e9e3ba0135b540c8a4471",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
