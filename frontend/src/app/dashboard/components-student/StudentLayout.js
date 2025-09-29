'use client';
import { useState, useEffect } from 'react';
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
  Award,
  MessageSquare,
  Home,
  Zap,
  Briefcase,
  Menu,
  X
} from 'lucide-react';

export default function StudentLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.hamburger-menu')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleNavigation = (href) => {
    setActiveTab(href); // Immediately update active state
    setIsSidebarOpen(false); // Close sidebar on navigation for mobile
    router.push(href);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get header content based on current route
  const getHeaderContent = () => {
    const tabHeaders = {
      '/dashboard/student/overview': {
        title: `Good Evening, John! 👋`,
        subtitle: 'Tuesday, September 16th 2025',
        isMainDashboard: true
      },
      '/dashboard': {
        title: `Good Evening, John! 👋`,
        subtitle: 'Tuesday, September 16th 2025',
        isMainDashboard: true
      },
      '/dashboard/student/achievements': {
        title: `Achievements Hub 🏆`,
        subtitle: 'Track your accomplishments and celebrate your success',
        isMainDashboard: false
      },
      '/dashboard/student/activities': {
        title: `Activities Center ⚡`,
        subtitle: 'Discover and participate in exciting campus activities',
        isMainDashboard: false
      },
      '/dashboard/student/portfolio': {
        title: `Your Portfolio 📂`,
        subtitle: 'Showcase your projects and build your professional presence',
        isMainDashboard: false
      },
      '/dashboard/student/profile': {
        title: `Your Profile ✨`,
        subtitle: 'Personalize your space and manage account settings',
        isMainDashboard: false
      },
      '/dashboard/student/feedback': {
        title: `Feedback Corner 💬`,
        subtitle: 'Share your thoughts and help us improve the experience',
        isMainDashboard: false
      }
    };

    return tabHeaders[pathname] || tabHeaders['/dashboard/student/overview'];
  };

  const navigationItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard/student/overview', 
      icon: Home,
      active: activeTab === '/dashboard/student/overview' || activeTab === '/dashboard'
    },
    { 
      name: 'Achievements', 
      href: '/dashboard/student/achievements', 
      icon: Award,
      active: activeTab === '/dashboard/student/achievements'
    },
    { 
      name: 'Activities', 
      href: '/dashboard/student/activities', 
      icon: Zap,
      active: activeTab === '/dashboard/student/activities'
    },
    { 
      name: 'Portfolio', 
      href: '/dashboard/student/portfolio', 
      icon: Briefcase,
      active: activeTab === '/dashboard/student/portfolio'
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

  const headerContent = getHeaderContent();

  return (
    <div className="h-screen bg-gray-100 flex p-5 pr-0">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar h-[95%] fixed w-[238px] bg-white rounded-3xl flex flex-col z-50 transition-transform duration-300 ease-in-out lg:transform-none ${
        isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full lg:translate-x-0'
      }`}>
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
                    onClick={() => handleNavigation(item.href)}
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
      <div className="ml-0 lg:ml-[240px] flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="px-6 pt-2 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Menu */}
              <button
                onClick={toggleSidebar}
                className="hamburger-menu lg:hidden p-2 rounded-lg hover:bg-white transition-colors"
              >
                {isSidebarOpen ? (
                  <X className="text-[var(--galaxy)]" size={20} />
                ) : (
                  <Menu className="text-[var(--galaxy)]" size={20} />
                )}
              </button>

              <div>
                <h1 className="text-2xl font-bold text-[var(--galaxy)]">{headerContent.title}</h1>
                <p className="text-[var(--planetary)] text-sm tracking-wide">{headerContent.subtitle}</p>
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
                <div className="text-right hidden sm:block">
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