import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCi3kGBTNKlQ68Tthd0qd1UbXmdg3yedCM",
  authDomain: "coronavirus-6b732.firebaseapp.com",
  databaseURL: "https://coronavirus-6b732.firebaseio.com",
  projectId: "coronavirus-6b732",
  storageBucket: "coronavirus-6b732.appspot.com",
  messagingSenderId: "1001077196278",
  appId: "1:1001077196278:web:f81c37955ece1804a6b3d7",
  measurementId: "G-PGWKK9FXZV"
});

const db = firebase.database();

export { firebase, db };
