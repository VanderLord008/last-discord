import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyDtqAXvd9zhHnEGPE8Z03h8RSnR9zbEkqA",
//     authDomain: "discord-7e548.firebaseapp.com",
//     projectId: "discord-7e548",
//     storageBucket: "discord-7e548.appspot.com",
//     messagingSenderId: "145541039818",
//     appId: "1:145541039818:web:d5d0d73c77d031b70dd633",
//     measurementId: "G-1Z2YQRD247"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyD5oiE0Df5UeLT7vNM1mZv755BF8YioHD0",
  authDomain: "last-discord.firebaseapp.com",
  projectId: "last-discord",
  storageBucket: "last-discord.appspot.com",
  messagingSenderId: "625359749730",
  appId: "1:625359749730:web:6d01c8ce70ce59e23f073b",
  measurementId: "G-5N3SMDD27Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
