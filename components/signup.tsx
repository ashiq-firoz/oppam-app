"use client"
import React, { useState } from 'react';
import { Heart, Mail, Lock, ArrowRight } from 'lucide-react';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50 p-6 flex flex-col items-center justify-center">
      {/* Logo Section */}
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-pink-100 p-4 rounded-full mb-4">
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">OPPAM</h1>
        <p className="text-gray-600 text-center max-w-xs">
          Join our community and find your perfect match today
        </p>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl 
                          focus:ring-2 focus:ring-pink-300 focus:border-pink-300 
                          transition-all duration-200 ease-in-out
                          placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl 
                          focus:ring-2 focus:ring-pink-300 focus:border-pink-300 
                          transition-all duration-200 ease-in-out
                          placeholder-gray-400"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-400 
                     text-white font-semibold py-3 px-4 rounded-xl
                     hover:from-pink-600 hover:to-pink-500
                     focus:ring-2 focus:ring-pink-300 focus:ring-offset-2
                     transform transition-all duration-200 ease-in-out
                     flex items-center justify-center space-x-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-pink-500 hover:text-pink-600 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Terms */}
      <p className="mt-8 text-center text-sm text-gray-500 max-w-md">
        By signing up, you agree to our{' '}
        <a href="/terms" className="text-pink-500 hover:text-pink-600">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-pink-500 hover:text-pink-600">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default SignupPage;