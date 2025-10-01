'use client';
import { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  Plus,
  UserCheck,
  ExternalLink
} from 'lucide-react';

export default function ActivityDetailsModal({ isOpen, onClose, activity, onRegister }) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    experience: '',
    expectations: ''
  });

  if (!isOpen || !activity) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'registered': return 'bg-yellow-100 text-yellow-700';
      case 'available': return 'bg-purple-100 text-purple-700';
      case 'deadline-passed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} />;
      case 'in-progress': return <Clock size={14} />;
      case 'registered': return <Calendar size={14} />;
      case 'available': return <Plus size={14} />;
      case 'deadline-passed': return <X size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'registered': return 'Registered';
      case 'available': return 'Available';
      case 'deadline-passed': return 'Deadline Passed';
      default: return status;
    }
  };

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  const handleSubmitRegistration = () => {
    onRegister(activity, formData);
    setShowRegistrationForm(false);
    setFormData({ reason: '', experience: '', expectations: '' });
    onClose();
  };

  const isDeadlinePassed = (deadline) => {
    return deadline && new Date() > new Date(deadline);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-3xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100">
              {activity.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[var(--galaxy)] mb-2">{activity.title}</h2>
              <p className="text-[var(--planetary)] text-sm mb-3">{activity.organizer}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {getStatusIcon(activity.status)}
                  {getStatusText(activity.status)}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                  +{activity.credits} Credits
                </span>
                <span className="bg-[var(--sky)] text-[var(--planetary)] px-3 py-1.5 rounded-lg text-xs font-medium">
                  {activity.category}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">About this Activity</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-[var(--planetary)]" />
              <span className="text-xs font-medium text-gray-700">Location</span>
            </div>
            <p className="text-sm text-gray-900 font-medium">{activity.location}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Award size={14} className="text-[var(--planetary)]" />
              <span className="text-xs font-medium text-gray-700">Credits</span>
            </div>
            <p className="text-sm text-gray-900 font-medium">{activity.credits} Credits</p>
          </div>
        </div>

        {/* Progress Bar for In-Progress Activities */}
        {activity.status === 'in-progress' && activity.progress && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Course Progress</span>
              <span className="text-sm font-bold text-blue-700">{activity.progress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${activity.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Registration Info for Available Activities */}
        {activity.status === 'available' && activity.maxParticipants && !showRegistrationForm && (
          <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <h3 className="text-sm font-semibold text-purple-900 mb-3">Registration Information</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-700">
                <span className="font-bold">{activity.currentParticipants}</span> / {activity.maxParticipants} registered
              </span>
              <span className="text-sm font-medium text-purple-700">
                {activity.maxParticipants - activity.currentParticipants} spots remaining
              </span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2 mb-3">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(activity.currentParticipants / activity.maxParticipants) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-700">
                <strong>Deadline:</strong> {new Date(activity.registrationDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {isDeadlinePassed(activity.registrationDeadline) && (
                <span className="text-xs text-red-600 font-medium">Registration Closed</span>
              )}
            </div>
          </div>
        )}

        {/* Registration Form */}
        {showRegistrationForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Complete Your Registration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why are you interested in this activity? *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="Share your motivation and interest..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none text-sm"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant experience (if any)
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  placeholder="Describe any relevant background or experience..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none text-sm"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you expect to gain?
                </label>
                <textarea
                  value={formData.expectations}
                  onChange={(e) => setFormData({...formData, expectations: e.target.value})}
                  placeholder="Share your learning goals and expectations..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent resize-none text-sm"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showRegistrationForm ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              
              {activity.status === 'available' && !isDeadlinePassed(activity.registrationDeadline) && (
                <button
                  onClick={handleRegisterClick}
                  disabled={activity.currentParticipants >= activity.maxParticipants}
                  className="flex-1 px-4 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {activity.currentParticipants >= activity.maxParticipants ? 'Registration Full' : 'Register Now'}
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmitRegistration}
                disabled={!formData.reason.trim()}
                className="flex-1 px-4 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Registration
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}