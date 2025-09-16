'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/authContext';
import { 
  Calendar, 
  Users, 
  Bell, 
  Search, 
  User,
  LogOut,
  Plus,
  Settings,
  Activity,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';

export default function ClubAdminDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    club: {
      membersCount: 45,
      eventsCount: 12
    },
    upcomingEvents: [
      {
        id: 1,
        title: 'Tech Hackathon 2024',
        location: 'CS Lab',
        eventDate: '2024-06-15',
        department: 'Engineering, BCA - Year 01',
        registrations: '50/100'
      },
      {
        id: 2,
        title: 'Workshop on AI',
        location: 'Seminar Hall',
        eventDate: '2024-06-18',
        department: 'Computer Science',
        registrations: '30/50'
      },
      {
        id: 3,
        title: 'Code Sprint',
        location: 'Lab 2',
        eventDate: '2024-06-20',
        department: 'Information Technology',
        registrations: '25/40'
      }
    ],
    members: [
      {
        id: 1,
        studentId: {
          name: 'John Doe',
          rollNumber: '22CS001'
        }
      },
      {
        id: 2,
        studentId: {
          name: 'Jane Smith',
          rollNumber: '22CS002'
        }
      },
      {
        id: 3,
        studentId: {
          name: 'Alex Johnson',
          rollNumber: '22CS003'
        }
      }
    ],
    recentActivity: [
      {
        id: 1,
        action: 'New Registration for Tech Hackathon',
        time: '2 hours ago'
      },
      {
        id: 2,
        action: 'Event "Workshop on AI" was updated',
        time: '4 hours ago'
      },
      {
        id: 3,
        action: 'New member joined the club',
        time: '6 hours ago'
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
                  placeholder="Search events, members..."
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
                  <p className="text-sm font-medium text-gray-900">Tech Club</p>
                  <p className="text-xs text-gray-500 capitalize">Club Admin</p>
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
            Welcome back, Tech Club! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your club activities and events
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-lg font-semibold text-gray-900">Technology</p>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Events */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Events</h2>
                <button className="text-[var(--planetary)] text-sm font-medium hover:underline">
                  View all
                </button>
              </div>
              
              <div className="space-y-4">
                {dashboardData?.upcomingEvents?.slice(0, 3).map((event, idx) => (
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
                      <p className="text-xs text-gray-400">{event.registrations}</p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No upcoming events</p>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-[var(--sky)] rounded-full flex items-center justify-center">
                      <User size={16} className="text-[var(--planetary)]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Club Members */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Club Members</h2>
              
              {dashboardData?.members?.slice(0, 5).map((member, idx) => (
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
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}