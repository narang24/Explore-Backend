'use client';
import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Edit3, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  LogOut,
  Camera,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Crown,
  Building,
  Link,
  Eye,
  Award,
  Target,
  Activity
} from 'lucide-react';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';

// Mock club admin data - this would come from backend
const clubAdminData = {
  id: 1,
  profilePicture: null, // URL to profile picture or null
  name: 'Aanya Verma',
  role: 'President', // President, Vice President, Secretary, etc.
  clubName: 'Tech Club',
  clubEmail: 'techclub@college.edu', // Optional
  personalEmail: 'aanya.verma@gmail.com', // Editable
  phoneNumber: '+91 98765 43210', // Editable
  address: 'Ludhiana, Punjab, India', // Editable
  
  // Club Statistics (Non-editable)
  eventsOrganised: 24,
  activeMembers: 156,
  clubEstablished: '2021',
  
  // Editable fields
  portfolioWebsite: 'https://aanyaverma.dev', // Editable
  aboutClub: 'Tech Club is a vibrant community of technology enthusiasts at our college. We organize workshops, hackathons, and tech talks to help students explore cutting-edge technologies and build innovative projects. Our mission is to create a collaborative environment where students can learn, share ideas, and grow together in the field of technology.',
  
  // Social Links (Editable)
  socialLinks: [
    { id: 1, platform: 'GitHub', url: 'https://github.com/aanyaverma', icon: 'Github' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com/in/aanyaverma', icon: 'Linkedin' },
    { id: 3, platform: 'Twitter', url: 'https://twitter.com/aanyaverma', icon: 'Twitter' }
  ]
};

const socialPlatforms = [
  { name: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
  { name: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
  { name: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
  { name: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/username' },
  { name: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/username' },
  { name: 'Personal Website', icon: Globe, placeholder: 'https://yourwebsite.com' },
  { name: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@username' }
];

export default function ProfilePage() {
  const [admin, setAdmin] = useState(clubAdminData);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);
  
  // Temp states for editing
  const [tempContactDetails, setTempContactDetails] = useState({
    personalEmail: admin.personalEmail,
    phoneNumber: admin.phoneNumber,
    address: admin.address
  });
  const [tempSocialLinks, setTempSocialLinks] = useState([...admin.socialLinks]);
  const [tempPortfolioWebsite, setTempPortfolioWebsite] = useState(admin.portfolioWebsite);
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [newSocialPlatform, setNewSocialPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');

  // Contact details handlers
  const handleSaveContact = () => {
    setAdmin(prev => ({ 
      ...prev, 
      personalEmail: tempContactDetails.personalEmail,
      phoneNumber: tempContactDetails.phoneNumber,
      address: tempContactDetails.address
    }));
    setIsEditingContact(false);
  };

  const handleCancelContact = () => {
    setTempContactDetails({
      personalEmail: admin.personalEmail,
      phoneNumber: admin.phoneNumber,
      address: admin.address
    });
    setIsEditingContact(false);
  };

  // Portfolio website handlers
  const handleSavePortfolio = () => {
    setAdmin(prev => ({ ...prev, portfolioWebsite: tempPortfolioWebsite }));
    setIsEditingPortfolio(false);
  };

  const handleCancelPortfolio = () => {
    setTempPortfolioWebsite(admin.portfolioWebsite);
    setIsEditingPortfolio(false);
  };

  // Social links handlers
  const handleSaveSocial = () => {
    setAdmin(prev => ({ ...prev, socialLinks: [...tempSocialLinks] }));
    setIsEditingSocial(false);
    setShowAddSocial(false);
  };

  const handleCancelSocial = () => {
    setTempSocialLinks([...admin.socialLinks]);
    setIsEditingSocial(false);
    setShowAddSocial(false);
    setNewSocialPlatform('');
    setNewSocialUrl('');
  };

  const handleAddSocialLink = () => {
    if (newSocialPlatform && newSocialUrl) {
      const platform = socialPlatforms.find(p => p.name === newSocialPlatform);
      const newLink = {
        id: Date.now(),
        platform: newSocialPlatform,
        url: newSocialUrl,
        icon: platform?.icon.name || 'Globe'
      };
      setTempSocialLinks(prev => [...prev, newLink]);
      setNewSocialPlatform('');
      setNewSocialUrl('');
      setShowAddSocial(false);
    }
  };

  const handleRemoveSocialLink = (id) => {
    setTempSocialLinks(prev => prev.filter(link => link.id !== id));
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Github,
      Linkedin,
      Twitter,
      Instagram,
      Facebook,
      Globe,
      Youtube
    };
    return icons[iconName] || Globe;
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Implement logout functionality
      console.log('Logging out...');
      // Redirect to login page
      // window.location.href = '/login';
    }
  };

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Club Admin Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {/* Profile Picture and Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-full flex items-center justify-center">
                    {admin.profilePicture ? (
                      <img 
                        src={admin.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="text-white" size={32} />
                    )}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--planetary)] hover:bg-[var(--sapphire)] rounded-full flex items-center justify-center text-white transition-colors">
                    <Camera size={12} />
                  </button>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown size={14} className="text-white" />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-[var(--galaxy)]">{admin.name}</h2>
                <p className="text-[var(--planetary)] font-medium text-sm">{admin.role}@{admin.clubName}</p>
                {admin.clubEmail && (
                  <p className="text-gray-500 text-xs mt-1">{admin.clubEmail}</p>
                )}
              </div>

              {/* Club Statistics */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="text-[var(--planetary)]" size={12} />
                    <span className="text-xs text-[var(--galaxy)]">Events Organised</span>
                  </div>
                  <span className="font-bold text-[var(--galaxy)] text-sm">{admin.eventsOrganised}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="text-[var(--planetary)]" size={12} />
                    <span className="text-xs text-[var(--galaxy)]">Active Members</span>
                  </div>
                  <span className="font-bold text-[var(--galaxy)] text-sm">{admin.activeMembers}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="text-[var(--planetary)]" size={12} />
                    <span className="text-xs text-[var(--galaxy)]">Established</span>
                  </div>
                  <span className="font-bold text-[var(--galaxy)] text-sm">{admin.clubEstablished}</span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Contact Details Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[var(--galaxy)]">Contact Details</h3>
                  {!isEditingContact && (
                    <button
                      onClick={() => setIsEditingContact(true)}
                      className="flex items-center gap-1 px-2 py-1 text-[var(--planetary)] hover:text-[var(--sapphire)] transition-colors"
                    >
                      <Edit3 size={14} />
                      <span className="text-xs font-medium">Edit</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {isEditingContact ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-[var(--planetary)] mb-1 block">Personal Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                        <input
                          type="email"
                          value={tempContactDetails.personalEmail}
                          onChange={(e) => setTempContactDetails(prev => ({ ...prev, personalEmail: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                          placeholder="your.email@gmail.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[var(--planetary)] mb-1 block">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                        <input
                          type="tel"
                          value={tempContactDetails.phoneNumber}
                          onChange={(e) => setTempContactDetails(prev => ({ ...prev, phoneNumber: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[var(--planetary)] mb-1 block">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={14} />
                        <textarea
                          value={tempContactDetails.address}
                          onChange={(e) => setTempContactDetails(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm resize-none"
                          rows={2}
                          placeholder="Your address"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveContact}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        <Save size={12} />
                        Save
                      </button>
                      <button
                        onClick={handleCancelContact}
                        className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-800 transition-colors text-xs"
                      >
                        <X size={12} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="text-[var(--planetary)]" size={16} />
                      <div>
                        <p className="text-xs font-medium text-[var(--planetary)]">Personal Email</p>
                        <p className="text-sm font-semibold text-[var(--galaxy)] truncate">{admin.personalEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="text-[var(--planetary)]" size={16} />
                      <div>
                        <p className="text-xs font-medium text-[var(--planetary)]">Phone</p>
                        <p className="text-sm font-semibold text-[var(--galaxy)]">{admin.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="text-[var(--planetary)]" size={16} />
                      <div>
                        <p className="text-xs font-medium text-[var(--planetary)]">Location</p>
                        <p className="text-sm font-semibold text-[var(--galaxy)] truncate">{admin.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Portfolio Website Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[var(--galaxy)]">Portfolio Website</h3>
                  {!isEditingPortfolio && (
                    <button
                      onClick={() => setIsEditingPortfolio(true)}
                      className="flex items-center gap-1 px-2 py-1 text-[var(--planetary)] hover:text-[var(--sapphire)] transition-colors"
                    >
                      <Edit3 size={14} />
                      <span className="text-xs font-medium">Edit</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {isEditingPortfolio ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="url"
                        value={tempPortfolioWebsite}
                        onChange={(e) => setTempPortfolioWebsite(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSavePortfolio}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        <Save size={12} />
                        Save
                      </button>
                      <button
                        onClick={handleCancelPortfolio}
                        className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-800 transition-colors text-xs"
                      >
                        <X size={12} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {admin.portfolioWebsite ? (
                      <a
                        href={admin.portfolioWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                      >
                        <Globe className="text-[var(--planetary)] group-hover:scale-110 transition-transform" size={16} />
                        <div className="flex-1">
                          <p className="font-medium text-[var(--galaxy)] text-sm">Personal Portfolio</p>
                          <p className="text-xs text-[var(--planetary)] truncate">{admin.portfolioWebsite}</p>
                        </div>
                        <Eye className="text-gray-400 group-hover:text-[var(--planetary)] transition-colors" size={12} />
                      </a>
                    ) : (
                      <div className="text-center py-6">
                        <Globe className="text-gray-400 mx-auto mb-2" size={20} />
                        <p className="text-[var(--planetary)] text-sm">No portfolio website added</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Social Links Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[var(--galaxy)]">Social Links</h3>
                  {!isEditingSocial && (
                    <button
                      onClick={() => setIsEditingSocial(true)}
                      className="flex items-center gap-1 px-2 py-1 text-[var(--planetary)] hover:text-[var(--sapphire)] transition-colors"
                    >
                      <Edit3 size={14} />
                      <span className="text-xs font-medium">Edit</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {isEditingSocial ? (
                  <div className="space-y-3">
                    {/* Existing Social Links */}
                    <div className="space-y-2">
                      {tempSocialLinks.map((link) => {
                        const IconComponent = getIconComponent(link.icon);
                        return (
                          <div key={link.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <IconComponent className="text-[var(--planetary)]" size={14} />
                            <div className="flex-1">
                              <p className="text-xs font-medium text-[var(--galaxy)]">{link.platform}</p>
                              <p className="text-xs text-[var(--planetary)] truncate">{link.url}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveSocialLink(link.id)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add New Social Link */}
                    {showAddSocial ? (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="space-y-2">
                          <select
                            value={newSocialPlatform}
                            onChange={(e) => setNewSocialPlatform(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                          >
                            <option value="">Select Platform</option>
                            {socialPlatforms
                              .filter(platform => !tempSocialLinks.some(link => link.platform === platform.name))
                              .map(platform => (
                                <option key={platform.name} value={platform.name}>
                                  {platform.name}
                                </option>
                              ))}
                          </select>
                          <input
                            type="url"
                            value={newSocialUrl}
                            onChange={(e) => setNewSocialUrl(e.target.value)}
                            placeholder={newSocialPlatform ? socialPlatforms.find(p => p.name === newSocialPlatform)?.placeholder : "Enter URL"}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleAddSocialLink}
                              disabled={!newSocialPlatform || !newSocialUrl}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-300 text-white rounded-lg text-xs font-medium transition-colors"
                            >
                              <Plus size={12} />
                              Add
                            </button>
                            <button
                              onClick={() => {
                                setShowAddSocial(false);
                                setNewSocialPlatform('');
                                setNewSocialUrl('');
                              }}
                              className="px-3 py-1.5 text-gray-600 hover:text-gray-800 transition-colors text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddSocial(true)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-[var(--planetary)] hover:text-[var(--sapphire)] hover:border-[var(--planetary)] transition-colors w-full justify-center text-xs"
                      >
                        <Plus size={12} />
                        Add Social Link
                      </button>
                    )}

                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={handleSaveSocial}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        <Save size={12} />
                        Save
                      </button>
                      <button
                        onClick={handleCancelSocial}
                        className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-800 transition-colors text-xs"
                      >
                        <X size={12} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {admin.socialLinks.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {admin.socialLinks.map((link) => {
                          const IconComponent = getIconComponent(link.icon);
                          return (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                            >
                              <IconComponent className="text-[var(--planetary)] group-hover:scale-110 transition-transform" size={16} />
                              <div className="flex-1">
                                <p className="font-medium text-[var(--galaxy)] text-sm">{link.platform}</p>
                                <p className="text-xs text-[var(--planetary)] truncate">{link.url}</p>
                              </div>
                              <Eye className="text-gray-400 group-hover:text-[var(--planetary)] transition-colors" size={12} />
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Globe className="text-gray-400 mx-auto mb-2" size={20} />
                        <p className="text-[var(--planetary)] text-sm">No social links added</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* About Our Club Section - Non-editable */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Target className="text-[var(--planetary)]" size={18} />
                  <h3 className="text-base font-semibold text-[var(--galaxy)]">About Our Club</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="bg-gradient-to-r from-[var(--sky)] to-[var(--sky)]/50 rounded-lg p-4">
                  <p className="text-[var(--galaxy)] text-sm leading-relaxed">
                    {admin.aboutClub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClubAdminLayout>
  );
}