'use client';
import { useState } from 'react';
import StudentLayout from '../../components-student/StudentLayout';
import ResumeBuilder from './ResumeBuilder';
import { 
  Calendar, 
  Award, 
  Trophy, 
  Medal, 
  Download,
  Share2,
  BarChart3,
  FileText,
  Sparkles,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Users,
  Clock
} from 'lucide-react';

// Mock data for student's complete academic journey
const studentProfile = {
  name: 'John Doe',
  rollNumber: '22CS001',
  batch: '2024-2028',
  branch: 'Computer Science & Engineering',
  instituteName: 'Punjab Engineering College',
  currentYear: 3,
  admissionDate: '2024-08-15',
  email: 'john.doe@pec.edu.in',
  phone: '+91 9876543210',
  cgpa: 8.7,
  totalCredits: 156,
  completedSemesters: 4,
  validatedCertificates: [
    {
      activityName: 'Google Cloud Certified - Associate Cloud Engineer',
      achievement: 'Professional Certification',
      date: '2024-07-15',
      issuer: 'Google Cloud'
    },
    {
      activityName: 'AWS Certified Developer - Associate',
      achievement: 'Professional Certification',
      date: '2024-09-20',
      issuer: 'Amazon Web Services'
    },
    {
      activityName: 'Microsoft Azure Fundamentals',
      achievement: 'Foundational Certification',
      date: '2024-05-10',
      issuer: 'Microsoft'
    }
  ]
};

const eventsParticipated = [
  {
    id: 1,
    title: 'Tech Fest 2024',
    type: 'Competition',
    date: '2024-03-15',
    category: 'Technical',
    achievement: 'Winner - 1st Position',
    points: 100,
    validated: true
  },
  {
    id: 2,
    title: 'AI/ML Symposium',
    type: 'Symposium',
    date: '2024-11-08',
    category: 'Technical',
    achievement: 'Leadership Excellence',
    points: 75,
    validated: true
  },
  {
    id: 3,
    title: 'Research Paper Presentation',
    type: 'Research',
    date: '2024-12-01',
    category: 'Academic',
    achievement: 'Best Paper Award',
    points: 120,
    validated: true
  }
];

