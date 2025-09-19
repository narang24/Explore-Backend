import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  FileBadge,
  Users,
  Star,
  Trophy,
  Award,
  Image as ImageIcon,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
  Medal,
  Certificate,
  Camera,
  FileText,
  UserCheck,
  Crown,
  Target,
  Gift
} from 'lucide-react';

const EventRecordModal = ({ 
  event, 
  isOpen, 
  onClose 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !event) return null;

  const getStatusColor = (status) => {
    return 'bg-gray-100 text-gray-700 border-gray-200'; // All past events are completed
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'participants', label: 'Participants', icon: Users },
    { id: 'officials', label: 'Officials', icon: UserCheck },
    { id: 'awards', label: 'Awards', icon: Trophy },
    { id: 'gallery', label: 'Gallery', icon: Camera }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
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
                    <p className="text-xs text-[var(--planetary)] font-medium">Total Participants</p>
                    <p className="text-sm font-semibold text-[var(--galaxy)]">{event.totalParticipants} students</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Event */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-3">About the Event</h3>
              <p className="text-[var(--planetary)] leading-relaxed">{event.about}</p>
            </div>

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
          </div>
        );

      case 'participants':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] flex items-center gap-2">
                  <Users size={18} />
                  Event Participants ({event.participants?.length || 0})
                </h3>
                <button className="flex items-center gap-2 px-3 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-sm font-medium transition-colors">
                  <Download size={14} />
                  Export List
                </button>
              </div>
              
              {event.participants && event.participants.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {event.participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-[var(--planetary)] text-white rounded-full flex items-center justify-center">
                        <User size={14} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--galaxy)]">{participant.name}</p>
                        <p className="text-xs text-[var(--planetary)]">{participant.rollNumber} • {participant.branch}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Certificate Issued
                        </span>
                        <button className="p-1 text-[var(--planetary)] hover:text-[var(--sapphire)] transition-colors">
                          <Download size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="text-gray-400 mx-auto mb-2" size={24} />
                  <p className="text-[var(--planetary)] text-sm">No participants recorded</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'officials':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] flex items-center gap-2">
                  <UserCheck size={18} />
                  Event Officials & Volunteers
                </h3>
              </div>
              
              {event.officials && event.officials.length > 0 ? (
                <div className="space-y-4">
                  {/* Organizers */}
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--galaxy)] mb-2">Event Organizers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {event.officials.filter(o => o.role === 'organizer').map((official, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <Crown size={14} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--galaxy)]">{official.name}</p>
                            <p className="text-xs text-[var(--planetary)]">{official.position} • {official.department}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Volunteers */}
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--galaxy)] mb-2">Volunteers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {event.officials.filter(o => o.role === 'volunteer').map((official, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <User size={14} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--galaxy)]">{official.name}</p>
                            <p className="text-xs text-[var(--planetary)]">{official.responsibility}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserCheck className="text-gray-400 mx-auto mb-2" size={24} />
                  <p className="text-[var(--planetary)] text-sm">No officials recorded</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'awards':
        return (
          <div className="space-y-6">
            {/* Winners */}
            {event.winners && event.winners.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                  <Trophy size={18} />
                  Winners & Runner-ups
                </h3>
                <div className="space-y-3">
                  {event.winners.map((winner, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        winner.position === '1st' ? 'bg-yellow-100 text-yellow-600' :
                        winner.position === '2nd' ? 'bg-gray-100 text-gray-600' :
                        winner.position === '3rd' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <Trophy size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-[var(--galaxy)]">{winner.name}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            winner.position === '1st' ? 'bg-yellow-100 text-yellow-700' :
                            winner.position === '2nd' ? 'bg-gray-100 text-gray-700' :
                            winner.position === '3rd' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {winner.position} Place
                          </span>
                        </div>
                        <p className="text-xs text-[var(--planetary)]">{winner.rollNumber} • {winner.prize}</p>
                      </div>
                      <button className="p-2 text-[var(--planetary)] hover:text-[var(--sapphire)] transition-colors">
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates & Awards */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-4 flex items-center gap-2">
                <Award size={18} />
                Certificates & Awards Issued
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileBadge  size={14} className="text-green-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--galaxy)]">Participation Certificates</h4>
                  </div>
                  <p className="text-2xl font-bold text-[var(--planetary)] mb-1">{event.totalParticipants || 0}</p>
                  <p className="text-xs text-gray-600">Issued to all participants</p>
                  <button className="mt-3 flex items-center gap-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-medium transition-colors">
                    <Download size={12} />
                    Download
                  </button>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Award size={14} className="text-yellow-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--galaxy)]">Merit Certificates</h4>
                  </div>
                  <p className="text-2xl font-bold text-[var(--planetary)] mb-1">{event.winners?.length || 0}</p>
                  <p className="text-xs text-gray-600">Issued to winners</p>
                  <button className="mt-3 flex items-center gap-1 px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium transition-colors">
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--galaxy)] flex items-center gap-2">
                  <Camera size={18} />
                  Event Gallery ({event.gallery?.length || 0} photos)
                </h3>
                <button className="flex items-center gap-2 px-3 py-2 bg-[var(--planetary)] hover:bg-[var(--sapphire)] text-white rounded-lg text-sm font-medium transition-colors">
                  <Download size={14} />
                  Download All
                </button>
              </div>
              
              {event.gallery && event.gallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {event.gallery.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => {
                        setSelectedImageIndex(index);
                        setShowImageModal(true);
                      }}
                    >
                      <img 
                        src={image.url} 
                        alt={image.caption || `Event photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Camera className="text-gray-400 mx-auto mb-3" size={32} />
                  <p className="text-[var(--planetary)] text-sm">No photos available</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  {event.clubLogo}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--galaxy)]">{event.name}</h2>
                  <p className="text-[var(--planetary)] font-medium">{event.club}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor('completed')}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                      Completed
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--sky)] text-[var(--planetary)] rounded-full text-xs font-medium">
                      <Star size={12} />
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-[var(--planetary)] cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mt-6 bg-gray-100 rounded-xl p-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-[var(--planetary)] shadow-sm'
                        : 'text-gray-600 hover:text-[var(--planetary)]'
                    }`}
                  >
                    <IconComponent size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && event.gallery && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60">
          <div className="max-w-4xl max-h-[90vh] w-full mx-4">
            <div className="relative">
              <img 
                src={event.gallery[selectedImageIndex]?.url} 
                alt={event.gallery[selectedImageIndex]?.caption || 'Event photo'}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Navigation */}
              <button
                onClick={() => setSelectedImageIndex(prev => 
                  prev > 0 ? prev - 1 : event.gallery.length - 1
                )}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={() => setSelectedImageIndex(prev => 
                  prev < event.gallery.length - 1 ? prev + 1 : 0
                )}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Caption */}
            {event.gallery[selectedImageIndex]?.caption && (
              <div className="mt-4 text-center">
                <p className="text-white text-sm">{event.gallery[selectedImageIndex].caption}</p>
              </div>
            )}
            
            {/* Counter */}
            <div className="mt-2 text-center">
              <p className="text-white/70 text-sm">
                {selectedImageIndex + 1} of {event.gallery.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventRecordModal;