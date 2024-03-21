// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDO2OItfRI1X1LUEzjiZCbDJIdFT4DLOTE",
  authDomain: "chat-app-react-e0dd9.firebaseapp.com",
  projectId: "chat-app-react-e0dd9",
  storageBucket: "chat-app-react-e0dd9.appspot.com",
  messagingSenderId: "680388354284",
  appId: "1:680388354284:web:e8d7c53921c2a1abf185c9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()