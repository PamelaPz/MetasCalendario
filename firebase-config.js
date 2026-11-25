// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1vbfnbaXcd1vXEiZzMy1ulfFUtLK7fWU",
  authDomain: "calendario-de-metas-a51a8.firebaseapp.com",
  projectId: "calendario-de-metas-a51a8",
  storageBucket: "calendario-de-metas-a51a8.firebasestorage.app",
  messagingSenderId: "4733608111",
  appId: "1:4733608111:web:45f3937dd7380a3ec3f45a",
  measurementId: "G-50N0NTDQTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
