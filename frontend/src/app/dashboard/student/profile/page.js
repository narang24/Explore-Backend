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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              {/* Profile Picture Section */}
              <div className="relative">
                <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-t-3xl p-6 text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      {student.profilePicture ? (
                        <img 
                          src={student.profilePicture} 
                          alt="Profile" 
                          className="w-full h-full rounded-2xl object-cover"
                        />
                      ) : (
                        <User className="text-[var(--planetary)]" size={40} />
                      )}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--planetary)] hover:bg-[var(--sapphire)] rounded-full flex items-center justify-center text-white transition-colors">
                      <Camera size={14} />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-4">{student.name}</h2>
                  <p className="text-white/80 text-sm">{student.rollNumber}</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                      <Mail className="text-[var(--planetary)]" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[var(--galaxy)] font-medium">Email</p>
                      <p className="text-[var(--planetary)] text-xs">{student.email}</p>
                    </div>
                    <Lock className="text-gray-400" size={14} />
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                      <BookOpen className="text-[var(--planetary)]" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[var(--galaxy)] font-medium">Course</p>
                      <p className="text-[var(--planetary)] text-xs">{student.course}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-[var(--planetary)]" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[var(--galaxy)] font-medium">Branch</p>
                      <p className="text-[var(--planetary)] text-xs">{student.branch}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                      <Calendar className="text-[var(--planetary)]" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[var(--galaxy)] font-medium">Batch</p>
                      <p className="text-[var(--planetary)] text-xs">{student.batch}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Target className="text-white" size={20} />
                      </div>
                      <div className="text-xl font-bold text-[var(--galaxy)]">{student.cgpa}</div>
                      <div className="text-xs text-[var(--planetary)]">CGPA</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[var(--venus)] to-[var(--universe)] rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Award className="text-[var(--planetary)]" size={20} />
                      </div>
                      <div className="text-xl font-bold text-[var(--galaxy)]">{student.currentSemester}</div>
                      <div className="text-xs text-[var(--planetary)]">Semester</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-[var(--galaxy)]">Personal Details</h3>
                <p className="text-[var(--planetary)] text-sm mt-1">Your basic information and contact details</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[var(--galaxy)] mb-2 block">Full Name</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <User className="text-[var(--planetary)]" size={16} />
                        <span className="text-[var(--galaxy)]">{student.name}</span>
                        <Lock className="text-gray-400 ml-auto" size={14} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[var(--galaxy)] mb-2 block">Roll Number</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <UserCheck className="text-[var(--planetary)]" size={16} />
                        <span className="text-[var(--galaxy)]">{student.rollNumber}</span>
                        <Lock className="text-gray-400 ml-auto" size={14} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[var(--galaxy)] mb-2 block">Phone Number</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone className="text-[var(--planetary)]" size={16} />
                        <span className="text-[var(--galaxy)]">{student.phoneNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[var(--galaxy)] mb-2 block">Institute</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Shield className="text-[var(--planetary)]" size={16} />
                        <span className="text-[var(--galaxy)]">{student.institute}</span>
                        <Lock className="text-gray-400 ml-auto" size={14} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[var(--galaxy)] mb-2 block">Date of Birth</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Calendar className="text-[var(--planetary)]" size={16} />
                        <span className="text-[var(--galaxy)]">{new Date(student.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[var(--galaxy)] mb-2 block">Address</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin className="text-[var(--planetary)]" size={16} />
                        <span className="text-[var(--galaxy)]">{student.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--galaxy)]">About Me</h3>
                    <p className="text-[var(--planetary)] text-sm mt-1">Tell others about yourself</p>
                  </div>
                  {!isEditingAbout && (
                    <button
                      onClick={() => setIsEditingAbout(true)}
                      className="flex items-center gap-2 px-3 py-2 text-[var(--planetary)] hover:text-[var(--sapphire)] transition-colors"
                    >
                      <Edit3 size={16} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {isEditingAbout ? (
                  <div className="space-y-4">
                    <textarea
                      value={tempAboutMe}
                      onChange={(e) => setTempAboutMe(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none"
                      rows={6}
                      placeholder="Tell us about yourself, your interests, goals, and what makes you unique..."
                    />
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSaveAbout}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-sm font-medium transition-colors"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelAbout}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-[var(--galaxy)] leading-relaxed">
                      {student.aboutMe || "No description added yet. Click edit to add information about yourself."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--galaxy)]">Social Links</h3>
                    <p className="text-[var(--planetary)] text-sm mt-1">Connect with others through your social profiles</p>
                  </div>
                  {!isEditingSocial && (
                    <button
                      onClick={() => setIsEditingSocial(true)}
                      className="flex items-center gap-2 px-3 py-2 text-[var(--planetary)] hover:text-[var(--sapphire)] transition-colors"
                    >
                      <Edit3 size={16} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {isEditingSocial ? (
                  <div className="space-y-4">
                    {/* Existing Social Links */}
                    <div className="space-y-3">
                      {tempSocialLinks.map((link) => {
                        const IconComponent = getIconComponent(link.icon);
                        return (
                          <div key={link.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <IconComponent className="text-[var(--planetary)]" size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-[var(--galaxy)]">{link.platform}</p>
                              <p className="text-xs text-[var(--planetary)]">{link.url}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveSocialLink(link.id)}
                              className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add New Social Link */}
                    {showAddSocial ? (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="space-y-3">
                          <select
                            value={newSocialPlatform}
                            onChange={(e) => setNewSocialPlatform(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleAddSocialLink}
                              disabled={!newSocialPlatform || !newSocialUrl}
                              className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              <Plus size={14} />
                              Add Link
                            </button>
                            <button
                              onClick={() => {
                                setShowAddSocial(false);
                                setNewSocialPlatform('');
                                setNewSocialUrl('');
                              }}
                              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddSocial(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-xl text-[var(--planetary)] hover:text-[var(--sapphire)] hover:border-[var(--planetary)] transition-colors w-full justify-center"
                      >
                        <Plus size={16} />
                        <span className="text-sm font-medium">Add Social Link</span>
                      </button>
                    )}

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={handleSaveSocial}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl text-sm font-medium transition-colors"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelSocial}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {student.socialLinks.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {student.socialLinks.map((link) => {
                          const IconComponent = getIconComponent(link.icon);
                          return (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                            >
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <IconComponent className="text-[var(--planetary)]" size={18} />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-[var(--galaxy)] text-sm">{link.platform}</p>
                                <p className="text-xs text-[var(--planetary)] truncate">{link.url}</p>
                              </div>
                              <Eye className="text-gray-400 group-hover:text-[var(--planetary)] transition-colors" size={14} />
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Globe className="text-gray-400" size={24} />
                        </div>
                        <h4 className="text-lg font-semibold text-[var(--galaxy)] mb-2">No social links added</h4>
                        <p className="text-[var(--planetary)] text-sm">Add your social media profiles to connect with others</p>
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