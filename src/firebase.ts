import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBsoAabUmeVkIUkKscxRyU6ykKdloGHBtk",
  authDomain: "random-quote-5625.firebaseapp.com",
  projectId: "random-quote-5625",
  storageBucket: "random-quote-5625.firebasestorage.app",
  messagingSenderId: "332539309569",
  appId: "1:332539309569:web:096331427eacd61677da00",
  measurementId: "G-CK00LL1MPL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);