'use client';
import { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Save,
  Eye,
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
  Trash2
} from 'lucide-react';
import ResumePreview from './ResumePreview';

export default function ResumeBuilder({ defaultData, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  
  // Resume data state
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: defaultData.name,
      rollNumber: defaultData.rollNumber,
      branch: defaultData.branch,
      currentYear: defaultData.currentYear,
      cgpa: defaultData.cgpa,
      institute: defaultData.instituteName
    },
    contactInfo: {
      email: defaultData.email,
      phone: defaultData.phone,
      location: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    workExperience: [],
    education: [
      {
        degree: `B.Tech in ${defaultData.branch}`,
        institution: defaultData.instituteName,
        startDate: defaultData.admissionDate,
        endDate: '2028-05-31',
        cgpa: defaultData.cgpa
      }
    ],
    skills: [],
    projects: [],
    certifications: defaultData.validatedCertificates.map(cert => ({
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

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--galaxy)]">Resume Builder</h1>
          <p className="text-[var(--planetary)] text-sm mt-1">
            Customize your resume with additional information
          </p>
        </div>
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Eye size={16} />
          View Default Resume
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-[var(--galaxy)]">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-[var(--planetary)]">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[var(--planetary)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  currentStep === index
                    ? 'bg-[var(--planetary)] text-white'
                    : currentStep > index
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                {step.title}
                {currentStep > index && <CheckCircle size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[var(--sky)] rounded-2xl flex items-center justify-center">
            <StepIcon className="text-[var(--planetary)]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--galaxy)]">{currentStepData.title}</h2>
            <p className="text-[var(--planetary)] text-sm">Fill in your details below</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Info Step */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      personalInfo: { ...resumeData.personalInfo, name: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Roll Number</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.rollNumber}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Branch</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.branch}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Current Year</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.currentYear}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">CGPA</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.cgpa}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Institute</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.institute}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Info Step */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Email</label>
                  <input
                    type="email"
                    value={resumeData.contactInfo.email}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      contactInfo: { ...resumeData.contactInfo, email: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                <div key={index} className="border border-gray-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[var(--galaxy)]">Experience {index + 1}</h3>
                    <button
                      onClick={() => removeWorkExperience(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Company</label>
                      <input
                        type="text"
                        value={work.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Role</label>
                      <input
                        type="text"
                        value={work.role}
                        onChange={(e) => updateWorkExperience(index, 'role', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        placeholder="Job Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Start Date</label>
                      <input
                        type="date"
                        value={work.startDate}
                        onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">End Date</label>
                      <input
                        type="date"
                        value={work.endDate}
                        onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Description</label>
                    <textarea
                      value={work.description}
                      onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addWorkExperience}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center"
              >
                <Plus size={18} />
                Add Work Experience
              </button>
            </div>
          )}

          {/* Education Step */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[var(--galaxy)]">Education {index + 1}</h3>
                    {index > 0 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        placeholder="B.Tech in Computer Science"
                        readOnly={index === 0}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        placeholder="University Name"
                        readOnly={index === 0}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Start Date</label>
                      <input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        readOnly={index === 0}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">End Date</label>
                      <input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        readOnly={index === 0}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">CGPA/Percentage</label>
                      <input
                        type="text"
                        value={edu.cgpa}
                        onChange={(e) => updateEducation(index, 'cgpa', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        placeholder="8.5 or 85%"
                        readOnly={index === 0}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center"
              >
                <Plus size={18} />
                Add Education
              </button>
            </div>
          )}

          {/* Skills Step */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--galaxy)] text-sm">Skill {index + 1}</h3>
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Skill Name</label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                          placeholder="e.g., JavaScript, Python"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Proficiency</label>
                        <select
                          value={skill.proficiency}
                          onChange={(e) => updateSkill(index, 'proficiency', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center"
              >
                <Plus size={18} />
                Add Skill
              </button>
            </div>
          )}

          {/* Projects Step */}
          {currentStep === 5 && (
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[var(--galaxy)]">Project {index + 1}</h3>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Project Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                        placeholder="Describe your project, technologies used, and key features..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">GitHub Link</label>
                        <input
                          type="url"
                          value={project.githubLink}
                          onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                          placeholder="https://github.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Live Demo URL</label>
                        <input
                          type="url"
                          value={project.liveDemo}
                          onChange={(e) => updateProject(index, 'liveDemo', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                          placeholder="https://yourproject.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addProject}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center"
              >
                <Plus size={18} />
                Add Project
              </button>
            </div>
          )}

          {/* Certifications Step */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Verified Certifications</h4>
                    <p className="text-blue-700 text-sm">
                      These certifications are automatically included from your validated activities.
                      They have been verified by faculty members.
                    </p>
                  </div>
                </div>
              </div>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="border border-green-200 bg-green-50 rounded-2xl p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-[var(--galaxy)]">{cert.name}</h3>
                        <CheckCircle className="text-green-600" size={16} />
                      </div>
                      <p className="text-[var(--planetary)] font-medium text-sm mb-2">{cert.achievement}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
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
              {/* Languages Section */}
              <div>
                <h3 className="font-semibold text-[var(--galaxy)] mb-4">Languages</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumeData.additionalInfo.languages.map((lang, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[var(--galaxy)] text-sm">Language {index + 1}</h4>
                          <button
                            onClick={() => removeLanguage(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Language</label>
                            <input
                              type="text"
                              value={lang.name}
                              onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                              placeholder="e.g., English, Hindi"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Proficiency</label>
                            <select
                              value={lang.proficiency}
                              onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
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
                  </div>
                  <button
                    onClick={addLanguage}
                    className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center"
                  >
                    <Plus size={18} />
                    Add Language
                  </button>
                </div>
              </div>

              {/* Interests Section */}
              <div>
                <h3 className="font-semibold text-[var(--galaxy)] mb-4">Interests</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumeData.additionalInfo.interests.map((interest, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[var(--galaxy)] text-sm">Interest {index + 1}</h4>
                          <button
                            onClick={() => removeInterest(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Interest</label>
                            <input
                              type="text"
                              value={interest.name}
                              onChange={(e) => updateInterest(index, 'name', e.target.value)}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                              placeholder="e.g., Photography, Reading"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">Description (Optional)</label>
                            <input
                              type="text"
                              value={interest.description}
                              onChange={(e) => updateInterest(index, 'description', e.target.value)}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                              placeholder="Brief description"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addInterest}
                    className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[var(--planetary)] hover:text-[var(--planetary)] transition-colors w-full justify-center"
                  >
                    <Plus size={18} />
                    Add Interest
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-300 text-[var(--galaxy)] hover:bg-gray-50'
          }`}
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-[var(--galaxy)] rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          <Save size={18} />
          Save Progress
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--planetary)] text-white rounded-xl font-medium hover:bg-[var(--sapphire)] transition-colors"
          >
            Next
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            <Eye size={18} />
            Preview & Download
          </button>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <ResumePreview 
          resumeData={resumeData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}