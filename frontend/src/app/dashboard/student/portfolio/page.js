'use client';
import { useState } from 'react';
import StudentLayout from '../../components-student/StudentLayout';
import { 
  Download,
  Edit3,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Trophy,
  CheckCircle,
  LinkIcon,
  Eye
} from 'lucide-react';
import ResumeBuilder from './ResumeBuilder';

// Mock default data from database
const defaultStudentData = {
  name: 'John Doe',
  rollNumber: '22CS001',
  batch: '2024-2028',
  branch: 'Computer Science & Engineering',
  currentYear: 3,
  admissionDate: '2024-08-15',
  cgpa: 8.7,
  instituteName: 'ABC Institute of Technology',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  
  validatedCertificates: [
    {
      activityName: 'Tech Fest 2024',
      achievement: 'Winner - 1st Position',
      date: '2024-03-15',
      issuer: 'GDSC',
      verified: true
    },
    {
      activityName: 'AI/ML Symposium',
      achievement: 'Leadership Excellence',
      date: '2024-11-08',
      issuer: 'Tech Club',
      verified: true
    },
    {
      activityName: 'Research Paper Presentation',
      achievement: 'Best Paper Award',
      date: '2024-12-01',
      issuer: 'Research Society',
      verified: true
    }
  ],
  
  validatedAwards: [
    {
      title: 'Student of the Year 2024',
      category: 'Academic Excellence',
      date: '2024-05-15',
      verified: true
    },
    {
      title: 'Innovation Challenge Winner',
      category: 'Innovation',
      date: '2024-08-20',
      verified: true
    },
    {
      title: 'Community Service Recognition',
      category: 'Social Impact',
      date: '2024-10-05',
      verified: true
    }
  ]
};

export default function PortfolioPage() {
  const [activeView, setActiveView] = useState('default'); // 'default' or 'builder'

  const handleDownloadPDF = () => {
    alert('PDF Download functionality would be implemented here');
  };

  const handleGenerateWebLink = () => {
    alert('Web Link generation functionality would be implemented here');
  };

  // Default Resume Template View
  const DefaultResumeView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--galaxy)]">My Portfolio</h1>
          <p className="text-[var(--planetary)] text-sm mt-1">
            Academic achievements and verified records
          </p>
        </div>
        
        <button 
          onClick={() => setActiveView('builder')}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--planetary)] text-white rounded-xl text-sm font-medium hover:bg-[var(--sapphire)] transition-colors"
        >
          <Edit3 size={16} />
          Personalize Resume
        </button>
      </div>

      {/* Default Resume Template */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Resume Header */}
        <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{defaultStudentData.name}</h1>
            <p className="text-blue-100 text-lg mb-4">{defaultStudentData.branch}</p>
            <div className="flex items-center gap-6 text-sm text-blue-100 flex-wrap">
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>{defaultStudentData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>{defaultStudentData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} />
                <span>Roll No: {defaultStudentData.rollNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Content */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="text-[var(--planetary)]" size={20} />
                <h2 className="text-xl font-bold text-[var(--galaxy)]">Education</h2>
              </div>
              <div className="bg-[var(--sky)] rounded-2xl p-5">
                <h3 className="font-semibold text-[var(--galaxy)]">B.Tech in {defaultStudentData.branch}</h3>
                <p className="text-[var(--planetary)] text-sm mt-1">{defaultStudentData.instituteName}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-[var(--planetary)]">
                  <span>Current Year: {defaultStudentData.currentYear}</span>
                  <span>•</span>
                  <span>CGPA: {defaultStudentData.cgpa}/10.0</span>
                  <span>•</span>
                  <span>Batch: {defaultStudentData.batch}</span>
                </div>
              </div>
            </div>

            {/* Certifications & Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-[var(--planetary)]" size={20} />
                <h2 className="text-xl font-bold text-[var(--galaxy)]">Certifications & Achievements</h2>
              </div>
              <div className="space-y-3">
                {defaultStudentData.validatedCertificates.map((cert, index) => (
                  <div key={index} className="bg-[var(--sky)] rounded-2xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[var(--galaxy)]">{cert.activityName}</h3>
                          <CheckCircle className="text-green-500" size={16} />
                        </div>
                        <p className="text-[var(--planetary)] font-medium text-sm">{cert.achievement}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>{new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>{cert.issuer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Honors */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-[var(--planetary)]" size={20} />
                <h2 className="text-xl font-bold text-[var(--galaxy)]">Awards & Honors</h2>
              </div>
              <div className="space-y-3">
                {defaultStudentData.validatedAwards.map((award, index) => (
                  <div key={index} className="bg-[var(--sky)] rounded-2xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[var(--galaxy)]">{award.title}</h3>
                          <CheckCircle className="text-green-500" size={16} />
                        </div>
                        <p className="text-[var(--planetary)] text-sm">{award.category}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          {new Date(award.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Download Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="text-green-500" size={16} />
              <span>All certificates verified by faculty</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleGenerateWebLink}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-white transition-colors"
              >
                <LinkIcon size={16} />
                Generate Web Link
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2.5 bg-[var(--planetary)] text-white rounded-xl text-sm font-medium hover:bg-[var(--sapphire)] transition-colors"
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StudentLayout>
      {activeView === 'default' ? (
        <DefaultResumeView />
      ) : (
        <ResumeBuilder 
          defaultData={defaultStudentData}
          onBack={() => setActiveView('default')}
        />
      )}
    </StudentLayout>
  );
}