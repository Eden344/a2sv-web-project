'use client';

import { useState } from 'react';
import { signup } from '@/utils/auth';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  try {
    await signup(form);
    alert('Signup successful! Please verify your email.');
    router.push(`/verify?email=${form.email}`); // 👈 redirect with email
  } catch (err) {
    setError(err.response?.data?.message || 'Signup failed');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-blue-600 p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl text-black font-bold text-center">Sign Up</h2>
        {['name', 'email', 'password', 'confirmPassword', 'role'].map((field) => (
          <input
            key={field}
            type={field.includes('password') ? 'password' : 'text'}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="w-full bg-blue-200 text-blue-400 py-2 rounded hover:bg-blue-700">
          Register
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
