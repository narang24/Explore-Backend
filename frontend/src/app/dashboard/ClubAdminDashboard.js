'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import ClubAdminLayout from './components-club-admin/ClubAdminLayout';
import DashboardContent from './components-club-admin/DashboardContent';

export default function ClubAdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
      return;
    }

    // Check if user has club admin permissions
    if (!loading && user && user.role !== 'club_admin' && user.type !== 'club') {
      router.push('/dashboard'); // Redirect to regular dashboard
      return;
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--planetary)]">
          <div className="w-6 h-6 border-2 border-[var(--planetary)] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading club dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== 'club_admin' && user.type !== 'club')) return null;

  return (
    <ClubAdminLayout>
      <DashboardContent />
    </ClubAdminLayout>
  );
}