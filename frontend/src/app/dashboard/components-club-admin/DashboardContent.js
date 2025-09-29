'use client';
import { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Plus,
  Clock,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Megaphone,
  Eye,
  Edit,
  Trash2,
  FileText,
  Upload,
  Calendar,
  Award,
  TrendingUp,
  AlertTriangle,
  Bell,
  Activity
} from 'lucide-react';

// Mock data - replace with actual API calls
const dashboardStats = {
  totalReports: 24,
  pendingApprovals: 8,
  totalStudents: 342,
  recentUploads: 16
};

const upcomingActivities = [
  {
    id: 1,
    title: 'Tech Symposium 2024',
    date: 'Oct 15, 2024',
    time: '10:00 AM',
    type: 'event',
    priority: 'high',
    daysLeft: 3
  },
  {
    id: 2,
    title: 'AI Workshop Series',
    date: 'Oct 20, 2024',
    time: '2:00 PM',
    type: 'workshop',
    priority: 'medium',
    daysLeft: 8
  },
  {
    id: 3,
    title: 'Club Annual Meeting',
    date: 'Oct 25, 2024',
    time: '4:00 PM',
    type: 'meeting',
    priority: 'high',
    daysLeft: 13
  }
];

const accreditationDeadlines = [
  {
    id: 1,
    title: 'NBA Accreditation Report',
    deadline: 'Nov 5, 2024',
    status: 'urgent',
    daysLeft: 23,
    progress: 65
  },
  {
    id: 2,
    title: 'Annual Activity Report',
    deadline: 'Nov 15, 2024',
    status: 'warning',
    daysLeft: 33,
    progress: 40
  },
  {
    id: 3,
    title: 'Student Feedback Report',
    deadline: 'Dec 1, 2024',
    status: 'normal',
    daysLeft: 49,
    progress: 20
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'approval',
    title: 'Event Registration Approved',
    user: 'Tech Hackathon 2024',
    time: '2 hours ago',
    icon: CheckCircle,
    isLive: true
  },
  {
    id: 2,
    type: 'upload',
    title: 'Activity Report Uploaded',
    user: 'Workshop Team',
    time: '4 hours ago',
    icon: Upload,
    isLive: false
  },
  {
    id: 3,
    type: 'member',
    title: 'New Student Registration',
    user: 'John Smith',
    time: '6 hours ago',
    icon: Users,
    isLive: false
  },
  {
    id: 4,
    type: 'report',
    title: 'Monthly Report Generated',
    user: 'Admin System',
    time: '8 hours ago',
    icon: FileText,
    isLive: false
  }
];

