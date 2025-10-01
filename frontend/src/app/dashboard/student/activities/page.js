'use client';
import { useState } from 'react';
import StudentLayout from '../../components-student/StudentLayout';
import ActivityDetailsModal from './ActivityDetailsModal';
import { Toast } from '@/components/ui/ToastModal';
import { 
  Search, 
  Target,
  BookOpen,
  Award,
  Heart,
  Mic,
  Users,
  Trophy,
  Briefcase,
  Globe,
  CheckCircle,
  Clock,
  Calendar,
  Plus,
  X,
  AlertCircle
} from 'lucide-react';

// Mock data for activity categories
const activityCategories = [
  { name: 'Conferences & Workshops', icon: Mic, color: 'bg-blue-100 text-blue-700', count: 15 },
  { name: 'Certifications', icon: Award, color: 'bg-green-100 text-green-700', count: 12 },
  { name: 'Club Activities', icon: Users, color: 'bg-purple-100 text-purple-700', count: 20 },
  { name: 'Competitions', icon: Trophy, color: 'bg-orange-100 text-orange-700', count: 8 },
  { name: 'Leadership & Internships', icon: Briefcase, color: 'bg-indigo-100 text-indigo-700', count: 6 },
  { name: 'Community Service', icon: Heart, color: 'bg-pink-100 text-pink-700', count: 11 },
  { name: 'Online Courses', icon: Globe, color: 'bg-cyan-100 text-cyan-700', count: 14 }
];

// Recent Activities (completed and in-progress)
const recentActivities = [
  {
    id: 1,
    title: 'AI & Machine Learning Workshop',
    category: 'Conferences & Workshops',
    organizer: 'GDSC TIET',
    status: 'completed',
    credits: 3,
    icon: '🤖',
    description: 'Hands-on workshop on ML algorithms and applications',
    location: 'Seminar Hall A'
  },
  {
    id: 2,
    title: 'AWS Cloud Practitioner',
    category: 'Certifications',
    organizer: 'Amazon Web Services',
    status: 'completed',
    credits: 4,
    icon: '☁️',
    description: 'Cloud computing fundamentals certification',
    location: 'Online'
  },
  {
    id: 3,
    title: 'React.js Bootcamp',
    category: 'Online Courses',
    organizer: 'Coursera',
    status: 'in-progress',
    credits: 5,
    icon: '⚛️',
    description: 'Complete React development course',
    location: 'Online',
    progress: 65
  },
  {
    id: 4,
    title: 'Blood Donation Drive',
    category: 'Community Service',
    organizer: 'NSS TIET',
    status: 'completed',
    credits: 2,
    icon: '❤️',
    description: 'Organized campus-wide blood donation camp',
    location: 'Main Auditorium'
  }
];

// Registered Activities (upcoming activities)
const registeredActivities = [
  {
    id: 5,
    title: 'International Conference on AI',
    category: 'Conferences & Workshops',
    organizer: 'IEEE Student Branch',
    status: 'registered',
    credits: 6,
    icon: '🚀',
    description: 'Premier AI conference with industry experts',
    location: 'Convention Center'
  },
  {
    id: 6,
    title: 'Hackathon 2024',
    category: 'Competitions',
    organizer: 'Tech Society',
    status: 'registered',
    credits: 8,
    icon: '💻',
    description: '48-hour coding competition with prizes',
    location: 'Computer Lab'
  },
  {
    id: 7,
    title: 'Leadership Summit',
    category: 'Leadership & Internships',
    organizer: 'Student Council',
    status: 'registered',
    credits: 4,
    icon: '👑',
    description: 'Annual leadership development summit',
    location: 'Main Auditorium'
  }
];

// All Available Activities
const allActivities = [
  ...recentActivities,
  ...registeredActivities,
  {
    id: 8,
    title: 'Cybersecurity Workshop',
    category: 'Conferences & Workshops',
    organizer: 'Information Security Club',
    status: 'available',
    credits: 4,
    icon: '🛡️',
    description: 'Learn ethical hacking and cybersecurity fundamentals',
    location: 'Lab 201',
    registrationDeadline: '2025-01-05',
    maxParticipants: 50,
    currentParticipants: 32
  },
  {
    id: 9,
    title: 'Google Data Analytics Certificate',
    category: 'Certifications',
    organizer: 'Google Career Certificates',
    status: 'available',
    credits: 6,
    icon: '📊',
    description: 'Professional data analytics certification program',
    location: 'Online',
    registrationDeadline: '2025-01-12',
    maxParticipants: 100,
    currentParticipants: 45
  },
  {
    id: 10,
    title: 'Environmental Cleanup Drive',
    category: 'Community Service',
    organizer: 'EcoClub TIET',
    status: 'available',
    credits: 3,
    icon: '🌱',
    description: 'Campus and community environmental initiative',
    location: 'Campus & Surroundings',
    registrationDeadline: '2025-01-06',
    maxParticipants: 75,
    currentParticipants: 28
  },
  {
    id: 11,
    title: 'National Programming Contest',
    category: 'Competitions',
    organizer: 'ACM ICPC',
    status: 'deadline-passed',
    credits: 10,
    icon: '🏆',
    description: 'Prestigious programming competition',
    location: 'Multiple Venues',
    registrationDeadline: '2024-12-15',
    maxParticipants: 200,
    currentParticipants: 200
  },
  {
    id: 12,
    title: 'Summer Internship Program',
    category: 'Leadership & Internships',
    organizer: 'Microsoft',
    status: 'available',
    credits: 15,
    icon: '💼',
    description: '3-month software development internship',
    location: 'Bangalore',
    registrationDeadline: '2025-02-01',
    maxParticipants: 20,
    currentParticipants: 8
  }
];

