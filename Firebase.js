// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyA0UgtUxKmp6Fa8SH10v25G-fKXLgBQz6k",
  authDomain: "nirbhava-33124.firebaseapp.com",
  projectId: "nirbhava-33124",
  storageBucket: "nirbhava-33124.firebasestorage.app",
  messagingSenderId: "269337684261",
  appId: "1:269337684261:android:c8ae4106323a05858112cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;