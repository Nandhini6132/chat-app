// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDbmXPa1aAOCBckFliViLcsq7O9AH6ZXXA",
  authDomain: "chat-app-fb-1c55e.firebaseapp.com",
  projectId: "chat-app-fb-1c55e",
  storageBucket: "chat-app-fb-1c55e.appspot.com",
  messagingSenderId: "636123403450",
  appId: "1:636123403450:web:00f014733b6a723f4f1e83"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()