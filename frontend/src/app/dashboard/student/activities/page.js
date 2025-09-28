'use client';
import { useState } from 'react';
import StudentLayout from '../../components-student/StudentLayout';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock,
  MapPin,
  Users,
  Award,
  TrendingUp,
  Star,
  CheckCircle,
  AlertCircle,
  Plus,
  ChevronDown,
  Trophy,
  Medal,
  Target,
  BookOpen,
  FileCheck,
  Upload,
  X,
  File,
  Globe,
  Briefcase,
  Heart,
  Lightbulb,
  GraduationCap,
  Code,
  Mic,
  Building,
  ExternalLink,
  UserCheck
} from 'lucide-react';

// Mock data for activity categories
const activityCategories = [
  { 
    name: 'Conferences & Workshops', 
    icon: Mic, 
    color: 'bg-blue-100 text-blue-700', 
    count: 15,
    description: 'Academic conferences, technical workshops, seminars'
  },
  { 
    name: 'Certifications', 
    icon: Award, 
    color: 'bg-green-100 text-green-700', 
    count: 12,
    description: 'Professional certifications and course completions'
  },
  { 
    name: 'Club Activities', 
    icon: Users, 
    color: 'bg-purple-100 text-purple-700', 
    count: 20,
    description: 'Club participation and volunteering efforts'
  },
  { 
    name: 'Competitions', 
    icon: Trophy, 
    color: 'bg-orange-100 text-orange-700', 
    count: 8,
    description: 'Academic contests and competitive events'
  },
  { 
    name: 'Leadership & Internships', 
    icon: Briefcase, 
    color: 'bg-indigo-100 text-indigo-700', 
    count: 6,
    description: 'Leadership positions and internship experiences'
  },
  { 
    name: 'Community Service', 
    icon: Heart, 
    color: 'bg-pink-100 text-pink-700', 
    count: 11,
    description: 'Social service and community engagement'
  },
  { 
    name: 'Online Courses', 
    icon: Globe, 
    color: 'bg-cyan-100 text-cyan-700', 
    count: 14,
    description: 'MOOCs, online certifications, e-learning'
  }
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

// All Available Activities (including unregistered ones)
const allActivities = [
  // Include all recent and registered activities
  ...recentActivities,
  ...registeredActivities,
  // Additional available activities for registration
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
  completedActivities: 32,
  upcomingActivities: 5,
  certifications: 12,
  volunteering: 150 // hours
};

// Registration Modal Component
function RegistrationModal({ isOpen, onClose, activity }) {
  const [formData, setFormData] = useState({
    reason: '',
    experience: '',
    expectations: ''
  });

  const handleSubmit = () => {
    // Handle registration submission logic here
    console.log('Registering for:', activity);
    console.log('Form data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--sky)] rounded-2xl flex items-center justify-center">
              <UserCheck className="text-[var(--planetary)]" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Register for Activity</h3>
              <p className="text-gray-600 text-sm">Complete your registration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Activity Details */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
              {activity?.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{activity?.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{activity?.organizer}</p>
              <p className="text-xs text-gray-500 mb-2">{activity?.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin size={10} />
                  {activity?.location}
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">
                  +{activity?.credits} credits
                </span>
                <span className="bg-[var(--sky)] text-[var(--planetary)] px-2 py-1 rounded-lg font-medium">
                  {activity?.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why are you interested in this activity? *
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Share your motivation and interest..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relevant experience (if any)
            </label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              placeholder="Describe any relevant background or experience..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What do you expect to gain?
            </label>
            <textarea
              value={formData.expectations}
              onChange={(e) => setFormData({...formData, expectations: e.target.value})}
              placeholder="Share your learning goals and expectations..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none"
              rows={2}
            />
          </div>
        </div>

        {/* Registration Info */}
        {activity?.maxParticipants && (
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Registration Status</span>
              <span className="text-sm text-blue-700">
                Deadline: {new Date(activity.registrationDeadline).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-blue-800">
              <span>{activity.currentParticipants}/{activity.maxParticipants} registered</span>
              <span>{activity.maxParticipants - activity.currentParticipants} spots remaining</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(activity.currentParticipants / activity.maxParticipants) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.reason.trim()}
            className="flex-1 px-4 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Registration
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const filteredAllActivities = allActivities.filter(activity => {
    const matchesCategory = selectedCategory === 'ALL' || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'registered':
        return 'bg-yellow-100 text-yellow-700';
      case 'available':
        return 'bg-purple-100 text-purple-700';
      case 'deadline-passed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={12} />;
      case 'in-progress':
        return <Clock size={12} />;
      case 'registered':
        return <Calendar size={12} />;
      case 'available':
        return <Plus size={12} />;
      case 'deadline-passed':
        return <X size={12} />;
      default:
        return <AlertCircle size={12} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'registered':
        return 'Registered';
      case 'available':
        return 'Available';
      case 'deadline-passed':
        return 'Deadline Passed';
      default:
        return status;
    }
  };

  const handleRegister = (activity) => {
    setSelectedActivity(activity);
    setShowRegistrationModal(true);
  };

  const isDeadlinePassed = (deadline) => {
    return new Date() > new Date(deadline);
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--galaxy)]">Activities</h1>
          <p className="text-[var(--planetary)] text-sm mt-1">Track your academic and extracurricular journey</p>
        </div>

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

        {/* Browse by Category */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[var(--galaxy)]">Browse by Category</h2>
            <p className="text-[var(--planetary)] text-sm mt-1">Explore different types of activities</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`p-4 rounded-2xl border-2 transition-colors text-center ${
                  selectedCategory === 'ALL'
                    ? 'border-[var(--planetary)] bg-[var(--sky)]'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="w-12 h-12 bg-[var(--planetary)] rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Target className="text-white" size={20} />
                </div>
                <h4 className="font-semibold text-[var(--galaxy)] text-sm mb-1">All</h4>
                <span className="text-xs text-[var(--planetary)]">{allActivities.length}</span>
              </button>
              
              {activityCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-4 rounded-2xl border-2 transition-colors text-center ${
                      selectedCategory === category.name
                        ? 'border-[var(--planetary)] bg-[var(--sky)]'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                      <Icon size={20} />
                    </div>
                    <h4 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{category.name.split(' ')[0]}</h4>
                    <span className="text-xs text-[var(--planetary)]">{category.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 1: Recent Activities and Registered Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Recent Activities</h2>
                <span className="text-sm text-[var(--planetary)]">{recentActivities.length} activities</span>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Your completed and ongoing activities</p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sm shadow-sm border border-gray-100">
                        {activity.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{activity.title}</h3>
                            <p className="text-xs text-[var(--planetary)] mb-2">{activity.organizer}</p>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                                {getStatusIcon(activity.status)}
                                {getStatusText(activity.status)}
                              </span>
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                +{activity.credits} credits
                              </span>
                            </div>
                            
                            {activity.status === 'in-progress' && activity.progress && (
                              <div className="mb-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-gray-600">Progress</span>
                                  <span className="text-xs font-medium text-[var(--planetary)]">{activity.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-[var(--planetary)] h-1.5 rounded-full transition-all duration-300" 
                                    style={{ width: `${activity.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            

                          </div>
                          
                          <div className="text-right ml-3">
                            <span className="bg-[var(--sky)] text-[var(--planetary)] px-2 py-1 rounded-lg text-xs font-medium">
                              {activity.category.split(' ')[0]}
                            </span>
                          </div>
                        </div>
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
                <span className="text-sm text-[var(--planetary)]">{registeredActivities.length} registered</span>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Your upcoming registered activities</p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {registeredActivities.map((activity) => (
                  <div key={activity.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sm shadow-sm border border-gray-100">
                        {activity.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{activity.title}</h3>
                            <p className="text-xs text-[var(--planetary)] mb-2">{activity.organizer}</p>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                                {getStatusIcon(activity.status)}
                                {getStatusText(activity.status)}
                              </span>
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                +{activity.credits} credits
                              </span>
                            </div>
                            

                          </div>
                          
                          <div className="text-right ml-3">
                            <span className="bg-[var(--sky)] text-[var(--planetary)] px-2 py-1 rounded-lg text-xs font-medium mb-2 block">
                              {activity.category.split(' ')[0]}
                            </span>
                          <button className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-2 py-1 rounded-lg text-xs font-medium transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: All Activities */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">All Activities</h2>
                <p className="text-[var(--planetary)] text-sm mt-1">Discover and register for activities across all categories</p>
              </div>
              <span className="text-sm text-[var(--planetary)]">{filteredAllActivities.length} activities</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search activities by name, organizer, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>
          </div>

          {/* Activities Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredAllActivities.map((activity) => (
                <div key={activity.id} className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
                      {activity.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[var(--galaxy)] text-base mb-1">{activity.title}</h3>
                          <p className="text-sm text-[var(--planetary)]">{activity.organizer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(activity.status)}`}>
                            {getStatusIcon(activity.status)}
                            {getStatusText(activity.status)}
                          </span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                            +{activity.credits} credits
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>

                      {/* Progress bar for in-progress activities */}
                      {activity.status === 'in-progress' && activity.progress && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Progress</span>
                            <span className="text-xs font-medium text-[var(--planetary)]">{activity.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-[var(--planetary)] h-1.5 rounded-full transition-all duration-300" 
                              style={{ width: `${activity.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Registration Info for Available Activities */}
                      {activity.status === 'available' && activity.maxParticipants && (
                        <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-700">Registration Info</span>
                            <span className="text-xs text-red-600">
                              Deadline: {new Date(activity.registrationDeadline).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span>{activity.currentParticipants}/{activity.maxParticipants} registered</span>
                            <span>{activity.maxParticipants - activity.currentParticipants} spots left</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-[var(--planetary)] h-1.5 rounded-full" 
                              style={{ width: `${(activity.currentParticipants / activity.maxParticipants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="bg-[var(--sky)] text-[var(--planetary)] px-3 py-1 rounded-lg text-xs font-medium">
                          {activity.category}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {activity.status === 'available' && (
                            <>
                              {!isDeadlinePassed(activity.registrationDeadline) ? (
                                <button
                                  onClick={() => handleRegister(activity)}
                                  className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                                  disabled={activity.currentParticipants >= activity.maxParticipants}
                                >
                                  <Plus size={12} />
                                  {activity.currentParticipants >= activity.maxParticipants ? 'Full' : 'Register'}
                                </button>
                              ) : (
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium">
                                  Registration Closed
                                </span>
                              )}
                            </>
                          )}
                          
                          {activity.status === 'registered' && (
                            <button className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                              <CheckCircle size={12} />
                              Registered
                            </button>
                          )}
                          
                          {activity.status === 'completed' && (
                            <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                              <CheckCircle size={12} />
                              Completed
                            </button>
                          )}
                          
                          {activity.status === 'in-progress' && (
                            <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                              <Clock size={12} />
                              In Progress
                            </button>
                          )}
                          
                          {activity.status === 'deadline-passed' && (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                              <X size={12} />
                              Missed
                            </span>
                          )}
                          
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                            View Details
                          </button>
                        </div>
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

        {/* Registration Modal */}
        <RegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          activity={selectedActivity}
        />
      </div>
    </StudentLayout>
  );
}