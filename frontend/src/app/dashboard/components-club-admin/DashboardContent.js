'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    message: '',
    priority: 'normal',
    targetAudience: 'all'
  });

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

  const handleGenerateReport = () => {
    // Navigate to reports page
    router.push('/dashboard/club-admin/reports');
  };

  const handleReviewApprovals = () => {
    // Navigate to approval page
    router.push('/dashboard/club-admin/approval');
  };

  const handleMakeAnnouncement = () => {
    setShowAnnouncementModal(true);
  };

  const handleSendAnnouncement = () => {
    // Here you would typically send the announcement via API
    console.log('Sending announcement:', announcementData);
    alert(`Announcement sent to ${announcementData.targetAudience} students!`);
    setShowAnnouncementModal(false);
    setAnnouncementData({
      title: '',
      message: '',
      priority: 'normal',
      targetAudience: 'all'
    });
  };

  const handleNotifyAll = () => {
    // Send notifications to all students about pending activities
    alert('Notifications sent to all students about recent activities!');
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
          <button 
            onClick={handleGenerateReport}
            className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 bg-white/20 group-hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
              <FileText size={16} />
            </div>
            <div className="text-left flex-1">
              <span className="text-sm font-medium block">Generate Report</span>
              <span className="text-xs text-white/70">Create new report</span>
            </div>
          </button>

          {/* Review Approvals */}
          <button 
            onClick={handleReviewApprovals}
            className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 bg-white/20 group-hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
              <UserCheck size={16} />
            </div>
            <div className="text-left flex-1">
              <span className="text-sm font-medium block">Review Approvals</span>
              <span className="text-xs text-white/70">Pending requests</span>
            </div>
          </button>

          {/* Make Announcement */}
          <button 
            onClick={handleMakeAnnouncement}
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
                <button 
                  onClick={handleNotifyAll}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-sm font-medium tracking-wide transition-colors cursor-pointer"
                >
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

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-xl flex items-center justify-center">
                    <Megaphone className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--galaxy)]">Make Announcement</h2>
                    <p className="text-sm text-[var(--planetary)]">Send notification to students</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAnnouncementModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                  Announcement Title
                </label>
                <input
                  type="text"
                  value={announcementData.title}
                  onChange={(e) => setAnnouncementData({...announcementData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent outline-none"
                  placeholder="Enter announcement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                  Message
                </label>
                <textarea
                  value={announcementData.message}
                  onChange={(e) => setAnnouncementData({...announcementData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent outline-none resize-none"
                  placeholder="Enter your message here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Priority
                  </label>
                  <select
                    value={announcementData.priority}
                    onChange={(e) => setAnnouncementData({...announcementData, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent outline-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Target Audience
                  </label>
                  <select
                    value={announcementData.targetAudience}
                    onChange={(e) => setAnnouncementData({...announcementData, targetAudience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent outline-none"
                  >
                    <option value="all">All Students</option>
                    <option value="club_members">Club Members Only</option>
                    <option value="specific">Specific Group</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendAnnouncement}
                disabled={!announcementData.title || !announcementData.message}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors"
              >
                <Send size={18} />
                Send Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}