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
  Plus,
  LogOut,
  User,
  Settings,
  CalendarDays,
  Clock,
  MapPin,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user, loading, router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = user.type === 'student' 
        ? 'http://localhost:5000/api/student/dashboard'
        : 'http://localhost:5000/api/club/dashboard';

      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading || loadingData) {
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
                  <p className="text-sm font-medium text-gray-900">
                    {user.type === 'student' ? user.name : user.clubName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user.type}</p>
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
            Welcome back, {user.type === 'student' ? user.name : user.clubName}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            {user.type === 'student' 
              ? "Here's what's happening on your campus today"
              : "Manage your club activities and events"
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.type === 'student' ? (
            <>
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
                    <p className="text-lg font-semibold text-gray-900">{user.department}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{user.year}</p>
                  </div>
                  <div className="w-12 h-12 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                    <CalendarDays className="text-[var(--planetary)]" size={24} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Members</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData?.club?.membersCount || 0}
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
                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData?.club?.eventsCount || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                    <Calendar className="text-[var(--planetary)]" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Category</p>
                    <p className="text-lg font-semibold text-gray-900">{user.category}</p>
                  </div>
                  <div className="w-12 h-12 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                    <Activity className="text-[var(--planetary)]" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quick Action</p>
                    <button className="mt-2 px-3 py-1 bg-[var(--planetary)] text-white text-sm rounded-md hover:bg-[var(--sapphire)] transition-colors">
                      New Event
                    </button>
                  </div>
                  <div className="w-12 h-12 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                    <Plus className="text-[var(--planetary)]" size={24} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activities / Events */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.type === 'student' ? 'Recent Activities' : 'Recent Events'}
                </h2>
                <button className="text-[var(--planetary)] text-sm font-medium hover:underline">
                  View all
                </button>
              </div>
              
              <div className="space-y-4">
                {user.type === 'student' 
                  ? (dashboardData?.recentActivities?.slice(0, 3).map((activity, idx) => (
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
                    ))
                  : (dashboardData?.upcomingEvents?.slice(0, 3).map((event, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-[var(--sky)] rounded-full flex items-center justify-center">
                          <Calendar size={20} className="text-[var(--planetary)]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin size={14} />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(event.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )) || (
                      <p className="text-gray-500 text-center py-4">No upcoming events</p>
                    ))
                }
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {user.type === 'student' ? 'Upcoming Events' : 'Club Members'}
              </h2>
              
              {user.type === 'student' 
                ? (dashboardData?.upcomingEvents?.slice(0, 3).map((event, idx) => (
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
                  ))
                : (dashboardData?.members?.slice(0, 5).map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-8 h-8 bg-[var(--sky)] rounded-full flex items-center justify-center">
                        <User size={14} className="text-[var(--planetary)]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{member.studentId?.name}</p>
                        <p className="text-xs text-gray-600">{member.studentId?.rollNumber}</p>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-sm">No members yet</p>
                  ))
              }
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {user.type === 'student' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <button className="w-full flex items-center gap-3 p-3 bg-[var(--sky)] hover:bg-[var(--venus)] rounded-lg transition-colors text-left">
                      <Plus size={18} className="text-[var(--planetary)]" />
                      <span className="font-medium text-gray-900">Create Event</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-[var(--sky)] hover:bg-[var(--venus)] rounded-lg transition-colors text-left">
                      <Users size={18} className="text-[var(--planetary)]" />
                      <span className="font-medium text-gray-900">Manage Members</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-[var(--sky)] hover:bg-[var(--venus)] rounded-lg transition-colors text-left">
                      <Activity size={18} className="text-[var(--planetary)]" />
                      <span className="font-medium text-gray-900">View Analytics</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}