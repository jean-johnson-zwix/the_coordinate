'use client';

import { useState, useEffect } from 'react';
import { UserAuth } from '@/context/AuthContext';
import { ref, set, serverTimestamp } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';

export default function SignUpPage() {
  const { user, loading, googleSignIn } = UserAuth();
  const router = useRouter();

  // State for the form fields
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hostEnv, setHostEnv] = useState('');
  const [error, setError] = useState('');

  // Effect to redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !firstName || !lastName || !hostEnv) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      // Step 1: Trigger Google Sign-In
      const userCredential = await googleSignIn();
      const user = userCredential.user;

      // Step 2: Save custom form data to Firestore
      try { 
        await set(ref(db, `users/${user.uid}`), {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          username: username,
          firstName: firstName,
          lastName: lastName,
          hostEnv: hostEnv,
        });
        console.log(`User profile for ${user.uid} successfully written to Realtime Database.`);
    } catch (error) {
      console.error(`Failed to write user profile for ${user.uid}:`, error);
    }

      router.push('/dashboard');
    } catch (e: any) {
      if (e.code !== 'auth/popup-closed-by-user') {
        setError(e.message);
        console.error(e);
      }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Let's get some details to get started</p>
          </div>
          
          {/* Form */}
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <div>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
                className="w-full px-4 py-3 border border-gray-200 placeholder-gray-300 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="First Name" 
                className="w-full px-4 py-3 border border-gray-200 placeholder-gray-300 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required 
              />
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="Last Name" 
                className="w-full px-4 py-3 border border-gray-200 placeholder-gray-300 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required 
              />
            </div>
            
            <div>
                <select 
                    value={hostEnv} 
                    onChange={(e) => setHostEnv(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-200  text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                >
                    <option value="" disabled>Host Environment</option>
                    <option value="local">Local Machine</option>
                    <option value="dedicated_vm">Virtual Machine - Dedicate</option>
                    <option value="shared_vm">Virtual Machine - Shared</option>
                </select>
                </div>
            
            <button 
              onClick={handleSubmit} 
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors duration-200 mt-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
          
          {/* Sign in link */}
          <div className="text-center mt-6">
            <a 
              href="/signin" 
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Already have an account? Sign in
            </a>
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By signing up, you agree to our terms and privacy policy
        </p>
      </main>
    </div>
  );
}

