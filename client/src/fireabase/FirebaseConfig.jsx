import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6TFChIYw9AwpZ9pRFJbERGxfPDGumikg",
  authDomain: "e-commerce-e0b57.firebaseapp.com",
  projectId: "e-commerce-e0b57",
  storageBucket: "e-commerce-e0b57.firebasestorage.app",
  messagingSenderId: "561826734277",
  appId: "1:561826734277:web:aa9174474cf4518e59d0ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
