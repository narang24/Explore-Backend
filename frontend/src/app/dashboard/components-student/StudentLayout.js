'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  Calendar, 
  Users, 
  Bell, 
  Search, 
  User,
  LogOut,
  Settings,
  BarChart3,
  MessageSquare,
  Home
} from 'lucide-react';

export default function StudentLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleNavigation = (href) => {
    setActiveTab(href); // Immediately update active state
    router.push(href);
  };

  const navigationItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard/student/overview', 
      icon: Home,
      active: activeTab === '/dashboard/student/overview' || activeTab === '/dashboard'
    },
    { 
      name: 'Clubs', 
      href: '/dashboard/student/clubs', 
      icon: Users,
      active: activeTab === '/dashboard/student/clubs'
    },
    { 
      name: 'Events', 
      href: '/dashboard/student/events', 
      icon: Calendar,
      active: activeTab === '/dashboard/student/events'
    },
    { 
      name: 'Report', 
      href: '/dashboard/student/report', 
      icon: BarChart3,
      active: activeTab === '/dashboard/student/report'
    },
    { 
      name: 'Profile', 
      href: '/dashboard/student/profile', 
      icon: Settings,
      active: activeTab === '/dashboard/student/profile'
    },
    { 
      name: 'Feedback', 
      href: '/dashboard/student/feedback', 
      icon: MessageSquare,
      active: activeTab === '/dashboard/student/feedback'
    }
  ];

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
            {navigationItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-150 ${
                      item.active
                        ? 'shadow-lg shadow-gray-300/80 text-white bg-[var(--planetary)]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Tools Section */}
        <div className="px-6 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TOOLS</p>
        </div>

        <nav className="px-6 mb-6">
          <ul className="space-y-2">
            {navigationItems.slice(4).map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => router.push(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-200 ${
                      item.active
                        ? 'shadow-lg shadow-gray-300/80 text-white bg-[var(--planetary)]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Upgrade Pro Card */}
        <div className="mx-6 my-2 mb-4 p-4 bg-gray-900 rounded-2xl text-white">
          <img src="/favicon.png" alt="Xplore Logo" className="h-7 w-7 scale-120 rounded-lg object-cover bg-white mb-3" />
          <div>
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

        {/* Dynamic Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}