'use client';
import { useState } from 'react';
import StudentLayout from '../../components-student/StudentLayout';
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
  Target,
  BookOpen,
  FileCheck,
  Upload,
  X,
  File
} from 'lucide-react';
import { Toast } from '@/components/ui/ToastModal';

// Mock data for achievements
const achievementsData = {
  totalCredits: 45,
  totalCertifications: 12,
  pendingApprovals: 3
};

const coCurrenticularAchievements = [
  {
    id: 3,
    activityName: 'Web Development Bootcamp',
    organizingClub: 'Coding Club',
    date: '2024-12-10',
    creditsEarned: 3,
    isApproved: false,
    isPending: false,
    certificatesCount: 0,
    clubIcon: '💻',
    category: 'Workshop'
  },
  {
    id: 4,
    activityName: 'React.js Workshop',
    organizingClub: 'Tech Society',
    date: '2024-12-05',
    creditsEarned: 2,
    isApproved: false,
    isPending: true,
    certificatesCount: 0,
    clubIcon: '⚛️',
    category: 'Workshop'
  },
  {
    id: 1,
    activityName: 'Machine Learning Workshop',
    organizingClub: 'GDSC TIET',
    date: '2024-11-15',
    creditsEarned: 4,
    isApproved: true,
    isPending: false,
    certificatesCount: 2,
    clubIcon: '🚀',
    category: 'Workshop'
  },
  {
    id: 2,
    activityName: 'International Conference on AI',
    organizingClub: 'IEEE Student Branch',
    date: '2024-10-20',
    creditsEarned: 6,
    isApproved: true,
    isPending: false,
    certificatesCount: 1,
    clubIcon: '⚡',
    category: 'Conference'
  }
];

const extraCurricularAchievements = [
  {
    id: 5,
    activityName: 'Cultural Fest Performance',
    organizingClub: 'Cultural Club',
    date: '2024-11-30',
    creditsEarned: 5,
    isApproved: false,
    isPending: false,
    certificatesCount: 0,
    clubIcon: '🎭',
    category: 'Cultural'
  },
  {
    id: 7,
    activityName: 'Photography Competition',
    organizingClub: 'Photography Club',
    date: '2024-12-01',
    creditsEarned: 3,
    isApproved: false,
    isPending: true,
    certificatesCount: 0,
    clubIcon: '📸',
    category: 'Competition'
  },
  {
    id: 4,
    activityName: 'Hackathon Winner - Code Sprint 2024',
    organizingClub: 'Tech Society',
    date: '2024-09-25',
    creditsEarned: 8,
    isApproved: true,
    isPending: false,
    certificatesCount: 3,
    clubIcon: '🏆',
    category: 'Competition'
  },
  {
    id: 6,
    activityName: 'Volunteer Work - Blood Donation Camp',
    organizingClub: 'NSS TIET',
    date: '2024-10-15',
    creditsEarned: 2,
    isApproved: true,
    isPending: false,
    certificatesCount: 1,
    clubIcon: '❤️',
    category: 'Social Service'
  }
];

