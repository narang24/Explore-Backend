'use client';
import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';
import { 
  Search, 
  Filter, 
  Users, 
  Calendar, 
  TrendingUp,
  Code,
  Music,
  Palette,
  Zap,
  Heart,
  Camera,
  Gamepad2,
  BookOpen,
  Globe,
  Star,
  Award,
  Clock,
  MapPin,
  Plus
} from 'lucide-react';

// Mock data for clubs
const enrolledClubs = [
  { id: 1, name: 'GDSC', icon: '🚀', category: 'CODING', membersCount: 120, eventsThisMonth: 3, color: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'Cultural Club', icon: '🎭', category: 'CULTURAL', membersCount: 85, eventsThisMonth: 2, color: 'from-purple-500 to-pink-500' },
  { id: 3, name: 'Music Society', icon: '🎵', category: 'MUSIC', membersCount: 67, eventsThisMonth: 1, color: 'from-green-500 to-teal-500' }
];

const trendingClubs = [
  { id: 1, name: 'GDSC', icon: '🚀', category: 'CODING', eventsThisMonth: 7, trendPercentage: '+15%', color: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'TCA', icon: '🎨', category: 'CULTURAL', eventsThisMonth: 5, trendPercentage: '+12%', color: 'from-orange-500 to-red-500' },
  { id: 3, name: 'RLC', icon: '📚', category: 'ACADEMIC', eventsThisMonth: 4, trendPercentage: '+8%', color: 'from-indigo-500 to-purple-500' },
  { id: 4, name: 'OCTAVES', icon: '🎵', category: 'MUSIC', eventsThisMonth: 3, trendPercentage: '+5%', color: 'from-green-500 to-teal-500' }
];

const categories = [
  { name: 'CODING', icon: Code, color: 'bg-blue-100 text-blue-700', count: 8 },
  { name: 'CULTURAL', icon: Palette, color: 'bg-purple-100 text-purple-700', count: 12 },
  { name: 'MUSIC', icon: Music, color: 'bg-green-100 text-green-700', count: 6 },
  { name: 'SPORTS', icon: Zap, color: 'bg-orange-100 text-orange-700', count: 10 },
  { name: 'ACADEMIC', icon: BookOpen, color: 'bg-indigo-100 text-indigo-700', count: 7 },
  { name: 'SOCIAL', icon: Heart, color: 'bg-pink-100 text-pink-700', count: 5 }
];

const allClubs = [
  { id: 1, name: 'GDSC', icon: '🚀', category: 'CODING', members: 120, rating: 4.8, description: 'Google Developer Student Club - Learn, build, and connect with Google technologies' },
  { id: 2, name: 'Cultural Club', icon: '🎭', category: 'CULTURAL', members: 85, rating: 4.6, description: 'Showcase your talents in dance, drama, and cultural events' },
  { id: 3, name: 'Music Society', icon: '🎵', category: 'MUSIC', members: 67, rating: 4.9, description: 'Express yourself through music, vocals, and instruments' },
  { id: 4, name: 'Photography Club', icon: '📸', category: 'CULTURAL', members: 45, rating: 4.7, description: 'Capture moments and learn professional photography skills' },
  { id: 5, name: 'Robotics Club', icon: '🤖', category: 'CODING', members: 78, rating: 4.5, description: 'Build and program robots for competitions and learning' },
  { id: 6, name: 'Literary Society', icon: '📚', category: 'ACADEMIC', members: 56, rating: 4.4, description: 'Explore literature, creative writing, and public speaking' },
  { id: 7, name: 'Gaming Club', icon: '🎮', category: 'SPORTS', members: 92, rating: 4.3, description: 'Competitive gaming, tournaments, and game development' },
  { id: 8, name: 'Drama Society', icon: '🎬', category: 'CULTURAL', members: 73, rating: 4.8, description: 'Theater, acting workshops, and stage performances' }
];

export default function ClubsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClubs = allClubs.filter(club => {
    const matchesCategory = selectedCategory === 'ALL' || club.category === selectedCategory;
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--galaxy)]">Clubs</h1>
            <p className="text-[var(--planetary)] text-sm mt-1">Discover and join amazing clubs on campus</p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm w-64"
              />
            </div>
            <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 bg-white">
              <Filter size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Enrolled Clubs and Trending Clubs - Adjacent Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrolled Clubs Section */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[var(--galaxy)]">My Enrolled Clubs</h2>
                <span className="text-xs text-[var(--planetary)]">{enrolledClubs.length} clubs</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {enrolledClubs.map((club) => (
                  <div key={club.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${club.color} rounded-lg flex items-center justify-center text-white text-sm shadow-sm`}>
                        {club.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--galaxy)] text-sm">{club.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-[var(--planetary)]">{club.membersCount} members</span>
                          <span className="text-xs text-green-600">• {club.eventsThisMonth} events</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Clubs Section - Compact Layout */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-[var(--galaxy)]">Trending Clubs</h2>
                  <TrendingUp className="text-[var(--planetary)]" size={16} />
                </div>
                <span className="text-xs text-[var(--planetary)] bg-[var(--sky)] px-2 py-1 rounded-lg">Active</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {trendingClubs.slice(0, 3).map((club, index) => (
                  <div key={club.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${club.color} rounded-lg flex items-center justify-center text-white text-sm shadow-sm`}>
                        {club.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--galaxy)] text-sm">{club.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-[var(--planetary)] rounded-full"></div>
                          <span className="text-xs text-[var(--planetary)]">{club.eventsThisMonth} events this month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories and All Clubs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Categories</h2>
                <p className="text-[var(--planetary)] text-sm mt-1">Browse by interest</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('ALL')}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      selectedCategory === 'ALL'
                        ? 'bg-[var(--planetary)] text-white'
                        : 'text-[var(--galaxy)] hover:bg-gray-50'
                    }`}
                  >
                    <span>All Clubs</span>
                    <span className={selectedCategory === 'ALL' ? 'text-white' : 'text-[var(--planetary)]'}>
                      {allClubs.length}
                    </span>
                  </button>
                  
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-[var(--planetary)] text-white'
                            : 'text-[var(--galaxy)] hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon size={16} />
                          <span>{category.name}</span>
                        </div>
                        <span className={selectedCategory === category.name ? 'text-white' : 'text-[var(--planetary)]'}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* All Clubs Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[var(--galaxy)]">
                    {selectedCategory === 'ALL' ? 'All Clubs' : `${selectedCategory} Clubs`}
                  </h2>
                  <span className="text-sm text-[var(--planetary)]">{filteredClubs.length} clubs</span>
                </div>
                <p className="text-[var(--planetary)] text-sm mt-1">Discover clubs that match your interests</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredClubs.map((club) => (
                    <div key={club.id} className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100">
                          {club.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-[var(--galaxy)] text-sm">{club.name}</h3>
                              <p className="text-xs text-[var(--planetary)] mt-1">{club.category}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="text-yellow-400 fill-current" size={12} />
                              <span className="text-xs font-medium text-[var(--galaxy)]">{club.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-[var(--planetary)] mb-3 line-clamp-2">{club.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-[var(--planetary)]">
                              <Users size={12} />
                              <span>{club.members} members</span>
                            </div>
                            <button className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                              Join Club
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredClubs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-2">No clubs found</h3>
                    <p className="text-[var(--planetary)] text-sm">Try adjusting your search or category filter</p>
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