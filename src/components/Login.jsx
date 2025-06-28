import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/service';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);

    const login = async (data) => {
        setError(null);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                    <Logo width="100%" />
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

                <p className="text-center text-sm mb-4">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>

                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(login)} className="space-y-5">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email address is not valid"
                            }
                        })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                    />

                    <Button
                        type="submit"
                        className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out ${className}`}
                    >
                        Sign In 
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
