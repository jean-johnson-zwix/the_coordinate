'use client';

import { useEffect } from 'react';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading, logOut } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there is no user, redirect to sign-in
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  // While loading, we can show a spinner or a blank screen
  if (loading) {
    return <p>Loading...</p>; 
  }

  // If there's no user, the useEffect will handle the redirect.
  // We can return null or a message to avoid flashing content.
  if (!user) {
    return null;
  }

  // If user is logged in, show the dashboard content
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to your Dashboard</h1>
      <p>Hello, {user.email}</p>
      <button onClick={logOut} className="mt-8 bg-red-500 text-white p-2 rounded">
        Sign Out
      </button>
    </main>
  );
}
