'use client';
import { useState } from 'react';
import { 
  Users, 
  Crown, 
  User, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  UserPlus,
  UserMinus,
  UserCheck,
  Mail,
  Hash,
  GraduationCap,
  Calendar,
  BookOpen,
  Shield,
  X,
  Save,
  ChevronDown,
  SortDesc,
  Edit3,
  Trash2,
  Settings
} from 'lucide-react';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';

// Mock data for club members
const mockMembers = {
  clubHeads: [
    {
      id: 1,
      name: 'Sarah Johnson',
      rollNumber: '21CS010',
      email: 'sarah.johnson.21cs010@college.edu',
      profilePicture: null,
      position: 'Club Lead',
      role: 'lead',
      branch: 'Computer Science & Engineering',
      batch: '2021-2025',
      joinedDate: '2023-01-15',
      isAdmin: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      rollNumber: '21CS025',
      email: 'michael.chen.21cs025@college.edu',
      profilePicture: null,
      position: 'Technical Head',
      role: 'technical_head',
      branch: 'Computer Science & Engineering',
      batch: '2021-2025',
      joinedDate: '2023-02-01',
      isAdmin: true
    },
    {
      id: 3,
      name: 'Priya Sharma',
      rollNumber: '22ME008',
      email: 'priya.sharma.22me008@college.edu',
      profilePicture: null,
      position: 'Event Coordinator',
      role: 'event_coordinator',
      branch: 'Mechanical Engineering',
      batch: '2022-2026',
      joinedDate: '2023-03-10',
      isAdmin: false
    }
  ],
  activeMembers: [
    {
      id: 4,
      name: 'David Wilson',
      rollNumber: '22CS045',
      email: 'david.wilson.22cs045@college.edu',
      profilePicture: null,
      position: 'Member',
      role: 'member',
      branch: 'Computer Science & Engineering',
      batch: '2022-2026',
      joinedDate: '2023-08-20',
      isAdmin: false
    },
    {
      id: 5,
      name: 'Anna Rodriguez',
      rollNumber: '23EE012',
      email: 'anna.rodriguez.23ee012@college.edu',
      profilePicture: null,
      position: 'Member',
      role: 'member',
      branch: 'Electrical Engineering',
      batch: '2023-2027',
      joinedDate: '2023-09-15',
      isAdmin: false
    },
    {
      id: 6,
      name: 'Rajesh Kumar',
      rollNumber: '22IT020',
      email: 'rajesh.kumar.22it020@college.edu',
      profilePicture: null,
      position: 'Member',
      role: 'member',
      branch: 'Information Technology',
      batch: '2022-2026',
      joinedDate: '2023-10-01',
      isAdmin: false
    },
    {
      id: 7,
      name: 'Emily Davis',
      rollNumber: '23CS033',
      email: 'emily.davis.23cs033@college.edu',
      profilePicture: null,
      position: 'Member',
      role: 'member',
      branch: 'Computer Science & Engineering',
      batch: '2023-2027',
      joinedDate: '2023-11-10',
      isAdmin: false
    }
  ]
};

// Mock student database for adding new members
const mockStudentDatabase = [
  {
    id: 101,
    name: 'Alex Thompson',
    rollNumber: '22CS067',
    email: 'alex.thompson.22cs067@college.edu',
    branch: 'Computer Science & Engineering',
    batch: '2022-2026',
    profilePicture: null
  },
  {
    id: 102,
    name: 'Lisa Park',
    rollNumber: '23ME015',
    email: 'lisa.park.23me015@college.edu',
    branch: 'Mechanical Engineering',
    batch: '2023-2027',
    profilePicture: null
  },
  {
    id: 103,
    name: 'James Brown',
    rollNumber: '21EE030',
    email: 'james.brown.21ee030@college.edu',
    branch: 'Electrical Engineering',
    batch: '2021-2025',
    profilePicture: null
  }
];

const branches = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electronics & Communication'
];

const batches = ['2021-2025', '2022-2026', '2023-2027', '2024-2028'];

const roles = [
  { value: 'lead', label: 'Club Lead', isHead: true },
  { value: 'technical_head', label: 'Technical Head', isHead: true },
  { value: 'event_coordinator', label: 'Event Coordinator', isHead: true },
  { value: 'marketing_head', label: 'Marketing Head', isHead: true },
  { value: 'member', label: 'Member', isHead: false }
];

