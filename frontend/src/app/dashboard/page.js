'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import ClubAdminDashboard from './ClubAdminDashboard';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
      return;
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--planetary)]">
          <div className="w-6 h-6 border-2 border-[var(--planetary)] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Route based on user type or role
  if (user.type === 'student' || user.role === 'student') {
    return <StudentDashboard />;
  } else if (user.type === 'club' || user.role === 'club_admin') {
    return <ClubAdminDashboard />;
  }

  // Fallback for unknown user types
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Unknown User Type</h2>
        <p className="text-gray-600">Please contact support for assistance.</p>
        <button 
          onClick={() => router.push('/')} 
          className="mt-4 px-4 py-2 bg-[var(--planetary)] text-white rounded hover:opacity-90"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}