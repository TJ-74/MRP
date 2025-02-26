// config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvmUub6rVp-n5g3jEZJenkVUXc2x6SZk0",
  authDomain: "boronatom-ai.firebaseapp.com",
  projectId: "boronatom-ai",
  storageBucket: "boronatom-ai.firebasestorage.app",
  messagingSenderId: "347981786413",
  appId: "1:347981786413:web:505266d882b01c1cb5f7a4",
  measurementId: "G-80GPT0N0QL"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();