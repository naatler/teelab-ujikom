'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '../lib/axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/auth/login', formData);
      setAuth(data.user, data.access_token);
      toast.success('Login successful!');
      router.push('/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <div className="min-h-screen flex">
      <div className="hidden md:flex w-full relative">
        <img
          src="./images/auth-page/hero.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col justify-between p-10 text-white">
          <h1 className="text-2xl font-semibold">
            <span className="text-green-400">Tee</span>Lab
          </h1>

          <h2 className="text-4xl font-light leading-snug max-w-md">
            Sign in to continue and manage your account with ease.
          </h2>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md px-8">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">
            Sign up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-600">
                Email
              </label>
              <input
                type="text"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full rounded-full text-neutral-700 border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                 required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="w-full rounded-full text-neutral-700 border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-green-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded-full text-lg font-medium transition"
            >
              Sign up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-green-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}