// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfc0Yph8vimb6QYiQY_eNVIw_OK6KT_KM",
  authDomain: "peakagency-d40c6.firebaseapp.com",
  databaseURL: "https://peakagency-d40c6-default-rtdb.firebaseio.com",
  projectId: "peakagency-d40c6",
  storageBucket: "peakagency-d40c6.firebasestorage.app",
  messagingSenderId: "939613192987",
  appId: "1:939613192987:web:fd8bc66caa4a37fb40c9be",
  measurementId: "G-D6R5Y8Z31W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
