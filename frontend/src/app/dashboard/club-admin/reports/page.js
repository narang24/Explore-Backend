'use client';
import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star,
  Trophy,
  Archive,
  TrendingUp,
  History,
  Search,
  Filter,
  SortDesc,
  ChevronDown,
  Eye,
  Download,
  BarChart3,
  Award,
  Image as ImageIcon,
  FileText,
  Medal,
  Crown,
  Target,
  Activity,
  BookOpen,
  ChevronRight,
  UserCheck,
  Camera
} from 'lucide-react';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';
import EventRecordModal from './EventRecordModal';

// Mock data for past events with complete details
const mockPastEvents = {
  archived: [
    {
      id: 1,
      name: 'Annual Tech Symposium 2023',
      club: 'GDSC',
      clubLogo: '🚀',
      about: 'A comprehensive technical symposium featuring workshops, competitions, and industry talks on emerging technologies.',
      date: '2023-03-15',
      time: '9:00 AM - 6:00 PM',
      location: 'Main Auditorium & Lab Complex',
      category: 'Symposium',
      totalParticipants: 245,
      registrations: 245,
      totalSeats: 250,
      schedule: [
        { time: '9:00 AM', activity: 'Registration & Welcome Coffee' },
        { time: '10:00 AM', activity: 'Opening Ceremony & Keynote' },
        { time: '11:30 AM', activity: 'Technical Workshops - Session 1' },
        { time: '1:00 PM', activity: 'Lunch Break' },
        { time: '2:00 PM', activity: 'Technical Workshops - Session 2' },
        { time: '3:30 PM', activity: 'Competition Finals' },
        { time: '5:00 PM', activity: 'Awards Ceremony & Closing' }
      ],
      participants: [
        { name: 'Rahul Sharma', rollNumber: '22CS001', branch: 'CSE' },
        { name: 'Priya Singh', rollNumber: '22EC015', branch: 'ECE' },
        { name: 'Amit Kumar', rollNumber: '22ME022', branch: 'ME' },
        // ... more participants
      ],
      officials: [
        { name: 'Dr. Rajesh Kumar', position: 'Faculty Coordinator', department: 'CSE', role: 'organizer' },
        { name: 'Ankit Verma', position: 'Club President', department: 'CSE', role: 'organizer' },
        { name: 'Sneha Gupta', responsibility: 'Registration Desk', role: 'volunteer' },
        { name: 'Vikram Singh', responsibility: 'Technical Support', role: 'volunteer' },
        { name: 'Pooja Mehta', responsibility: 'Event Photography', role: 'volunteer' }
      ],
      winners: [
        { name: 'Team Alpha', rollNumber: 'CSE Team', position: '1st', prize: '₹15,000 + Internship' },
        { name: 'Team Beta', rollNumber: 'ECE Team', position: '2nd', prize: '₹10,000' },
        { name: 'Team Gamma', rollNumber: 'ME Team', position: '3rd', prize: '₹5,000' }
      ],
      gallery: [
        { url: '/api/placeholder/400/300', caption: 'Opening Ceremony' },
        { url: '/api/placeholder/400/300', caption: 'Workshop Session' },
        { url: '/api/placeholder/400/300', caption: 'Competition Finals' },
        { url: '/api/placeholder/400/300', caption: 'Awards Ceremony' },
        { url: '/api/placeholder/400/300', caption: 'Group Photo' },
        { url: '/api/placeholder/400/300', caption: 'Technical Demonstration' }
      ],
      isArchived: true,
      completionDate: '2023-03-15'
    },
    {
      id: 2,
      name: 'Cultural Fest 2023',
      club: 'Cultural Club',
      clubLogo: '🎭',
      about: 'Three-day cultural extravaganza featuring dance, music, drama, and art competitions from across the region.',
      date: '2023-04-20',
      time: '10:00 AM - 10:00 PM',
      location: 'Open Air Theatre & Various Venues',
      category: 'Cultural',
      totalParticipants: 180,
      registrations: 180,
      totalSeats: 200,
      schedule: [
        { time: '10:00 AM', activity: 'Opening Ceremony' },
        { time: '11:00 AM', activity: 'Classical Dance Competition' },
        { time: '2:00 PM', activity: 'Music Competition' },
        { time: '4:00 PM', activity: 'Drama Performance' },
        { time: '6:00 PM', activity: 'Art Exhibition' },
        { time: '8:00 PM', activity: 'Cultural Evening & Awards' }
      ],
      participants: [
        { name: 'Kavya Reddy', rollNumber: '22EN003', branch: 'EN' },
        { name: 'Arjun Patel', rollNumber: '22CS045', branch: 'CSE' },
        { name: 'Meera Shah', rollNumber: '22EC018', branch: 'ECE' },
        // ... more participants
      ],
      officials: [
        { name: 'Prof. Sunita Sharma', position: 'Cultural Head', department: 'EN', role: 'organizer' },
        { name: 'Ravi Kumar', position: 'Cultural Secretary', department: 'EN', role: 'organizer' },
        { name: 'Deepika Joshi', responsibility: 'Stage Management', role: 'volunteer' },
        { name: 'Rohit Agarwal', responsibility: 'Sound & Lighting', role: 'volunteer' }
      ],
      winners: [
        { name: 'Kavya Reddy', rollNumber: '22EN003', position: '1st', prize: 'Classical Dance - Gold Medal' },
        { name: 'Arjun Patel', rollNumber: '22CS045', position: '1st', prize: 'Music Competition - Trophy' },
        { name: 'Drama Club', rollNumber: 'Club Team', position: '1st', prize: 'Best Drama - ₹8,000' }
      ],
      gallery: [
        { url: '/api/placeholder/400/300', caption: 'Classical Dance Performance' },
        { url: '/api/placeholder/400/300', caption: 'Music Competition' },
        { url: '/api/placeholder/400/300', caption: 'Drama Performance' },
        { url: '/api/placeholder/400/300', caption: 'Art Exhibition' }
      ],
      isArchived: true,
      completionDate: '2023-04-22'
    }
  ],
  popular: [
    {
      id: 3,
      name: 'Hackathon 2024',
      club: 'GDSC',
      clubLogo: '💻',
      about: '48-hour coding marathon with industry mentors and exciting prizes for innovative solutions.',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Tech Lab Complex',
      category: 'Competition',
      totalParticipants: 320,
      registrations: 320,
      totalSeats: 300,
      schedule: [
        { time: '10:00 AM', activity: 'Registration & Problem Statement' },
        { time: '12:00 PM', activity: 'Coding Begins' },
        { time: '8:00 PM', activity: 'Dinner & Networking' },
        { time: '10:00 AM', activity: 'Final Presentations' },
        { time: '2:00 PM', activity: 'Judging & Awards' }
      ],
      participants: [
        { name: 'Tech Ninjas Team', rollNumber: 'Mixed Team', branch: 'Multi' },
        { name: 'Code Warriors', rollNumber: 'CSE Team', branch: 'CSE' },
        // ... more participants
      ],
      officials: [
        { name: 'Dr. Amit Singh', position: 'Tech Lead', department: 'CSE', role: 'organizer' },
        { name: 'Industry Mentor 1', position: 'Senior Developer', department: 'External', role: 'organizer' },
        { name: 'Student Volunteers', responsibility: 'General Support', role: 'volunteer' }
      ],
      winners: [
        { name: 'Tech Ninjas', rollNumber: 'Mixed Team', position: '1st', prize: '₹50,000 + Internship Opportunity' },
        { name: 'Code Warriors', rollNumber: 'CSE Team', position: '2nd', prize: '₹30,000' },
        { name: 'Innovation Squad', rollNumber: 'ECE Team', position: '3rd', prize: '₹20,000' }
      ],
      gallery: [
        { url: '/api/placeholder/400/300', caption: 'Hackathon Arena' },
        { url: '/api/placeholder/400/300', caption: 'Teams Coding' },
        { url: '/api/placeholder/400/300', caption: 'Mentoring Session' },
        { url: '/api/placeholder/400/300', caption: 'Final Presentations' },
        { url: '/api/placeholder/400/300', caption: 'Winners Announcement' }
      ],
      completionDate: '2024-01-17'
    },
    {
      id: 4,
      name: 'Sports Tournament 2023',
      club: 'Sports Club',
      clubLogo: '🏆',
      about: 'Inter-departmental sports tournament featuring cricket, football, basketball, and athletics.',
      date: '2023-11-10',
      time: '8:00 AM - 6:00 PM',
      location: 'Sports Complex',
      category: 'Sports',
      totalParticipants: 280,
      registrations: 280,
      totalSeats: 300,
      schedule: [
        { time: '8:00 AM', activity: 'Opening Ceremony' },
        { time: '9:00 AM', activity: 'Cricket Matches Begin' },
        { time: '10:00 AM', activity: 'Football Matches Begin' },
        { time: '2:00 PM', activity: 'Basketball Finals' },
        { time: '4:00 PM', activity: 'Athletics Events' },
        { time: '5:30 PM', activity: 'Closing Ceremony & Awards' }
      ],
      participants: [
        { name: 'CSE Cricket Team', rollNumber: 'Dept Team', branch: 'CSE' },
        { name: 'ECE Football Team', rollNumber: 'Dept Team', branch: 'ECE' },
        { name: 'ME Basketball Team', rollNumber: 'Dept Team', branch: 'ME' },
        // ... more participants
      ],
      officials: [
        { name: 'Prof. Sports Director', position: 'Sports Head', department: 'PE', role: 'organizer' },
        { name: 'Coaches Team', position: 'Sports Coaches', department: 'External', role: 'organizer' },
        { name: 'Student Council', responsibility: 'Event Management', role: 'volunteer' }
      ],
      winners: [
        { name: 'CSE Department', rollNumber: 'CSE', position: '1st', prize: 'Overall Champions Trophy' },
        { name: 'ECE Department', rollNumber: 'ECE', position: '2nd', prize: 'Runner-up Trophy' },
        { name: 'ME Department', rollNumber: 'ME', position: '3rd', prize: 'Third Place Trophy' }
      ],
      gallery: [
        { url: '/api/placeholder/400/300', caption: 'Cricket Match Action' },
        { url: '/api/placeholder/400/300', caption: 'Football Finals' },
        { url: '/api/placeholder/400/300', caption: 'Basketball Championship' },
        { url: '/api/placeholder/400/300', caption: 'Athletics Events' },
        { url: '/api/placeholder/400/300', caption: 'Award Ceremony' }
      ],
      completionDate: '2023-11-12'
    }
  ],
  allPast: [
    {
      id: 5,
      name: 'Workshop on AI/ML',
      club: 'Tech Society',
      clubLogo: '🤖',
      about: 'Comprehensive workshop on Artificial Intelligence and Machine Learning fundamentals.',
      date: '2023-09-20',
      time: '2:00 PM - 5:00 PM',
      location: 'CS Lab 1',
      category: 'Workshop',
      totalParticipants: 85,
      registrations: 85,
      totalSeats: 90,
      schedule: [
        { time: '2:00 PM', activity: 'Introduction to AI' },
        { time: '3:00 PM', activity: 'Machine Learning Basics' },
        { time: '4:00 PM', activity: 'Hands-on Python Session' },
        { time: '4:45 PM', activity: 'Q&A and Certificates' }
      ],
      participants: [
        { name: 'Students from all branches', rollNumber: 'Mixed', branch: 'All' }
      ],
      officials: [
        { name: 'Dr. AI Expert', position: 'Workshop Facilitator', department: 'CSE', role: 'organizer' },
        { name: 'Student Assistants', responsibility: 'Technical Support', role: 'volunteer' }
      ],
      winners: [],
      gallery: [
        { url: '/api/placeholder/400/300', caption: 'Workshop Session' },
        { url: '/api/placeholder/400/300', caption: 'Hands-on Practice' }
      ],
      completionDate: '2023-09-20'
    },
    {
      id: 6,
      name: 'Photography Exhibition',
      club: 'PhotoSoc',
      clubLogo: '📸',
      about: 'Showcase of stunning photography work by talented students featuring various themes.',
      date: '2023-12-05',
      time: '4:00 PM - 7:00 PM',
      location: 'Art Gallery',
      category: 'Exhibition',
      totalParticipants: 120,
      registrations: 120,
      totalSeats: 150,
      schedule: [
        { time: '4:00 PM', activity: 'Exhibition Opening' },
        { time: '4:30 PM', activity: 'Photography Workshop' },
        { time: '5:30 PM', activity: 'Portfolio Review' },
        { time: '6:30 PM', activity: 'Awards & Closing' }
      ],
      participants: [
        { name: 'Photography Enthusiasts', rollNumber: 'Mixed', branch: 'All' }
      ],
      officials: [
        { name: 'Professional Photographer', position: 'Guest Judge', department: 'External', role: 'organizer' },
        { name: 'PhotoSoc Members', responsibility: 'Exhibition Setup', role: 'volunteer' }
      ],
      winners: [
        { name: 'Raj Patel', rollNumber: '22CS088', position: '1st', prize: 'Best Photography Award' },
        { name: 'Nisha Sharma', rollNumber: '22EC055', position: '2nd', prize: 'People\'s Choice Award' }
      ],
      gallery: [
        { url: '/api/placeholder/400/300', caption: 'Exhibition Display' },
        { url: '/api/placeholder/400/300', caption: 'Visitors Viewing Photos' },
        { url: '/api/placeholder/400/300', caption: 'Award Winners' }
      ],
      completionDate: '2023-12-05'
    }
  ]
};

