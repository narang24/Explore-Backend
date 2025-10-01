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
  Globe,
  Zap,
  X
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

// Portfolio Preview Modal Component
function PortfolioPreviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--galaxy)]">Portfolio Preview</h2>
            <p className="text-sm text-[var(--planetary)] mt-1">Full view of your academic portfolio</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="bg-white rounded-xl shadow-sm max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
              <h1 className="text-3xl font-bold text-[var(--galaxy)] mb-2">
                {studentProfile.name}
              </h1>
              <p className="text-lg text-[var(--planetary)] mb-4">
                {studentProfile.branch} Student
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600 flex-wrap">
                <span>{studentProfile.email}</span>
                <span>•</span>
                <span>{studentProfile.phone}</span>
                <span>•</span>
                <span>{studentProfile.instituteName}</span>
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                <h2 className="text-lg font-bold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <GraduationCap size={18} className="text-[var(--planetary)]" /> Academic Performance
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Current Year</span>
                    <span className="font-semibold text-[var(--galaxy)]">{studentProfile.currentYear}{['st', 'nd', 'rd', 'th'][studentProfile.currentYear-1] || 'th'} Year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">CGPA</span>
                    <span className="text-xl font-bold text-[var(--planetary)]">{studentProfile.cgpa}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">SGPA</span>
                    <span className="text-xl font-bold text-[var(--planetary)]">{studentProfile.sgpa}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Completed Semesters</span>
                    <span className="font-semibold text-[var(--galaxy)]">{studentProfile.completedSemesters}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                <h2 className="text-lg font-bold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-[var(--planetary)]" /> Program Details
                </h2>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600 font-medium">Branch</span>
                    <span className="font-semibold text-[var(--galaxy)] text-sm">{studentProfile.branch}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600 font-medium">Batch</span>
                    <span className="font-semibold text-[var(--galaxy)] text-sm">{studentProfile.batch}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600 font-medium">Institute</span>
                    <span className="font-semibold text-[var(--galaxy)] text-sm">{studentProfile.instituteName}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600 font-medium">Admission Date</span>
                    <span className="font-semibold text-[var(--galaxy)] text-sm">{new Date(studentProfile.admissionDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Certifications */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                <Award size={20} className="text-green-600" /> Verified Certifications
              </h2>
              <div className="grid gap-3">
                {studentProfile.validatedCertificates.map((cert, index) => (
                  <div key={index} className="border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[var(--galaxy)] text-base">{cert.activityName}</h3>
                          <CheckCircle className="text-green-600 flex-shrink-0" size={16} />
                        </div>
                        <p className="text-[var(--planetary)] font-medium mb-1 text-sm">{cert.achievement}</p>
                        <p className="text-sm text-gray-600">Issued by: {cert.issuer}</p>
                      </div>
                      <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
                        {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Activities */}
            <div>
              <h2 className="text-xl font-bold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-[var(--planetary)]" /> Verified Activities & Achievements
              </h2>
              <div className="grid gap-3">
                {studentProfile.validatedActivities.map((activity) => (
                  <div key={activity.id} className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-semibold text-[var(--galaxy)] text-base">{activity.title}</h3>
                          <CheckCircle className="text-green-600 flex-shrink-0" size={16} />
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            activity.category === 'Technical' ? 'bg-blue-100 text-blue-700' :
                            activity.category === 'Academic' ? 'bg-indigo-100 text-indigo-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {activity.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                          <span className="font-medium">{activity.type}</span>
                          <span>•</span>
                          <span>{new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span className="text-green-600 font-semibold">{activity.achievement}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [showPortfolioPreview, setShowPortfolioPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePortfolioPDF = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const element = document.getElementById('portfolio-content');
      
      if (!element) {
        setIsGenerating(false);
        alert('Portfolio content not found!');
        return;
      }

      const printWindow = window.open('', '', 'width=800,height=600');
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${studentProfile.name} - Portfolio</title>
            <style>
              @page { size: A4; margin: 20mm; }
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: white; }
              .portfolio-container { max-width: 210mm; margin: 0 auto; padding: 20px; }
              h1 { font-size: 28px; color: #1a1a2e; margin-bottom: 8px; text-align: center; }
              h2 { font-size: 20px; color: #1a1a2e; margin-top: 24px; margin-bottom: 12px; border-bottom: 2px solid #4a5568; padding-bottom: 8px; }
              h3 { font-size: 16px; color: #1a1a2e; margin-bottom: 4px; }
              .header { text-center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #e2e8f0; }
              .subtitle { font-size: 16px; color: #4299e1; margin-bottom: 12px; }
              .contact-info { font-size: 14px; color: #4a5568; margin-top: 8px; }
              .section { margin-bottom: 24px; page-break-inside: avoid; }
              .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
              .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
              .detail-label { color: #4a5568; }
              .detail-value { font-weight: 600; color: #1a1a2e; }
              .cert-item, .activity-item { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 12px; background: #f7fafc; page-break-inside: avoid; }
              .cert-item { border-left: 4px solid #48bb78; }
              .activity-item { border-left: 4px solid #4299e1; }
              .cert-title, .activity-title { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
              .verified-badge { background: #48bb78; color: white; font-size: 10px; padding: 2px 8px; border-radius: 12px; font-weight: 600; }
              .cert-achievement, .activity-achievement { color: #4299e1; font-weight: 600; font-size: 13px; margin-bottom: 4px; }
              .cert-meta, .activity-meta { font-size: 12px; color: #4a5568; }
              .category-badge { display: inline-block; background: #edf2f7; color: #2d3748; font-size: 11px; padding: 2px 8px; border-radius: 12px; margin-left: 8px; }
              @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
            </style>
          </head>
          <body>
            <div class="portfolio-container">
              <div class="header">
                <h1>${studentProfile.name}</h1>
                <p class="subtitle">${studentProfile.branch} Student</p>
                <p class="contact-info">${studentProfile.email} | ${studentProfile.phone} | ${studentProfile.instituteName}</p>
              </div>
              <div class="grid">
                <div class="section">
                  <h2>Academic Details</h2>
                  <div class="detail-row"><span class="detail-label">Current Year:</span><span class="detail-value">${studentProfile.currentYear}${['st', 'nd', 'rd', 'th'][studentProfile.currentYear-1] || 'th'} Year</span></div>
                  <div class="detail-row"><span class="detail-label">CGPA:</span><span class="detail-value">${studentProfile.cgpa}</span></div>
                  <div class="detail-row"><span class="detail-label">SGPA:</span><span class="detail-value">${studentProfile.sgpa}</span></div>
                </div>
                <div class="section">
                  <h2>Program Details</h2>
                  <div class="detail-row"><span class="detail-label">Branch:</span><span class="detail-value">${studentProfile.branch}</span></div>
                  <div class="detail-row"><span class="detail-label">Batch:</span><span class="detail-value">${studentProfile.batch}</span></div>
                  <div class="detail-row"><span class="detail-label">Institute:</span><span class="detail-value">${studentProfile.instituteName}</span></div>
                </div>
              </div>
              <div class="section">
                <h2>Verified Certifications</h2>
                ${studentProfile.validatedCertificates.map(cert => `
                  <div class="cert-item">
                    <div class="cert-title"><h3>${cert.activityName}</h3><span class="verified-badge">✓ Verified</span></div>
                    <p class="cert-achievement">${cert.achievement}</p>
                    <p class="cert-meta">${cert.issuer} • ${new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                `).join('')}
              </div>
              <div class="section">
                <h2>Verified Activities & Achievements</h2>
                ${studentProfile.validatedActivities.map(activity => `
                  <div class="activity-item">
                    <div class="activity-title"><h3>${activity.title}</h3><span class="verified-badge">✓ Verified</span><span class="category-badge">${activity.category}</span></div>
                    <p class="activity-achievement">${activity.achievement}</p>
                    <p class="activity-meta">${activity.type} • ${new Date(activity.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          setIsGenerating(false);
          setTimeout(() => printWindow.close(), 1000);
        }, 250);
      };
    }, 500);
  };

  const handleGenerateWebLink = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const uniqueId = Math.random().toString(36).substring(2, 15);
      const webLink = `https://portfolio.pec.edu.in/${studentProfile.rollNumber.toLowerCase()}/${uniqueId}`;
      navigator.clipboard.writeText(webLink).then(() => {
        setIsGenerating(false);
        alert(`Portfolio web link generated and copied to clipboard!\n\n${webLink}`);
      }).catch(() => {
        setIsGenerating(false);
        alert(`Portfolio web link generated:\n\n${webLink}`);
      });
    }, 1500);
  };

  const handleOneClickGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generatePortfolioPDF();
      setTimeout(() => handleGenerateWebLink(), 500);
    }, 500);
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
        {/* Student Profile Card */}
        <div className="bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{studentProfile.name}</h2>
                <p className="text-white/90">{studentProfile.branch}</p>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={handleOneClickGeneration}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl p-5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="text-white" size={22} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">One-Click Generate</h3>
                <p className="text-sm text-white/80">PDF + Web Link instantly</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setShowPortfolioPreview(true)}
            className="bg-white hover:bg-gray-50 rounded-xl p-5 border border-gray-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--sky)] rounded-xl flex items-center justify-center group-hover:bg-[var(--planetary)] transition-colors">
                <Eye className="text-[var(--planetary)] group-hover:text-white" size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[var(--galaxy)]">Preview Portfolio</h3>
                <p className="text-sm text-[var(--planetary)]">View full portfolio</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setShowResumeBuilder(true)}
            className="bg-white hover:bg-gray-50 rounded-xl p-5 border border-gray-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--sky)] rounded-xl flex items-center justify-center group-hover:bg-[var(--planetary)] transition-colors">
                <Edit3 className="text-[var(--planetary)] group-hover:text-white" size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[var(--galaxy)]">Customize Portfolio</h3>
                <p className="text-sm text-[var(--planetary)]">Build custom resume</p>
              </div>
            </div>
          </button>
        </div>

        {/* Portfolio Template Preview - Continues on main page */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--galaxy)]">Portfolio Template Preview</h3>
                <p className="text-sm text-[var(--planetary)] mt-1">Auto-generated from your verified academic data</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <CheckCircle size={12} />
                  All Data Verified
                </span>
                <button
                  onClick={generatePortfolioPDF}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--sapphire)] transition-colors disabled:opacity-50"
                >
                  <Download size={14} />
                  Download PDF
                </button>
                <button
                  onClick={handleGenerateWebLink}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <Link size={14} />
                  Generate Link
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <div className="bg-white rounded-xl shadow-sm max-w-4xl mx-auto p-8" id="portfolio-content">
              {/* Abbreviated preview on main page */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                <h1 className="text-3xl font-bold text-[var(--galaxy)] mb-2">{studentProfile.name}</h1>
                <p className="text-lg text-[var(--planetary)] mb-4">{studentProfile.branch} Student</p>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <span>{studentProfile.email}</span>
                  <span>•</span>
                  <span>{studentProfile.phone}</span>
                  <span>•</span>
                  <span>{studentProfile.instituteName}</span>
                </div>
              </div>
              
              <div className="text-center py-8">
                <Eye className="mx-auto mb-3 text-gray-400" size={32} />
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-2">Click "Preview Portfolio" to see full details</h3>
                <p className="text-sm text-[var(--planetary)] mb-4">View your complete academic profile including certifications and activities</p>
                <button
                  onClick={() => setShowPortfolioPreview(true)}
                  className="bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Open Full Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview Modal */}
      <PortfolioPreviewModal
        isOpen={showPortfolioPreview}
        onClose={() => setShowPortfolioPreview(false)}
      />
    </StudentLayout>
  );
}