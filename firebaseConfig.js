import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';  
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBiWI-ko0Gm6BxweFqDjD_IzBalm6YA2EY",
    authDomain: "em-project-cb0cd.firebaseapp.com",
    projectId: "em-project-cb0cd",
    storageBucket: "em-project-cb0cd.appspot.com",
    messagingSenderId: "184505874887",
    appId: "1:184505874887:web:4826a74b4f4c1adfd641e2",
    measurementId: "G-BG4HP0SN3J"
  };

  const app = initializeApp(firebaseConfig);

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });


// const auth = getAuth(app);
const db = getFirestore(app);  

export { app, auth, db };