import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAtCufs_qX5am3aeR496dYWYw5pSv3LQ4Y",
  authDomain: "random-quote-app-ace62.firebaseapp.com",
  projectId: "random-quote-app-ace62",
  storageBucket: "random-quote-app-ace62.firebasestorage.app",
  messagingSenderId: "634003216396",
  appId: "1:634003216396:web:1a30198aed352a835f7629",
  measurementId: "G-9F69JH58HW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);