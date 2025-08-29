'use client';

import { useEffect } from 'react';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';

export default function SignInPage() {
  const { user, loading, googleSignIn } = UserAuth();
  const router = useRouter();

  // Effect to redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      // The useEffect hook will handle redirection on successful sign-in
    } catch (error) {
      console.error(error);
    }
  };

  // Don't render anything if the user is logged in (while redirecting)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
      <main className="max-w-md w-full">
        {/* Card container */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Please sign in to continue</p>
          </div>
          
          {/* Google Sign In Button */}
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 font-semibold text-gray-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          
          {/* Alternative sign in link */}
          <div className="text-center">
            <a 
              href="/signup" 
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Don't have an account? Sign up
            </a>
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Secure authentication powered by Google
        </p>
      </main>
    </div>
  );
}

