import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const { user, logout, isLoading } = useContext(AuthContext)
    console.log(user)

    const navigate = useNavigate()
    console.log(isLoading)

    const handleLogOut = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }



    }

    if (isLoading == true) { return <h1>Is loading</h1> }

    return (
        <div>
            <h1>Bienvenido {user.email}</h1>

            <button
                onClick={handleLogOut}
            >Logout</button>
        </div>
    )
}
