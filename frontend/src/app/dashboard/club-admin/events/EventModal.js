import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Trophy,
  Award,
  Eye,
  Edit3,
  Trash2,
  Save,
  ChevronRight
} from 'lucide-react';

const EventModal = ({ 
  event, 
  isOpen, 
  onClose, 
  onDelete, 
  onEdit 
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !event) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
      onClose();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'upcoming':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'live':
        return 'bg-green-500';
      case 'active':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                {event.clubLogo}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--galaxy)]">{event.name}</h2>
                <p className="text-[var(--planetary)] font-medium">{event.club}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(event.status)}`}></div>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-xs font-medium">
                    <Star size={12} />
                    {event.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Edit3 size={14} />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Event Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Details */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <Calendar size={18} />
                  Event Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Calendar size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--planetary)] font-medium">Date</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Clock size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--planetary)] font-medium">Time</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <MapPin size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--planetary)] font-medium">Location</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Users size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--planetary)] font-medium">Capacity</p>
                      <p className="text-sm font-semibold text-[var(--galaxy)]">{event.totalSeats} seats</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Event */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-3">About the Event</h3>
                <p className="text-[var(--planetary)] leading-relaxed">{event.about}</p>
              </div>

              {/* Schedule and Awards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Schedule */}
                {event.schedule && event.schedule.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                      <Clock size={18} />
                      Event Schedule
                    </h3>
                    <div className="space-y-3">
                      {event.schedule.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                          <div className="w-16 h-12 bg-[var(--planetary)] text-white rounded-lg flex items-center justify-center">
                            <span className="text-xs font-semibold">{item.time}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--galaxy)]">{item.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards & Prizes */}
                {event.awards && event.awards.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                      <Trophy size={18} />
                      Awards & Prizes
                    </h3>
                    <div className="space-y-3">
                      {event.awards.map((award, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <Award size={14} className="text-white" />
                          </div>
                          <span className="text-sm font-medium text-[var(--galaxy)] flex-1">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Registration Stats */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl p-5 text-white">
                <h3 className="text-lg font-semibold mb-4">Registration Status</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Registered</span>
                      <span className="text-xl font-bold">{event.registrations || 0}</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Seats Left</span>
                      <span className="text-xl font-bold">{event.totalSeats - (event.registrations || 0)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(((event.registrations || 0) / event.totalSeats) * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-white rounded-full h-3 transition-all duration-300"
                      style={{ width: `${((event.registrations || 0) / event.totalSeats) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;