const achievements = {
  certificates: [
    {
      id: 1,
      title: 'Google Cloud Certified',
      issuer: 'Google Cloud',
      date: '2024-07-15',
      points: 150
    },
    {
      id: 2,
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services', 
      date: '2024-09-20',
      points: 150
    }
  ],
  awards: [
    {
      id: 1,
      title: 'Student of the Year 2024',
      category: 'Academic Excellence',
      date: '2024-05-15',
      points: 200
    }
  ]
};

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);

  const totalAchievementPoints = [
    ...eventsParticipated.map(e => e.points),
    ...achievements.certificates.map(c => c.points),
    ...achievements.awards.map(a => a.points)
  ].reduce((sum, points) => sum + points, 0);

  if (showResumeBuilder) {
    return (
      <StudentLayout>
        <ResumeBuilder 
          defaultData={studentProfile}
          onBack={() => setShowResumeBuilder(false)}
        />
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[var(--galaxy)]">Academic Portfolio</h1>
            <p className="text-[var(--planetary)] text-sm mt-0.5">
              Complete journey • Batch {studentProfile.batch}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[var(--planetary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--sapphire)] transition-colors">
              <Download size={14} />
              Export
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white">
              <Share2 size={14} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{studentProfile.name}</h2>
                <p className="text-white/80 text-sm">{studentProfile.rollNumber} • {studentProfile.branch}</p>
                <p className="text-white/70 text-xs mt-0.5">
                  {studentProfile.currentYear}{['st', 'nd', 'rd', 'th'][studentProfile.currentYear-1] || 'th'} Year • 
                  CGPA: {studentProfile.cgpa}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-xl font-bold">{totalAchievementPoints}</div>
                <div className="text-white/80 text-xs">Total Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Events</p>
                <p className="text-lg font-semibold text-[var(--galaxy)]">{eventsParticipated.length}</p>
              </div>
              <Calendar className="text-[var(--planetary)]" size={16} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Certificates</p>
                <p className="text-lg font-semibold text-[var(--galaxy)]">{achievements.certificates.length}</p>
              </div>
              <Award className="text-[var(--planetary)]" size={16} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Awards</p>
                <p className="text-lg font-semibold text-[var(--galaxy)]">{achievements.awards.length}</p>
              </div>
              <Trophy className="text-[var(--planetary)]" size={16} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Credits</p>
                <p className="text-lg font-semibold text-[var(--galaxy)]">{studentProfile.totalCredits}</p>
              </div>
              <BookOpen className="text-[var(--planetary)]" size={16} />
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white rounded-xl p-2 border border-gray-100">
          <div className="flex items-center gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'timeline', label: 'Timeline', icon: Clock }
            ].map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-[var(--planetary)] text-white'
                      : 'text-[var(--galaxy)] hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Based on Active Section */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-2 gap-4">
            {/* Academic Progress */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-[var(--galaxy)]">Academic Progress</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { sem: 'Semester 1', cgpa: 8.2, credits: 24 },
                    { sem: 'Semester 2', cgpa: 8.5, credits: 26 },
                    { sem: 'Semester 3', cgpa: 8.7, credits: 28 },
                    { sem: 'Semester 4', cgpa: 8.8, credits: 26 }
                  ].map((sem) => (
                    <div key={sem.sem} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-[var(--galaxy)] text-sm">{sem.sem}</h4>
                        <p className="text-xs text-[var(--planetary)]">{sem.credits} Credits</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[var(--galaxy)]">{sem.cgpa}</div>
                        <div className="text-xs text-green-600">CGPA</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Breakdown */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-[var(--galaxy)]">Activity Breakdown</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { category: 'Technical', points: 445, color: 'from-blue-500 to-blue-600', events: 3 },
                    { category: 'Academic', points: 380, color: 'from-indigo-500 to-purple-600', events: 2 },
                    { category: 'Cultural', points: 125, color: 'from-pink-500 to-rose-600', events: 2 },
                    { category: 'Sports', points: 160, color: 'from-orange-500 to-red-600', events: 1 },
                  ].map((cat) => (
                    <div key={cat.category} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 bg-gradient-to-r ${cat.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                        {cat.points}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[var(--galaxy)] text-sm">{cat.category}</h4>
                        <p className="text-xs text-[var(--planetary)]">{cat.events} activities</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'events' && (
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-[var(--galaxy)]">Events & Participation</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {eventsParticipated.map((event) => (
                  <div key={event.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[var(--galaxy)] text-sm">{event.title}</h4>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            event.category === 'Technical' ? 'bg-blue-100 text-blue-700' :
                            event.category === 'Academic' ? 'bg-indigo-100 text-indigo-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {event.category}
                          </span>
                          {event.validated && <CheckCircle className="text-green-500" size={12} />}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{event.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-[var(--sky)] px-2 py-1 rounded text-xs font-medium text-[var(--planetary)]">
                          {event.points} pts
                        </div>
                        <div className="text-xs font-medium text-green-600 mt-1">{event.achievement}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="grid grid-cols-2 gap-4">
            {/* Certificates */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Award className="text-[var(--planetary)]" size={16} />
                  <h3 className="text-sm font-semibold text-[var(--galaxy)]">Certificates</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {achievements.certificates.map((cert) => (
                    <div key={cert.id} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <h4 className="font-medium text-[var(--galaxy)] text-sm">{cert.title}</h4>
                          <p className="text-xs text-[var(--planetary)]">{cert.issuer}</p>
                        </div>
                        <CheckCircle className="text-green-500" size={12} />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-600">
                          {new Date(cert.date).toLocaleDateString()}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                          {cert.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Trophy className="text-[var(--planetary)]" size={16} />
                  <h3 className="text-sm font-semibold text-[var(--galaxy)]">Awards</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {achievements.awards.map((award) => (
                    <div key={award.id} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <h4 className="font-medium text-[var(--galaxy)] text-sm">{award.title}</h4>
                          <p className="text-xs text-[var(--planetary)]">{award.category}</p>
                        </div>
                        <CheckCircle className="text-green-500" size={12} />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-600">
                          {new Date(award.date).toLocaleDateString()}
                        </span>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-medium">
                          {award.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'timeline' && (
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-[var(--galaxy)]">Journey Timeline</h3>
            </div>
            <div className="p-4">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--sky)]"></div>
                <div className="space-y-4">
                  {[
                    ...eventsParticipated.map(e => ({...e, type: 'event', icon: Calendar})),
                    ...achievements.certificates.map(c => ({...c, type: 'certificate', icon: Award})),
                    ...achievements.awards.map(a => ({...a, type: 'award', icon: Trophy}))
                  ].sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={`${item.type}-${item.id}`} className="relative flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 bg-white border-2 border-[var(--sky)] rounded-full flex items-center justify-center">
                          <Icon className="text-[var(--planetary)]" size={12} />
                        </div>
                        <div className="flex-1 pb-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-[var(--galaxy)] text-sm">{item.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                  <span>{new Date(item.date).toLocaleDateString()}</span>
                                  {item.achievement && (
                                    <>
                                      <span>•</span>
                                      <span className="text-green-600 font-medium">{item.achievement}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${
                                item.type === 'event' ? 'bg-blue-100 text-blue-700' :
                                item.type === 'certificate' ? 'bg-green-100 text-green-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {item.points} pts
                              </div>
                            </div>
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

        {/* Resume Builder CTA */}
        <div className="bg-gradient-to-r from-[var(--sky)] to-[var(--venus)] rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <FileText className="text-[var(--planetary)]" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--galaxy)]">Build Professional Resume</h3>
                <p className="text-[var(--planetary)] text-xs mt-0.5">
                  Convert your achievements into a professional resume
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowResumeBuilder(true)}
              className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              Build Resume
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}