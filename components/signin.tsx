"use client"
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock, ArrowRight } from 'lucide-react';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      
      router.push("/home")
      console.log('Login successful');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
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
          Welcome back! Sign in to continue your journey
        </p>
      </div>

      {/* Signin Form */}
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
                          placeholder-gray-400 text-black"
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
                          placeholder-gray-400 text-black"
                placeholder="Enter your password"
                required
              />
            </div>
            
            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <a 
                href="/forgot-password" 
                className="text-sm text-pink-500 hover:text-pink-600 font-medium"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-400 
                     text-white font-semibold py-3 px-4 rounded-xl
                     hover:from-pink-600 hover:to-pink-500
                     focus:ring-2 focus:ring-pink-300 focus:ring-offset-2
                     transform transition-all duration-200 ease-in-out
                     flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/" className="text-pink-500 hover:text-pink-600 font-medium">
              Create Account
            </a>
          </p>
        </div>
      </div>

      {/* Social Login (Optional) */}
      <div className="mt-6 w-full max-w-md">
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="text-sm text-gray-500">Or continue with</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-4">
          {/* Social Login Buttons */}
          <button 
            className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            aria-label="Sign in with Google"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.11c-.22-.69-.35-1.43-.35-2.11s.13-1.42.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l2.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.86-2.59 3.3-4.51 6.16-4.51z" fill="#EA4335"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;