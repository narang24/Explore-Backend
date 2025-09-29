'use client';
import { useState } from 'react';
import { 
  Search,
  Filter,
  SortDesc,
  ChevronDown,
  Eye,
  Check,
  X,
  Clock,
  Calendar,
  User,
  Award,
  FileText,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  GraduationCap,
  Building,
  Tag,
  MessageSquare,
  ChevronRight,
  Paperclip,
  Image as ImageIcon,
  File
} from 'lucide-react';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';
import ApprovalModal from './ApprovalModal';

// Mock data for student submissions
const mockSubmissions = [
  {
    id: 1,
    studentName: 'Rahul Sharma',
    rollNumber: 'CSE21001',
    branch: 'Computer Science',
    year: '3rd Year',
    activityTitle: 'Tech Hackathon 2025 - Winner',
    category: 'Competition',
    eventDate: '2025-01-15',
    submissionDate: '2025-01-18',
    description: 'Won first prize in 48-hour coding marathon with innovative AI-powered healthcare solution.',
    documents: [
      { name: 'certificate.pdf', type: 'pdf', size: '2.1 MB' },
      { name: 'project_demo.mp4', type: 'video', size: '15.3 MB' },
      { name: 'team_photo.jpg', type: 'image', size: '1.8 MB' }
    ],
    status: 'pending',
    points: 25,
    clubName: 'GDSC',
    remarks: ''
  },
  {
    id: 2,
    studentName: 'Priya Patel',
    rollNumber: 'ECE21045',
    branch: 'Electronics',
    year: '2nd Year',
    activityTitle: 'Cultural Evening - Dance Performance',
    category: 'Cultural',
    eventDate: '2025-01-20',
    submissionDate: '2025-01-22',
    description: 'Performed classical dance in the cultural evening organized by Cultural Club.',
    documents: [
      { name: 'participation_cert.pdf', type: 'pdf', size: '1.5 MB' },
      { name: 'performance_video.mp4', type: 'video', size: '22.1 MB' }
    ],
    status: 'approved',
    points: 15,
    clubName: 'Cultural Club',
    remarks: 'Excellent performance, well documented.'
  },
  {
    id: 3,
    studentName: 'Amit Kumar',
    rollNumber: 'ME21089',
    branch: 'Mechanical',
    year: '4th Year',
    activityTitle: 'Workshop on IoT Applications',
    category: 'Workshop',
    eventDate: '2024-12-22',
    submissionDate: '2024-12-25',
    description: 'Attended comprehensive workshop on IoT fundamentals and practical applications.',
    documents: [
      { name: 'workshop_certificate.pdf', type: 'pdf', size: '1.2 MB' },
      { name: 'project_report.docx', type: 'document', size: '3.4 MB' }
    ],
    status: 'rejected',
    points: 10,
    clubName: 'Tech Society',
    remarks: 'Certificate appears to be modified. Please submit original document.'
  },
  {
    id: 4,
    studentName: 'Sneha Singh',
    rollNumber: 'CSE21156',
    branch: 'Computer Science',
    year: '3rd Year',
    activityTitle: 'Photography Exhibition - Best Photo Award',
    category: 'Cultural',
    eventDate: '2024-12-25',
    submissionDate: '2024-12-28',
    description: 'Won best photography award in the annual photography exhibition.',
    documents: [
      { name: 'award_certificate.pdf', type: 'pdf', size: '2.8 MB' },
      { name: 'winning_photos.zip', type: 'archive', size: '8.9 MB' }
    ],
    status: 'pending',
    points: 20,
    clubName: 'PhotoSoc',
    remarks: ''
  },
  {
    id: 5,
    studentName: 'Vikash Gupta',
    rollNumber: 'EE21078',
    branch: 'Electrical',
    year: '2nd Year',
    activityTitle: 'AI Workshop Series - Module 1',
    category: 'Workshop',
    eventDate: '2024-12-22',
    submissionDate: '2024-12-24',
    description: 'Successfully completed Module 1 of AI Workshop Series covering ML fundamentals.',
    documents: [
      { name: 'completion_cert.pdf', type: 'pdf', size: '1.7 MB' },
      { name: 'assignment.py', type: 'code', size: '0.8 MB' }
    ],
    status: 'pending',
    points: 12,
    clubName: 'Tech Society',
    remarks: ''
  }
];

