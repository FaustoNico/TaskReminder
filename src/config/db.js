import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"; 
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB2KrvCNT1a-qe4vzXa-EqeIe5_vJAXfvg",
  authDomain: "taskreminder-4cbad.firebaseapp.com",
  projectId: "taskreminder-4cbad",
  storageBucket: "taskreminder-4cbad.appspot.com",
  messagingSenderId: "525443812966",
  appId: "1:525443812966:web:1342514d4ad180b50427a7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);