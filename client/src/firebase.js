// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Gf05O2YvubJ44nd1wiqXlQhoD4XhalA",
  authDomain: "stockr-5fe59.firebaseapp.com",
  projectId: "stockr-5fe59",
  storageBucket: "stockr-5fe59.appspot.com",
  messagingSenderId: "225313345062",
  appId: "1:225313345062:web:ac128af999f85086c3e0e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)  
export const db = getFirestore(app);
