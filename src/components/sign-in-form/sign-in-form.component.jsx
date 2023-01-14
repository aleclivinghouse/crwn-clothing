import {useState} from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, auth} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../../components/button/button.component.jsx';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import './sign-in-form.styles.scss';
import {UserContext} from '../../contexts/user.context';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    console.log("these are the form fields: ", formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
          await signInAuthUserWithEmailAndPassword(email, password);
          resetFormFields();
        }catch(error){
            console.log("user creation enountered an error: ", error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    };

    return(
        <div className='sign-up-container'>
            <h2>Have An Account?</h2>
            <span>Sign In</span>
            <form onSubmit={handleSubmit}>

               
                <FormInput label='email' type='email' required onChange={handleChange} name="email" value={email}/>

                
                <FormInput label='password' type='password' required onChange={handleChange} name="password" value={password}/>

                <Button buttonType='google' type='submit'>Sign In</Button>
            </form>
        </div>
    )
}

export default SignInForm;