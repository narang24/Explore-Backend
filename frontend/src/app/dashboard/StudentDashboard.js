'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/authContext';
import { 
  Calendar, 
  Users, 
  Activity, 
  Bell, 
  Search, 
  User,
  LogOut,
  Settings,
  CalendarDays,
  Clock,
  MapPin,
  TrendingUp,
  BookOpen,
  ChevronDown,
  MoreVertical,
  Filter,
  Home,
  BarChart3,
  Package,
  CreditCard,
  FileText,
  HelpCircle,
  MessageSquare,
  Award,
  GraduationCap
} from 'lucide-react';

export default function StudentDashboard() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    student: {
      joinedClubsCount: 3,
      activitiesCount: 8
    },
    upcomingEvents: [
      {
        id: 1,
        title: 'Tech Workshop - AI & ML',
        clubId: { clubName: 'Tech Club' },
        eventDate: '2024-03-15',
        location: 'Lab 1',
        category: 'Tech'
      },
      {
        id: 2,
        title: 'Cultural Night',
        clubId: { clubName: 'Cultural Society' },
        eventDate: '2024-03-18',
        location: 'Auditorium',
        category: 'Cultural'
      },
      {
        id: 3,
        title: 'Dance Workshop',
        clubId: { clubName: 'Dance Club' },
        eventDate: '2024-03-20',
        location: 'Dance Studio',
        category: 'Dance'
      }
    ],
    recentActivities: [
      {
        id: 1,
        title: 'Registered for Tech Hackathon',
        clubId: { clubName: 'Tech Club' },
        eventDate: '2024-03-10'
      },
      {
        id: 2,
        title: 'Joined Cultural Society',
        clubId: { clubName: 'Cultural Society' },
        eventDate: '2024-03-08'
      }
    ]
  });

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--planetary)]">
          <div className="w-6 h-6 border-2 border-[var(--planetary)] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex p-5 pr-0">
      {/* Sidebar */}
      <div className="h-[95%] fixed w-[238px] bg-white rounded-3xl flex flex-col">
        {/* Logo */}
        <div className="flex items-center px-4 py-2">
          <img src="/favicon.png" alt="Xplore Logo" className="h-16 w-16 rounded-full object-cover" />
          <span className="font-extrabold tracking-wide text-[var(--galaxy)] -ml-4">PLORE</span>
        </div>

        {/* Menu Label */}
        <div className="px-6 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MENU</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3.5 rounded-xl shadow-lg shadow-gray-300/80 text-[13px] font-medium text-white bg-[var(--planetary)]">
                <Home size={18} />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg">
                <Users size={18} />
                Clubs
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg">
                <Calendar size={18} />
                Events
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg">
                <BarChart3 size={18} />
                Report
              </a>
            </li>
          </ul>
        </nav>

        {/* Financial Section */}
        {/* <div className="px-6 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ACADEMIC</p>
        </div>

        <nav className="px-3">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg">
                <CreditCard size={18} />
                Grades
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg">
                <FileText size={18} />
                Assignments
              </a>
            </li>
          </ul>
        </nav> */}

        {/* Tools Section */}
        <div className="px-6 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TOOLS</p>
        </div>

        <nav className="px-6 mb-6">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg">
                <Settings size={18} />
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg">
                <MessageSquare size={18} />
                Feedback
              </a>
            </li>
          </ul>
        </nav>

        {/* Upgrade Pro Card */}
        <div className="mx-6 my-2 mb-4 p-4 bg-gray-900 rounded-2xl text-white">
          <img src="/favicon.png" alt="Xplore Logo" className="h-7 w-7 scale-120 rounded-lg object-cover bg-white mb-3" />
          <div className="">
            <h3 className="font-semibold text-sm mb-1">Upgrade Pro</h3>
            <p className="text-xs text-gray-300 mb-3">Discover the benefits of an upgraded account</p>
            <button className="w-full bg-[var(--planetary)] hover:bg-[var(--sapphire)] cursor-pointer text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              Upgrade $30
            </button>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="ml-[240px] flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="px-6 pt-2 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[var(--galaxy)]">Good Evening, John! 👋</h1>
                <p className="text-[var(--planetary)] text-sm tracking-wide">Tuesday, September 16th 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="bg-white p-2.5 rounded-full cursor-pointer">
                <Search className="text-[var(--galaxy)]" size={17} />
                {/* <input
                  type="text"
                  placeholder="Search events, clubs..."
                  className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm"
                /> */}
              </div>

              <button className="relative bg-white p-2.5 rounded-full cursor-pointer">
                <Bell className="text-[var(--galaxy)]" size={17} />
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
                <div className="w-8 h-8 bg-[var(--sky)] rounded-full flex items-center justify-center">
                  <User size={16} className="text-[var(--planetary)]" />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
            
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Joined Clubs Card */}
            <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-3xl p-6 text-white relative overflow-hidden shadow-sm hover:shadow-md">
              <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Users className="text-white" size={18} />
                    </div>
                    {/* <span className="bg-green-400 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                      +2.05%
                    </span> */}
                  </div>
                  <p className="text-white/80 text-sm mb-1">Enrolled Clubs</p>
                  <p className="text-3xl font-bold">{dashboardData?.student?.joinedClubsCount || 0}</p>
                  {/* <p className="text-white/70 text-xs mt-1"></p> */}
                  {/* <div className='flex'>
                    {[1,2,3].map(() => (
                    <div className='p-1.5 bg-[var(--galaxy)] rounded-full flex items-center justify-center -ml-2'>C</div>
                    ))}
                  </div> */}
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            </div>

            {/* Activities Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                  <Activity className="text-[var(--planetary)]" size={18} />
                </div>
                {/* <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs font-medium">
                  +5.25%
                </span> */}
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{dashboardData?.student?.activitiesCount || 0}</p>
              {/* <p className="text-gray-500 text-xs">Activities vs last month</p> */}
            </div>

            {/* Achievements Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                  <Award className="text-[var(--planetary)]" size={18} />
                </div>
                {/* <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs font-medium">
                  -1.05%
                </span> */}
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Achievements</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">2</p>
              {/* <p className="text-gray-500 text-xs">Current semester</p> */}
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

        {/* Replace the existing tables section in StudentDashboard.js (around line 180-240) */}

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
                  {/* Registered Events List */}
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
                    },
                    {
                      id: 3,
                      title: 'TCA Induction',
                      venue: 'Conference Hall',
                      time: '9:00 pm',
                      date: '2024-03-20',
                      status: 'Yet To Happen',
                      clubIcon: '💻',
                      clubName: 'Tech Club'
                    }
                  ].map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                      {/* Club Icon */}
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
                        {event.clubIcon}
                      </div>
                      
                      {/* Event Details */}
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
                          
                          {/* Status and Date */}
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
                
                {/* See More Button */}
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
                  {/* Upcoming Events List */}
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
                    },
                    {
                      id: 3,
                      title: 'Photography Contest',
                      venue: 'Main Campus',
                      time: '10:00 am',
                      date: '2024-04-02',
                      clubIcon: '📸',
                      clubName: 'Photography Club',
                      registrations: '32/80'
                    }
                  ].map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                      {/* Club Icon */}
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
                        {event.clubIcon}
                      </div>
                      
                      {/* Event Details */}
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
                          
                          {/* Date and Register Button */}
                          <div className="text-right">
                            <p className="text-sm text-[var(--planetary)] mb-2">
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                            <button 
                              onClick={() => {
                                // Open registration modal
                                console.log('Opening registration modal for:', event.title);
                              }}
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
                
                {/* See More Button */}
                <div className="mt-6 text-center">
                  <button className="text-[var(--planetary)] text-sm font-medium hover:text-[var(--sapphire)] transition-colors">
                    See More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Modal - Add this at the end of the component, before the closing div */}
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
                    onClick={() => {
                      // Handle registration logic here
                      setShowRegistrationModal(false);
                      // Show success message
                    }}
                    className="flex-1 px-4 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors"
                  >
                    Confirm Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}