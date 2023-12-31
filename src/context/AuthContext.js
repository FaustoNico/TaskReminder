import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    checkActionCode
} from 'firebase/auth';
import { auth } from "../config/db";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const authContext = createContext();
//Usar el context//
export const useAuth = () => {
    const contextAuth = useContext(authContext);
    if (!contextAuth) throw new Error("No esta autenticado");
    return contextAuth;
    
}
//Usar el context//

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorType, setErrorType] = useState('');
    //RECORDATORIO!!! validar existencia de correo
    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
        cookies.set('token', 'nombre xd', { path: "/" });
    };

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password);
        cookies.set('token', 'nombre xd', { path: "/" });
    };

    const logout = () => {
        signOut(auth);
        cookies.remove('token');
        console.log("se cerro");
    };

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        console.log(provider);
        // return signInWithRedirect(auth, provider);
        cookies.set('token', 'nombre xd', { path: "/" });
        return signInWithPopup(auth, provider);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        const unsub = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser); //setea valores del usuario
            setLoading(false); //setea en falso el loading
        });
        return () => unsub();
    }, []);

    const getError = (error) => {
        console.log(error.code);
        if (error.code === 'auth/invalid-email') {
            setErrorType('Correo electrónico invalido');
        } else if (error.code === 'auth/internal-error') {
            setErrorType('No ingresó contraseña');
        } else if (error.code === 'auth/weak-password') {
            setErrorType('Contraseña muy corta');
        } else if (error.code === 'auth/user-not-found') {
            setErrorType('El usuario no existe/Registrate');
        } else if (error.code === "auth/wrong-password") {
            setErrorType('Contraseña incorrecta');
        } else if (error.code === "auth/too-many-requests") {
            setErrorType('Demasiados intentos, intente más tarde');
        } else if (error.code === "auth/email-already-in-use") {
            setErrorType('Email en uso');
        }
    };

    console.log(errorType);
    const data = {
        signup, login,
        logout, user, loading,
        getError, errorType,
        loginWithGoogle
    };
    return (
        <authContext.Provider value={data}>{children}</authContext.Provider>
    );
}
export { AuthProvider };
export default authContext;
