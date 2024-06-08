// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();

export { firebaseApp, auth };
