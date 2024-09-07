import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNw1pDka9aWatyzw0Ua4-y_ux-pjtATzk",
  authDomain: "pack-it-buddy-main.firebaseapp.com",
  projectId: "pack-it-buddy-main",
  storageBucket: "pack-it-buddy-main.appspot.com",
  messagingSenderId: "697836715784",
  appId: "1:697836715784:web:9c9f261fa6c6b5a5fd36bd",
  measurementId: "G-78L31KDCVN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export { auth, db, googleAuthProvider };
