import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {a
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message || "Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="text-xl font-bold text-center text-blue-700 mt-2 mb-1">
          Create your account
        </h2>

        <p className="text-center text-xs mb-2">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Log in
          </Link>
        </p>

        {error && (
          <p className="text-red-600 text-xs text-center bg-red-100 border border-red-300 p-1 rounded mb-2"> {/* Reduced padding */}
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} className="space-y-3 mt-2">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="text-sm" 
            {...register("name", { required: "Full name is required" })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="text-sm"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="text-sm" 
            {...register("password", { required: "Password is required" })}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 text-sm" // Smaller button
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;