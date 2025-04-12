// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsSRTVLPX8v6VqX1cTd5haigc54PW9yHY",
    authDomain: "smart-manufacturing-app.firebaseapp.com",
    projectId: "smart-manufacturing-app",
    storageBucket: "smart-manufacturing-app.firebasestorage.app",
    messagingSenderId: "155902281799",
    appId: "1:155902281799:web:82da4061f33b66b18e8962",
    measurementId: "G-FQ9NC41PDQ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
