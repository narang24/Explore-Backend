'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/authContext';
import { 
  Calendar, 
  Users, 
  Activity, 
  Bell, 
  Search, 
  User,
  LogOut,
  Settings,
  CalendarDays,
  Clock,
  MapPin,
  TrendingUp,
  BookOpen,
  Link as LinkIcon,
  Instagram,
  Linkedin
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    student: {
      joinedClubsCount: 3,
      activitiesCount: 8
    },
    upcomingEvents: [
      {
        id: 1,
        title: 'Tech Workshop - AI & ML',
        clubId: { clubName: 'Tech Club' },
        eventDate: '2024-03-15',
        location: 'Lab 1',
        category: 'Tech'
      },
      {
        id: 2,
        title: 'Cultural Night',
        clubId: { clubName: 'Cultural Society' },
        eventDate: '2024-03-18',
        location: 'Auditorium',
        category: 'Cultural'
      },
      {
        id: 3,
        title: 'Dance Workshop',
        clubId: { clubName: 'Dance Club' },
        eventDate: '2024-03-20',
        location: 'Dance Studio',
        category: 'Dance'
      }
    ],
    recentActivities: [
      {
        id: 1,
        title: 'Registered for Tech Hackathon',
        clubId: { clubName: 'Tech Club' },
        eventDate: '2024-03-10'
      },
      {
        id: 2,
        title: 'Joined Cultural Society',
        clubId: { clubName: 'Cultural Society' },
        eventDate: '2024-03-08'
      }
    ]
  });

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--planetary)] text-white font-extrabold grid place-items-center">X</div>
              <span className="font-extrabold tracking-wide text-[var(--galaxy)]">PLORE</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events, clubs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--sky)] rounded-full flex items-center justify-center">
                  <User size={16} className="text-[var(--planetary)]" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500 capitalize">Student</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, John Doe! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening on your campus today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Joined Clubs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.student?.joinedClubsCount || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <Users className="text-[var(--planetary)]" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Activities</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.student?.activitiesCount || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <Activity className="text-[var(--planetary)]" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Department</p>
                <p className="text-lg font-semibold text-gray-900">Computer Science</p>
              </div>
              <div className="w-12 h-12 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <TrendingUp className="text-[var(--planetary)]" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Year</p>
                <p className="text-2xl font-bold text-gray-900">3rd</p>
              </div>
              <div className="w-12 h-12 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <CalendarDays className="text-[var(--planetary)]" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <button className="text-[var(--planetary)] text-sm font-medium hover:underline">
                  View all
                </button>
              </div>
              
              <div className="space-y-4">
                {dashboardData?.recentActivities?.slice(0, 3).map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[var(--sky)] rounded-full flex items-center justify-center">
                      <Activity size={20} className="text-[var(--planetary)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.clubId?.clubName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(activity.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No recent activities</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              
              {dashboardData?.upcomingEvents?.slice(0, 3).map((event, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--planetary)] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Clock size={12} />
                        <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-sm">No upcoming events</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-[var(--sky)] hover:bg-[var(--venus)] rounded-lg transition-colors text-left">
                  <Users size={18} className="text-[var(--planetary)]" />
                  <span className="font-medium text-gray-900">Browse Clubs</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-[var(--sky)] hover:bg-[var(--venus)] rounded-lg transition-colors text-left">
                  <Calendar size={18} className="text-[var(--planetary)]" />
                  <span className="font-medium text-gray-900">Find Events</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-[var(--sky)] hover:bg-[var(--venus)] rounded-lg transition-colors text-left">
                  <Settings size={18} className="text-[var(--planetary)]" />
                  <span className="font-medium text-gray-900">Update Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}