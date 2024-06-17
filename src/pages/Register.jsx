import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Alert } from "./Alert";


export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null)

    const { singup } = useContext(AuthContext)
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
            await singup(user.email, user.password)
            navigate('/')
        } catch (error) {
            console.log(error.message)
            setError(error.code)
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sky-400/100 mt-20" noValidate>
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
                <button className="flex-1 p-2">Registrate</button>



            </form>
            {
                error && <Alert message={error} />
            }
        </>
    );

};
