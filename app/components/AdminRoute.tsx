'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import toast from 'react-hot-toast';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      toast.error('Please login first');
      router.push('/login');
    } else if (user.role !== 'ADMIN') {
      toast.error('Access denied. Admin only.');
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return <>{children}</>;
}