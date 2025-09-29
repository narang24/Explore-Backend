'use client';
import { useState } from 'react';
import { 
  Calendar,
  Trophy,
  Award,
  Users,
  Briefcase,
  Heart,
  GraduationCap,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  X,
  Save,
  ChevronDown,
  SortDesc,
  MapPin,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
  Star,
  Building,
  FileText,
  Download,
  Upload
} from 'lucide-react';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';

// Mock data for activities
const mockActivities = {
  conferences: [
    {
      id: 1,
      title: 'IEEE International Conference on AI',
      type: 'conference',
      category: 'Conferences and Workshops',
      description: 'International conference on Artificial Intelligence and Machine Learning',
      date: '2024-03-15',
      endDate: '2024-03-17',
      location: 'New Delhi, India',
      organizer: 'IEEE',
      status: 'completed',
      participantCount: 45,
      maxParticipants: 50,
      registrationDeadline: '2024-03-10',
      isInternal: false,
      certificate: true,
      points: 50,
      createdBy: 'Dr. Sarah Johnson',
      createdAt: '2024-02-01'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      type: 'workshop',
      category: 'Conferences and Workshops',
      description: 'Hands-on workshop on modern web development using React and Node.js',
      date: '2024-04-20',
      endDate: '2024-04-21',
      location: 'College Auditorium',
      organizer: 'Computer Science Department',
      status: 'upcoming',
      participantCount: 28,
      maxParticipants: 40,
      registrationDeadline: '2024-04-15',
      isInternal: true,
      certificate: true,
      points: 30,
      createdBy: 'Prof. Michael Chen',
      createdAt: '2024-03-25'
    }
  ],
  certifications: [
    {
      id: 3,
      title: 'AWS Cloud Practitioner Certification',
      type: 'certification',
      category: 'Certifications',
      description: 'Industry-recognized cloud computing certification from Amazon Web Services',
      date: '2024-02-28',
      endDate: null,
      location: 'Online',
      organizer: 'Amazon Web Services',
      status: 'completed',
      participantCount: 12,
      maxParticipants: null,
      registrationDeadline: '2024-02-20',
      isInternal: false,
      certificate: true,
      points: 75,
      createdBy: 'Dr. Priya Sharma',
      createdAt: '2024-01-15'
    }
  ],
  competitions: [
    {
      id: 4,
      title: 'National Coding Championship',
      type: 'competition',
      category: 'Competitions and Contests',
      description: 'National level programming competition for engineering students',
      date: '2024-05-10',
      endDate: '2024-05-12',
      location: 'IIT Delhi',
      organizer: 'CodeChef',
      status: 'upcoming',
      participantCount: 15,
      maxParticipants: 20,
      registrationDeadline: '2024-05-05',
      isInternal: false,
      certificate: true,
      points: 100,
      createdBy: 'Prof. Rajesh Kumar',
      createdAt: '2024-04-01'
    }
  ],
  clubActivities: [
    {
      id: 5,
      title: 'Tech Talk Series - AI & Ethics',
      type: 'seminar',
      category: 'Club Activities',
      description: 'Monthly tech talk series discussing ethical implications of AI',
      date: '2024-04-25',
      endDate: null,
      location: 'Seminar Hall B',
      organizer: 'Tech Club',
      status: 'upcoming',
      participantCount: 35,
      maxParticipants: 60,
      registrationDeadline: '2024-04-20',
      isInternal: true,
      certificate: false,
      points: 20,
      createdBy: 'Sarah Johnson',
      createdAt: '2024-04-10'
    }
  ],
  internships: [
    {
      id: 6,
      title: 'Summer Internship Program',
      type: 'internship',
      category: 'Internships and Leadership',
      description: 'Summer internship opportunities with industry partners',
      date: '2024-06-01',
      endDate: '2024-07-31',
      location: 'Various Companies',
      organizer: 'Placement Cell',
      status: 'registration_open',
      participantCount: 67,
      maxParticipants: 100,
      registrationDeadline: '2024-05-15',
      isInternal: false,
      certificate: true,
      points: 150,
      createdBy: 'Dr. Anna Rodriguez',
      createdAt: '2024-03-01'
    }
  ],
  community: [
    {
      id: 7,
      title: 'Blood Donation Drive',
      type: 'community_service',
      category: 'Community Service',
      description: 'Annual blood donation camp in collaboration with local hospital',
      date: '2024-04-30',
      endDate: null,
      location: 'College Campus',
      organizer: 'NSS Unit',
      status: 'upcoming',
      participantCount: 82,
      maxParticipants: 150,
      registrationDeadline: '2024-04-28',
      isInternal: true,
      certificate: true,
      points: 40,
      createdBy: 'Dr. David Wilson',
      createdAt: '2024-04-15'
    }
  ]
};

