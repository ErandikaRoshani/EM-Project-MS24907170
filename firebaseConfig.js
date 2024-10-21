// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiWI-ko0Gm6BxweFqDjD_IzBalm6YA2EY",
  authDomain: "em-project-cb0cd.firebaseapp.com",
  projectId: "em-project-cb0cd",
  storageBucket: "em-project-cb0cd.appspot.com",
  messagingSenderId: "184505874887",
  appId: "1:184505874887:web:4826a74b4f4c1adfd641e2",
  measurementId: "G-BG4HP0SN3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);