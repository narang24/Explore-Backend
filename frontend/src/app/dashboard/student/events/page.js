'use client';
import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';
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
  Target
} from 'lucide-react';

// Mock data for events
const registeredEvents = [
  { 
    id: 1, 
    title: 'Bhangra Workshop', 
    date: '2024-12-20', 
    time: '5:30 PM', 
    location: 'A3 Civil Building', 
    club: 'Cultural Club',
    clubIcon: '🎭',
    status: 'upcoming',
    clubColor: 'from-purple-500 to-pink-500'
  },
  { 
    id: 2, 
    title: 'NETRA Exhibition', 
    date: '2024-12-25', 
    time: '6:00 PM', 
    location: 'EC Circle', 
    club: 'Art Club',
    clubIcon: '🎨',
    status: 'upcoming',
    clubColor: 'from-orange-500 to-red-500'
  },
  { 
    id: 3, 
    title: 'Tech Talk: AI in Healthcare', 
    date: '2024-12-18', 
    time: '3:00 PM', 
    location: 'Seminar Hall', 
    club: 'GDSC',
    clubIcon: '🚀',
    status: 'completed',
    clubColor: 'from-blue-500 to-blue-600'
  }
];

const upcomingEvents = [
  { 
    id: 4, 
    title: 'EK Tara Drama', 
    date: '2024-12-28', 
    time: '7:00 PM', 
    location: 'CSH Auditorium', 
    club: 'Drama Society',
    clubIcon: '🎬',
    registrations: '45/100',
    clubColor: 'from-indigo-500 to-purple-500'
  },
  { 
    id: 5, 
    title: 'AI Workshop Series', 
    date: '2024-12-30', 
    time: '2:00 PM', 
    location: 'Tech Lab 2', 
    club: 'GDSC',
    clubIcon: '🚀',
    registrations: '78/120',
    clubColor: 'from-blue-500 to-blue-600'
  },
  { 
    id: 6, 
    title: 'Music Concert Night', 
    date: '2025-01-05', 
    time: '8:00 PM', 
    location: 'Open Air Theatre', 
    club: 'OCTAVES',
    clubIcon: '🎵',
    registrations: '120/200',
    clubColor: 'from-green-500 to-teal-500'
  }
];

const achievements = [
  { 
    id: 1, 
    title: 'Hackathon Winner', 
    event: 'Code Sprint 2024', 
    date: '2024-11-15', 
    type: 'winner',
    club: 'GDSC',
    clubIcon: '🚀'
  },
  { 
    id: 2, 
    title: 'Best Performance', 
    event: 'Cultural Fest', 
    date: '2024-10-20', 
    type: 'participant',
    club: 'Cultural Club',
    clubIcon: '🎭'
  },
  { 
    id: 3, 
    title: 'Active Participant', 
    event: 'Tech Workshop Series', 
    date: '2024-09-10', 
    type: 'certificate',
    club: 'Tech Society',
    clubIcon: '⚡'
  }
];

const allEvents = [
  { 
    id: 7, 
    title: 'Photography Workshop', 
    date: '2025-01-10', 
    time: '4:00 PM', 
    location: 'Media Lab', 
    club: 'Photography Club',
    clubIcon: '📸',
    category: 'WORKSHOP',
    clubColor: 'from-teal-500 to-cyan-500'
  },
  { 
    id: 8, 
    title: 'Coding Competition', 
    date: '2025-01-15', 
    time: '10:00 AM', 
    location: 'CS Lab', 
    club: 'GDSC',
    clubIcon: '🚀',
    category: 'COMPETITION',
    clubColor: 'from-blue-500 to-blue-600'
  },
  { 
    id: 9, 
    title: 'Literary Meet', 
    date: '2025-01-20', 
    time: '5:00 PM', 
    location: 'Library Auditorium', 
    club: 'Literary Society',
    clubIcon: '📚',
    category: 'CULTURAL',
    clubColor: 'from-amber-500 to-orange-500'
  },
  { 
    id: 10, 
    title: 'Robotics Exhibition', 
    date: '2025-01-25', 
    time: '11:00 AM', 
    location: 'Tech Lab 1', 
    club: 'Robotics Club',
    clubIcon: '🤖',
    category: 'EXHIBITION',
    clubColor: 'from-violet-500 to-purple-500'
  }
];

