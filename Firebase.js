// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyCn1KVlh9y8vpkemabwqcvXY6u4Nw3m8pQ",
  authDomain: "nirbhaya-b4c51.firebaseapp.com",
  projectId: "nirbhaya-b4c51",
  storageBucket: "nirbhaya-b4c51.appspot.com",
  messagingSenderId: "848173635948",
  appId: "1:848173635948:android:0c567515cd8ecef2eafb49"
=======
  apiKey: "AIzaSyABlQ1CsTDArq_KfkPcG7CfbmMXOT7sBus",
  authDomain: "nirbhava-71184.firebaseapp.com",
  projectId: "nirbhava-71184",
  storageBucket: "nirbhava-71184.appspot.com",
  messagingSenderId: "129557344175",
  appId: "1:129557344175:android:34521499a92ebe2d8f895a"
>>>>>>> e9de281a3596f44030530c940c916f4996ad6178
};


// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);