const statsData = {
  totalActivities: 45,
  totalCredits: 89,
  certifications: 12,
  volunteering: 150
};

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const filteredAllActivities = allActivities.filter(activity => {
    const matchesCategory = selectedCategory === 'ALL' || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setShowDetailsModal(true);
  };

  const handleRegister = (activity, formData) => {
    console.log('Registration:', activity, formData);
    setToastMessage(`Successfully registered for "${activity.title}"! You'll receive a confirmation email shortly.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'registered': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={12} />;
      case 'in-progress': return <Clock size={12} />;
      case 'registered': return <Calendar size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'registered': return 'Registered';
      default: return status;
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-white/80" size={16} />
              <span className="text-white/80 text-xs font-medium">Total Activities</span>
            </div>
            <p className="text-2xl font-bold">{statsData.totalActivities}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-[var(--planetary)]" size={16} />
              <span className="text-gray-600 text-xs font-medium">Total Credits</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{statsData.totalCredits}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-[var(--planetary)]" size={16} />
              <span className="text-gray-600 text-xs font-medium">Certifications</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{statsData.certifications}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-[var(--planetary)]" size={16} />
              <span className="text-gray-600 text-xs font-medium">Volunteering</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{statsData.volunteering}h</p>
          </div>
        </div>

        {/* Recent and Registered Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Recent Activities</h2>
                <span className="text-sm text-[var(--planetary)]">{recentActivities.length}</span>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Completed and ongoing</p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleViewDetails(activity)}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sm shadow-sm border border-gray-100">
                        {activity.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{activity.title}</h3>
                        <p className="text-xs text-[var(--planetary)] mb-2">{activity.organizer}</p>
                        
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                            {getStatusIcon(activity.status)}
                            {getStatusText(activity.status)}
                          </span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            +{activity.credits} credits
                          </span>
                        </div>
                        
                        {activity.status === 'in-progress' && activity.progress && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-[var(--planetary)] h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${activity.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registered Activities */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Registered Activities</h2>
                <span className="text-sm text-[var(--planetary)]">{registeredActivities.length}</span>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Upcoming events</p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {registeredActivities.map((activity) => (
                  <div key={activity.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleViewDetails(activity)}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sm shadow-sm border border-gray-100">
                        {activity.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{activity.title}</h3>
                        <p className="text-xs text-[var(--planetary)] mb-2">{activity.organizer}</p>
                        
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                            {getStatusIcon(activity.status)}
                            {getStatusText(activity.status)}
                          </span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            +{activity.credits} credits
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Browse by Category */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[var(--galaxy)]">Browse by Category</h2>
            <p className="text-[var(--planetary)] text-sm mt-1">Filter activities by type</p>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`p-3 rounded-xl border-2 transition-colors text-center ${
                  selectedCategory === 'ALL'
                    ? 'border-[var(--planetary)] bg-[var(--sky)]'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="w-10 h-10 bg-[var(--planetary)] rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Target className="text-white" size={16} />
                </div>
                <h4 className="font-medium text-[var(--galaxy)] text-xs">All</h4>
              </button>
              
              {activityCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-3 rounded-xl border-2 transition-colors text-center ${
                      selectedCategory === category.name
                        ? 'border-[var(--planetary)] bg-[var(--sky)]'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-1`}>
                      <Icon size={16} />
                    </div>
                    <h4 className="font-medium text-[var(--galaxy)] text-xs truncate">{category.name.split(' ')[0]}</h4>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* All Activities */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">All Activities</h2>
                <p className="text-[var(--planetary)] text-sm mt-1">Discover and register for activities</p>
              </div>
              <span className="text-sm text-[var(--planetary)]">{filteredAllActivities.length} activities</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>
          </div>

          {/* Activities Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredAllActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(activity)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
                      {activity.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--galaxy)] text-base mb-1">{activity.title}</h3>
                      <p className="text-sm text-[var(--planetary)] mb-2">{activity.organizer}</p>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                          +{activity.credits} credits
                        </span>
                        <span className="bg-[var(--sky)] text-[var(--planetary)] px-2 py-1 rounded-lg text-xs font-medium">
                          {activity.category.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredAllActivities.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-2">No activities found</h3>
                <p className="text-[var(--planetary)] text-sm mb-4">
                  {searchTerm || selectedCategory !== 'ALL' 
                    ? 'Try adjusting your search or category filter'
                    : 'No activities available at the moment'
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('ALL');
                  }}
                  className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      <ActivityDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        activity={selectedActivity}
        onRegister={handleRegister}
      />

      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </StudentLayout>
  );
}