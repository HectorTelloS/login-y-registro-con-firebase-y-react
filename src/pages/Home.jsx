import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Home = () => {
    const authContext = useContext(AuthContext)
    console.log(authContext)
    return (
        <div>Home</div>
    )
}
