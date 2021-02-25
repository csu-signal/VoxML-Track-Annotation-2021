import Firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-U2MS5PCVataASGhSzPIoFgZOyg-I5ug",
  authDomain: "voxml-track-annotation-1b212.firebaseapp.com",
  databaseURL: "https://voxml-track-annotation-1b212-default-rtdb.firebaseio.com",
  projectId: "voxml-track-annotation-1b212",
  storageBucket: "voxml-track-annotation-1b212.appspot.com",
  messagingSenderId: "440515005707",
  appId: "1:440515005707:web:8f57f4a70c0dbd6a17660e",
  measurementId: "G-R4FYSFKK9M"
};
export const firebaseapp = Firebase.initializeApp(firebaseConfig);

var db;
export function fbAuthenticated() {
  db = firebaseapp.database();
}
export function getfirebasedb() {
  return db;
}