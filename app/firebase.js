import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey:"NEXT_PUBLIC_FIREBASE_APIKEY", 
  authDomain:"NEXT_PUBLIC_FIREBASE_AUTHDOMAIN", 
  projectId:"NEXT_PUBLIC_FIREBASE_PROJECTID", 
  storageBucket:"NEXT_PUBLIC_FIREBASE_STORAGEBUCKET", 
  messagingSenderId:"NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID", 
  appId:"NEXT_PUBLIC_FIREBASE_APPID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };