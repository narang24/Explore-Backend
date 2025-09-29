'use client';
import { useState } from 'react';
import StudentLayout from '../../components-student/StudentLayout';
import { 
  Calendar, 
  Award, 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp,
  Download,
  Share2,
  Filter,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Zap,
  Target,
  CheckCircle,
  BarChart3,
  FileText,
  Eye,
  ExternalLink,
  GraduationCap,
  Sparkles
} from 'lucide-react';

// Mock data for student's complete academic journey
const studentProfile = {
  name: 'John Doe',
  rollNumber: '22CS001',
  batch: '2024-2028',
  branch: 'Computer Science & Engineering',
  currentYear: 3,
  admissionDate: '2024-08-15',
  cgpa: 8.7,
  totalCredits: 156,
  completedSemesters: 4
};

const eventsParticipated = [
  {
    id: 1,
    title: 'Tech Fest 2024',
    type: 'Competition',
    date: '2024-03-15',
    semester: 'Semester 2',
    role: 'Participant',
    club: 'GDSC',
    category: 'Technical',
    description: 'Participated in coding competition and hackathon',
    achievement: 'Winner - 1st Position',
    points: 100,
    certificate: true,
    validated: true
  },
  {
    id: 2,
    title: 'Bhangra Workshop',
    type: 'Workshop',
    date: '2024-10-20',
    semester: 'Semester 3',
    role: 'Participant',
    club: 'Cultural Club',
    category: 'Cultural',
    description: 'Learned traditional Punjabi dance forms',
    achievement: 'Completed',
    points: 25,
    certificate: true,
    validated: true
  },
  {
    id: 3,
    title: 'AI/ML Symposium',
    type: 'Symposium',
    date: '2024-11-08',
    semester: 'Semester 3',
    role: 'Organizer',
    club: 'Tech Club',
    category: 'Technical',
    description: 'Organized and coordinated symposium on AI/ML trends',
    achievement: 'Leadership Excellence',
    points: 75,
    certificate: true,
    validated: true
  },
  {
    id: 4,
    title: 'Inter-College Sports',
    type: 'Sports',
    date: '2024-09-02',
    semester: 'Semester 3',
    role: 'Participant',
    club: 'Sports Club',
    category: 'Sports',
    description: 'Represented college in basketball tournament',
    achievement: 'Runner-up',
    points: 60,
    certificate: true,
    validated: true
  },
  {
    id: 5,
    title: 'Research Paper Presentation',
    type: 'Research',
    date: '2024-12-01',
    semester: 'Semester 4',
    role: 'Presenter',
    club: 'Research Society',
    category: 'Academic',
    description: 'Presented research on Machine Learning applications',
    achievement: 'Best Paper Award',
    points: 120,
    certificate: true,
    validated: true
  }
];

const achievements = {
  certificates: [
    {
      id: 1,
      title: 'Google Cloud Certified - Associate Cloud Engineer',
      issuer: 'Google Cloud',
      date: '2024-07-15',
      type: 'Professional Certification',
      credentialId: 'GC-ACE-2024-JD001',
      validUntil: '2026-07-15',
      verified: true,
      points: 150
    },
    {
      id: 2,
      title: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2024-09-20',
      type: 'Professional Certification',
      credentialId: 'AWS-CDA-2024-JD002',
      validUntil: '2026-09-20',
      verified: true,
      points: 150
    },
    {
      id: 3,
      title: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2024-05-10',
      type: 'Foundational Certification',
      credentialId: 'MS-AZ900-2024-JD003',
      validUntil: 'Lifetime',
      verified: true,
      points: 100
    }
  ],
  awards: [
    {
      id: 1,
      title: 'Student of the Year 2024',
      category: 'Academic Excellence',
      issuer: 'College Administration',
      date: '2024-05-15',
      description: 'Awarded for outstanding academic performance and leadership',
      points: 200,
      verified: true
    },
    {
      id: 2,
      title: 'Innovation Challenge Winner',
      category: 'Innovation',
      issuer: 'Tech Club',
      date: '2024-08-20',
      description: 'Won first prize in college innovation challenge',
      points: 150,
      verified: true
    },
    {
      id: 3,
      title: 'Community Service Recognition',
      category: 'Social Impact',
      issuer: 'NSS Unit',
      date: '2024-10-05',
      description: 'Recognized for 120+ hours of community service',
      points: 100,
      verified: true
    }
  ],
  ranks: [
    {
      id: 1,
      title: 'Department Rank 3',
      category: 'Academic Ranking',
      semester: 'Semester 4',
      outOf: 120,
      cgpa: 8.7,
      date: '2024-12-15',
      points: 180
    },
    {
      id: 2,
      title: 'Batch Rank 5',
      category: 'Overall Performance',
      semester: 'Semester 3',
      outOf: 120,
      cgpa: 8.5,
      date: '2024-07-20',
      points: 160
    }
  ]
};

export default function ReportPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterSemester, setFilterSemester] = useState('All');

  const totalAchievementPoints = [
    ...eventsParticipated.map(e => e.points),
    ...achievements.certificates.map(c => c.points),
    ...achievements.awards.map(a => a.points),
    ...achievements.ranks.map(r => r.points)
  ].reduce((sum, points) => sum + points, 0);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Academic', 'Research'];
  const semesters = ['All', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

  const filteredEvents = eventsParticipated.filter(event => {
    const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
    const matchesSemester = filterSemester === 'All' || event.semester === filterSemester;
    return matchesCategory && matchesSemester;
  });

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--galaxy)]">Academic Report</h1>
            <p className="text-[var(--planetary)] text-sm mt-1">
              Complete journey from {studentProfile.admissionDate} • Batch {studentProfile.batch}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--planetary)] text-white rounded-xl text-sm font-medium hover:bg-[var(--sapphire)] transition-colors">
              <Download size={16} />
              Export Report
            </button>
            <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 bg-white">
              <Share2 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <GraduationCap className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{studentProfile.name}</h2>
                <p className="text-white/80">{studentProfile.rollNumber} • {studentProfile.branch}</p>
                <p className="text-white/70 text-sm mt-1">
                  {studentProfile.currentYear}{['st', 'nd', 'rd', 'th'][studentProfile.currentYear-1] || 'th'} Year • 
                  CGPA: {studentProfile.cgpa}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-2xl p-4">
                <div className="text-3xl font-bold">{totalAchievementPoints}</div>
                <div className="text-white/80 text-sm">Total Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Events Participated</p>
                <p className="text-2xl font-bold text-[var(--galaxy)] mt-1">{eventsParticipated.length}</p>
              </div>
              <div className="w-10 h-10 bg-[var(--sky)] rounded-xl flex items-center justify-center">
                <Calendar className="text-[var(--planetary)]" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Certificates Earned</p>
                <p className="text-2xl font-bold text-[var(--galaxy)] mt-1">{achievements.certificates.length}</p>
              </div>
              <div className="w-10 h-10 bg-[var(--sky)] rounded-xl flex items-center justify-center">
                <Award className="text-[var(--planetary)]" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Awards Received</p>
                <p className="text-2xl font-bold text-[var(--galaxy)] mt-1">{achievements.awards.length}</p>
              </div>
              <div className="w-10 h-10 bg-[var(--sky)] rounded-xl flex items-center justify-center">
                <Trophy className="text-[var(--planetary)]" size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Academic Credits</p>
                <p className="text-2xl font-bold text-[var(--galaxy)] mt-1">{studentProfile.totalCredits}</p>
              </div>
              <div className="w-10 h-10 bg-[var(--sky)] rounded-xl flex items-center justify-center">
                <BookOpen className="text-[var(--planetary)]" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'events', label: 'Events & Participation', icon: Calendar },
              { id: 'achievements', label: 'Achievements & Awards', icon: Award },
              { id: 'timeline', label: 'Journey Timeline', icon: Clock }
            ].map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-[var(--planetary)] text-white'
                      : 'text-[var(--galaxy)] hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Based on Active Section */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-[var(--galaxy)]">Academic Progress</h3>
                <p className="text-[var(--planetary)] text-sm mt-1">Semester-wise performance overview</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { sem: 'Semester 1', cgpa: 8.2, credits: 24 },
                    { sem: 'Semester 2', cgpa: 8.5, credits: 26 },
                    { sem: 'Semester 3', cgpa: 8.7, credits: 28 },
                    { sem: 'Semester 4', cgpa: 8.8, credits: 26 }
                  ].map((sem) => (
                    <div key={sem.sem} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-[var(--galaxy)] text-sm">{sem.sem}</h4>
                        <p className="text-xs text-[var(--planetary)] mt-1">{sem.credits} Credits</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[var(--galaxy)]">{sem.cgpa}</div>
                        <div className="text-xs text-green-600">CGPA</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-[var(--galaxy)]">Activity Breakdown</h3>
                <p className="text-[var(--planetary)] text-sm mt-1">Points earned by category</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { category: 'Technical', points: 445, color: 'from-blue-500 to-blue-600', events: 3 },
                    { category: 'Academic', points: 380, color: 'from-indigo-500 to-purple-600', events: 2 },
                    { category: 'Cultural', points: 125, color: 'from-pink-500 to-rose-600', events: 2 },
                    { category: 'Sports', points: 160, color: 'from-orange-500 to-red-600', events: 1 },
                  ].map((cat) => (
                    <div key={cat.category} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-12 h-12 bg-gradient-to-r ${cat.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                        {cat.points}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[var(--galaxy)] text-sm">{cat.category}</h4>
                        <p className="text-xs text-[var(--planetary)] mt-1">{cat.events} activities</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'events' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--galaxy)]">Category:</span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--galaxy)]">Semester:</span>
                <select
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                  {semesters.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Events List */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-[var(--galaxy)]">Events & Participation</h3>
                <p className="text-[var(--planetary)] text-sm mt-1">Complete record of your involvement</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="border border-gray-100 rounded-2xl p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-[var(--galaxy)] text-base">{event.title}</h4>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              event.category === 'Technical' ? 'bg-blue-100 text-blue-700' :
                              event.category === 'Cultural' ? 'bg-purple-100 text-purple-700' :
                              event.category === 'Sports' ? 'bg-orange-100 text-orange-700' :
                              event.category === 'Academic' ? 'bg-indigo-100 text-indigo-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {event.category}
                            </span>
                            {event.validated && (
                              <CheckCircle className="text-green-500" size={16} />
                            )}
                          </div>
                          <p className="text-[var(--planetary)] text-sm mb-3">{event.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={12} />
                              <span>{event.club}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen size={12} />
                              <span>{event.semester}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-[var(--sky)] px-3 py-1 rounded-lg mb-2">
                            <span className="font-bold text-[var(--planetary)]">{event.points}</span>
                            <span className="text-xs text-[var(--planetary)] ml-1">pts</span>
                          </div>
                          <div className="text-sm font-medium text-green-600">{event.achievement}</div>
                          {event.certificate && (
                            <button className="text-xs text-[var(--planetary)] hover:text-[var(--sapphire)] mt-2">
                              View Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Certificates */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Award className="text-[var(--planetary)]" size={20} />
                  <h3 className="text-lg font-semibold text-[var(--galaxy)]">Certificates</h3>
                </div>
                <p className="text-[var(--planetary)] text-sm mt-1">{achievements.certificates.length} professional certifications</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {achievements.certificates.map((cert) => (
                    <div key={cert.id} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{cert.title}</h4>
                          <p className="text-xs text-[var(--planetary)]">{cert.issuer}</p>
                        </div>
                        {cert.verified && (
                          <CheckCircle className="text-green-500" size={16} />
                        )}
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Issued: {new Date(cert.date).toLocaleDateString()}</div>
                        <div>Valid until: {cert.validUntil}</div>
                        <div>ID: {cert.credentialId}</div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                          {cert.points} pts
                        </span>
                        <button className="text-xs text-[var(--planetary)] hover:text-[var(--sapphire)]">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Trophy className="text-[var(--planetary)]" size={20} />
                  <h3 className="text-lg font-semibold text-[var(--galaxy)]">Awards & Honors</h3>
                </div>
                <p className="text-[var(--planetary)] text-sm mt-1">{achievements.awards.length} prestigious awards</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {achievements.awards.map((award) => (
                    <div key={award.id} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{award.title}</h4>
                          <p className="text-xs text-[var(--planetary)]">{award.category}</p>
                        </div>
                        {award.verified && (
                          <CheckCircle className="text-green-500" size={16} />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{award.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          {new Date(award.date).toLocaleDateString()}
                        </span>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-medium">
                          {award.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rankings */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Medal className="text-[var(--planetary)]" size={20} />
                  <h3 className="text-lg font-semibold text-[var(--galaxy)]">Academic Rankings</h3>
                </div>
                <p className="text-[var(--planetary)] text-sm mt-1">{achievements.ranks.length} semester rankings</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {achievements.ranks.map((rank) => (
                    <div key={rank.id} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[var(--galaxy)] text-sm">{rank.title}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[var(--planetary)]">#{rank.id === 1 ? 3 : 5}</div>
                          <div className="text-xs text-gray-600">of {rank.outOf}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-[var(--planetary)]">
                          CGPA: {rank.cgpa}
                        </div>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium">
                          {rank.points} pts
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        {rank.semester} • {new Date(rank.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'timeline' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-[var(--galaxy)]">Journey Timeline</h3>
              <p className="text-[var(--planetary)] text-sm mt-1">Your complete academic and extracurricular journey</p>
            </div>
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--sky)]"></div>
                <div className="space-y-6">
                  {/* Combine all activities and sort by date */}
                  {[
                    ...eventsParticipated.map(e => ({...e, type: 'event', icon: Calendar})),
                    ...achievements.certificates.map(c => ({...c, type: 'certificate', icon: Award})),
                    ...achievements.awards.map(a => ({...a, type: 'award', icon: Trophy})),
                    ...achievements.ranks.map(r => ({...r, type: 'rank', icon: Medal}))
                  ].sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={`${item.type}-${item.id}`} className="relative flex items-start gap-4">
                        <div className="relative z-10 w-16 h-16 bg-white border-4 border-[var(--sky)] rounded-full flex items-center justify-center">
                          <Icon className="text-[var(--planetary)]" size={20} />
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="bg-gray-50 rounded-2xl p-5">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-[var(--galaxy)] text-base mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-[var(--planetary)] mb-2">
                                  {item.type === 'event' ? item.description :
                                   item.type === 'certificate' ? `${item.issuer} • ${item.type}` :
                                   item.type === 'award' ? item.description :
                                   `${item.category} • Rank ${item.id === 1 ? 3 : 5} of ${item.outOf}`}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-600">
                                  <span>{new Date(item.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}</span>
                                  {item.semester && <span>• {item.semester}</span>}
                                  {item.club && <span>• {item.club}</span>}
                                  {item.issuer && item.type === 'certificate' && <span>• {item.issuer}</span>}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                  item.type === 'event' ? 'bg-blue-100 text-blue-700' :
                                  item.type === 'certificate' ? 'bg-green-100 text-green-700' :
                                  item.type === 'award' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-purple-100 text-purple-700'
                                }`}>
                                  {item.points} pts
                                </div>
                                {(item.verified || item.validated) && (
                                  <div className="flex items-center gap-1 mt-2 text-green-600">
                                    <CheckCircle size={12} />
                                    <span className="text-xs">Verified</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {item.achievement && item.type === 'event' && (
                              <div className="mt-3 flex items-center gap-2">
                                <Sparkles className="text-yellow-500" size={14} />
                                <span className="text-sm font-medium text-yellow-700">{item.achievement}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resume Builder Teaser */}
        <div className="bg-gradient-to-r from-[var(--sky)] to-[var(--venus)] rounded-3xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                <FileText className="text-[var(--planetary)]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--galaxy)]">Transform Your Report into Resume</h3>
                <p className="text-[var(--planetary)] text-sm mt-1">
                  Convert your achievements and experiences into a professional resume with one click
                </p>
              </div>
            </div>
            <button className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
              <Sparkles size={16} />
              Build Resume
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}