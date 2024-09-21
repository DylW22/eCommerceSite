// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "_REDACTED",
  authDomain: "_REDACTED",
  projectId: "_REDACTED",
  storageBucket: "_REDACTED.appspot.com",
  messagingSenderId: "_REDACTED",
  appId: "1:_REDACTED:web:_REDACTED",
  measurementId: "_REDACTED",
  databaseURL: "https://_REDACTED-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(firebaseApp);
export { firebaseApp, auth, database };