export default function DashboardContent() {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-orange-500 bg-orange-50';
      default: return 'text-green-500 bg-green-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'text-red-500 bg-red-50 border-red-200';
      case 'warning': return 'text-orange-500 bg-orange-50 border-orange-200';
      default: return 'text-blue-500 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Reports Generated */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileText className="text-green-600" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-1 tracking-wide">
            {dashboardStats.totalReports}
          </h3>
          <p className="text-[var(--planetary)] text-sm tracking-wide">Total Reports</p>
          <p className="text-xs text-gray-500 mt-2 tracking-wide">Generated this month</p>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <UserCheck className="text-orange-600" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-1 tracking-wide">
            {dashboardStats.pendingApprovals}
          </h3>
          <p className="text-[var(--planetary)] text-sm tracking-wide">Pending Approvals</p>
          <p className="text-xs text-gray-500 mt-2 tracking-wide">Awaiting review</p>
        </div>

        {/* Total Students */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-1 tracking-wide">
            {dashboardStats.totalStudents}
          </h3>
          <p className="text-[var(--planetary)] text-sm tracking-wide">Total Students</p>
          <p className="text-xs text-gray-500 mt-2 tracking-wide">Active members</p>
        </div>

        {/* Recent Uploads */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Upload className="text-purple-600" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-1 tracking-wide">
            {dashboardStats.recentUploads}
          </h3>
          <p className="text-[var(--planetary)] text-sm tracking-wide">Recent Uploads</p>
          <p className="text-xs text-gray-500 mt-2 tracking-wide">This week</p>
        </div>
      </div>

      {/* Accreditation Alerts (Full Width) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Accreditation Alerts</h3>
            <AlertTriangle className="text-orange-500" size={20} />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accreditationDeadlines.map((item) => {
              const statusColor = getStatusColor(item.status);
              return (
                <div key={item.id} className={`p-4 rounded-lg border ${statusColor}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-[var(--galaxy)] text-sm tracking-wide">
                      {item.title}
                    </h4>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                      {item.daysLeft} days
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Due: {item.deadline}</p>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div 
                      className="bg-current h-2 rounded-full opacity-60" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions Card (Compact) */}
      <div className="bg-gradient-to-br from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-4 text-white shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Quick Actions</h3>
          <p className="text-white/70 text-sm">Manage efficiently</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Generate Report */}
          <button className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all cursor-pointer group">
            <div className="w-8 h-8 bg-white/20 group-hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
              <FileText size={16} />
            </div>
            <div className="text-left flex-1">
              <span className="text-sm font-medium block">Generate Report</span>
              <span className="text-xs text-white/70">Create new report</span>
            </div>
          </button>

          {/* Review Approvals */}
          <button className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all cursor-pointer group">
            <div className="w-8 h-8 bg-white/20 group-hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
              <UserCheck size={16} />
            </div>
            <div className="text-left flex-1">
              <span className="text-sm font-medium block">Review Approvals</span>
              <span className="text-xs text-white/70">Pending requests</span>
            </div>
          </button>

          {/* Make Announcement */}
          <button className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all cursor-pointer group">
            <div className="w-8 h-8 bg-white/20 group-hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
              <Megaphone size={16} />
            </div>
            <div className="text-left flex-1">
              <span className="text-sm font-medium block">Announce</span>
              <span className="text-xs text-white/70">Notify students</span>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Recent Activity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-500 font-medium tracking-wide">Live</span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-sm font-medium tracking-wide transition-colors cursor-pointer">
                  <Bell size={16} />
                  Notify
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.slice(0, 4).map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
                      <Icon className="text-blue-600" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[var(--galaxy)] text-sm tracking-wide">
                        {activity.title}
                      </h4>
                      <p className="text-[var(--planetary)] text-sm tracking-wide">
                        by {activity.user}
                      </p>
                      <p className="text-gray-500 text-xs tracking-wide mt-1">
                        {activity.time}
                      </p>
                    </div>
                    {activity.isLive && (
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-6 text-center text-sm text-[var(--planetary)] hover:text-[var(--sapphire)] font-medium tracking-wide cursor-pointer transition-colors">
              View All Activity
            </button>
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Upcoming Activities</h3>
              <Calendar className="text-blue-500" size={20} />
            </div>
          </div>

          <div className="p-4">
            {upcomingActivities.length > 0 ? (
              <div className="space-y-3">
                {upcomingActivities.slice(0, 3).map((activity) => {
                  const priorityColor = getPriorityColor(activity.priority);
                  return (
                    <div key={activity.id} className="p-3 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <Calendar size={16} className="mt-0.5 flex-shrink-0 text-blue-500" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[var(--galaxy)] text-sm tracking-wide truncate">
                              {activity.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500 tracking-wide mt-1">
                              <span>{activity.date}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColor} ml-2 flex-shrink-0`}>
                          {activity.daysLeft} days
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="text-gray-400 mx-auto mb-3" size={32} />
                <h4 className="text-sm font-medium text-[var(--galaxy)] mb-1 tracking-wide">No Activities Scheduled</h4>
                <p className="text-[var(--planetary)] text-xs tracking-wide mb-3">
                  Schedule your first activity
                </p>
                <button className="px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-xs font-medium tracking-wide transition-colors cursor-pointer">
                  Create Activity
                </button>
              </div>
            )}
            {upcomingActivities.length > 3 && (
              <button className="w-full mt-3 text-center text-sm text-[var(--planetary)] hover:text-[var(--sapphire)] font-medium tracking-wide cursor-pointer transition-colors">
                View All Activities
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}