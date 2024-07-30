import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { login as loginAction } from '../store/authSlice.js'


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const apiUrl = import.meta.env.VITE_API_URL;


    const login = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/user/login`, data , {
                withCredentials: true
            })
            const { user } = response.data;

            if (response.status === 200) {

                dispatch(loginAction({userData}))
            }

            navigate("/")
        } catch (error) {
            console.log("Error --> ", error)
            setError(error.response.data.error || "An unexpected error occurred.");
        }
    }

    return (
        <div>
            <div
                className='flex items-center justify-center w-full'
            >
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}



                    <form onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input 
                            label = "Email: "
                            type = "email"
                            placeholder = "Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input 
                            label = "Password: "
                            type = "password"
                            placeholder = "Enter your Password"
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

export default Login
