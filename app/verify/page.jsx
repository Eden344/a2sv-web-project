'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-fill email from query param
  useEffect(() => {
    const emailFromQuery = searchParams.get('email');
    if (emailFromQuery) setEmail(emailFromQuery);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://akil-backend.onrender.com/verify-email', {
        email,
        OTP: otp,
      });
      setSuccess('Email verified successfully!');
      setError('');
      alert('Email verified! You can now sign in.');
      router.push('/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-blue-600 p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl text-black font-bold text-center">Verify Your Email</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-200 text-white py-2 rounded hover:bg-blue-700">
          Verify Email
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
      </form>
    </div>
  );
}
