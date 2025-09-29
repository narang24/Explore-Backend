'use client';
import { 
  Download,
  LinkIcon,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  GraduationCap,
  Briefcase,
  Code,
  FileText,
  Award,
  Languages,
  Heart,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function ResumePreview({ resumeData, onClose }) {
  const handleDownloadPDF = () => {
    alert('PDF Download functionality would be implemented here');
  };

  const handleGenerateWebLink = () => {
    alert('Web Link generation functionality would be implemented here');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold text-[var(--galaxy)]">Resume Preview</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Resume Preview Content */}
        <div className="p-8 max-h-[calc(90vh-200px)] overflow-y-auto">
          <div className="bg-gray-50 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
              <h1 className="text-3xl font-bold text-[var(--galaxy)] mb-2">
                {resumeData.personalInfo.name}
              </h1>
              <p className="text-[var(--planetary)] text-lg mb-4">
                {resumeData.personalInfo.branch}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 flex-wrap">
                {resumeData.contactInfo.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> {resumeData.contactInfo.email}
                  </span>
                )}
                {resumeData.contactInfo.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={14} /> {resumeData.contactInfo.phone}
                  </span>
                )}
                {resumeData.contactInfo.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {resumeData.contactInfo.location}
                  </span>
                )}
              </div>
              {(resumeData.contactInfo.linkedin || resumeData.contactInfo.github || resumeData.contactInfo.portfolio) && (
                <div className="flex items-center justify-center gap-4 text-sm text-[var(--planetary)] mt-2">
                  {resumeData.contactInfo.linkedin && (
                    <span className="flex items-center gap-1">
                      <Linkedin size={14} /> LinkedIn
                    </span>
                  )}
                  {resumeData.contactInfo.github && (
                    <span className="flex items-center gap-1">
                      <Github size={14} /> GitHub
                    </span>
                  )}
                  {resumeData.contactInfo.portfolio && (
                    <span className="flex items-center gap-1">
                      <Globe size={14} /> Portfolio
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                <GraduationCap size={20} /> Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--galaxy)]">{edu.degree}</h3>
                      <p className="text-[var(--planetary)] text-sm">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                      </p>
                      {edu.cgpa && <p className="text-sm font-semibold text-[var(--galaxy)]">CGPA: {edu.cgpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Work Experience */}
            {resumeData.workExperience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                  <Briefcase size={20} /> Work Experience
                </h2>
                {resumeData.workExperience.map((work, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-[var(--galaxy)]">{work.role}</h3>
                        <p className="text-[var(--planetary)] text-sm">{work.company}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(work.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {' '}{new Date(work.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{work.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                  <Code size={20} /> Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {skill.name} • {skill.proficiency}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                  <FileText size={20} /> Projects
                </h2>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-[var(--galaxy)] mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <div className="flex items-center gap-3 text-sm text-[var(--planetary)]">
                      {project.githubLink && (
                        <span className="flex items-center gap-1">
                          <Github size={12} /> GitHub
                        </span>
                      )}
                      {project.liveDemo && (
                        <span className="flex items-center gap-1">
                          <ExternalLink size={12} /> Live Demo
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                  <Award size={20} /> Certifications & Achievements
                </h2>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[var(--galaxy)]">{cert.name}</h3>
                        <CheckCircle className="text-green-600" size={14} />
                      </div>
                      <p className="text-sm text-[var(--planetary)] font-medium">{cert.achievement}</p>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {resumeData.additionalInfo.languages.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                  <Languages size={20} /> Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.additionalInfo.languages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                      {lang.name} • {lang.proficiency}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {resumeData.additionalInfo.interests.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                  <Heart size={20} /> Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.additionalInfo.interests.map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-lg text-sm">
                      {interest.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-between rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Close Preview
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateWebLink}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              <LinkIcon size={18} />
              Generate Web Link
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--planetary)] text-white rounded-xl font-medium hover:bg-[var(--sapphire)] transition-colors"
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}