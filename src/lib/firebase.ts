import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnimc28OjenS5fMJLG0AcF4sFl-XDqiCw",
  authDomain: "uk-blood-db.firebaseapp.com",
  projectId: "uk-blood-db",
  storageBucket: "uk-blood-db.firebasestorage.app",
  messagingSenderId: "141907555189",
  appId: "1:141907555189:web:82dbbcbbfbadf9836fd93c",
  measurementId: "G-64RCGBPYFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;
