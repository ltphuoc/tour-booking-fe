import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBp-XFDdmA97qW7q3Fn8J0nDxyqDdX4_0",
  authDomain: "tourbooking-ef1b0.firebaseapp.com",
  projectId: "tourbooking-ef1b0",
  storageBucket: "tourbooking-ef1b0.appspot.com",
  messagingSenderId: "89152080109",
  appId: "1:89152080109:web:b68a4c2b2485ead11724e4",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const storage = getStorage(app);

export default firebase;
