'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import StudentLayout from './components-student/StudentLayout';
import DashboardContent from './components-student/DashboardContent';

export default function StudentDashboard() {
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

  return (
    <StudentLayout>
      <DashboardContent />
    </StudentLayout>
  );
}