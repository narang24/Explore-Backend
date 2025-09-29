import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Award,
  FileText,
  Download,
  Eye,
  Check,
  XCircle,
  MessageSquare,
  GraduationCap,
  Building,
  Tag,
  Paperclip,
  Image as ImageIcon,
  File,
  Play,
  ExternalLink,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const ApprovalModal = ({ 
  submission, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject 
}) => {
  const [remarks, setRemarks] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !submission) return null;

  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText size={16} className="text-red-500" />;
      case 'image':
        return <ImageIcon size={16} className="text-blue-500" />;
      case 'video':
        return <Play size={16} className="text-purple-500" />;
      case 'document':
        return <FileText size={16} className="text-blue-600" />;
      case 'archive':
        return <File size={16} className="text-orange-500" />;
      case 'code':
        return <File size={16} className="text-green-500" />;
      default:
        return <File size={16} className="text-gray-500" />;
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'image':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'video':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'document':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'archive':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'code':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const handleApprove = () => {
    onApprove(submission.id, remarks);
    setRemarks('');
  };

  const handleReject = () => {
    if (!remarks.trim()) {
      alert('Please provide remarks for rejection');
      return;
    }
    onReject(submission.id, remarks);
    setRemarks('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                {submission.studentName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--galaxy)]">{submission.studentName}</h2>
                <p className="text-[var(--planetary)] font-medium">{submission.rollNumber}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-xs font-medium">
                    <GraduationCap size={12} />
                    {submission.branch} - {submission.year}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                    <Award size={12} />
                    {submission.points} Points
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex gap-1">
            {[
              { id: 'details', label: 'Activity Details', icon: FileText },
              { id: 'documents', label: 'Supporting Documents', icon: Paperclip },
              { id: 'review', label: 'Review & Approval', icon: CheckCircle2 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[var(--planetary)] text-white'
                    : 'text-[var(--planetary)] hover:bg-white hover:text-[var(--sapphire)]'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Activity Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Activity Information */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <Award size={18} />
                  Activity Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--planetary)] font-medium">Activity Title</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{submission.activityTitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Tag size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--planetary)] font-medium">Category</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{submission.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Building size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--planetary)] font-medium">Organizing Club</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{submission.clubName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Calendar size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--planetary)] font-medium">Event Date</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">
                        {new Date(submission.eventDate).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-3">Activity Description</h3>
                <p className="text-[var(--planetary)] leading-relaxed">{submission.description}</p>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <Clock size={18} />
                  Submission Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar size={12} className="text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--galaxy)]">Event Conducted</p>
                      <p className="text-xs text-[var(--planetary)]">
                        {new Date(submission.eventDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText size={12} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--galaxy)]">Submission Received</p>
                      <p className="text-xs text-[var(--planetary)]">
                        {new Date(submission.submissionDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-dashed border-orange-300">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <AlertCircle size={12} className="text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--galaxy)]">Pending Review</p>
                      <p className="text-xs text-[var(--planetary)]">Awaiting faculty approval</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <Paperclip size={18} />
                  Supporting Documents ({submission.documents.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {submission.documents.map((doc, index) => (
                    <div key={index} className={`border-2 border-dashed rounded-xl p-4 ${getFileTypeColor(doc.type)}`}>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {getFileTypeIcon(doc.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{doc.size}</p>
                          <div className="flex gap-2 mt-3">
                            <button className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium transition-colors">
                              <Eye size={12} />
                              View
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium transition-colors">
                              <Download size={12} />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Preview Area */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4">Document Preview</h3>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <FileText size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-[var(--planetary)]">Select a document to preview</p>
                  <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, Images, Videos</p>
                </div>
              </div>

              {/* Document Verification Checklist */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Document Verification Checklist
                </h3>
                <div className="space-y-3">
                  {[
                    'Certificate/document is authentic and unmodified',
                    'Student name matches the submission',
                    'Event date is consistent with activity timeline',
                    'Document quality is clear and readable',
                    'All required supporting materials are provided'
                  ].map((item, index) => (
                    <label key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[var(--planetary)] focus:ring-[var(--planetary)]"
                      />
                      <span className="text-sm text-[var(--galaxy)]">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Review & Approval Tab */}
          {activeTab === 'review' && (
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <AlertCircle size={18} />
                  Current Status
                </h3>
                <div className="flex items-center gap-3 p-4 bg-orange-100 rounded-xl border border-orange-200">
                  <Clock size={20} className="text-orange-600" />
                  <div>
                    <p className="text-sm font-semibold text-orange-700">Pending Review</p>
                    <p className="text-xs text-orange-600">This submission is awaiting your approval</p>
                  </div>
                </div>
              </div>

              {/* Review Summary */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4">Review Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-[var(--galaxy)]">Student Details</p>
                    <p className="text-xs text-[var(--planetary)] mt-1">Verified ✓</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <FileText size={20} className="text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-[var(--galaxy)]">Documents</p>
                    <p className="text-xs text-[var(--planetary)] mt-1">{submission.documents.length} files</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Award size={20} className="text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-[var(--galaxy)]">Points</p>
                    <p className="text-xs text-[var(--planetary)] mt-1">{submission.points} eligible</p>
                  </div>
                </div>
              </div>

              {/* Remarks Section */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <MessageSquare size={18} />
                  Review Remarks
                </h3>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-[var(--planetary)] outline-none resize-none text-sm"
                  placeholder="Enter your remarks here (required for rejection, optional for approval)..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  Provide feedback about the submission. This will be visible to the student.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleApprove}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Check size={18} />
                  Approve Submission
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                >
                  <XCircle size={18} />
                  Reject Submission
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Review Guidelines</p>
                    <ul className="text-xs text-yellow-700 mt-2 space-y-1">
                      <li>• Verify all documents are authentic and unmodified</li>
                      <li>• Ensure student participation is clearly documented</li>
                      <li>• Check if the activity aligns with the claimed category</li>
                      <li>• Provide constructive feedback in remarks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;