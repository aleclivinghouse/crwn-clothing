import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
        } from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7Al-XAUfCuXB9lyGlorFD2fpMAsLGNrk",
  authDomain: "crwn-db-5e2a4.firebaseapp.com",
  projectId: "crwn-db-5e2a4",
  storageBucket: "crwn-db-5e2a4.appspot.com",
  messagingSenderId: "191203728396",
  appId: "1:191203728396:web:f9d7a7a91fd09eb983e229",
  measurementId: "G-ED2904RKJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = ()  => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, additionalInformation = {}
    ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log("this is the userDocRef: ", userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch(error){
            console.log('error creating the user: ', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return  await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);
