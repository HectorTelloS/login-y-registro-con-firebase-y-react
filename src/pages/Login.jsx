import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Alert } from "./Alert";



export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null)

    const { login, loginWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })

        // console.log({ singup })
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setError(null)
        // console.log(user)
        try {
            await login(user.email, user.password)
            navigate('/')
        } catch (error) {
            console.log(error.message)
            setError(error.code)
        }

    }

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle()
            navigate('/')
        } catch (error) {
            setError(error.message)
        }

    }

    return (

        <div className="w-full max-w-xs m-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md flex flex-col gap-4 text-sky-400/100 mt-20" noValidate>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="your-email@email.es"
                    className="flex-1 p-2"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="your-password"
                    className="flex-1 p-2"
                    onChange={handleChange}

                />
                <button className="flex-1 p-2">Login</button>



            </form>

            <button onClick={handleGoogleSignin}>Login width google</button>
            {
                error && <Alert message={error} />
            }
        </div>
    );
}
