import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBs4OFND5jbb7uwZfRbjhD2WQe-WngBH64",
  authDomain: "group5-5d422.firebaseapp.com",
  projectId: "group5-5d422",
  storageBucket: "group5-5d422.firebasestorage.app",
  messagingSenderId: "1004248683901",
  appId: "1:1004248683901:web:4df161b273e9643a406814",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const ALLOWED_DOMAIN = "hsb.edu.vn";
