'use client'
import React, { useState } from 'react';
import AuthLayout from '../../components/AuthLayout';
import Signup from '../../components/Signup';
import Login from '../../components/Login';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginSignup = () => {
  const router = useRouter()
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [errors, setErrors] = useState<string>(""); 

  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    let error = '';

    // Check for all required fields when signing up
    if (isSignup && (!formState.email || !formState.password || !formState.firstName || !formState.lastName)) {
      error = 'All fields are required';
    }

    // Check for email and password when logging in
    if (!isSignup && (!formState.email || !formState.password)) {
      error = 'Email and Password are required';
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formState.email && !emailRegex.test(formState.email)) {
      error = 'Email must be valid';
    }

    // Validate password length
    if (formState.password && formState.password.length < 6) {
      error = 'Password should be at least 6 characters';
    }

    // Set error and return validation status
    if (error) {
      setErrors(error);
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true)
      const result = await signIn("credentials", {
        email: formState.email,
        password: formState.password,
        redirect: false, // Disable automatic redirection
      });

      // Check for an error response
      if (result?.error) {
        toast.error(result.error); // Show the error message (Invalid password, No user found, etc.)
      } else if (result?.ok) {
        toast.success("Login successful!"); // Show success message
        router.push('/chat-bot')
      } else {
        toast.error("Login failed!"); // Fallback error message if no error is provided
      }
      setLoading(false)
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true)
      const requestBody = {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful!"); // Show success toast
      } else if (data?.error) {
        toast.error(data.error); // Show the error message directly from backend response
      } else {
        toast.error("Signup failed!"); // Fallback if no specific error message
      }
      setLoading(false)
    }
  };

  return (
    <>
      <AuthLayout>
        {isSignup ?
          <Signup
            formState={formState}
            setIsSignup={setIsSignup}
            setFormState={setFormState}
            handleSubmit={handleSignup}
            loading={loading}
            errors={errors}
            setErrors={setErrors}
          // handleGoogleSignIn={handleGoogleSignIn}
          />
          :
          <Login
            formState={formState}
            setIsSignup={setIsSignup}
            setFormState={setFormState}
            handleSubmit={handleLogin}
            loading={loading}
            errors={errors}
            setErrors={setErrors}
          // handleGoogleSignIn={handleGoogleSignIn}
          />}
      </AuthLayout>
    </>
  );
};

export default LoginSignup;
