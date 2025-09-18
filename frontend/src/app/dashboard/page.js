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
    
    // Redirect student users to the overview page
    if (!loading && user && user.type === 'student') {
      router.push('/dashboard/student/overview');
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

  // Render appropriate dashboard based on user type
  if (user.type === 'student') {
    // This will be handled by the redirect above, but keep as fallback
    return <StudentDashboard />;
  } else if (user.type === 'club') {
    return <ClubAdminDashboard />;
  }

  // Fallback for unknown user types
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Unknown User Type</h2>
        <p className="text-gray-600">Please contact support for assistance.</p>
      </div>
    </div>
  );
}