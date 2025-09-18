'use client';
import { useState } from 'react';
import { 
  Calendar, 
  Users, 
  UserCheck, 
  Plus,
  TrendingUp,
  Activity,
  Clock,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Megaphone,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

// Mock data - replace with actual API calls
const dashboardStats = {
  totalEvents: 24,
  totalEventsChange: '+12%',
  activeRegistrations: 156,
  activeRegistrationsChange: '+8%',
  upcomingEvents: 8,
  upcomingEventsChange: '+3%',
  activeMembers: 342,
  activeMembersChange: '+15%'
};

const recentActivities = [
  {
    id: 1,
    type: 'registration',
    title: 'New Registration for Tech Hackathon',
    user: 'John Doe',
    time: '2 hours ago',
    icon: UserCheck,
    color: 'text-green-500'
  },
  {
    id: 2,
    type: 'event',
    title: 'AI Workshop Event Created',
    user: 'Admin Team',
    time: '4 hours ago',
    icon: Calendar,
    color: 'text-blue-500'
  },
  {
    id: 3,
    type: 'registration',
    title: 'New Registration for Web Development',
    user: 'Jane Smith',
    time: '6 hours ago',
    icon: UserCheck,
    color: 'text-green-500'
  }
];

const mockAnnouncements = [
  {
    id: 1,
    title: 'Tech Hackathon Registration Open',
    message: 'Registration is now open for our annual tech hackathon. Limited seats available!',
    type: 'info',
    createdAt: '2 hours ago',
    views: 45
  },
  {
    id: 2,
    title: 'Workshop Schedule Updated',
    message: 'The AI/ML workshop has been rescheduled to next Friday. Please check your calendars.',
    type: 'warning',
    createdAt: '1 day ago',
    views: 78
  }
];

export default function DashboardContent() {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    type: 'info'
  });

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.message.trim()) {
      const announcement = {
        id: Date.now(),
        ...newAnnouncement,
        createdAt: 'Just now',
        views: 0
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', message: '', type: 'info' });
      setShowAnnouncementModal(false);
    }
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  const getAnnouncementIcon = (type) => {
    switch (type) {
      case 'warning': return AlertCircle;
      case 'success': return CheckCircle;
      case 'info': 
      default: return Info;
    }
  };

  const getAnnouncementColor = (type) => {
    switch (type) {
      case 'warning': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'success': return 'text-green-500 bg-green-50 border-green-200';
      case 'info':
      default: return 'text-blue-500 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Events */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <span className="text-green-500 text-sm font-medium tracking-wide bg-green-50 px-2 py-1 rounded-full">
              {dashboardStats.totalEventsChange}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-1 tracking-wide">
            {dashboardStats.totalEvents}
          </h3>
          <p className="text-[var(--planetary)] text-sm tracking-wide">Total Events</p>
          <p className="text-xs text-gray-500 mt-2 tracking-wide">Events vs last month</p>
        </div>

        {/* Active Registrations */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="text-green-600" size={24} />
            </div>
            <span className="text-green-500 text-sm font-medium tracking-wide bg-green-50 px-2 py-1 rounded-full">
              {dashboardStats.activeRegistrationsChange}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-1 tracking-wide">
            {dashboardStats.activeRegistrations}
          </h3>
          <p className="text-[var(--planetary)] text-sm tracking-wide">Active Registrations</p>
          <p className="text-xs text-gray-500 mt-2 tracking-wide">Registrations vs last month</p>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="text-orange-600" size={24} />
            </div>
            <span className="text-green-500 text-sm font-medium tracking-wide bg-green-50 px-2 py-1 rounded-full">
              {dashboardStats.upcomingEventsChange}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-1 tracking-wide">
            {dashboardStats.upcomingEvents}
          </h3>
          <p className="text-[var(--planetary)] text-sm tracking-wide">Upcoming Events</p>
          <p className="text-xs text-gray-500 mt-2 tracking-wide">Events in next 30 days</p>
        </div>

        {/* Active Members */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="text-purple-600" size={24} />
            </div>
            <span className="text-green-500 text-sm font-medium tracking-wide bg-green-50 px-2 py-1 rounded-full">
              {dashboardStats.activeMembersChange}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[var(--galaxy)] mb-1 tracking-wide">
            {dashboardStats.activeMembers}
          </h3>
          <p className="text-[var(--planetary)] text-sm tracking-wide">Active Members</p>
          <p className="text-xs text-gray-500 mt-2 tracking-wide">Members vs last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Recent Activity</h3>
              <div className="flex items-center gap-2">
                <Activity className="text-[var(--planetary)]" size={16} />
                <span className="text-sm text-[var(--planetary)] tracking-wide">Live Updates</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50`}>
                      <Icon className={activity.color} size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[var(--galaxy)] text-sm tracking-wide">
                        {activity.title}
                      </h4>
                      <p className="text-[var(--planetary)] text-sm tracking-wide">
                        by {activity.user}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 tracking-wide">
                        {activity.time}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-3">
            <button className="w-full flex items-center gap-3 p-4 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl transition-colors">
              <Calendar size={18} />
              <span className="font-medium text-sm tracking-wide">Create New Event</span>
            </button>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="w-full flex items-center gap-3 p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
            >
              <Megaphone size={18} />
              <span className="font-medium text-sm tracking-wide">Make Announcement</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-gray-100 hover:bg-gray-200 text-[var(--galaxy)] rounded-xl transition-colors">
              <Users size={18} />
              <span className="font-medium text-sm tracking-wide">View All Members</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-gray-100 hover:bg-gray-200 text-[var(--galaxy)] rounded-xl transition-colors">
              <TrendingUp size={18} />
              <span className="font-medium text-sm tracking-wide">View Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Recent Announcements</h3>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-sm font-medium tracking-wide transition-colors"
            >
              <Plus size={16} />
              New Announcement
            </button>
          </div>
        </div>
        <div className="p-6">
          {announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement) => {
                const Icon = getAnnouncementIcon(announcement.type);
                const colorClasses = getAnnouncementColor(announcement.type);
                return (
                  <div key={announcement.id} className={`p-4 rounded-xl border ${colorClasses}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon size={20} />
                        <div className="flex-1">
                          <h4 className="font-semibold text-[var(--galaxy)] mb-1 tracking-wide">
                            {announcement.title}
                          </h4>
                          <p className="text-[var(--planetary)] text-sm tracking-wide mb-2">
                            {announcement.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 tracking-wide">
                            <span>{announcement.createdAt}</span>
                            <div className="flex items-center gap-1">
                              <Eye size={12} />
                              <span>{announcement.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit size={14} className="text-gray-500" />
                        </button>
                        <button 
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Megaphone className="text-gray-400 mx-auto mb-4" size={48} />
              <h4 className="text-lg font-medium text-[var(--galaxy)] mb-2 tracking-wide">No Announcements Yet</h4>
              <p className="text-[var(--planetary)] text-sm tracking-wide mb-4">
                Create your first announcement to notify students
              </p>
              <button 
                onClick={() => setShowAnnouncementModal(true)}
                className="px-6 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium tracking-wide transition-colors"
              >
                Create Announcement
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Create Announcement</h3>
              <button 
                onClick={() => setShowAnnouncementModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--galaxy)] mb-2 tracking-wide">Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent tracking-wide"
                  placeholder="Enter announcement title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--galaxy)] mb-2 tracking-wide">Message</label>
                <textarea
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none tracking-wide"
                  placeholder="Enter announcement message"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--galaxy)] mb-2 tracking-wide">Type</label>
                <select
                  value={newAnnouncement.type}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent tracking-wide"
                >
                  <option value="info">Information</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateAnnouncement}
                  disabled={!newAnnouncement.title.trim() || !newAnnouncement.message.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-300 text-white rounded-xl font-medium tracking-wide transition-colors"
                >
                  <Send size={16} />
                  Create Announcement
                </button>
                <button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-[var(--galaxy)] rounded-xl font-medium tracking-wide transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}