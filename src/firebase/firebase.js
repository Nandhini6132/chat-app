// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyByf2m-FBHclU5MBXr1050TtQu7aAVJsDQ",
  authDomain: "chat-app-cae63.firebaseapp.com",
  projectId: "chat-app-cae63",
  storageBucket: "chat-app-cae63.appspot.com",
  messagingSenderId: "427301527389",
  appId: "1:427301527389:web:314a94925bdfa7d2f992b4"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()