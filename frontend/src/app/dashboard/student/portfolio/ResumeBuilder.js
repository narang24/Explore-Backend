import { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Save,
  Download,
  GraduationCap,
  Mail,
  Briefcase,
  BookOpen,
  Code,
  FileText,
  Award,
  Heart,
  CheckCircle,
  Plus,
  Trash2,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink
} from 'lucide-react';

// Mock default data
const defaultData = {
  name: 'John Doe',
  rollNumber: '22CS001',
  branch: 'Computer Science & Engineering',
  currentYear: '3',
  cgpa: '8.7',
  instituteName: 'Punjab Engineering College',
  email: 'john.doe@pec.edu.in',
  phone: '+91 9876543210',
  admissionDate: '2024-08-15',
  validatedCertificates: [
    {
      activityName: 'Google Cloud Certified',
      achievement: 'Professional Certification',
      date: '2024-07-15',
      issuer: 'Google Cloud'
    }
  ]
};

export default function ResumeBuilder({ onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: defaultData.name || '',
      rollNumber: defaultData.rollNumber || '',
      branch: defaultData.branch || '',
      currentYear: defaultData.currentYear || '',
      cgpa: defaultData.cgpa || '',
      institute: defaultData.instituteName || ''
    },
    contactInfo: {
      email: defaultData.email || '',
      phone: defaultData.phone || '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    workExperience: [],
    education: [
      {
        degree: `B.Tech in ${defaultData.branch || 'Computer Science'}`,
        institution: defaultData.instituteName || '',
        startDate: defaultData.admissionDate || '',
        endDate: '2028-05-31',
        cgpa: defaultData.cgpa || ''
      }
    ],
    skills: [],
    projects: [],
    certifications: (defaultData.validatedCertificates || []).map(cert => ({
      name: cert.activityName,
      achievement: cert.achievement,
      date: cert.date,
      issuer: cert.issuer
    })),
    additionalInfo: {
      languages: [],
      interests: []
    }
  });

  const steps = [
    { id: 'personal', title: 'Personal Info', icon: GraduationCap },
    { id: 'contact', title: 'Contact & Links', icon: Mail },
    { id: 'work', title: 'Work Experience', icon: Briefcase },
    { id: 'education', title: 'Education', icon: BookOpen },
    { id: 'skills', title: 'Skills', icon: Code },
    { id: 'projects', title: 'Projects', icon: FileText },
    { id: 'certifications', title: 'Certifications', icon: Award },
    { id: 'additional', title: 'Additional Info', icon: Heart }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [...resumeData.workExperience, {
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    });
  };

  const removeWorkExperience = (index) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.filter((_, i) => i !== index)
    });
  };

  const updateWorkExperience = (index, field, value) => {
    const updated = [...resumeData.workExperience];
    updated[index][field] = value;
    setResumeData({ ...resumeData, workExperience: updated });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, {
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        cgpa: ''
      }]
    });
  };

  const removeEducation = (index) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...resumeData.education];
    updated[index][field] = value;
    setResumeData({ ...resumeData, education: updated });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { name: '', proficiency: 'Intermediate' }]
    });
  };

  const removeSkill = (index) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  const updateSkill = (index, field, value) => {
    const updated = [...resumeData.skills];
    updated[index][field] = value;
    setResumeData({ ...resumeData, skills: updated });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, {
        title: '',
        description: '',
        githubLink: '',
        liveDemo: ''
      }]
    });
  };

  const removeProject = (index) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((_, i) => i !== index)
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...resumeData.projects];
    updated[index][field] = value;
    setResumeData({ ...resumeData, projects: updated });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      additionalInfo: {
        ...resumeData.additionalInfo,
        languages: [...resumeData.additionalInfo.languages, { name: '', proficiency: 'Intermediate' }]
      }
    });
  };

  const removeLanguage = (index) => {
    setResumeData({
      ...resumeData,
      additionalInfo: {
        ...resumeData.additionalInfo,
        languages: resumeData.additionalInfo.languages.filter((_, i) => i !== index)
      }
    });
  };

  const updateLanguage = (index, field, value) => {
    const updated = [...resumeData.additionalInfo.languages];
    updated[index][field] = value;
    setResumeData({
      ...resumeData,
      additionalInfo: { ...resumeData.additionalInfo, languages: updated }
    });
  };

  const addInterest = () => {
    setResumeData({
      ...resumeData,
      additionalInfo: {
        ...resumeData.additionalInfo,
        interests: [...resumeData.additionalInfo.interests, { name: '', description: '' }]
      }
    });
  };

  const removeInterest = (index) => {
    setResumeData({
      ...resumeData,
      additionalInfo: {
        ...resumeData.additionalInfo,
        interests: resumeData.additionalInfo.interests.filter((_, i) => i !== index)
      }
    });
  };

  const updateInterest = (index, field, value) => {
    const updated = [...resumeData.additionalInfo.interests];
    updated[index][field] = value;
    setResumeData({
      ...resumeData,
      additionalInfo: { ...resumeData.additionalInfo, interests: updated }
    });
  };

  const handleSave = () => {
    alert('Resume data saved successfully!');
  };

  const handleDownloadPDF = () => {
    alert('PDF Download functionality would be implemented here');
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Form */}
      <div className="w-1/2 bg-white flex flex-col border-r border-gray-200 rounded-2xl">
        {/* Progress Bar - Minimal at top */}
        <div className="w-full bg-gray-200 h-1">
          <div 
            className="bg-[var(--planetary)] h-1 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-[var(--galaxy)]">Resume Builder</h1>
            <button 
              onClick={onBack || (() => console.log('Back to portfolio'))}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-[var(--galaxy)] hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} />
              Back to Portfolio
            </button>
          </div>

          {/* Steps Navigation */}
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs font-medium transition-all ${
                    currentStep === index
                      ? 'bg-[var(--planetary)] text-white'
                      : currentStep > index
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-[10px] leading-tight text-center">{step.title}</span>
                  {currentStep > index && <CheckCircle size={10} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[var(--sky)] rounded-xl flex items-center justify-center">
              <StepIcon className="text-[var(--planetary)]" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--galaxy)]">{currentStepData.title}</h2>
              <p className="text-[var(--planetary)] text-sm">Fill in your details below</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Personal Info Step */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Roll Number</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.rollNumber}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--planetary)] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Branch</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.branch}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--planetary)] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Current Year</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.currentYear}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--planetary)] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">CGPA</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.cgpa}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--planetary)] bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Institute</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.institute}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--planetary)] bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info Step */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Email</label>
                    <input
                      type="email"
                      value={resumeData.contactInfo.email}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, email: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.contactInfo.phone}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, phone: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Location</label>
                    <input
                      type="text"
                      value={resumeData.contactInfo.location}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, location: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={resumeData.contactInfo.linkedin}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, linkedin: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">GitHub</label>
                    <input
                      type="url"
                      value={resumeData.contactInfo.github}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, github: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                      placeholder="github.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Portfolio Website</label>
                    <input
                      type="url"
                      value={resumeData.contactInfo.portfolio}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, portfolio: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                      placeholder="yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience Step */}
            {currentStep === 2 && (
              <div className="space-y-4">
                {resumeData.workExperience.map((work, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--galaxy)] text-sm">Experience {index + 1}</h3>
                      <button
                        onClick={() => removeWorkExperience(index)}
                        className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Company</label>
                        <input
                          type="text"
                          value={work.company}
                          onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Role</label>
                        <input
                          type="text"
                          value={work.role}
                          onChange={(e) => updateWorkExperience(index, 'role', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                          placeholder="Job Title"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Start Date</label>
                        <input
                          type="date"
                          value={work.startDate}
                          onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">End Date</label>
                        <input
                          type="date"
                          value={work.endDate}
                          onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Description</label>
                      <textarea
                        value={work.description}
                        onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addWorkExperience}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-[var(--planetary)] hover:border-[var(--planetary)] hover:bg-[var(--sky)] transition-all w-full justify-center text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Work Experience
                </button>
              </div>
            )}

            {/* Education Step */}
            {currentStep === 3 && (
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--galaxy)] text-sm">Education {index + 1}</h3>
                      {index > 0 && (
                        <button
                          onClick={() => removeEducation(index)}
                          className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                          placeholder="B.Tech in Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Start Date</label>
                        <input
                          type="date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">End Date</label>
                        <input
                          type="date"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">CGPA</label>
                        <input
                          type="text"
                          value={edu.cgpa}
                          onChange={(e) => updateEducation(index, 'cgpa', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                          placeholder="8.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-[var(--planetary)] hover:border-[var(--planetary)] hover:bg-[var(--sky)] transition-all w-full justify-center text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Education
                </button>
              </div>
            )}

            {/* Skills Step */}
            {currentStep === 4 && (
              <div className="space-y-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--galaxy)] text-sm">Skill {index + 1}</h3>
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Skill Name</label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                          placeholder="e.g., JavaScript, Python"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Proficiency</label>
                        <select
                          value={skill.proficiency}
                          onChange={(e) => updateSkill(index, 'proficiency', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addSkill}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-[var(--planetary)] hover:border-[var(--planetary)] hover:bg-[var(--sky)] transition-all w-full justify-center text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Skill
                </button>
              </div>
            )}

            {/* Projects Step */}
            {currentStep === 5 && (
              <div className="space-y-4">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--galaxy)] text-sm">Project {index + 1}</h3>
                      <button
                        onClick={() => removeProject(index)}
                        className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(index, 'title', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                          placeholder="E-commerce Platform"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                          placeholder="Describe your project, technologies used, and key features..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">GitHub Link</label>
                          <input
                            type="url"
                            value={project.githubLink}
                            onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Live Demo URL</label>
                          <input
                            type="url"
                            value={project.liveDemo}
                            onChange={(e) => updateProject(index, 'liveDemo', e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                            placeholder="https://yourproject.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-[var(--planetary)] hover:border-[var(--planetary)] hover:bg-[var(--sky)] transition-all w-full justify-center text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Project
                </button>
              </div>
            )}

            {/* Certifications Step */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm">Verified Certifications</h4>
                      <p className="text-blue-700 text-xs mt-1">
                        These certifications are automatically included from your validated activities.
                      </p>
                    </div>
                  </div>
                </div>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="border border-green-200 bg-green-50 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[var(--galaxy)] text-sm">{cert.name}</h3>
                          <CheckCircle className="text-green-600" size={14} />
                        </div>
                        <p className="text-[var(--planetary)] font-medium text-xs mb-1">{cert.achievement}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>{cert.issuer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Info Step */}
            {currentStep === 7 && (
              <div className="space-y-6">
                {/* Languages */}
                <div>
                  <h3 className="font-semibold text-[var(--galaxy)] mb-3 text-sm">Languages</h3>
                  <div className="space-y-3">
                    {resumeData.additionalInfo.languages.map((lang, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[var(--galaxy)] text-xs">Language {index + 1}</h4>
                          <button
                            onClick={() => removeLanguage(index)}
                            className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Language</label>
                            <input
                              type="text"
                              value={lang.name}
                              onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                              placeholder="e.g., English, Hindi"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Proficiency</label>
                            <select
                              value={lang.proficiency}
                              onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                            >
                              <option value="Basic">Basic</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Fluent">Fluent</option>
                              <option value="Native">Native</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addLanguage}
                      className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-[var(--planetary)] hover:border-[var(--planetary)] hover:bg-[var(--sky)] transition-all w-full justify-center text-sm font-medium"
                    >
                      <Plus size={16} />
                      Add Language
                    </button>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h3 className="font-semibold text-[var(--galaxy)] mb-3 text-sm">Interests</h3>
                  <div className="space-y-3">
                    {resumeData.additionalInfo.interests.map((interest, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[var(--galaxy)] text-xs">Interest {index + 1}</h4>
                          <button
                            onClick={() => removeInterest(index)}
                            className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Interest</label>
                            <input
                              type="text"
                              value={interest.name}
                              onChange={(e) => updateInterest(index, 'name', e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                              placeholder="e.g., Photography, Reading"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[var(--galaxy)] mb-1.5">Description (Optional)</label>
                            <input
                              type="text"
                              value={interest.description}
                              onChange={(e) => updateInterest(index, 'description', e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--galaxy)] focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white"
                              placeholder="Brief description"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addInterest}
                      className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-[var(--planetary)] hover:border-[var(--planetary)] hover:bg-[var(--sky)] transition-all w-full justify-center text-sm font-medium"
                    >
                      <Plus size={16} />
                      Add Interest
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-[var(--galaxy)] hover:bg-gray-50'
              }`}
            >
              <ChevronLeft size={16} />
              Back
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-[var(--galaxy)] rounded-xl text-sm font-medium hover:bg-gray-200 transition-all"
            >
              <Save size={16} />
              Save
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--planetary)] text-white rounded-xl text-sm font-medium hover:bg-[var(--sapphire)] transition-all"
              >
                Next
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-all"
              >
                <Download size={16} />
                Download PDF
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Resume Preview */}
      <div className="w-1/2 bg-gray-100 p-8 overflow-y-auto flex items-start justify-center">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-[210mm] p-8" style={{ minHeight: '297mm' }}>
          {/* Resume Header */}
          <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
            <h1 className="text-3xl font-bold text-[var(--galaxy)] mb-2">
              {resumeData.personalInfo.name || 'Your Name'}
            </h1>
            <p className="text-[var(--planetary)] text-lg mb-3">
              {resumeData.personalInfo.branch || 'Your Branch'}
            </p>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600 flex-wrap">
              {resumeData.contactInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail size={12} /> {resumeData.contactInfo.email}
                </span>
              )}
              {resumeData.contactInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {resumeData.contactInfo.phone}
                </span>
              )}
              {resumeData.contactInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {resumeData.contactInfo.location}
                </span>
              )}
            </div>
            {(resumeData.contactInfo.linkedin || resumeData.contactInfo.github || resumeData.contactInfo.portfolio) && (
              <div className="flex items-center justify-center gap-3 text-sm text-[var(--planetary)] mt-2">
                {resumeData.contactInfo.linkedin && (
                  <span className="flex items-center gap-1">
                    <Linkedin size={12} /> LinkedIn
                  </span>
                )}
                {resumeData.contactInfo.github && (
                  <span className="flex items-center gap-1">
                    <Github size={12} /> GitHub
                  </span>
                )}
                {resumeData.contactInfo.portfolio && (
                  <span className="flex items-center gap-1">
                    <Globe size={12} /> Portfolio
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                <GraduationCap size={16} /> Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--galaxy)] text-sm">{edu.degree}</h3>
                      <p className="text-[var(--planetary)] text-sm">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      {edu.startDate && edu.endDate && (
                        <p className="text-sm text-gray-600">
                          {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                        </p>
                      )}
                      {edu.cgpa && <p className="text-sm font-semibold text-[var(--galaxy)]">CGPA: {edu.cgpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Work Experience */}
          {resumeData.workExperience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                <Briefcase size={16} /> Work Experience
              </h2>
              {resumeData.workExperience.map((work, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-[var(--galaxy)] text-sm">{work.role}</h3>
                      <p className="text-[var(--planetary)] text-sm">{work.company}</p>
                    </div>
                    {work.startDate && work.endDate && (
                      <p className="text-sm text-gray-600">
                        {new Date(work.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {' '}{new Date(work.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                  {work.description && <p className="text-sm text-gray-600">{work.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                <Code size={16} /> Skills
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
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                <FileText size={16} /> Projects
              </h2>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-[var(--galaxy)] text-sm mb-1">{project.title}</h3>
                  {project.description && <p className="text-sm text-gray-600 mb-2">{project.description}</p>}
                  <div className="flex items-center gap-3 text-sm text-[var(--planetary)]">
                    {project.githubLink && (
                      <span className="flex items-center gap-1">
                        <Github size={10} /> GitHub
                      </span>
                    )}
                    {project.liveDemo && (
                      <span className="flex items-center gap-1">
                        <ExternalLink size={10} /> Live Demo
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                <Award size={16} /> Certifications & Achievements
              </h2>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[var(--galaxy)] text-sm">{cert.name}</h3>
                      <CheckCircle className="text-green-600" size={12} />
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
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                <Globe size={16} /> Languages
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
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[var(--galaxy)] mb-3 flex items-center gap-2">
                <Heart size={16} /> Interests
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
    </div>
  );
}