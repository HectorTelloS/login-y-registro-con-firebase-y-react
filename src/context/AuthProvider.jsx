import React from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {

    const user = {
        login: true
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

