import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBiWI-ko0Gm6BxweFqDjD_IzBalm6YA2EY',
  authDomain: 'em-project-cb0cd.firebaseapp.com',
  projectId: 'em-project-cb0cd',
  storageBucket: 'em-project-cb0cd.appspot.com',
  messagingSenderId: '184505874887',
  appId: '1:184505874887:web:4826a74b4f4c1adfd641e2',
  measurementId: 'G-BG4HP0SN3J',
  databaseURL: 'https://em-project-cb0cd-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {app, auth, db};