// Upload Modal Component
function UploadModal({ isOpen, onClose, achievement, onSubmitSuccess }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [description, setDescription] = useState('');

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitting approval request for:', achievement);
    console.log('Files:', uploadedFiles);
    console.log('Description:', description);
    
    // Call the success callback
    onSubmitSuccess(achievement);
    
    // Reset form
    setUploadedFiles([]);
    setDescription('');
    
    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--sky)] rounded-2xl flex items-center justify-center">
              <Upload className="text-[var(--planetary)]" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Request Approval</h3>
              <p className="text-gray-600 text-sm">Upload certificates for validation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Achievement Details */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Achievement Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Activity:</span>
              <p className="text-gray-600">{achievement?.activityName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Organizing Club:</span>
              <p className="text-gray-600">{achievement?.organizingClub}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Date:</span>
              <p className="text-gray-600">{new Date(achievement?.date).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Credits:</span>
              <p className="text-gray-600">{achievement?.creditsEarned} Credits</p>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Upload Certificates/Records
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[var(--planetary)] transition-colors relative">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Upload className="text-gray-400" size={20} />
            </div>
            <p className="text-sm text-gray-600 mb-2">Drop files here or click to browse</p>
            <p className="text-xs text-gray-500">Supports: PDF, JPG, PNG (Max 5MB each)</p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mb-6">
            <h5 className="font-medium text-gray-900 mb-3">Uploaded Files</h5>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <File className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-700 flex-1">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-200 rounded text-gray-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Information (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any additional details about your achievement..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploadedFiles.length === 0}
            className="flex-1 px-4 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit for Approval
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AchievementsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('status');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRequestApproval = (achievement) => {
    setSelectedAchievement(achievement);
    setShowUploadModal(true);
  };

  const handleSubmitSuccess = (achievement) => {
    setToastMessage(`Approval request submitted successfully for "${achievement.activityName}"! Your submission is now pending review by faculty.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  // Function to get status priority for sorting
  const getStatusPriority = (achievement) => {
    if (!achievement.isApproved && !achievement.isPending) return 1;
    if (achievement.isPending) return 2;
    if (achievement.isApproved) return 3;
    return 4;
  };

  // Function to sort achievements
  const sortAchievements = (achievements) => {
    return [...achievements].sort((a, b) => {
      switch (sortBy) {
        case 'status':
          return getStatusPriority(a) - getStatusPriority(b);
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'club':
          return a.organizingClub.localeCompare(b.organizingClub);
        case 'credits':
          return b.creditsEarned - a.creditsEarned;
        case 'activity':
          return a.activityName.localeCompare(b.activityName);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  };

  // Function to filter achievements
  const filterAchievements = (achievements) => {
    return achievements.filter(achievement =>
      achievement.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.organizingClub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get filtered and sorted achievements
  const filteredCoCurrenticular = sortAchievements(filterAchievements(coCurrenticularAchievements));
  const filteredExtraCurricular = sortAchievements(filterAchievements(extraCurricularAchievements));

  const sortOptions = [
    { value: 'status', label: 'Status' },
    { value: 'date', label: 'Date' },
    { value: 'club', label: 'Club' },
    { value: 'credits', label: 'Credits' },
    { value: 'activity', label: 'Activity Name' },
    { value: 'category', label: 'Category' }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Credits Earned */}
          <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-3xl p-6 text-white relative overflow-hidden shadow-sm hover:shadow-md">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-white" size={18} />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">Total Credits Earned</p>
              <p className="text-3xl font-bold">{achievementsData.totalCredits}</p>
              <p className="text-white/70 text-xs mt-1">Co-curricular + Extra-curricular</p>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>

          {/* Total Certifications */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <Award className="text-[var(--planetary)]" size={18} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Certifications</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{achievementsData.totalCertifications}</p>
            <p className="text-xs text-gray-500">Approved achievements</p>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <FileCheck className="text-[var(--planetary)]" size={18} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Pending Approvals</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{achievementsData.pendingApprovals}</p>
            <p className="text-xs text-gray-500">Awaiting validation</p>
          </div>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search achievements by name, club, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm shadow-sm hover:shadow-md transition-all duration-200"
            />
          </div>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-4 pr-10 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm font-medium text-[var(--galaxy)] min-w-[140px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          
          <div className="text-sm text-gray-500 font-medium bg-gray-50 px-4 py-4 rounded-2xl border border-gray-100">
            {filteredCoCurrenticular.length + filteredExtraCurricular.length} result{filteredCoCurrenticular.length + filteredExtraCurricular.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Achievements Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Co-curricular Achievements Section */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Co-curricular Achievements</h2>
                <span className="text-sm text-[var(--planetary)]">{filteredCoCurrenticular.length}</span>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Workshops, seminars & conferences</p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {filteredCoCurrenticular.map((achievement) => (
                  <div key={achievement.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sm shadow-sm border border-gray-100">
                        {achievement.clubIcon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{achievement.activityName}</h3>
                            <p className="text-xs text-[var(--planetary)]">{achievement.organizingClub}</p>
                            
                            <div className="mt-2">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                <Plus size={10} />
                                {achievement.creditsEarned} Credits Earned
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right ml-3">
                            <span className="bg-[var(--sky)] text-[var(--planetary)] px-2 py-1 rounded-lg text-xs font-medium mb-2 inline-block">
                              {achievement.category}
                            </span>
                            
                            <div className="mt-2">
                              {achievement.isApproved ? (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    <CheckCircle size={10} />
                                    Approved
                                  </span>
                                  <p className="text-xs text-[var(--planetary)]">
                                    {achievement.certificatesCount} Certificate{achievement.certificatesCount !== 1 ? 's' : ''}
                                  </p>
                                </div>
                              ) : achievement.isPending ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                  <Clock size={10} />
                                  Pending
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleRequestApproval(achievement)}
                                  className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                                >
                                  Request Approval
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredCoCurrenticular.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="text-gray-400" size={20} />
                  </div>
                  <h3 className="font-semibold text-[var(--galaxy)] mb-1">No achievements found</h3>
                  <p className="text-[var(--planetary)] text-xs">
                    {searchTerm ? 'No achievements match your search' : 'Start participating in workshops!'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Extra-curricular Achievements Section */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--galaxy)]">Extra-curricular Achievements</h2>
                <span className="text-sm text-[var(--planetary)]">{filteredExtraCurricular.length}</span>
              </div>
              <p className="text-[var(--planetary)] text-sm mt-1">Competitions, cultural events & volunteering</p>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {filteredExtraCurricular.map((achievement) => (
                  <div key={achievement.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-sm shadow-sm border border-gray-100">
                        {achievement.clubIcon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{achievement.activityName}</h3>
                            <p className="text-xs text-[var(--planetary)]">{achievement.organizingClub}</p>
                            
                            <div className="mt-2">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                <Plus size={10} />
                                {achievement.creditsEarned} Credits Earned
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right ml-3">
                            <span className="bg-[var(--sky)] text-[var(--planetary)] px-2 py-1 rounded-lg text-xs font-medium mb-2 inline-block">
                              {achievement.category}
                            </span>
                            
                            <div className="mt-2">
                              {achievement.isApproved ? (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    <CheckCircle size={10} />
                                    Approved
                                  </span>
                                  <p className="text-xs text-[var(--planetary)]">
                                    {achievement.certificatesCount} Certificate{achievement.certificatesCount !== 1 ? 's' : ''}
                                  </p>
                                </div>
                              ) : achievement.isPending ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                  <Clock size={10} />
                                  Pending
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleRequestApproval(achievement)}
                                  className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                                >
                                  Request Approval
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredExtraCurricular.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="text-gray-400" size={20} />
                  </div>
                  <h3 className="font-semibold text-[var(--galaxy)] mb-1">No achievements found</h3>
                  <p className="text-[var(--planetary)] text-xs">
                    {searchTerm ? 'No achievements match your search' : 'Start participating in competitions!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        achievement={selectedAchievement}
        onSubmitSuccess={handleSubmitSuccess}
      />

      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </StudentLayout>
  );
}