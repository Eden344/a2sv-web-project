"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogin = () => router.push('/login');
  const handleSignup = () => router.push('/signup');
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Portal</h1>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              {/* <button onClick={handleSignup} className="btn btn-secondary">Signup</button> */}
              <button onClick={handleLogin} className="btn btn-primary">Login</button>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;