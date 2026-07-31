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

// Firebase-i işə salırıq
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Təhlükəsiz yaradılma: Əgər auth/firestore yüklənibsə aktiv et, yoxdursa null mənimsət
const db = typeof firebase.firestore === "function" ? firebase.firestore() : null;
const auth = typeof firebase.auth === "function" ? firebase.auth() : null;