const eventCategories = ['ALL', 'WORKSHOP', 'COMPETITION', 'CULTURAL', 'EXHIBITION', 'SEMINAR'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = selectedCategory === 'ALL' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || event.date === selectedDate;
    return matchesCategory && matchesSearch && matchesDate;
  });

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--galaxy)]">Events</h1>
            <p className="text-[var(--planetary)] text-sm mt-1">Discover and participate in campus events</p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm w-64"
              />
            </div>
            
            {/* Date Filter */}
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm"
              />
            </div>
            
            <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 bg-white">
              <Filter size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Registered Events and Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registered Events Section */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[var(--galaxy)]">My Registered Events</h2>
                <span className="text-xs text-[var(--planetary)]">{registeredEvents.length} events</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {registeredEvents.map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${event.clubColor} rounded-lg flex items-center justify-center text-white text-sm shadow-sm`}>
                        {event.clubIcon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--galaxy)] text-sm">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={12} className="text-[var(--planetary)]" />
                          <span className="text-xs text-[var(--planetary)]">{event.time}</span>
                          <MapPin size={12} className="text-[var(--planetary)]" />
                          <span className="text-xs text-[var(--planetary)]">{event.location}</span>
                        </div>
                        <p className="text-xs text-[var(--planetary)] mt-1">{event.club}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[var(--planetary)] mb-1">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {event.status === 'completed' ? (
                            <CheckCircle size={10} />
                          ) : (
                            <Clock size={10} />
                          )}
                          {event.status === 'completed' ? 'Done' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[var(--galaxy)]">Upcoming Events</h2>
                <span className="text-xs text-[var(--planetary)] bg-[var(--sky)] px-2 py-1 rounded-lg">This Week</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {upcomingEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${event.clubColor} rounded-lg flex items-center justify-center text-white text-sm shadow-sm`}>
                        {event.clubIcon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--galaxy)] text-sm">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={12} className="text-[var(--planetary)]" />
                          <span className="text-xs text-[var(--planetary)]">{event.time}</span>
                          <MapPin size={12} className="text-[var(--planetary)]" />
                          <span className="text-xs text-[var(--planetary)]">{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-[var(--planetary)]">{event.club}</p>
                          <span className="text-xs text-[var(--planetary)]">{event.registrations}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[var(--planetary)] mb-2">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <button className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements and Event Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Achievements Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-[var(--galaxy)]">Achievements</h2>
                  <Award className="text-[var(--planetary)]" size={16} />
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                          achievement.type === 'winner' ? 'bg-yellow-100 text-yellow-700' :
                          achievement.type === 'participant' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {achievement.type === 'winner' ? <Trophy size={14} /> :
                           achievement.type === 'participant' ? <Medal size={14} /> :
                           <Target size={14} />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--galaxy)] text-xs">{achievement.title}</h3>
                          <p className="text-xs text-[var(--planetary)] mt-1">{achievement.event}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(achievement.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="text-[var(--planetary)] text-xs font-medium hover:text-[var(--sapphire)] transition-colors">
                    View All →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* All Events Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[var(--galaxy)]">All Events</h2>
                  <span className="text-sm text-[var(--planetary)]">{filteredEvents.length} events</span>
                </div>
                
                {/* Category Filter */}
                <div className="flex items-center gap-2 flex-wrap">
                  {eventCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-[var(--planetary)] text-white'
                          : 'bg-gray-100 text-[var(--galaxy)] hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${event.clubColor} rounded-xl flex items-center justify-center text-white text-lg shadow-sm`}>
                          {event.clubIcon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-[var(--galaxy)] text-sm">{event.title}</h3>
                              <p className="text-xs text-[var(--planetary)] mt-1">{event.club}</p>
                            </div>
                            <span className="bg-[var(--sky)] text-[var(--planetary)] px-2 py-1 rounded-lg text-xs font-medium">
                              {event.category}
                            </span>
                          </div>
                          
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center gap-2 text-xs text-[var(--planetary)]">
                              <Calendar size={12} />
                              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}</span>
                              <Clock size={12} className="ml-2" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[var(--planetary)]">
                              <MapPin size={12} />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-[var(--planetary)]">Available</span>
                            </div>
                            <button className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredEvents.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-2">No events found</h3>
                    <p className="text-[var(--planetary)] text-sm">Try adjusting your search or date filter</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}