export default function ApprovalPanel() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('submissionDate');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  // Get filtered and sorted submissions
  const getFilteredSubmissions = () => {
    let filtered = submissions.filter(submission => {
      const matchesSearch = 
        submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.activityTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.clubName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBranch = filterBranch === 'all' || submission.branch === filterBranch;
      const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || submission.category === filterCategory;

      return matchesSearch && matchesBranch && matchesStatus && matchesCategory;
    });

    // Sort submissions
    filtered.sort((a, b) => {
      if (sortBy === 'submissionDate') {
        return new Date(b.submissionDate) - new Date(a.submissionDate);
      } else if (sortBy === 'studentName') {
        return a.studentName.localeCompare(b.studentName);
      } else if (sortBy === 'eventDate') {
        return new Date(b.eventDate) - new Date(a.eventDate);
      } else if (sortBy === 'points') {
        return b.points - a.points;
      }
      return 0;
    });

    return filtered;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 size={16} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-600" />;
      case 'pending':
        return <Clock size={16} className="text-orange-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText size={14} className="text-red-500" />;
      case 'image':
        return <ImageIcon size={14} className="text-blue-500" />;
      case 'video':
        return <File size={14} className="text-purple-500" />;
      case 'document':
        return <FileText size={14} className="text-blue-600" />;
      default:
        return <File size={14} className="text-gray-500" />;
    }
  };

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setShowApprovalModal(true);
  };

  const handleApprovalAction = (id, status, remarks = '') => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status, remarks } : sub
      )
    );
    setShowApprovalModal(false);
    setSelectedSubmission(null);
  };

  const handleBulkAction = () => {
    if (bulkAction && selectedItems.length > 0) {
      setSubmissions(prev => 
        prev.map(sub => 
          selectedItems.includes(sub.id) 
            ? { ...sub, status: bulkAction, remarks: `Bulk ${bulkAction} action` }
            : sub
        )
      );
      setSelectedItems([]);
      setBulkAction('');
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const filteredSubmissions = getFilteredSubmissions();
    if (selectedItems.length === filteredSubmissions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredSubmissions.map(sub => sub.id));
    }
  };

  const branches = ['Computer Science', 'Electronics', 'Mechanical', 'Electrical', 'Civil'];
  const categories = ['Competition', 'Workshop', 'Cultural', 'Technical', 'Sports'];
  const statuses = ['pending', 'approved', 'rejected'];

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Header with Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[var(--galaxy)]">Faculty Approval Panel</h1>
              <p className="text-[var(--planetary)] text-sm mt-1">Review and approve student activity submissions</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { 
                label: 'Pending Review', 
                count: submissions.filter(s => s.status === 'pending').length, 
                color: 'orange',
                icon: Clock
              },
              { 
                label: 'Approved Today', 
                count: submissions.filter(s => s.status === 'approved').length, 
                color: 'green',
                icon: CheckCircle2
              },
              { 
                label: 'Total Submissions', 
                count: submissions.length, 
                color: 'blue',
                icon: FileText
              },
              { 
                label: 'Students Involved', 
                count: new Set(submissions.map(s => s.studentName)).size, 
                color: 'purple',
                icon: Users
              }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--planetary)] font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-[var(--galaxy)] mt-1">{stat.count}</p>
                  </div>
                  <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon size={18} className={`text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4">
          {/* Search Bar + Filters - Single Line */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name, roll number, activity, or club..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-[var(--planetary)] outline-none text-sm text-gray-900 placeholder-gray-500 shadow-sm"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3">
              {/* Branch Filter */}
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-[var(--planetary)] outline-none text-sm text-gray-900 font-medium shadow-sm cursor-pointer"
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-[var(--planetary)] outline-none text-sm text-gray-900 font-medium shadow-sm cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-[var(--planetary)] outline-none text-sm text-gray-900 font-medium shadow-sm cursor-pointer"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-[var(--planetary)] outline-none text-sm text-gray-900 font-medium shadow-sm cursor-pointer"
              >
                <option value="submissionDate">Sort by Submission Date</option>
                <option value="studentName">Sort by Student Name</option>
                <option value="eventDate">Sort by Event Date</option>
                <option value="points">Sort by Points</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-200 shadow-sm">
              <span className="text-sm text-blue-700 font-medium">
                {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="px-3 py-2 bg-white border-2 border-blue-300 rounded-lg text-sm text-gray-900 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none cursor-pointer"
                >
                  <option value="">Select Action</option>
                  <option value="approved">Bulk Approve</option>
                  <option value="rejected">Bulk Reject</option>
                </select>
                <button
                  onClick={handleBulkAction}
                  disabled={!bulkAction}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--galaxy)]">
                Student Submissions ({getFilteredSubmissions().length})
              </h2>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedItems.length === getFilteredSubmissions().length && getFilteredSubmissions().length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-[var(--planetary)] focus:ring-[var(--planetary)]"
                />
                <span className="text-sm text-[var(--planetary)]">Select All</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {getFilteredSubmissions().map((submission) => (
              <div
                key={submission.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  selectedItems.includes(submission.id) ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(submission.id)}
                    onChange={() => toggleSelectItem(submission.id)}
                    className="mt-1 rounded border-gray-300 text-[var(--planetary)] focus:ring-[var(--planetary)]"
                  />

                  {/* Student Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                    {submission.studentName.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[var(--galaxy)] text-sm">
                            {submission.studentName}
                          </h3>
                          <span className="text-xs text-[var(--planetary)] bg-gray-100 px-2 py-1 rounded-full">
                            {submission.rollNumber}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                            {getStatusIcon(submission.status)}
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </div>

                        <p className="text-sm font-medium text-[var(--galaxy)] mb-2">
                          {submission.activityTitle}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-[var(--planetary)] mb-3">
                          <span className="flex items-center gap-1">
                            <GraduationCap size={10} />
                            {submission.branch} - {submission.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag size={10} />
                            {submission.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building size={10} />
                            {submission.clubName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award size={10} />
                            {submission.points} pts
                          </span>
                        </div>

                        <p className="text-sm text-[var(--planetary)] mb-3">
                          {submission.description}
                        </p>

                        {/* Documents */}
                        <div className="flex items-center gap-2 mb-2">
                          <Paperclip size={12} className="text-gray-400" />
                          <span className="text-xs text-[var(--planetary)] font-medium">
                            {submission.documents.length} document{submission.documents.length > 1 ? 's' : ''}:
                          </span>
                          <div className="flex gap-2">
                            {submission.documents.map((doc, index) => (
                              <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
                                {getFileTypeIcon(doc.type)}
                                <span className="text-xs text-[var(--galaxy)]">{doc.name}</span>
                                <span className="text-xs text-gray-500">({doc.size})</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-4 text-xs text-[var(--planetary)]">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            Event: {new Date(submission.eventDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            Submitted: {new Date(submission.submissionDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Remarks */}
                        {submission.remarks && (
                          <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                            <div className="flex items-center gap-1 mb-1">
                              <MessageSquare size={12} className="text-gray-500" />
                              <span className="text-xs text-gray-500 font-medium">Remarks:</span>
                            </div>
                            <p className="text-xs text-[var(--galaxy)]">{submission.remarks}</p>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleViewSubmission(submission)}
                        className="flex items-center gap-2 px-3 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-sm font-medium transition-colors ml-4"
                      >
                        <Eye size={14} />
                        Review
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {getFilteredSubmissions().length === 0 && (
              <div className="text-center py-12">
                <FileText className="text-gray-400 mx-auto mb-4" size={32} />
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-2">No submissions found</h3>
                <p className="text-[var(--planetary)] text-sm">
                  {searchTerm || filterBranch !== 'all' || filterStatus !== 'all' || filterCategory !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'No student submissions available for review'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Approval Modal */}
        <ApprovalModal
          submission={selectedSubmission}
          isOpen={showApprovalModal}
          onClose={() => {
            setShowApprovalModal(false);
            setSelectedSubmission(null);
          }}
          onApprove={(id, remarks) => handleApprovalAction(id, 'approved', remarks)}
          onReject={(id, remarks) => handleApprovalAction(id, 'rejected', remarks)}
        />
      </div>
    </ClubAdminLayout>
  );
}