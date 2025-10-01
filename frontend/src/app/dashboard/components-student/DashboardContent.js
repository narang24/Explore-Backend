'use client';
import { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Activity, 
  Award,
  GraduationCap,
  MapPin,
  Clock,
  MoreVertical,
  BookOpen,
  Star,
  Bell,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Toast } from '@/components/ui/ToastModal';

export default function DashboardContent() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const dashboardData = {
    student: {
      currentYear: '3rd',
      branch: 'Computer Science & Engineering',
      cgpa: '8.7',
      sgpa: '9.1',
      totalCredits: 42,
      totalAchievements: 8,
      totalActivities: 15
    }
  };

  const activities = [
    {
      id: 1,
      title: 'Machine Learning Workshop',
      venue: 'Tech Lab 1',
      time: '2:00 pm',
      date: '2024-03-25',
      type: 'Workshop',
      credits: '2',
      icon: '🤖',
      category: 'Technical',
      registrations: '45/60'
    },
    {
      id: 2,
      title: 'International Conference on AI',
      venue: 'Main Auditorium',
      time: '9:00 am',
      date: '2024-03-28',
      type: 'Conference',
      credits: '4',
      icon: '🌍',
      category: 'Academic',
      registrations: '120/150'
    },
    {
      id: 3,
      title: 'Coding Competition',
      venue: 'Computer Lab 2',
      time: '10:00 am',
      date: '2024-03-30',
      type: 'Competition',
      credits: '3',
      icon: '💻',
      category: 'Extra-curricular',
      registrations: '78/100'
    }
  ];

  const handleRegisterClick = (activity) => {
    setSelectedActivity(activity);
    setShowRegistrationModal(true);
  };

  const handleConfirmRegistration = () => {
    setShowRegistrationModal(false);
    setToastMessage(`Successfully registered for ${selectedActivity?.title}! You'll receive a confirmation email shortly.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <>
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Academic Data Card */}
        <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-3xl p-6 text-white relative overflow-hidden shadow-sm hover:shadow-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white" size={18} />
              </div>
            </div>
            <p className="text-white/80 text-sm mb-1">Academic Performance</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Year:</span>
                <span className="text-lg font-bold">{dashboardData?.student?.currentYear}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">CGPA:</span>
                <span className="text-lg font-bold">{dashboardData?.student?.cgpa}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">SGPA:</span>
                <span className="text-lg font-bold">{dashboardData?.student?.sgpa}</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        </div>

        {/* Total Credits Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
              <BookOpen className="text-[var(--planetary)]" size={18} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Credits Earned</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{dashboardData?.student?.totalCredits}</p>
          <p className="text-xs text-gray-500">Co-curricular + Extra-curricular</p>
        </div>

        {/* Achievements Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
              <Award className="text-[var(--planetary)]" size={18} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Achievements</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{dashboardData?.student?.totalAchievements}</p>
          <p className="text-xs text-gray-500">Certificates & Awards</p>
        </div>

        {/* Activities Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
              <Activity className="text-[var(--planetary)]" size={18} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Activities Participated</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{dashboardData?.student?.totalActivities}</p>
          <p className="text-xs text-gray-500">Seminars, Workshops & More</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications & Reminders */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Notifications & Reminders</h2>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-1.5 rounded-lg text-sm bg-white text-[var(--galaxy)] font-semibold">
                    <option>All</option>
                    <option>Pending</option>
                    <option>Urgent</option>
                  </select>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Stay updated with approvals & deadlines</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: 'Faculty Approval Pending',
                    description: 'AI Workshop participation certificate',
                    type: 'approval',
                    urgency: 'medium',
                    date: '2024-03-20',
                    icon: <AlertCircle size={16} />
                  },
                  {
                    id: 2,
                    title: 'Deadline Approaching',
                    description: 'Submit internship completion report',
                    type: 'deadline',
                    urgency: 'high',
                    date: '2024-03-25',
                    icon: <Clock size={16} />
                  },
                  {
                    id: 3,
                    title: 'Certificate Approved',
                    description: 'Hackathon participation certificate',
                    type: 'approved',
                    urgency: 'low',
                    date: '2024-03-18',
                    icon: <CheckCircle size={16} />
                  }
                ].map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${
                      notification.urgency === 'high' ? 'bg-red-500' :
                      notification.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {notification.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{notification.title}</h3>
                          <p className="text-xs text-[var(--planetary)] mb-2">{notification.description}</p>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            notification.type === 'approval' ? 'bg-yellow-100 text-yellow-700' :
                            notification.type === 'deadline' ? 'bg-red-100 text-red-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              notification.type === 'approval' ? 'bg-yellow-500' :
                              notification.type === 'deadline' ? 'bg-red-500' : 'bg-green-500'
                            }`}></div>
                            {notification.type === 'approval' ? 'Pending' :
                             notification.type === 'deadline' ? 'Urgent' : 'Completed'}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xs text-[var(--planetary)]">
                            {new Date(notification.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-[var(--planetary)] text-sm font-medium hover:text-[var(--sapphire)] transition-colors">
                  View All Notifications
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Activities/Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Upcoming Activities</h2>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-1.5 rounded-lg text-sm bg-white text-[var(--galaxy)] font-semibold">
                    <option>This month</option>
                    <option>Next month</option>
                    <option>All types</option>
                  </select>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Seminars, workshops, competitions & more</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
                      {activity.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-[var(--planetary)] mb-2">
                            <MapPin size={12} />
                            <span>{activity.venue}</span>
                            <Clock size={12} className="ml-1" />
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-[var(--sky)] text-[var(--planetary)] px-2 py-1 rounded-full font-medium">
                                {activity.type}
                              </span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                <Zap size={12} />
                                {activity.credits} Credits
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <p className="text-sm text-[var(--planetary)] mb-2">
                            {new Date(activity.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          <button 
                            onClick={() => handleRegisterClick(activity)}
                            className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-[var(--planetary)] text-sm font-medium hover:text-[var(--sapphire)] transition-colors">
                  View All Activities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--sky)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-[var(--planetary)]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register for Activity</h3>
              <p className="text-gray-600 text-sm mb-6">Confirm your registration for this activity.</p>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Activity Details</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Activity:</span> {selectedActivity.title}</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedActivity.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p><span className="font-medium">Time:</span> {selectedActivity.time}</p>
                  <p><span className="font-medium">Venue:</span> {selectedActivity.venue}</p>
                  <p><span className="font-medium">Credits:</span> {selectedActivity.credits}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRegistration}
                  className="flex-1 px-4 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors"
                >
                  Confirm Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}