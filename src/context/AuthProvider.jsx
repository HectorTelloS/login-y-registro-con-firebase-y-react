import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from '../firebase/config'

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const singup = (email, password) => {
        console.log('singup', { email, password })
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)

    }

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {

        const unssubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log(currentUser)
            setUser(currentUser)
            setIsLoading(false)
        })

        return () => unssubscribe()

    }, [])


    return (
        <AuthContext.Provider value={{ singup, login, user, logout, isLoading, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

