// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCn1KVlh9y8vpkemabwqcvXY6u4Nw3m8pQ",
  authDomain: "nirbhaya-b4c51.firebaseapp.com",
  projectId: "nirbhaya-b4c51",
  storageBucket: "nirbhaya-b4c51.appspot.com",
  messagingSenderId: "848173635948",
  appId: "1:848173635948:android:0c567515cd8ecef2eafb49"
};


// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);


