// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsadf0lDzPmDs2VB4smlZKEPztfucaCy8",
  authDomain: "finalyp-bc948.firebaseapp.com",
  projectId: "finalyp-bc948",
  storageBucket: "finalyp-bc948.appspot.com",
  messagingSenderId: "253644090554",
  appId: "1:253644090554:web:4fb1f1caab0cd54609e683",
  measurementId: "G-ZDLLWMCYZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
