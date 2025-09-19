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
  Gift
} from 'lucide-react';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';

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

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--galaxy)]">Events Management</h1>
            <p className="text-[var(--planetary)] text-sm mt-1">Create and manage your club events</p>
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors"
          >
            <Plus size={16} />
            Create New Event
          </button>
        </div>

        {/* Events Grid */}
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

        {/* Event Details Modal - Compact and Improved */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                      {selectedEvent.clubLogo}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[var(--galaxy)]">{selectedEvent.name}</h2>
                      <p className="text-[var(--planetary)]">{selectedEvent.club}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedEvent.status === 'live' ? 'bg-green-100 text-green-700' :
                          selectedEvent.status === 'active' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            selectedEvent.status === 'live' ? 'bg-green-500' :
                            selectedEvent.status === 'active' ? 'bg-blue-500' :
                            'bg-orange-500'
                          }`}></div>
                          {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-xs font-medium">
                          <Star size={12} />
                          {selectedEvent.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-sm font-medium transition-colors">
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(selectedEvent.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                    <button 
                      onClick={() => setShowEventModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Event Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Event Details */}
                    <div className="bg-gray-50 rounded-2xl p-5">
                      <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                        <Calendar size={18} />
                        Event Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Calendar size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-[var(--planetary)] font-medium">Date</p>
                            <p className="text-sm font-semibold text-[var(--galaxy)]">
                              {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                                weekday: 'long',
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Clock size={16} className="text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-[var(--planetary)] font-medium">Time</p>
                            <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedEvent.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <MapPin size={16} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-[var(--planetary)] font-medium">Location</p>
                            <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedEvent.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Users size={16} className="text-orange-600" />
                          </div>
                          <div>
                            <p className="text-xs text-[var(--planetary)] font-medium">Capacity</p>
                            <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedEvent.totalSeats} seats</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* About Event */}
                    <div className="bg-gray-50 rounded-2xl p-5">
                      <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-3">About the Event</h3>
                      <p className="text-[var(--planetary)] leading-relaxed">{selectedEvent.about}</p>
                    </div>

                    {/* Schedule and Awards - Left and Right */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Schedule - LEFT */}
                      <div className="bg-gray-50 rounded-2xl p-5">
                        <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                          <Clock size={18} />
                          Event Schedule
                        </h3>
                        <div className="space-y-3">
                          {selectedEvent.schedule && selectedEvent.schedule.length > 0 ? (
                            selectedEvent.schedule.map((item, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-xl">
                                <div className="w-16 h-12 bg-[var(--planetary)] text-white rounded-lg flex items-center justify-center">
                                  <span className="text-xs font-semibold">{item.time}</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-[var(--galaxy)]">{item.activity}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-[var(--planetary)]">No schedule available</p>
                          )}
                        </div>
                      </div>

                      {/* Awards & Prizes - RIGHT */}
                      <div className="bg-gray-50 rounded-2xl p-5">
                        <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                          <Trophy size={18} />
                          Awards & Prizes
                        </h3>
                        <div className="space-y-3">
                          {selectedEvent.awards && selectedEvent.awards.length > 0 ? (
                            selectedEvent.awards.map((award, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                  <Award size={14} className="text-white" />
                                </div>
                                <span className="text-sm font-medium text-[var(--galaxy)] flex-1">{award}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-[var(--planetary)]">No awards specified</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Past Year Pictures */}
                    {selectedEvent.pastImages && selectedEvent.pastImages.length > 0 && (
                      <div className="bg-gray-50 rounded-2xl p-5">
                        <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                          <ImageIcon size={18} />
                          Past Year Highlights
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {selectedEvent.pastImages.map((image, index) => (
                            <div key={index} className="aspect-video bg-gray-200 rounded-xl overflow-hidden group cursor-pointer">
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:from-gray-300 group-hover:to-gray-400 transition-colors">
                                <ImageIcon size={24} className="text-gray-500" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Stats & Actions */}
                  <div className="space-y-6">
                    {/* Registration Stats */}
                    <div className="bg-gradient-to-br from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-5 text-white">
                      <h3 className="text-lg font-semibold mb-4">Registration Status</h3>
                      
                      {/* Stats Cards */}
                      <div className="space-y-3 mb-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Registered</span>
                            <span className="text-xl font-bold">{selectedEvent.registrations}</span>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Seats Left</span>
                            <span className="text-xl font-bold">{selectedEvent.totalSeats - selectedEvent.registrations}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round((selectedEvent.registrations / selectedEvent.totalSeats) * 100)}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <div 
                            className="bg-white rounded-full h-3 transition-all duration-300"
                            style={{ width: `${(selectedEvent.registrations / selectedEvent.totalSeats) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClubAdminLayout>
  );
}