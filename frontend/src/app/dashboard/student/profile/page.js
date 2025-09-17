'use client';
import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  GraduationCap,
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
  Settings,
  Shield,
  Bell,
  Eye,
  Lock,
  Smartphone,
  UserCheck,
  Award,
  Target
} from 'lucide-react';

// Mock student data - this would come from backend
const studentData = {
  id: 1,
  profilePicture: null, // URL to profile picture or null
  name: 'John Doe',
  rollNumber: '22CS001',
  email: 'john.doe.22cs001@college.edu.in', // Non-editable
  course: 'Bachelor of Technology',
  branch: 'Computer Science & Engineering',
  batch: '2022-2026',
  institute: 'XYZ Institute of Technology',
  phoneNumber: '+91 98765 43210',
  dateOfBirth: '2004-05-15',
  address: 'Ludhiana, Punjab, India',
  admissionDate: '2022-08-15',
  currentSemester: 5,
  cgpa: 8.7,
  // Editable fields
  aboutMe: 'Passionate computer science student with interests in AI/ML, web development, and open source contributions. Always eager to learn new technologies and solve challenging problems.',
  socialLinks: [
    { id: 1, platform: 'GitHub', url: 'https://github.com/johndoe', icon: 'Github' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: 'Linkedin' },
    { id: 3, platform: 'Twitter', url: 'https://twitter.com/johndoe', icon: 'Twitter' }
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
  const [student, setStudent] = useState(studentData);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [tempAboutMe, setTempAboutMe] = useState(student.aboutMe);
  const [tempSocialLinks, setTempSocialLinks] = useState([...student.socialLinks]);
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [newSocialPlatform, setNewSocialPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');

  const handleSaveAbout = () => {
    setStudent(prev => ({ ...prev, aboutMe: tempAboutMe }));
    setIsEditingAbout(false);
  };

  const handleCancelAbout = () => {
    setTempAboutMe(student.aboutMe);
    setIsEditingAbout(false);
  };

  const handleSaveSocial = () => {
    setStudent(prev => ({ ...prev, socialLinks: [...tempSocialLinks] }));
    setIsEditingSocial(false);
    setShowAddSocial(false);
  };

  const handleCancelSocial = () => {
    setTempSocialLinks([...student.socialLinks]);
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
    // Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--galaxy)]">My Profile</h1>
            <p className="text-[var(--planetary)] text-sm mt-1">Manage your personal information and settings</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Compact Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {/* Profile Picture and Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-full flex items-center justify-center">
                    {student.profilePicture ? (
                      <img 
                        src={student.profilePicture} 
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
                </div>
                <h2 className="text-lg font-bold text-[var(--galaxy)]">{student.name}</h2>
                <p className="text-[var(--planetary)] text-sm">{student.rollNumber}</p>
              </div>

              {/* Compact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="text-[var(--planetary)]" size={12} />
                  <span className="text-[var(--galaxy)] truncate">{student.email}</span>
                  <Lock className="text-gray-400 ml-auto" size={10} />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <BookOpen className="text-[var(--planetary)]" size={12} />
                  <span className="text-[var(--galaxy)]">{student.course}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <GraduationCap className="text-[var(--planetary)]" size={12} />
                  <span className="text-[var(--galaxy)]">{student.branch}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Calendar className="text-[var(--planetary)]" size={12} />
                  <span className="text-[var(--galaxy)]">{student.batch}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="text-[var(--planetary)]" size={12} />
                  <span className="text-[var(--galaxy)]">{student.address}</span>
                </div>
              </div>

              {/* Compact Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--galaxy)]">{student.cgpa}</div>
                  <div className="text-xs text-[var(--planetary)]">CGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--galaxy)]">{student.currentSemester}</div>
                  <div className="text-xs text-[var(--planetary)]">Semester</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Personal Details - Compact */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-[var(--galaxy)]">Personal Details</h3>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--planetary)] mb-1 block">Phone Number</label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Phone className="text-[var(--planetary)]" size={14} />
                      <span className="text-[var(--galaxy)] text-sm">{student.phoneNumber}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--planetary)] mb-1 block">Date of Birth</label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Calendar className="text-[var(--planetary)]" size={14} />
                      <span className="text-[var(--galaxy)] text-sm">{new Date(student.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[var(--planetary)] mb-1 block">Institute</label>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Shield className="text-[var(--planetary)]" size={14} />
                      <span className="text-[var(--galaxy)] text-sm truncate">{student.institute}</span>
                      <Lock className="text-gray-400 ml-auto" size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Section - Compact */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[var(--galaxy)]">About Me</h3>
                  {!isEditingAbout && (
                    <button
                      onClick={() => setIsEditingAbout(true)}
                      className="flex items-center gap-1 px-2 py-1 text-[var(--planetary)] hover:text-[var(--sapphire)] transition-colors"
                    >
                      <Edit3 size={14} />
                      <span className="text-xs font-medium">Edit</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {isEditingAbout ? (
                  <div className="space-y-3">
                    <textarea
                      value={tempAboutMe}
                      onChange={(e) => setTempAboutMe(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none text-sm"
                      rows={4}
                      placeholder="Tell us about yourself, your interests, goals, and what makes you unique..."
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveAbout}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        <Save size={12} />
                        Save
                      </button>
                      <button
                        onClick={handleCancelAbout}
                        className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-800 transition-colors text-xs"
                      >
                        <X size={12} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[var(--galaxy)] text-sm leading-relaxed">
                      {student.aboutMe || "No description added yet. Click edit to add information about yourself."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links Section - Compact */}
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
                    {student.socialLinks.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {student.socialLinks.map((link) => {
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
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}