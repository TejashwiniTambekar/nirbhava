// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyABlQ1CsTDArq_KfkPcG7CfbmMXOT7sBus",
  authDomain: "nirbhava-71184.firebaseapp.com",
  projectId: "nirbhava-71184",
  storageBucket: "nirbhava-71184.appspot.com",
  messagingSenderId: "129557344175",
  appId: "1:129557344175:android:34521499a92ebe2d8f895a"
};


// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);