export default function MembersPage() {
  const [members, setMembers] = useState(mockMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showMemberDetailsModal, setShowMemberDetailsModal] = useState(false);
  const [showMemberActions, setShowMemberActions] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Add member form states
  const [newMember, setNewMember] = useState({
    studentId: '',
    role: 'member',
    position: ''
  });
  const [studentSearch, setStudentSearch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter and search logic
  const getAllMembers = () => {
    const allMembers = [...members.clubHeads, ...members.activeMembers];
    
    let filteredMembers = allMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.branch.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBranch = filterBranch === 'all' || member.branch === filterBranch;
      const matchesBatch = filterBatch === 'all' || member.batch === filterBatch;
      
      return matchesSearch && matchesBranch && matchesBatch;
    });

    // Sort members
    filteredMembers.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rollNumber') return a.rollNumber.localeCompare(b.rollNumber);
      if (sortBy === 'joinedDate') return new Date(b.joinedDate) - new Date(a.joinedDate);
      if (sortBy === 'branch') return a.branch.localeCompare(b.branch);
      return 0;
    });

    return filteredMembers;
  };

  // Handle student search for adding new members
  const handleStudentSearch = (searchValue) => {
    setStudentSearch(searchValue);
    if (searchValue.trim()) {
      const filtered = mockStudentDatabase.filter(student => 
        !getAllMembers().some(member => member.rollNumber === student.rollNumber) &&
        (student.name.toLowerCase().includes(searchValue.toLowerCase()) ||
         student.rollNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
         student.branch.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  };

  // Add new member
  const handleAddMember = () => {
    if (!selectedStudent || !newMember.role) return;

    const roleData = roles.find(r => r.value === newMember.role);
    const newMemberData = {
      id: Date.now(),
      ...selectedStudent,
      position: newMember.position || roleData.label,
      role: newMember.role,
      joinedDate: new Date().toISOString().split('T')[0],
      isAdmin: false
    };

    const targetSection = roleData.isHead ? 'clubHeads' : 'activeMembers';
    setMembers(prev => ({
      ...prev,
      [targetSection]: [...prev[targetSection], newMemberData]
    }));

    // Reset form
    setNewMember({ studentId: '', role: 'member', position: '' });
    setSelectedStudent(null);
    setStudentSearch('');
    setFilteredStudents([]);
    setShowAddMemberModal(false);
  };

  // Remove member
  const handleRemoveMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(prev => ({
        clubHeads: prev.clubHeads.filter(member => member.id !== memberId),
        activeMembers: prev.activeMembers.filter(member => member.id !== memberId)
      }));
      setShowMemberActions(null);
    }
  };

  // Make member admin
  const handleMakeAdmin = (memberId) => {
    setMembers(prev => ({
      clubHeads: prev.clubHeads.map(member => 
        member.id === memberId ? { ...member, isAdmin: true } : member
      ),
      activeMembers: prev.activeMembers.map(member => 
        member.id === memberId ? { ...member, isAdmin: true } : member
      )
    }));
    setShowMemberActions(null);
  };

  // Member Card Component
  const MemberCard = ({ member, isHead = false }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors relative">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-full flex items-center justify-center">
            {member.profilePicture ? (
              <img 
                src={member.profilePicture} 
                alt={member.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="text-white" size={20} />
            )}
          </div>
          {isHead && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
              <Crown size={10} className="text-white" />
            </div>
          )}
          {member.isAdmin && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--planetary)] rounded-full flex items-center justify-center">
              <Shield size={8} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-[var(--galaxy)] text-sm truncate">{member.name}</h4>
          <p className="text-[var(--planetary)] text-xs">{member.position}</p>
          <p className="text-gray-500 text-xs">{member.rollNumber}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedMember(member);
              setShowMemberDetailsModal(true);
            }}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <User size={14} className="text-gray-600" />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowMemberActions(showMemberActions === member.id ? null : member.id)}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <MoreVertical size={14} className="text-gray-600" />
            </button>
            
            {showMemberActions === member.id && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[160px]">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setShowMemberDetailsModal(true);
                      setShowMemberActions(null);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={14} />
                    View Details
                  </button>
                  {!member.isAdmin && (
                    <button
                      onClick={() => handleMakeAdmin(member.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--planetary)] hover:bg-gray-100"
                    >
                      <UserCheck size={14} />
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <UserMinus size={14} />
                    Remove Member
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Header with Search and Add Button */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--galaxy)]">Club Members</h2>
              <p className="text-[var(--planetary)] text-sm mt-1">
                Manage your club members and assign roles
              </p>
            </div>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors"
            >
              <UserPlus size={16} />
              Add Member
            </button>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, roll number, or branch..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="rollNumber">Sort by Roll Number</option>
                <option value="joinedDate">Sort by Join Date</option>
                <option value="branch">Sort by Branch</option>
              </select>
              <SortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[var(--galaxy)] hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                Filters
                <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {showFilters && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-[200px]">
                  <div className="p-3">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Branch</label>
                        <select
                          value={filterBranch}
                          onChange={(e) => setFilterBranch(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        >
                          <option value="all">All Branches</option>
                          {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Batch</label>
                        <select
                          value={filterBatch}
                          onChange={(e) => setFilterBatch(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        >
                          <option value="all">All Batches</option>
                          {batches.map(batch => (
                            <option key={batch} value={batch}>{batch}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--sky)] rounded-lg flex items-center justify-center">
                <Users className="text-[var(--planetary)]" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--galaxy)]">
                  {members.clubHeads.length + members.activeMembers.length}
                </p>
                <p className="text-[var(--planetary)] text-sm">Total Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Crown className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--galaxy)]">{members.clubHeads.length}</p>
                <p className="text-[var(--planetary)] text-sm">Club Heads</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--galaxy)]">{members.activeMembers.length}</p>
                <p className="text-[var(--planetary)] text-sm">Active Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--planetary)]/10 rounded-lg flex items-center justify-center">
                <Shield className="text-[var(--planetary)]" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--galaxy)]">
                  {getAllMembers().filter(m => m.isAdmin).length}
                </p>
                <p className="text-[var(--planetary)] text-sm">Admins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Club Heads Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Crown className="text-yellow-500" size={20} />
              <h3 className="text-lg font-semibold text-[var(--galaxy)]">Club Heads</h3>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                {members.clubHeads.filter(member => {
                  const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       member.branch.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesBranch = filterBranch === 'all' || member.branch === filterBranch;
                  const matchesBatch = filterBatch === 'all' || member.batch === filterBatch;
                  return matchesSearch && matchesBranch && matchesBatch;
                }).length}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.clubHeads
                .filter(member => {
                  const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       member.branch.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesBranch = filterBranch === 'all' || member.branch === filterBranch;
                  const matchesBatch = filterBatch === 'all' || member.batch === filterBatch;
                  return matchesSearch && matchesBranch && matchesBatch;
                })
                .map(member => (
                  <MemberCard key={member.id} member={member} isHead={true} />
                ))}
              
              {members.clubHeads.filter(member => {
                const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     member.branch.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesBranch = filterBranch === 'all' || member.branch === filterBranch;
                const matchesBatch = filterBatch === 'all' || member.batch === filterBatch;
                return matchesSearch && matchesBranch && matchesBatch;
              }).length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Crown className="text-gray-400 mx-auto mb-2" size={32} />
                  <p className="text-[var(--planetary)]">No club heads found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Members Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Users className="text-[var(--planetary)]" size={20} />
              <h3 className="text-lg font-semibold text-[var(--galaxy)]">Active Members</h3>
              <span className="px-2 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-xs font-medium">
                {members.activeMembers.filter(member => {
                  const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       member.branch.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesBranch = filterBranch === 'all' || member.branch === filterBranch;
                  const matchesBatch = filterBatch === 'all' || member.batch === filterBatch;
                  return matchesSearch && matchesBranch && matchesBatch;
                }).length}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.activeMembers
                .filter(member => {
                  const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       member.branch.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesBranch = filterBranch === 'all' || member.branch === filterBranch;
                  const matchesBatch = filterBatch === 'all' || member.batch === filterBatch;
                  return matchesSearch && matchesBranch && matchesBatch;
                })
                .map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              
              {members.activeMembers.filter(member => {
                const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     member.branch.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesBranch = filterBranch === 'all' || member.branch === filterBranch;
                const matchesBatch = filterBatch === 'all' || member.batch === filterBatch;
                return matchesSearch && matchesBranch && matchesBatch;
              }).length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Users className="text-gray-400 mx-auto mb-2" size={32} />
                  <p className="text-[var(--planetary)]">No members found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Member Modal */}
        {showAddMemberModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[var(--galaxy)]">Add New Member</h3>
                  <button
                    onClick={() => {
                      setShowAddMemberModal(false);
                      setNewMember({ studentId: '', role: 'member', position: '' });
                      setSelectedStudent(null);
                      setStudentSearch('');
                      setFilteredStudents([]);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Student Search */}
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Search Student
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) => handleStudentSearch(e.target.value)}
                      placeholder="Search by name, roll number, or branch..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                    />
                  </div>
                  
                  {/* Student Search Results */}
                  {filteredStudents.length > 0 && (
                    <div className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
                      {filteredStudents.map(student => (
                        <button
                          key={student.id}
                          onClick={() => {
                            setSelectedStudent(student);
                            setStudentSearch(student.name);
                            setFilteredStudents([]);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-full flex items-center justify-center">
                            <User className="text-white" size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--galaxy)] truncate">{student.name}</p>
                            <p className="text-xs text-[var(--planetary)]">{student.rollNumber} • {student.branch}</p>
                            <p className="text-xs text-gray-500">{student.batch}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Selected Student Display */}
                  {selectedStudent && (
                    <div className="mt-3 p-3 bg-[var(--sky)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-full flex items-center justify-center">
                          <User className="text-white" size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[var(--galaxy)] text-sm">{selectedStudent.name}</p>
                          <p className="text-xs text-[var(--planetary)]">{selectedStudent.rollNumber}</p>
                          <p className="text-xs text-[var(--planetary)]">{selectedStudent.branch} • {selectedStudent.batch}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedStudent(null);
                            setStudentSearch('');
                          }}
                          className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                        >
                          <X size={14} className="text-[var(--planetary)]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Role
                  </label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label} {role.isHead ? '(Club Head)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Position (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Custom Position (Optional)
                  </label>
                  <input
                    type="text"
                    value={newMember.position}
                    onChange={(e) => setNewMember(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="Leave empty to use default role name"
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent text-sm"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={handleAddMember}
                    disabled={!selectedStudent || !newMember.role}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                  >
                    <UserPlus size={16} />
                    Add Member
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMemberModal(false);
                      setNewMember({ studentId: '', role: 'member', position: '' });
                      setSelectedStudent(null);
                      setStudentSearch('');
                      setFilteredStudents([]);
                    }}
                    className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-[var(--galaxy)] rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Member Details Modal */}
        {showMemberDetailsModal && selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[var(--galaxy)]">Member Details</h3>
                  <button
                    onClick={() => {
                      setShowMemberDetailsModal(false);
                      setSelectedMember(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Profile Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-full flex items-center justify-center">
                      {selectedMember.profilePicture ? (
                        <img 
                          src={selectedMember.profilePicture} 
                          alt={selectedMember.name} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="text-white" size={32} />
                      )}
                    </div>
                    {roles.find(r => r.value === selectedMember.role)?.isHead && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Crown size={14} className="text-white" />
                      </div>
                    )}
                    {selectedMember.isAdmin && (
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[var(--planetary)] rounded-full flex items-center justify-center">
                        <Shield size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-[var(--galaxy)] mb-1">{selectedMember.name}</h4>
                  <p className="text-[var(--planetary)] font-medium">{selectedMember.position}</p>
                  {selectedMember.isAdmin && (
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-[var(--planetary)]/10 text-[var(--planetary)] rounded-full text-xs font-medium">
                      <Shield size={10} />
                      Admin Access
                    </span>
                  )}
                </div>

                {/* Details Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Hash className="text-[var(--planetary)]" size={16} />
                    <div>
                      <p className="text-xs font-medium text-[var(--planetary)]">Roll Number</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedMember.rollNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="text-[var(--planetary)]" size={16} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--planetary)]">Email</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)] truncate">{selectedMember.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <BookOpen className="text-[var(--planetary)]" size={16} />
                    <div>
                      <p className="text-xs font-medium text-[var(--planetary)]">Branch</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedMember.branch}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="text-[var(--planetary)]" size={16} />
                    <div>
                      <p className="text-xs font-medium text-[var(--planetary)]">Batch</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{selectedMember.batch}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="text-[var(--planetary)]" size={16} />
                    <div>
                      <p className="text-xs font-medium text-[var(--planetary)]">Joined</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">
                        {new Date(selectedMember.joinedDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
                  {!selectedMember.isAdmin && (
                    <button
                      onClick={() => {
                        handleMakeAdmin(selectedMember.id);
                        setShowMemberDetailsModal(false);
                        setSelectedMember(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg font-medium transition-colors"
                    >
                      <UserCheck size={16} />
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleRemoveMember(selectedMember.id);
                      setShowMemberDetailsModal(false);
                      setSelectedMember(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <UserMinus size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClubAdminLayout>
  );
}