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
  MoreVertical
} from 'lucide-react';

export default function DashboardContent() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  
  const dashboardData = {
    student: {
      joinedClubsCount: 3,
      activitiesCount: 8
    }
  };

  return (
    <>
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Joined Clubs Card */}
        <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-3xl p-6 text-white relative overflow-hidden shadow-sm hover:shadow-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={18} />
              </div>
            </div>
            <p className="text-white/80 text-sm mb-1">Enrolled Clubs</p>
            <p className="text-3xl font-bold">{dashboardData?.student?.joinedClubsCount || 0}</p>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        </div>

        {/* Activities Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
              <Activity className="text-[var(--planetary)]" size={18} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Activities</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{dashboardData?.student?.activitiesCount || 0}</p>
        </div>

        {/* Achievements Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
              <Award className="text-[var(--planetary)]" size={18} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Achievements</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">2</p>
        </div>

        {/* Year Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
          <div className="flex flex-1 justify-between mb-4">
            <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
              <GraduationCap className="text-[var(--planetary)]" size={18} />
            </div>
            <div className='text-right'>
              <p className="text-gray-600 text-sm mb-1">Current Academic Year</p>
              <p className="text-xl font-bold text-gray-900 mb-1">3rd</p> 
              <p className="text-gray-600 text-sm mb-1">Branch</p>
              <p className="text-base font-bold text-gray-900 mb-1">Computer Science & Engineering</p>  
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registered Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Registered Events</h2>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-1.5 rounded-lg text-sm bg-white text-[var(--galaxy)] font-semibold">
                    <option>This year</option>
                    <option>Last year</option>
                  </select>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Track your registered events</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: 'Bhangra Workshop',
                    venue: 'A3 Civil Building',
                    time: '5:30 pm',
                    date: '2024-03-10',
                    status: 'Happened',
                    clubIcon: '🎭',
                    clubName: 'Cultural Club'
                  },
                  {
                    id: 2,
                    title: 'NETRA Exhibition',
                    venue: 'EC Circle',
                    time: '6:00 pm',
                    date: '2024-03-15',
                    status: 'Yet To Happen',
                    clubIcon: '🎨',
                    clubName: 'Art Club'
                  }
                ].map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
                      {event.clubIcon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{event.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-[var(--planetary)] mb-2">
                            <MapPin size={12} />
                            <span>{event.venue}</span>
                            <Clock size={12} className="ml-1" />
                            <span>{event.time}</span>
                          </div>
                          <p className="text-xs text-[var(--planetary)]">{event.clubName}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-[var(--planetary)] mb-2">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === 'Happened' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              event.status === 'Happened' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-[var(--planetary)] text-sm font-medium hover:text-[var(--sapphire)] transition-colors">
                  See More Info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Upcoming Events</h2>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-1.5 rounded-lg text-sm bg-white text-[var(--galaxy)] font-semibold">
                    <option>This month</option>
                    <option>Next month</option>
                  </select>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Discover new events to join</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: 'EK Tara',
                    venue: 'CSH',
                    time: '3:30 pm',
                    date: '2024-03-25',
                    clubIcon: '🌟',
                    clubName: 'Drama Club',
                    registrations: '45/100'
                  },
                  {
                    id: 2,
                    title: 'AI Workshop Series',
                    venue: 'Tech Lab 2',
                    time: '2:00 pm',
                    date: '2024-03-28',
                    clubIcon: '🤖',
                    clubName: 'Tech Club',
                    registrations: '78/120'
                  }
                ].map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
                      {event.clubIcon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{event.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-[var(--planetary)] mb-2">
                            <MapPin size={12} />
                            <span>{event.venue}</span>
                            <Clock size={12} className="ml-1" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-[var(--planetary)]">{event.clubName}</p>
                            <span className="text-xs text-[var(--planetary)]">{event.registrations}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-[var(--planetary)] mb-2">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          <button 
                            onClick={() => setShowRegistrationModal(true)}
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
                  See More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--sky)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-[var(--planetary)]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register for Event</h3>
              <p className="text-gray-600 text-sm mb-6">Confirm your registration for this exciting event.</p>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Event:</span> AI Workshop Series</p>
                  <p><span className="font-medium">Date:</span> March 28, 2024</p>
                  <p><span className="font-medium">Time:</span> 2:00 PM</p>
                  <p><span className="font-medium">Venue:</span> Tech Lab 2</p>
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
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 px-4 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors"
                >
                  Confirm Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}