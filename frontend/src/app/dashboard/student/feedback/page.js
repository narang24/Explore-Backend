'use client';
import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  Hash, 
  RefreshCw
} from 'lucide-react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    rollNumber: '',
    message: '',
    rating: 0
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
    if (errors.rating) {
      setErrors(prev => ({
        ...prev,
        rating: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Required';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';
    if (formData.rating === 0) newErrors.rating = 'Required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        rollNumber: '',
        message: '',
        rating: 0
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center max-w-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--galaxy)] mb-2">Thanks for the feedback!</h3>
            <p className="text-[var(--planetary)] text-sm">Your response has been recorded.</p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--galaxy)]">Feedback</h1>
          <p className="text-[var(--planetary)] text-sm mt-1">Share your experience with us</p>
        </div>

        {/* Main Form - Compact */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--sky)] rounded-xl flex items-center justify-center">
                  <MessageSquare className="text-[var(--planetary)]" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--galaxy)]">Share Your Feedback</h2>
                  <p className="text-[var(--planetary)] text-sm">Help us improve our services</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Form Fields in Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm ${
                          errors.fullName ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Enter your name"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm ${
                          errors.email ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="your.email@college.edu"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm ${
                          errors.phoneNumber ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                  </div>

                  {/* Roll Number */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">
                      Roll Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleInputChange}
                        className={`w-full pl-9 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm ${
                          errors.rollNumber ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="22CS001"
                      />
                    </div>
                    {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star 
                          size={20}
                          className={`transition-colors ${
                            star <= (hoveredRating || formData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-[var(--planetary)]">
                      {formData.rating > 0 && `${formData.rating} Star${formData.rating > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[var(--galaxy)] mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent bg-white text-sm resize-none ${
                      errors.message ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Your feedback (Optional)"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--planetary)] hover:bg-[var(--sapphire)] disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}