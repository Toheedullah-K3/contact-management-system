import React, { useState } from 'react'
import { Input, Button } from './index.js'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Signup = () => {

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const apiUrl = import.meta.env.VITE_API_URL;

    const createUser = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/user/register`, data)

            console.log(response.data)

            navigate('/login')
        } catch (error) {
            setError(error.response.data.error || "An unexpected error occurred.")
        }
    }


    return (

        <div>
            <div
                className='flex items-center justify-center w-full'
            >
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>

                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(createUser)}>
                        <div className='space-y-5'>
                            <Input
                                label="Username: "
                                type="text"
                                placeholder="Enter your username"
                                {...register("username", {
                                    required: true
                                })}
                            />
                            <Input
                                label="Email: "
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true
                                })}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                            > Sign In </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
