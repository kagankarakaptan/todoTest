import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAddMwAwKrf-iApvowneoOzurEf8NIE6Bw",
    authDomain: "todo-case-werk.firebaseapp.com",
    projectId: "todo-case-werk",
    storageBucket: "todo-case-werk.appspot.com",
    messagingSenderId: "313582496037",
    appId: "1:313582496037:web:974f7f0c4c66cffb8dd2cc"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db };