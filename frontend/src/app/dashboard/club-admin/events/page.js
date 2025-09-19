'use client';
import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Star,
  Trophy,
  Image as ImageIcon,
  User,
  Settings,
  Activity,
  ChevronRight,
  X,
  Save,
  Upload,
  Award,
  Target,
  Zap,
  Gift,
  Search,
  Filter,
  SortDesc,
  ChevronDown
} from 'lucide-react';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';
import EventModal from './EventModal';

// Mock data for events
const mockEvents = {
  live: [
    {
      id: 1,
      name: 'Tech Hackathon 2025',
      club: 'GDSC',
      clubLogo: '🚀',
      about: 'A 48-hour coding marathon where students build innovative solutions to real-world problems using cutting-edge technologies. Join us for an intensive weekend of coding, learning, and networking with fellow developers.',
      date: '2025-01-15',
      time: '10:00 AM',
      location: 'Tech Lab Complex',
      schedule: [
        { time: '10:00 AM', activity: 'Registration & Welcome Coffee' },
        { time: '11:00 AM', activity: 'Problem Statement Reveal' },
        { time: '12:00 PM', activity: 'Team Formation & Coding Begins' },
        { time: '2:00 PM', activity: 'Lunch Break' },
        { time: '6:00 PM', activity: 'First Mentorship Round' },
        { time: '8:00 PM', activity: 'Dinner & Networking' }
      ],
      pastImages: ['/api/placeholder/200/150', '/api/placeholder/200/150', '/api/placeholder/200/150'],
      registrations: 84,
      totalSeats: 120,
      awards: ['Winner: ₹50,000 + Internship', '1st Runner-up: ₹30,000', '2nd Runner-up: ₹20,000', 'Best Innovation: ₹10,000'],
      status: 'live',
      registrationDeadline: '2025-01-10',
      category: 'Competition'
    },
    {
      id: 2,
      name: 'Cultural Evening',
      club: 'Cultural Club',
      clubLogo: '🎭',
      about: 'An enchanting evening of traditional dance, music, and drama performances celebrating our rich cultural heritage. Experience the beauty of classical arts and folk traditions.',
      date: '2025-01-20',
      time: '6:30 PM',
      location: 'Open Air Theatre',
      schedule: [
        { time: '6:30 PM', activity: 'Inaugural Ceremony' },
        { time: '7:00 PM', activity: 'Classical Dance Performance' },
        { time: '7:30 PM', activity: 'Folk Music Session' },
        { time: '8:00 PM', activity: 'Drama Performance' },
        { time: '8:45 PM', activity: 'Closing Ceremony & Awards' }
      ],
      pastImages: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
      registrations: 156,
      totalSeats: 200,
      awards: ['Participation Certificate', 'Best Performance Award', 'Audience Choice Award'],
      status: 'live',
      registrationDeadline: '2025-01-18',
      category: 'Cultural'
    }
  ],
  active: [
    {
      id: 3,
      name: 'AI Workshop Series',
      club: 'Tech Society',
      clubLogo: '🤖',
      about: 'Comprehensive workshop series covering machine learning fundamentals, neural networks, and practical AI applications in various industries.',
      date: '2024-12-22',
      time: '2:00 PM',
      location: 'CS Lab 1',
      schedule: [
        { time: '2:00 PM', activity: 'Introduction to AI' },
        { time: '3:00 PM', activity: 'Machine Learning Basics' },
        { time: '4:00 PM', activity: 'Hands-on Python Session' },
        { time: '5:00 PM', activity: 'Neural Networks Demo' }
      ],
      registrations: 45,
      totalSeats: 60,
      status: 'active',
      category: 'Workshop',
      awards: ['Certificate of Completion', 'Best Project Award']
    },
    {
      id: 4,
      name: 'Photography Exhibition',
      club: 'PhotoSoc',
      clubLogo: '📸',
      about: 'Showcase of stunning photography work by our talented students, featuring nature, portrait, and street photography from across the campus.',
      date: '2024-12-25',
      time: '4:00 PM',
      location: 'Art Gallery',
      schedule: [
        { time: '4:00 PM', activity: 'Exhibition Opening' },
        { time: '4:30 PM', activity: 'Photography Workshop' },
        { time: '5:30 PM', activity: 'Portfolio Review Session' },
        { time: '6:00 PM', activity: 'Awards Ceremony' }
      ],
      registrations: 89,
      totalSeats: 100,
      status: 'active',
      category: 'Exhibition',
      awards: ['Best Photography Award', 'People\'s Choice Award']
    }
  ],
  upcoming: [
    {
      id: 5,
      name: 'Startup Pitch Competition',
      club: 'E-Cell',
      clubLogo: '💡',
      about: 'Present your innovative business ideas to industry experts and investors. Best pitches win funding opportunities and mentorship programs.',
      date: '2025-02-10',
      time: '10:00 AM',
      location: 'Seminar Hall',
      registrations: 0,
      totalSeats: 80,
      status: 'upcoming',
      category: 'Competition',
      awards: ['Winner: ₹1,00,000 funding', 'Mentorship Program', 'Incubation Support']
    },
    {
      id: 6,
      name: 'Literary Fest',
      club: 'Literary Society',
      clubLogo: '📚',
      about: 'A celebration of literature featuring poetry recitations, storytelling sessions, creative writing workshops, and interactions with renowned authors.',
      date: '2025-02-15',
      time: '5:00 PM',
      location: 'Library Auditorium',
      registrations: 0,
      totalSeats: 150,
      status: 'upcoming',
      category: 'Cultural',
      awards: ['Best Poetry Award', 'Creative Writing Prize', 'Storytelling Champion']
    }
  ]
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const [newEvent, setNewEvent] = useState({
    name: '',
    club: '',
    clubLogo: '',
    about: '',
    date: '',
    time: '',
    location: '',
    totalSeats: '',
    category: 'Workshop',
    awards: [''],
    schedule: [{ time: '', activity: '' }]
  });

  // Get all events for the "All Events" section
  const getAllEvents = () => {
    const allEvents = [...events.live, ...events.active, ...events.upcoming];
    
    // Filter by search term
    let filteredEvents = allEvents.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by status
    if (filterStatus !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.status === filterStatus);
    }

    // Sort events
    filteredEvents.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'registrations') {
        return (b.registrations || 0) - (a.registrations || 0);
      }
      return 0;
    });

    return filteredEvents;
  };

  const handleCreateEvent = () => {
    const event = {
      id: Date.now(),
      ...newEvent,
      registrations: 0,
      status: 'upcoming',
      pastImages: []
    };
    
    setEvents(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, event]
    }));
    
    setNewEvent({
      name: '',
      club: '',
      clubLogo: '',
      about: '',
      date: '',
      time: '',
      location: '',
      totalSeats: '',
      category: 'Workshop',
      awards: [''],
      schedule: [{ time: '', activity: '' }]
    });
    setShowCreateModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    const eventToDelete = selectedEvent;
    setEvents(prev => ({
      ...prev,
      [eventToDelete.status]: prev[eventToDelete.status].filter(event => event.id !== eventId)
    }));
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const addScheduleItem = () => {
    setNewEvent(prev => ({
      ...prev,
      schedule: [...prev.schedule, { time: '', activity: '' }]
    }));
  };

  const addAward = () => {
    setNewEvent(prev => ({
      ...prev,
      awards: [...prev.awards, '']
    }));
  };

  const updateSchedule = (index, field, value) => {
    setNewEvent(prev => ({
      ...prev,
      schedule: prev.schedule.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateAward = (index, value) => {
    setNewEvent(prev => ({
      ...prev,
      awards: prev.awards.map((award, i) => i === index ? value : award)
    }));
  };

  const removeScheduleItem = (index) => {
    if (newEvent.schedule.length > 1) {
      setNewEvent(prev => ({
        ...prev,
        schedule: prev.schedule.filter((_, i) => i !== index)
      }));
    }
  };

  const removeAward = (index) => {
    if (newEvent.awards.length > 1) {
      setNewEvent(prev => ({
        ...prev,
        awards: prev.awards.filter((_, i) => i !== index)
      }));
    }
  };

  // Enhanced Event Card Component with highlighted registration numbers
  const EventCard = ({ event }) => (
    <div 
      onClick={() => handleViewEvent(event)}
      className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-[var(--galaxy)] text-sm group-hover:text-[var(--planetary)] transition-colors">
          {event.name}
        </h3>
        <ChevronRight size={12} className="text-gray-400 group-hover:text-[var(--planetary)] transition-colors" />
      </div>
      
      <div className="flex items-center gap-3 text-xs text-[var(--planetary)] mb-2">
        <span>{new Date(event.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        })}</span>
        <span>•</span>
        <span>{event.time}</span>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-[var(--planetary)]">
          <span className="px-2 py-1 bg-[var(--planetary)] text-white rounded-full font-medium">
            {event.registrations}/{event.totalSeats}
          </span>
          <span className="ml-2">registered</span>
        </span>
        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
          {event.totalSeats - event.registrations} left
        </span>
      </div>
    </div>
  );

  // Event Row Component for All Events Section
  const EventRow = ({ event }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'live': return 'bg-green-100 text-green-700 border-green-200';
        case 'active': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'upcoming': return 'bg-orange-100 text-orange-700 border-orange-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    const getStatusDot = (status) => {
      switch (status) {
        case 'live': return 'bg-green-500';
        case 'active': return 'bg-blue-500';
        case 'upcoming': return 'bg-orange-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <div 
        onClick={() => handleViewEvent(event)}
        className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-xl flex items-center justify-center text-white text-lg">
              {event.clubLogo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[var(--galaxy)] text-sm group-hover:text-[var(--planetary)] transition-colors truncate">
                  {event.name}
                </h3>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(event.status)}`}></div>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[var(--planetary)]">
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={10} />
                  {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={10} />
                  {event.category}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-[var(--galaxy)]">
                {event.registrations || 0}/{event.totalSeats}
              </div>
              <div className="text-xs text-[var(--planetary)]">registered</div>
            </div>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-[var(--planetary)] transition-colors" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Events Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Events */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[var(--galaxy)]">Live Events</h2>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">{events.live.length}</span>
                </div>
              </div>
              <p className="text-xs text-[var(--planetary)] mt-1">Registrations open</p>
            </div>
            
            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              {events.live.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {events.live.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="text-gray-400 mx-auto mb-2" size={20} />
                  <p className="text-[var(--planetary)] text-sm">No live events</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Events */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[var(--galaxy)]">Active Events</h2>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-blue-600 font-medium">{events.active.length}</span>
                </div>
              </div>
              <p className="text-xs text-[var(--planetary)] mt-1">Currently running</p>
            </div>
            
            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              {events.active.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {events.active.length === 0 && (
                <div className="text-center py-8">
                  <Zap className="text-gray-400 mx-auto mb-2" size={20} />
                  <p className="text-[var(--planetary)] text-sm">No active events</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[var(--galaxy)]">Upcoming Events</h2>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-orange-600 font-medium">{events.upcoming.length}</span>
                </div>
              </div>
              <p className="text-xs text-[var(--planetary)] mt-1">Scheduled for future</p>
            </div>
            
            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              {events.upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {events.upcoming.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="text-gray-400 mx-auto mb-2" size={20} />
                  <p className="text-[var(--planetary)] text-sm">No upcoming events</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All Events Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
          {/* Header with Search and Filters */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-[var(--galaxy)]">All Events</h2>
                <p className="text-[var(--planetary)] text-sm mt-1">Comprehensive event management and overview</p>
              </div>
              
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors"
              >
                <Plus size={16} />
                Create New Event
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
                  placeholder="Search events, clubs, or categories..."
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
                  <option value="name">Sort by Name</option>
                  <option value="registrations">Sort by Registrations</option>
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
                  Filter
                  <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {showFilters && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-[180px]">
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Filter by Status</p>
                      <div className="space-y-1">
                        {[
                          { value: 'all', label: 'All Events', count: getAllEvents().length },
                          { value: 'live', label: 'Live Events', count: events.live.length },
                          { value: 'active', label: 'Active Events', count: events.active.length },
                          { value: 'upcoming', label: 'Upcoming Events', count: events.upcoming.length }
                        ].map((filter) => (
                          <button
                            key={filter.value}
                            onClick={() => {
                              setFilterStatus(filter.value);
                              setShowFilters(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                              filterStatus === filter.value
                                ? 'bg-[var(--planetary)] text-white'
                                : 'hover:bg-gray-100 text-[var(--galaxy)]'
                            }`}
                          >
                            <span>{filter.label}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              filterStatus === filter.value
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {filter.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="p-6">
            <div className="space-y-3">
              {getAllEvents().map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
              
              {getAllEvents().length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="text-gray-400 mx-auto mb-4" size={32} />
                  <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-2">No events found</h3>
                  <p className="text-[var(--planetary)] text-sm mb-4">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter criteria' 
                      : 'Create your first event to get started'
                    }
                  </p>
                  {(!searchTerm && filterStatus === 'all') && (
                    <button 
                      onClick={() => setShowCreateModal(true)}
                      className="px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      Create First Event
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Details Modal */}
        <EventModal
          event={selectedEvent}
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          onDelete={handleDeleteEvent}
          onEdit={(event) => {
            // Handle edit functionality
            console.log('Edit event:', event);
          }}
        />

        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[var(--galaxy)]">Create New Event</h3>
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">Event Name</label>
                    <input
                      type="text"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                      placeholder="Enter event name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">Club</label>
                    <input
                      type="text"
                      value={newEvent.club}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, club: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                      placeholder="Club name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">Club Logo (Emoji)</label>
                    <input
                      type="text"
                      value={newEvent.clubLogo}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, clubLogo: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                      placeholder="🚀"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">Category</label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    >
                      <option value="Workshop">Workshop</option>
                      <option value="Competition">Competition</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Exhibition">Exhibition</option>
                      <option value="Seminar">Seminar</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">Date</label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">Time</label>
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">Location</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                      placeholder="Venue location"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">Total Seats</label>
                    <input
                      type="number"
                      value={newEvent.totalSeats}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, totalSeats: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                      placeholder="100"
                    />
                  </div>
                </div>

                {/* About */}
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">About the Event</label>
                  <textarea
                    value={newEvent.about}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, about: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none text-sm"
                    placeholder="Describe the event..."
                  />
                </div>

                {/* Schedule */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--galaxy)]">Schedule</label>
                    <button
                      type="button"
                      onClick={addScheduleItem}
                      className="flex items-center gap-1 px-2 py-1 text-[var(--planetary)] hover:text-[var(--sapphire)] text-xs"
                    >
                      <Plus size={12} />
                      Add Item
                    </button>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {newEvent.schedule.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="time"
                          value={item.time}
                          onChange={(e) => updateSchedule(index, 'time', e.target.value)}
                          className="px-2 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-xs"
                        />
                        <input
                          type="text"
                          value={item.activity}
                          onChange={(e) => updateSchedule(index, 'activity', e.target.value)}
                          className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-xs"
                          placeholder="Activity description"
                        />
                        {newEvent.schedule.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeScheduleItem(index)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--galaxy)]">Awards & Prizes</label>
                    <button
                      type="button"
                      onClick={addAward}
                      className="flex items-center gap-1 px-2 py-1 text-[var(--planetary)] hover:text-[var(--sapphire)] text-xs"
                    >
                      <Plus size={12} />
                      Add Award
                    </button>
                  </div>
                  <div className="space-y-2 max-h-24 overflow-y-auto">
                    {newEvent.awards.map((award, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={award}
                          onChange={(e) => updateAward(index, e.target.value)}
                          className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-xs"
                          placeholder="Award description"
                        />
                        {newEvent.awards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAward(index)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100 sticky bottom-0 bg-white">
                  <button
                    onClick={handleCreateEvent}
                    disabled={!newEvent.name || !newEvent.date || !newEvent.time}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save size={16} />
                    Create Event
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-[var(--galaxy)] rounded-lg font-medium transition-colors"
                  >
                    Cancel
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