const activityTypes = [
  { value: 'conference', label: 'Conference', icon: GraduationCap, color: 'blue' },
  { value: 'workshop', label: 'Workshop', icon: BookOpen, color: 'green' },
  { value: 'seminar', label: 'Seminar', icon: Users, color: 'purple' },
  { value: 'competition', label: 'Competition', icon: Trophy, color: 'yellow' },
  { value: 'certification', label: 'Certification', icon: Award, color: 'indigo' },
  { value: 'internship', label: 'Internship', icon: Briefcase, color: 'red' },
  { value: 'community_service', label: 'Community Service', icon: Heart, color: 'pink' },
  { value: 'leadership', label: 'Leadership Role', icon: Star, color: 'orange' }
];

const categories = [
  'Conferences and Workshops',
  'Certifications',
  'Club Activities',
  'Competitions and Contests',
  'Internships and Leadership',
  'Community Service'
];

const statusOptions = [
  { value: 'upcoming', label: 'Upcoming', color: 'blue' },
  { value: 'registration_open', label: 'Registration Open', color: 'green' },
  { value: 'ongoing', label: 'Ongoing', color: 'yellow' },
  { value: 'completed', label: 'Completed', color: 'gray' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' }
];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState(mockActivities);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showActivityDetailsModal, setShowActivityDetailsModal] = useState(false);
  const [showActivityActions, setShowActivityActions] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Add activity form states
  const [newActivity, setNewActivity] = useState({
    title: '',
    type: 'conference',
    category: 'Conferences and Workshops',
    description: '',
    date: '',
    endDate: '',
    location: '',
    organizer: '',
    maxParticipants: '',
    registrationDeadline: '',
    isInternal: true,
    certificate: false,
    points: 0
  });

  // Get all activities as a flat array
  const getAllActivities = () => {
    return Object.values(activities).flat();
  };

  // Filter activities based on current filters
  const getFilteredActivities = () => {
    let allActivities = getAllActivities();
    
    // Apply tab filter
    if (activeTab !== 'all') {
      allActivities = allActivities.filter(activity => activity.category === activeTab);
    }
    
    // Apply search filter
    if (searchTerm) {
      allActivities = allActivities.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterCategory !== 'all') {
      allActivities = allActivities.filter(activity => activity.category === filterCategory);
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      allActivities = allActivities.filter(activity => activity.status === filterStatus);
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      allActivities = allActivities.filter(activity => activity.type === filterType);
    }
    
    // Sort activities
    allActivities.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'participants':
          return b.participantCount - a.participantCount;
        case 'points':
          return b.points - a.points;
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
    
    return allActivities;
  };

  // Add new activity
  const handleAddActivity = () => {
    if (!newActivity.title || !newActivity.date || !newActivity.location) return;

    const activityData = {
      id: Date.now(),
      ...newActivity,
      participantCount: 0,
      maxParticipants: newActivity.maxParticipants ? parseInt(newActivity.maxParticipants) : null,
      points: parseInt(newActivity.points) || 0,
      status: 'upcoming',
      createdBy: 'Current User',
      createdAt: new Date().toISOString()
    };

    // Add to appropriate category
    const categoryKey = newActivity.category === 'Conferences and Workshops' ? 'conferences' :
                       newActivity.category === 'Certifications' ? 'certifications' :
                       newActivity.category === 'Competitions and Contests' ? 'competitions' :
                       newActivity.category === 'Club Activities' ? 'clubActivities' :
                       newActivity.category === 'Internships and Leadership' ? 'internships' :
                       'community';

    setActivities(prev => ({
      ...prev,
      [categoryKey]: [...prev[categoryKey], activityData]
    }));

    // Reset form
    setNewActivity({
      title: '',
      type: 'conference',
      category: 'Conferences and Workshops',
      description: '',
      date: '',
      endDate: '',
      location: '',
      organizer: '',
      maxParticipants: '',
      registrationDeadline: '',
      isInternal: true,
      certificate: false,
      points: 0
    });
    setShowAddActivityModal(false);
  };

  // Delete activity
  const handleDeleteActivity = (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(prev => {
        const newActivities = { ...prev };
        Object.keys(newActivities).forEach(key => {
          newActivities[key] = newActivities[key].filter(activity => activity.id !== activityId);
        });
        return newActivities;
      });
      setShowActivityActions(null);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    const statusConfig = statusOptions.find(s => s.value === status);
    return statusConfig ? statusConfig.color : 'gray';
  };

  // Get type icon and color
  const getTypeConfig = (type) => {
    return activityTypes.find(t => t.value === type) || activityTypes[0];
  };

  // Activity Card Component
  const ActivityCard = ({ activity }) => {
    const typeConfig = getTypeConfig(activity.type);
    const TypeIcon = typeConfig.icon;
    const statusColor = getStatusColor(activity.status);
    
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-${typeConfig.color}-100 rounded-lg flex items-center justify-center`}>
              <TypeIcon className={`text-${typeConfig.color}-600`} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[var(--galaxy)] text-sm truncate">{activity.title}</h4>
              <p className="text-[var(--planetary)] text-xs">{activity.organizer}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 bg-${statusColor}-100 text-${statusColor}-700 rounded-full text-xs font-medium`}>
              {statusOptions.find(s => s.value === activity.status)?.label}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowActivityActions(showActivityActions === activity.id ? null : activity.id)}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <MoreVertical size={14} className="text-gray-600" />
              </button>
              
              {showActivityActions === activity.id && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[160px]">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedActivity(activity);
                        setShowActivityDetailsModal(true);
                        setShowActivityActions(null);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Eye size={14} />
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        // Handle edit functionality
                        setShowActivityActions(null);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--planetary)] hover:bg-gray-100"
                    >
                      <Edit3 size={14} />
                      Edit Activity
                    </button>
                    <button
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <Trash2 size={14} />
                      Delete Activity
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{activity.description}</p>

        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <span>
              {new Date(activity.date).toLocaleDateString()}
              {activity.endDate && ` - ${new Date(activity.endDate).toLocaleDateString()}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} />
            <span className="truncate">{activity.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={12} />
              <span>{activity.participantCount}{activity.maxParticipants ? `/${activity.maxParticipants}` : ''} participants</span>
            </div>
            {activity.points > 0 && (
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-500" />
                <span className="font-medium">{activity.points} pts</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {activity.certificate && (
              <div className="flex items-center gap-1">
                <Award size={12} className="text-[var(--planetary)]" />
                <span className="text-xs text-[var(--planetary)]">Certificate</span>
              </div>
            )}
            {activity.isInternal && (
              <span className="px-2 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-xs">Internal</span>
            )}
          </div>
          <button
            onClick={() => {
              setSelectedActivity(activity);
              setShowActivityDetailsModal(true);
            }}
            className="text-[var(--planetary)] hover:text-[var(--sapphire)] text-xs font-medium"
          >
            View Details →
          </button>
        </div>
      </div>
    );
  };

  const tabs = [
    { key: 'all', label: 'All Activities', count: getAllActivities().length },
    { key: 'Conferences and Workshops', label: 'Conferences & Workshops', count: activities.conferences.length },
    { key: 'Certifications', label: 'Certifications', count: activities.certifications.length },
    { key: 'Competitions and Contests', label: 'Competitions', count: activities.competitions.length },
    { key: 'Club Activities', label: 'Club Activities', count: activities.clubActivities.length },
    { key: 'Internships and Leadership', label: 'Internships', count: activities.internships.length },
    { key: 'Community Service', label: 'Community Service', count: activities.community.length }
  ];

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--galaxy)]">Activities Management</h2>
              <p className="text-[var(--planetary)] text-sm mt-1">
                Create and manage student activities, events, and opportunities
              </p>
            </div>
            <button
              onClick={() => setShowAddActivityModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors"
            >
              <Plus size={16} />
              Add Activity
            </button>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search activities by title, organizer, or location..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="participants">Sort by Participants</option>
                <option value="points">Sort by Points</option>
                <option value="created">Sort by Created</option>
              </select>
              <SortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[var(--galaxy)] hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                Filters
                <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {showFilters && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-[250px]">
                  <div className="p-3">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Category</label>
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Status</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        >
                          <option value="all">All Statuses</option>
                          {statusOptions.map(status => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Type</label>
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        >
                          <option value="all">All Types</option>
                          {activityTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <Calendar className="text-[var(--planetary)]" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--galaxy)]">
                  {getAllActivities().length}
                </p>
                <p className="text-[var(--planetary)] text-sm">Total Activities</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--galaxy)]">
                  {getAllActivities().filter(a => a.status === 'upcoming' || a.status === 'registration_open').length}
                </p>
                <p className="text-[var(--planetary)] text-sm">Upcoming</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--galaxy)]">
                  {getAllActivities().reduce((sum, activity) => sum + activity.participantCount, 0)}
                </p>
                <p className="text-[var(--planetary)] text-sm">Total Participants</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--planetary)]/10 rounded-lg flex items-center justify-center">
                <Award className="text-[var(--planetary)]" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--galaxy)]">
                  {getAllActivities().filter(a => a.certificate).length}
                </p>
                <p className="text-[var(--planetary)] text-sm">With Certificates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Category Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.key
                      ? 'bg-[var(--planetary)] text-white'
                      : 'text-[var(--galaxy)] hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-[var(--planetary)]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredActivities().map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
              
              {getFilteredActivities().length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Calendar className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-[var(--planetary)] text-lg font-medium mb-2">No activities found</p>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' || filterType !== 'all'
                      ? 'Try adjusting your search criteria or filters'
                      : 'Create your first activity to get started'
                    }
                  </p>
                  <button
                    onClick={() => setShowAddActivityModal(true)}
                    className="px-6 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors"
                  >
                    Add New Activity
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Activity Modal */}
        {showAddActivityModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[var(--galaxy)]">Create New Activity</h3>
                  <button
                    onClick={() => {
                      setShowAddActivityModal(false);
                      setNewActivity({
                        title: '',
                        type: 'conference',
                        category: 'Conferences and Workshops',
                        description: '',
                        date: '',
                        endDate: '',
                        location: '',
                        organizer: '',
                        maxParticipants: '',
                        registrationDeadline: '',
                        isInternal: true,
                        certificate: false,
                        points: 0
                      });
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                      Activity Title *
                    </label>
                    <input
                      type="text"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter activity title"
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                      Activity Type *
                    </label>
                    <select
                      value={newActivity.type}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    >
                      {activityTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Category *
                  </label>
                  <select
                    value={newActivity.category}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newActivity.description}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the activity, its objectives, and what participants will learn"
                    rows={3}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                  />
                </div>

                {/* Date and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={newActivity.endDate}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., College Auditorium, Online, IIT Delhi"
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                      Organizer *
                    </label>
                    <input
                      type="text"
                      value={newActivity.organizer}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, organizer: e.target.value }))}
                      placeholder="e.g., Computer Science Department, IEEE"
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Registration Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                      Max Participants (Optional)
                    </label>
                    <input
                      type="number"
                      value={newActivity.maxParticipants}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, maxParticipants: e.target.value }))}
                      placeholder="Leave empty for unlimited"
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                      Registration Deadline
                    </label>
                    <input
                      type="date"
                      value={newActivity.registrationDeadline}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Activity Points
                  </label>
                  <input
                    type="number"
                    value={newActivity.points}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, points: e.target.value }))}
                    placeholder="Points awarded for participation"
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                  />
                </div>

                {/* Settings */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-[var(--galaxy)]">Activity Settings</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--galaxy)]">Internal Activity</p>
                      <p className="text-xs text-gray-500">Activity organized within the college</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newActivity.isInternal}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, isInternal: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--planetary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--planetary)]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--galaxy)]">Certificate Available</p>
                      <p className="text-xs text-gray-500">Participants will receive certificates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newActivity.certificate}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, certificate: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--planetary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--planetary)]"></div>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={handleAddActivity}
                    disabled={!newActivity.title || !newActivity.date || !newActivity.location || !newActivity.organizer}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save size={16} />
                    Create Activity
                  </button>
                  <button
                    onClick={() => {
                      setShowAddActivityModal(false);
                      setNewActivity({
                        title: '',
                        type: 'conference',
                        category: 'Conferences and Workshops',
                        description: '',
                        date: '',
                        endDate: '',
                        location: '',
                        organizer: '',
                        maxParticipants: '',
                        registrationDeadline: '',
                        isInternal: true,
                        certificate: false,
                        points: 0
                      });
                    }}
                    className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-[var(--galaxy)] rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Details Modal */}
        {showActivityDetailsModal && selectedActivity && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${getTypeConfig(selectedActivity.type).color}-100 rounded-lg flex items-center justify-center`}>
                      {(() => {
                        const TypeIcon = getTypeConfig(selectedActivity.type).icon;
                        return <TypeIcon className={`text-${getTypeConfig(selectedActivity.type).color}-600`} size={20} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--galaxy)]">{selectedActivity.title}</h3>
                      <p className="text-[var(--planetary)] text-sm">{selectedActivity.organizer}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowActivityDetailsModal(false);
                      setSelectedActivity(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Status and Basic Info */}
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1.5 bg-${getStatusColor(selectedActivity.status)}-100 text-${getStatusColor(selectedActivity.status)}-700 rounded-full text-sm font-medium`}>
                    {statusOptions.find(s => s.value === selectedActivity.status)?.label}
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {getTypeConfig(selectedActivity.type).label}
                  </span>
                  {selectedActivity.isInternal && (
                    <span className="px-3 py-1.5 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-sm font-medium">
                      Internal
                    </span>
                  )}
                  {selectedActivity.certificate && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      <Award size={14} />
                      Certificate
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-[var(--galaxy)] mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedActivity.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="text-[var(--planetary)]" size={16} />
                      <div>
                        <p className="text-xs font-medium text-[var(--planetary)]">Date</p>
                        <p className="text-sm font-semibold text-[var(--galaxy)]">
                          {new Date(selectedActivity.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                          {selectedActivity.endDate && (
                            <>
                              <br />
                              <span className="text-xs text-gray-500">
                                to {new Date(selectedActivity.endDate).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="text-[var(--planetary)]" size={16} />
                      <div>
                        <p className="text-xs font-medium text-[var(--planetary)]">Location</p>
                        <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedActivity.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Building className="text-[var(--planetary)]" size={16} />
                      <div>
                        <p className="text-xs font-medium text-[var(--planetary)]">Organizer</p>
                        <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedActivity.organizer}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="text-[var(--planetary)]" size={16} />
                      <div>
                        <p className="text-xs font-medium text-[var(--planetary)]">Participants</p>
                        <p className="text-sm font-semibold text-[var(--galaxy)]">
                          {selectedActivity.participantCount}
                          {selectedActivity.maxParticipants ? ` / ${selectedActivity.maxParticipants}` : ''}
                        </p>
                      </div>
                    </div>

                    {selectedActivity.registrationDeadline && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="text-[var(--planetary)]" size={16} />
                        <div>
                          <p className="text-xs font-medium text-[var(--planetary)]">Registration Deadline</p>
                          <p className="text-sm font-semibold text-[var(--galaxy)]">
                            {new Date(selectedActivity.registrationDeadline).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedActivity.points > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Star className="text-[var(--planetary)]" size={16} />
                        <div>
                          <p className="text-xs font-medium text-[var(--planetary)]">Activity Points</p>
                          <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedActivity.points} points</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="text-[var(--planetary)]" size={16} />
                      <div>
                        <p className="text-xs font-medium text-[var(--planetary)]">Created by</p>
                        <p className="text-sm font-semibold text-[var(--galaxy)]">
                          {selectedActivity.createdBy}
                          <br />
                          <span className="text-xs text-gray-500">
                            {new Date(selectedActivity.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg font-medium transition-colors">
                    <Eye size={16} />
                    View Participants
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-[var(--galaxy)] rounded-lg font-medium transition-colors">
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-[var(--galaxy)] rounded-lg font-medium transition-colors">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClubAdminLayout>
  );
}