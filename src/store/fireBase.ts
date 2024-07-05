import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyDnW7lez8maM0Lf_Phe0ZuLoiJqUyzYgOU',
    authDomain: 'todocalendar-6ef96.firebaseapp.com',
    projectId: 'todocalendar-6ef96',
    storageBucket: 'todocalendar-6ef96.appspot.com',
    messagingSenderId: '704333302347',
    appId: '1:704333302347:web:69198ece4ca488df091bce',
}

const firebaseApp = initializeApp(firebaseConfig)

export const getAuthInstance = getAuth(firebaseApp)
export const signUp = async (email: string, password: string) =>
    await createUserWithEmailAndPassword(getAuthInstance, email, password)
export const signIn = async (email: string, password: string) =>
    await signInWithEmailAndPassword(getAuthInstance, email, password)
export const signOutUser = async () => await signOut(getAuthInstance)
