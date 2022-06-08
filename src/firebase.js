import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/* const firebaseConfig = {
    apiKey: "AIzaSyAddMwAwKrf-iApvowneoOzurEf8NIE6Bw",
    authDomain: "todo-case-werk.firebaseapp.com",
    projectId: "todo-case-werk",
    storageBucket: "todo-case-werk.appspot.com",
    messagingSenderId: "313582496037",
    appId: "1:313582496037:web:974f7f0c4c66cffb8dd2cc"
  }; */

const firebaseConfig = {
  apiKey: "AIzaSyDzWGveQc55RkGkBf5XoHdxQe67G84chQQ",
  authDomain: "test-f1087.firebaseapp.com",
  projectId: "test-f1087",
  storageBucket: "test-f1087.appspot.com",
  messagingSenderId: "1094939341588",
  appId: "1:1094939341588:web:7365eb88e54cfabc998801"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };