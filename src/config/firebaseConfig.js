// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore"
//this allows you to connect to your database

import {getAuth} from "firebase/auth"
//for authentication

//for storage
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMPpTKuJd7-wSKFqu4P7Wli89lrHrpYJY",
  authDomain: "fir-blog-5fe50.firebaseapp.com",
  projectId: "fir-blog-5fe50",
  storageBucket: "fir-blog-5fe50.appspot.com",
  messagingSenderId: "99094691791",
  appId: "1:99094691791:web:795655edb500b5f7025cba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up data base and export it
export const db = getFirestore(app)

//set up auth and export it
export const auth = getAuth(app)

//set up storage and export it
export const storage = getStorage(app)