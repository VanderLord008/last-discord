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
  apiKey: "AIzaSyCCYIzfEp5LHIJgNySRN1qHwQi4_pQUodU",
  authDomain: "talkiify.firebaseapp.com",
  projectId: "talkiify",
  storageBucket: "talkiify.appspot.com",
  messagingSenderId: "80373667157",
  appId: "1:80373667157:web:c5b0d4ce0f39a2523c4bdc",
  measurementId: "G-KBXG0ER62D"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
