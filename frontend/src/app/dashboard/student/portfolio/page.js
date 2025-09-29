'use client';
import { useState } from 'react';
import StudentLayout from '../../components-student/StudentLayout';
import ResumeBuilder from './ResumeBuilder';
import { 
  Calendar, 
  Award, 
  Download,
  Share2,
  FileText,
  Sparkles,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Edit3,
  Eye,
  Link,
  Globe
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
  sgpa: 8.8,
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
  ],
  validatedActivities: [
    {
      id: 1,
      title: 'Tech Fest 2024',
      type: 'Competition',
      date: '2024-03-15',
      category: 'Technical',
      achievement: 'Winner - 1st Position',
      validated: true
    },
    {
      id: 2,
      title: 'AI/ML Symposium',
      type: 'Symposium',
      date: '2024-11-08',
      category: 'Technical',
      achievement: 'Leadership Excellence',
      validated: true
    },
    {
      id: 3,
      title: 'Research Paper Presentation',
      type: 'Research',
      date: '2024-12-01',
      category: 'Academic',
      achievement: 'Best Paper Award',
      validated: true
    }
  ]
};

export default function PortfolioPage() {
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [showPortfolioPreview, setShowPortfolioPreview] = useState(false);

  const handleDownloadPortfolio = () => {
    alert('Portfolio PDF download functionality would be implemented here');
  };

  const handleGenerateWebLink = () => {
    alert('Web portfolio link generation functionality would be implemented here');
  };

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
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--galaxy)]">Digital Portfolio</h1>
            <p className="text-[var(--planetary)] mt-1">
              Auto-generated verified academic portfolio
            </p>
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{studentProfile.name}</h2>
                <p className="text-white/90">{studentProfile.rollNumber} • {studentProfile.branch}</p>
                <div className="flex items-center gap-4 mt-2 text-white/80">
                  <span>{studentProfile.currentYear}{['st', 'nd', 'rd', 'th'][studentProfile.currentYear-1] || 'th'} Year</span>
                  <span>•</span>
                  <span>CGPA: {studentProfile.cgpa}</span>
                  <span>•</span>
                  <span>SGPA: {studentProfile.sgpa}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-sm text-white/80">Institute</div>
                <div className="font-semibold">{studentProfile.instituteName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Actions */}
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => setShowPortfolioPreview(true)}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--sky)] rounded-xl flex items-center justify-center group-hover:bg-[var(--planetary)] transition-colors">
                <Eye className="text-[var(--planetary)] group-hover:text-white" size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[var(--galaxy)]">Preview Portfolio</h3>
                <p className="text-sm text-[var(--planetary)]">View your digital portfolio</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setShowResumeBuilder(true)}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--sky)] rounded-xl flex items-center justify-center group-hover:bg-[var(--planetary)] transition-colors">
                <Edit3 className="text-[var(--planetary)] group-hover:text-white" size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[var(--galaxy)]">Customize Portfolio</h3>
                <p className="text-sm text-[var(--planetary)]">Personalize your portfolio</p>
              </div>
            </div>
          </button>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[var(--galaxy)]">Export Options</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleDownloadPortfolio}
                className="flex-1 flex items-center justify-center gap-2 bg-[var(--planetary)] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[var(--sapphire)] transition-colors"
              >
                <Download size={14} />
                PDF
              </button>
              <button 
                onClick={handleGenerateWebLink}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                <Link size={14} />
                Web Link
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Template Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--galaxy)]">Portfolio Template Preview</h3>
                <p className="text-sm text-[var(--planetary)] mt-1">Auto-generated from your verified academic data</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <CheckCircle size={12} />
                  All Data Verified
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            {/* Portfolio Preview Content */}
            <div className="bg-white rounded-xl shadow-sm max-w-4xl mx-auto p-8">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                <h1 className="text-3xl font-bold text-[var(--galaxy)] mb-2">
                  {studentProfile.name}
                </h1>
                <p className="text-lg text-[var(--planetary)] mb-4">
                  {studentProfile.branch} Student
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <span>{studentProfile.email}</span>
                  <span>•</span>
                  <span>{studentProfile.phone}</span>
                  <span>•</span>
                  <span>{studentProfile.instituteName}</span>
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                    <GraduationCap size={20} /> Academic Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Roll Number:</span>
                      <span className="font-medium">{studentProfile.rollNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Year:</span>
                      <span className="font-medium">{studentProfile.currentYear}{['st', 'nd', 'rd', 'th'][studentProfile.currentYear-1] || 'th'} Year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CGPA:</span>
                      <span className="font-medium text-[var(--planetary)]">{studentProfile.cgpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SGPA:</span>
                      <span className="font-medium text-[var(--planetary)]">{studentProfile.sgpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Credits:</span>
                      <span className="font-medium">{studentProfile.totalCredits}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                    <BookOpen size={20} /> Program Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium">{studentProfile.branch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Batch:</span>
                      <span className="font-medium">{studentProfile.batch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Institute:</span>
                      <span className="font-medium">{studentProfile.instituteName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admission Date:</span>
                      <span className="font-medium">{new Date(studentProfile.admissionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Certifications */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <Award size={20} /> Verified Certifications
                </h2>
                <div className="grid gap-4">
                  {studentProfile.validatedCertificates.map((cert, index) => (
                    <div key={index} className="border border-green-200 bg-green-50 rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-[var(--galaxy)]">{cert.activityName}</h3>
                            <CheckCircle className="text-green-600" size={16} />
                          </div>
                          <p className="text-[var(--planetary)] font-medium mb-1">{cert.achievement}</p>
                          <p className="text-sm text-gray-600">{cert.issuer}</p>
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Activities */}
              <div>
                <h2 className="text-xl font-bold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <Calendar size={20} /> Verified Activities & Achievements
                </h2>
                <div className="grid gap-4">
                  {studentProfile.validatedActivities.map((activity) => (
                    <div key={activity.id} className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-[var(--galaxy)]">{activity.title}</h3>
                            <CheckCircle className="text-green-600" size={16} />
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              activity.category === 'Technical' ? 'bg-blue-100 text-blue-700' :
                              activity.category === 'Academic' ? 'bg-indigo-100 text-indigo-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {activity.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{activity.type}</span>
                            <span>•</span>
                            <span>{new Date(activity.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="text-green-600 font-medium">{activity.achievement}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-[var(--galaxy)]">{studentProfile.validatedActivities.length}</p>
              </div>
              <Calendar className="text-[var(--planetary)]" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certifications</p>
                <p className="text-2xl font-bold text-[var(--galaxy)]">{studentProfile.validatedCertificates.length}</p>
              </div>
              <Award className="text-[var(--planetary)]" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current CGPA</p>
                <p className="text-2xl font-bold text-[var(--galaxy)]">{studentProfile.cgpa}</p>
              </div>
              <GraduationCap className="text-[var(--planetary)]" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Credits Earned</p>
                <p className="text-2xl font-bold text-[var(--galaxy)]">{studentProfile.totalCredits}</p>
              </div>
              <BookOpen className="text-[var(--planetary)]" size={24} />
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}