// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-2f3ee.firebaseapp.com",
  projectId: "pet-adopt-2f3ee",
  storageBucket: "pet-adopt-2f3ee.firebasestorage.app",
  messagingSenderId: "438750929910",
  appId: "1:438750929910:web:4721d1df9ecd9a2045ddd7",
  measurementId: "G-5TJ0S2RSP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const storage = getStorage(app);