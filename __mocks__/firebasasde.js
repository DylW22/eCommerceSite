// __mocks__/firebase.js

//import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const auth = {
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
};

const firebase = {
  auth: jest.fn(() => auth),
};

export default firebase;
