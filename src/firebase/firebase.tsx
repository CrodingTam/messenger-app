import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut 
} from 'firebase/auth';

//export our firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyBLujf2xf5lFiPdocH_KBACG2qxmDrXb_A",
  authDomain: "messenger-app-7fdb7.firebaseapp.com",
  projectId: "messenger-app-7fdb7",
  storageBucket: "messenger-app-7fdb7.appspot.com",
  messagingSenderId: "237528365356",
  appId: "1:237528365356:web:9f5e718bfb6a83aeae1489",
  measurementId: "G-Q8LXSVX09X"
};

//Creates and initializes a @firebase/app#FirebaseApp instance.
const app = initializeApp(firebaseConfig);

//Returns the Auth instance associated with the provided @firebase/app#FirebaseApp.
const auth = getAuth();

//Returns the existing default Firestore instance that is associated with the provided @firebase/app#FirebaseApp
const db = getFirestore(app);

export {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    db
}

