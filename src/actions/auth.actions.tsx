import { AppDispatch } from "../store/store";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut 
    } from 'firebase/auth';
