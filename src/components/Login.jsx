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
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">   
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo width="100%" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-3">
          Sign in to your account
        </h2>

        {/* Signup Link */}
        <p className="text-center text-sm mb-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>

        {/* Error message */}
        {error && (
          <div className="text-red-600 text-sm text-center bg-red-100 border border-red-300 p-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email address is not valid',
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
