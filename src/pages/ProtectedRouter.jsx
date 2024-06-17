import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export const ProtectedRouter = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) return <h1>loading</h1>

    if (!user) return <Navigate to='/login' />

    return <>{children}</>
}
