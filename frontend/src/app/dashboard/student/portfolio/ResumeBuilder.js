'use client';
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

export default function ResumeBuilder({ defaultData, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Resume data state
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

  // Work Experience handlers
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

  // Education handlers
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

  // Skills handlers
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

  // Projects handlers
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

  // Language handlers
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

  // Interest handlers
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
      <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold text-[var(--galaxy)]">Resume Builder</h1>
            <button 
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={14} />
              Back to Portfolio
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[var(--galaxy)]">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-xs text-[var(--planetary)]">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-[var(--planetary)] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    currentStep === index
                      ? 'bg-[var(--planetary)] text-white'
                      : currentStep > index
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={12} />
                  {step.title}
                  {currentStep > index && <CheckCircle size={10} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[var(--sky)] rounded-lg flex items-center justify-center">
              <StepIcon className="text-[var(--planetary)]" size={16} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--galaxy)]">{currentStepData.title}</h2>
              <p className="text-[var(--planetary)] text-xs">Fill in your details below</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Personal Info Step */}
            {currentStep === 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Roll Number</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.rollNumber}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Branch</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.branch}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Current Year</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.currentYear}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">CGPA</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.cgpa}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Institute</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.institute}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info Step */}
            {currentStep === 1 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.contactInfo.email}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.contactInfo.phone}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, phone: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Location</label>
                    <input
                      type="text"
                      value={resumeData.contactInfo.location}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, location: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={resumeData.contactInfo.linkedin}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, linkedin: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">GitHub</label>
                    <input
                      type="url"
                      value={resumeData.contactInfo.github}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, github: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                      placeholder="github.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Portfolio Website</label>
                    <input
                      type="url"
                      value={resumeData.contactInfo.portfolio}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        contactInfo: { ...resumeData.contactInfo, portfolio: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                      placeholder="yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience Step */}
            {currentStep === 2 && (
              <div className="space-y-3">
                {resumeData.workExperience.map((work, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[var(--galaxy)] text-sm">Experience {index + 1}</h3>
                      <button
                        onClick={() => removeWorkExperience(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Company</label>
                        <input
                          type="text"
                          value={work.company}
                          onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Role</label>
                        <input
                          type="text"
                          value={work.role}
                          onChange={(e) => updateWorkExperience(index, 'role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                          placeholder="Job Title"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Start Date</label>
                        <input
                          type="date"
                          value={work.startDate}
                          onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">End Date</label>
                        <input
                          type="date"
                          value={work.endDate}
                          onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Description</label>
                      <textarea
                        value={work.description}
                        onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addWorkExperience}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center text-sm"
                >
                  <Plus size={14} />
                  Add Work Experience
                </button>
              </div>
            )}

            {/* Skills Step */}
            {currentStep === 4 && (
              <div className="space-y-3">
                <div className="grid gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-[var(--galaxy)] text-sm">Skill {index + 1}</h3>
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Skill Name</label>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                            placeholder="e.g., JavaScript, Python"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Proficiency</label>
                          <select
                            value={skill.proficiency}
                            onChange={(e) => updateSkill(index, 'proficiency', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                </div>
                <button
                  onClick={addSkill}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center text-sm"
                >
                  <Plus size={14} />
                  Add Skill
                </button>
              </div>
            )}

            {/* Projects Step */}
            {currentStep === 5 && (
              <div className="space-y-3">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[var(--galaxy)] text-sm">Project {index + 1}</h3>
                      <button
                        onClick={() => removeProject(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                          placeholder="E-commerce Platform"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                          placeholder="Describe your project, technologies used, and key features..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">GitHub Link</label>
                          <input
                            type="url"
                            value={project.githubLink}
                            onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Live Demo URL</label>
                          <input
                            type="url"
                            value={project.liveDemo}
                            onChange={(e) => updateProject(index, 'liveDemo', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                            placeholder="https://yourproject.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center text-sm"
                >
                  <Plus size={14} />
                  Add Project
                </button>
              </div>
            )}

            {/* Certifications Step */}
            {currentStep === 6 && (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-medium text-blue-900 text-sm">Verified Certifications</h4>
                      <p className="text-blue-700 text-xs">
                        These certifications are automatically included from your validated activities.
                      </p>
                    </div>
                  </div>
                </div>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="border border-green-200 bg-green-50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-[var(--galaxy)] text-sm">{cert.name}</h3>
                          <CheckCircle className="text-green-600" size={12} />
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
              <div className="space-y-4">
                {/* Languages */}
                <div>
                  <h3 className="font-medium text-[var(--galaxy)] mb-2 text-sm">Languages</h3>
                  <div className="space-y-2">
                    {resumeData.additionalInfo.languages.map((lang, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-[var(--galaxy)] text-xs">Language {index + 1}</h4>
                          <button
                            onClick={() => removeLanguage(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Language</label>
                            <input
                              type="text"
                              value={lang.name}
                              onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                              placeholder="e.g., English, Hindi"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Proficiency</label>
                            <select
                              value={lang.proficiency}
                              onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                      className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center text-sm"
                    >
                      <Plus size={14} />
                      Add Language
                    </button>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h3 className="font-medium text-[var(--galaxy)] mb-2 text-sm">Interests</h3>
                  <div className="space-y-2">
                    {resumeData.additionalInfo.interests.map((interest, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-[var(--galaxy)] text-xs">Interest {index + 1}</h4>
                          <button
                            onClick={() => removeInterest(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Interest</label>
                            <input
                              type="text"
                              value={interest.name}
                              onChange={(e) => updateInterest(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                              placeholder="e.g., Photography, Reading"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[var(--galaxy)] mb-1">Description (Optional)</label>
                            <input
                              type="text"
                              value={interest.description}
                              onChange={(e) => updateInterest(index, 'description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                              placeholder="Brief description"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addInterest}
                      className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center text-sm"
                    >
                      <Plus size={14} />
                      Add Interest
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-[var(--galaxy)] hover:bg-gray-50'
              }`}
            >
              <ChevronLeft size={14} />
              Back
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-[var(--galaxy)] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Save size={14} />
              Save
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="flex items-center gap-1.5 px-4 py-2 bg-[var(--planetary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--sapphire)] transition-colors"
              >
                Next
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <Download size={14} />
                Download PDF
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Resume Preview */}
      <div className="w-1/2 bg-gray-100 overflow-y-auto">
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm min-h-[297mm] max-w-[210mm] mx-auto p-6" style={{aspectRatio: '210/297'}}>
            {/* Resume Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
              <h1 className="text-2xl font-bold text-[var(--galaxy)] mb-2">
                {resumeData.personalInfo.name || 'Your Name'}
              </h1>
              <p className="text-[var(--planetary)] text-base mb-3">
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
    </div>
  );
}