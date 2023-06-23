// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj5hIPWMpSzpqyiQrg472_N7yvWNBqSVw",
  authDomain: "cria-435e7.firebaseapp.com",
  databaseURL: "https://cria-435e7-default-rtdb.firebaseio.com",
  projectId: "cria-435e7",
  storageBucket: "cria-435e7.appspot.com",
  messagingSenderId: "242112846400",
  appId: "1:242112846400:web:32f66970ff964fb25e1da5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


export { auth, db, storage };