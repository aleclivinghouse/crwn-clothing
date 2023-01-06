import {useEffect} from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';
import { useState } from 'react';


const SignIn = () => {
//    useEffect(async () => {
 //       const response = await getRedirectResult(auth);
 //       if(response){
 //       const userDocRef = await createUserDocumentFromAuth(response.user);
 //       }
 //   }, []);

    const logGoogleUser = async () => {
        const {user}= await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const logGoogleRedirectUser = async () => {
        const {user}= await signInWithGoogleRedirect();
        console.log('this is the redirect user: ', {user});
        
    }
    
    
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;