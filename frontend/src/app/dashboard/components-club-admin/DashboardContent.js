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
  Trash2
} from 'lucide-react';

// Mock data - replace with actual API calls
const dashboardStats = {
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
    isLive: true
  },
  {
    id: 2,
    type: 'member',
    title: 'New Member Joined the Club',
    user: 'Admin Team',
    time: '4 hours ago',
    icon: Users,
    isLive: false
  },
  {
    id: 3,
    type: 'registration',
    title: 'New Registration for Web Development',
    user: 'Jane Smith',
    time: '6 hours ago',
    icon: UserCheck,
    isLive: false
  },
  {
    id: 4,
    type: 'member',
    title: 'Member Profile Updated',
    user: 'Alex Johnson',
    time: '8 hours ago',
    icon: Users,
    isLive: false
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
      {/* Stats Cards with Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Registrations */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UserCheck className="text-blue-600" size={24} />
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
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="text-blue-600" size={24} />
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

        {/* Quick Actions Card */}
        <div className="bg-gradient-to-br from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-6 text-white shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Quick Actions</h3>
            <p className="text-white/70 text-sm">Manage efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Create Event */}
            <button className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all cursor-pointer group">
              <div className="w-8 h-8 bg-white/20 group-hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                <Plus size={16} />
              </div>
              <div className="text-left flex-1">
                <span className="text-sm font-medium block">Create Event</span>
                <span className="text-xs text-white/70">New event setup</span>
              </div>
            </button>

            {/* Make Announcement */}
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all cursor-pointer group"
            >
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Recent Activity</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-500 font-medium tracking-wide">Live</span>
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

        {/* Recent Announcements */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--galaxy)] tracking-wide">Recent Announcements</h3>
              <button 
                onClick={() => setShowAnnouncementModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                <Plus size={16} />
                New Announcement
              </button>
            </div>
          </div>

          <div className="p-4">
            {announcements.length > 0 ? (
              <div className="space-y-3">
                {announcements.slice(0, 3).map((announcement) => {
                  const Icon = getAnnouncementIcon(announcement.type);
                  const colorClasses = getAnnouncementColor(announcement.type);
                  return (
                    <div key={announcement.id} className={`p-3 rounded-lg border ${colorClasses}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <Icon size={16} className="mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[var(--galaxy)] text-sm tracking-wide truncate">
                              {announcement.title}
                            </h4>
                            <p className="text-[var(--planetary)] text-xs tracking-wide line-clamp-2 mt-1">
                              {announcement.message}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 tracking-wide mt-2">
                              <span>{announcement.createdAt}</span>
                              <div className="flex items-center gap-1">
                                <Eye size={10} />
                                <span>{announcement.views}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer">
                            <Edit size={12} className="text-gray-500" />
                          </button>
                          <button 
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
                            className="p-1 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <Megaphone className="text-gray-400 mx-auto mb-3" size={32} />
                <h4 className="text-sm font-medium text-[var(--galaxy)] mb-1 tracking-wide">No Announcements Yet</h4>
                <p className="text-[var(--planetary)] text-xs tracking-wide mb-3">
                  Create your first announcement
                </p>
                <button 
                  onClick={() => setShowAnnouncementModal(true)}
                  className="px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-xs font-medium tracking-wide transition-colors cursor-pointer"
                >
                  Create Announcement
                </button>
              </div>
            )}
            {announcements.length > 3 && (
              <button className="w-full mt-3 text-center text-sm text-[var(--planetary)] hover:text-[var(--sapphire)] font-medium tracking-wide cursor-pointer transition-colors">
                View All Announcements
              </button>
            )}
          </div>
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
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
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent tracking-wide text-sm"
                  placeholder="Enter announcement title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--galaxy)] mb-2 tracking-wide">Message</label>
                <textarea
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none tracking-wide text-sm"
                  placeholder="Enter announcement message"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--galaxy)] mb-2 tracking-wide">Type</label>
                <select
                  value={newAnnouncement.type}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent tracking-wide text-sm"
                >
                  <option value="info">Information</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCreateAnnouncement}
                  disabled={!newAnnouncement.title.trim() || !newAnnouncement.message.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-300 text-white rounded-xl text-sm font-medium tracking-wide transition-colors cursor-pointer"
                >
                  <Send size={14} />
                  Create
                </button>
                <button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-[var(--galaxy)] rounded-xl text-sm font-medium tracking-wide transition-colors cursor-pointer"
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