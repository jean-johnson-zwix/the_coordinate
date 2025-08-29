'use client';

import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user, loading } = UserAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
      <main className="max-w-md w-full">
        {/* Card container */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Simple logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">座標 (The Coordinate)</h1>
            <p className="text-gray-600">A Computer Use Agent</p>
          </div>
          
          {user ? (
            <div className="space-y-4 text-center">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-medium">
                  Logged in as {user.email}
                </p>
              </div>
              <a 
                href="/dashboard" 
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Go to Dashboard
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <a 
                href="/signin" 
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors duration-200"
              >
                Sign In
              </a>
              <a 
                href="/signup" 
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl text-center transition-colors duration-200"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
        
        {/* Footer text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Join thousands of users worldwide
        </p>
      </main>
    </div>
  );
}
