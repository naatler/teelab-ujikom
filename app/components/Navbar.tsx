'use client';

import Link from 'next/link';
import { useAuthStore } from '@/app/store/authStore';
import { useCartStore } from '@/app/store/cartStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { totalItems } = useCartStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold">
              Tee<span className="text-green-600">Lab</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 font-medium">
              Our Story
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 font-medium">
              Shop Now
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalItems()}
                    </span>
                  )}
                </Link>
                <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                
                {user.role === 'ADMIN' && (
                  <Link href="/admin/categories" className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium">
                    Admin
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}