export default function RecordPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get filtered and sorted events
  const getFilteredEvents = (events) => {
    let filteredEvents = events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCategory !== 'all') {
      filteredEvents = filteredEvents.filter(event => 
        event.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    filteredEvents.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'participants') {
        return (b.totalParticipants || 0) - (a.totalParticipants || 0);
      }
      return 0;
    });

    return filteredEvents;
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Event Card Component
  const EventCard = ({ event, showMetrics = false }) => (
    <div 
      onClick={() => handleViewEvent(event)}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-xl flex items-center justify-center text-white text-lg">
            {event.clubLogo}
          </div>
          <div>
            <h3 className="font-semibold text-[var(--galaxy)] text-sm group-hover:text-[var(--planetary)] transition-colors">
              {event.name}
            </h3>
            <p className="text-xs text-[var(--planetary)]">{event.club}</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-400 group-hover:text-[var(--planetary)] transition-colors" />
      </div>
      
      <div className="flex items-center gap-4 text-xs text-[var(--planetary)] mb-3">
        <span className="flex items-center gap-1">
          <Calendar size={10} />
          {new Date(event.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={10} />
          {event.location}
        </span>
        <span className="px-2 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-xs font-medium">
          {event.category}
        </span>
      </div>
      
      {showMetrics && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          <div className="text-center">
            <div className="text-sm font-bold text-[var(--galaxy)]">{event.totalParticipants}</div>
            <div className="text-xs text-[var(--planetary)]">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-[var(--galaxy)]">{event.winners?.length || 0}</div>
            <div className="text-xs text-[var(--planetary)]">Winners</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-[var(--galaxy)]">{event.gallery?.length || 0}</div>
            <div className="text-xs text-[var(--planetary)]">Photos</div>
          </div>
        </div>
      )}
    </div>
  );

  // Summary Stats
  const getAllEvents = () => [
    ...mockPastEvents.archived,
    ...mockPastEvents.popular,
    ...mockPastEvents.allPast
  ];

  const totalEvents = getAllEvents().length;
  const totalParticipants = getAllEvents().reduce((sum, event) => sum + (event.totalParticipants || 0), 0);
  const totalWinners = getAllEvents().reduce((sum, event) => sum + (event.winners?.length || 0), 0);
  const totalPhotos = getAllEvents().reduce((sum, event) => sum + (event.gallery?.length || 0), 0);

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <History className="text-blue-600" size={18} />
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--galaxy)]">{totalEvents}</p>
                <p className="text-xs text-[var(--planetary)]">Total Events</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="text-green-600" size={18} />
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--galaxy)]">{totalParticipants}</p>
                <p className="text-xs text-[var(--planetary)]">Total Participants</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Trophy className="text-yellow-600" size={18} />
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--galaxy)]">{totalWinners}</p>
                <p className="text-xs text-[var(--planetary)]">Awards Given</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Camera className="text-purple-600" size={18} />
              </div>
              <div>
                <p className="text-xl font-bold text-[var(--galaxy)]">{totalPhotos}</p>
                <p className="text-xs text-[var(--planetary)]">Photos Archived</p>
              </div>
            </div>
          </div>
        </div>

        {/* Archives Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[var(--galaxy)] flex items-center gap-2">
                  <Archive size={20} />
                  Archives
                </h2>
                <p className="text-[var(--planetary)] text-sm mt-1">Important events saved for future reference</p>
              </div>
              <span className="px-3 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-sm font-medium">
                {mockPastEvents.archived.length} Events
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {mockPastEvents.archived.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPastEvents.archived.map((event) => (
                  <EventCard key={event.id} event={event} showMetrics={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Archive className="text-gray-400 mx-auto mb-3" size={24} />
                <p className="text-[var(--planetary)] text-sm">No archived events yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Most Popular Events */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[var(--galaxy)] flex items-center gap-2">
                  <TrendingUp size={20} />
                  Most Popular Events
                </h2>
                <p className="text-[var(--planetary)] text-sm mt-1">Events with highest participation rates</p>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Top Performers
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {mockPastEvents.popular.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPastEvents.popular.map((event) => (
                  <EventCard key={event.id} event={event} showMetrics={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="text-gray-400 mx-auto mb-3" size={24} />
                <p className="text-[var(--planetary)] text-sm">No popular events data yet</p>
              </div>
            )}
          </div>
        </div>

        {/* All Past Events */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[var(--galaxy)] flex items-center gap-2">
                  <History size={20} />
                  All Past Events
                </h2>
                <p className="text-[var(--planetary)] text-sm mt-1">Complete history of club events</p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events, clubs, or categories..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent cursor-pointer"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="participants">Sort by Participants</option>
                </select>
                <SortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[var(--galaxy)] hover:bg-gray-50 transition-colors"
                >
                  <Filter size={16} />
                  Filter
                  <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {showFilters && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-[180px]">
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Filter by Category</p>
                      <div className="space-y-1">
                        {[
                          { value: 'all', label: 'All Categories' },
                          { value: 'competition', label: 'Competitions' },
                          { value: 'workshop', label: 'Workshops' },
                          { value: 'cultural', label: 'Cultural' },
                          { value: 'exhibition', label: 'Exhibitions' },
                          { value: 'symposium', label: 'Symposiums' },
                          { value: 'sports', label: 'Sports' }
                        ].map((filter) => (
                          <button
                            key={filter.value}
                            onClick={() => {
                              setFilterCategory(filter.value);
                              setShowFilters(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              filterCategory === filter.value
                                ? 'bg-[var(--planetary)] text-white'
                                : 'hover:bg-gray-100 text-[var(--galaxy)]'
                            }`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {getFilteredEvents(getAllEvents()).map((event) => (
                <EventCard key={event.id} event={event} showMetrics={true} />
              ))}
              
              {getFilteredEvents(getAllEvents()).length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="text-gray-400 mx-auto mb-4" size={32} />
                  <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-2">No events found</h3>
                  <p className="text-[var(--planetary)] text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Details Modal */}
        <EventRecordModal
          event={selectedEvent}
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
        />
      </div>
    </ClubAdminLayout>
  );
}