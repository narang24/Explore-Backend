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
  MapPin,
  MoreVertical,
  Filter
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
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/favicon.png" alt="Xplore Logo" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-extrabold tracking-wide text-[var(--galaxy)]">PLORE</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events, members..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-gray-50"
                />
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">Tech Club</p>
                  <p className="text-xs text-gray-500">Admin Store</p>
                </div>
                <div className="w-8 h-8 bg-[var(--sky)] rounded-full flex items-center justify-center">
                  <User size={16} className="text-[var(--planetary)]" />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Club Admin Report
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                Friday, December 16th 2023
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Members Card */}
          <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="text-white" size={18} />
                  </div>
                  <span className="bg-green-400 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                    +2.05%
                  </span>
                </div>
                <p className="text-white/80 text-sm mb-1">Total Members</p>
                <p className="text-3xl font-bold">{dashboardData?.club?.membersCount || 0}</p>
                <p className="text-white/70 text-xs mt-1">Members vs last month</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>

          {/* Total Events Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <Calendar className="text-[var(--planetary)]" size={18} />
              </div>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs font-medium">
                +5.25%
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Events</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{dashboardData?.club?.eventsCount || 0}</p>
            <p className="text-gray-500 text-xs">Events vs last month</p>
          </div>

          {/* Active Events Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <Activity className="text-[var(--planetary)]" size={18} />
              </div>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs font-medium">
                -1.05%
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Active Events</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">14.987</p>
            <p className="text-gray-500 text-xs">Events vs last month</p>
          </div>

          {/* Total Registrations Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <TrendingUp className="text-[var(--planetary)]" size={18} />
              </div>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs font-medium">
                +5.34%
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Registrations</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">12.987</p>
            <p className="text-gray-500 text-xs">Registrations vs last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Club Activity Habits */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Club Activity Habits</h2>
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white">
                      <option>This year</option>
                      <option>Last year</option>
                    </select>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">Track your club activity habits</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[var(--planetary)] rounded-full"></div>
                      <span className="text-sm text-gray-600">Search events</span>
                      <span className="bg-gray-900 text-white px-2 py-1 rounded-md text-xs">43,787 Events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[var(--sapphire)] rounded-full"></div>
                      <span className="text-sm text-gray-600">Members</span>
                      <span className="bg-[var(--sapphire)] text-white px-2 py-1 rounded-md text-xs">39,784 Members</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {dashboardData?.upcomingEvents?.slice(0, 3).map((event, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-[var(--sky)] rounded-xl flex items-center justify-center">
                        <Calendar size={20} className="text-[var(--planetary)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-gray-500">{event.registrations}</span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg">
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-8">No upcoming events</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-gray-600 text-sm mt-1">Latest club activities and updates</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-10 h-10 bg-[var(--sky)] rounded-xl flex items-center justify-center">
                        <User size={18} className="text-[var(--planetary)]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <div className="w-2 h-2 bg-[var(--planetary)] rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Statistics */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Event Statistics</h2>
                  <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white">
                    <option>Today</option>
                    <option>This Week</option>
                  </select>
                </div>
                <p className="text-gray-600 text-sm mt-1">Track your event performance</p>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">9.829</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">Event Sales</p>
                  <p className="text-green-600 text-sm font-medium">+5.34%</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[var(--planetary)] rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Technical</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">2.487</span>
                      <span className="text-green-600 text-xs ml-2">+1.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[var(--sapphire)] rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Cultural</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">1.828</span>
                      <span className="text-green-600 text-xs ml-2">+2.3%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[var(--venus)] rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Workshop</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">1.463</span>
                      <span className="text-red-600 text-xs ml-2">-3.0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Member Growth */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Member Growth</h2>
                  <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white">
                    <option>Today</option>
                    <option>This Week</option>
                  </select>
                </div>
                <p className="text-gray-600 text-sm mt-1">Track member by locations</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData?.members?.slice(0, 4).map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[var(--sky)] rounded-xl">
                      <div className="w-8 h-8 bg-[var(--planetary)] rounded-full flex items-center justify-center">
                        <User size={14} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900 text-sm">{member.studentId?.name}</span>
                          <span className="font-bold text-gray-900">{287 + idx * 100}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{member.studentId?.rollNumber}</p>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-sm">No members yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}