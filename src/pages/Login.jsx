import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
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
            setError(err.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-xl shadow-lg border-2 border-orange-300 backdrop-blur-sm">
                <div className="flex justify-center mb-6">
                    <Logo width="150px" />
                </div>

                <h2 className="text-2xl font-bold text-center mb-6 text-brown-800">Welcome Back to ZooBlog</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(login)} className="space-y-5">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: true })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />

                    <Button
                        type="submit"
                        bgColor="bg-orange-600"
                        className="w-full hover:bg-orange-700"
                    >
                        Sign In
                    </Button>
                </form>

                <p className="text-center mt-6 text-brown-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-orange-600 hover:underline font-medium">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;