'use client';
import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/navigation';

export default function AuthForm({ onClose }) {
  const { login, register } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Student fields
    rollNumber: '',
    password: '',
    name: '',
    email: '',
    department: '',
    year: '',
    // Club fields
    clubName: '',
    adminPassword: '',
    description: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      let result;
      
      if (isLogin) {
        // Login
        const loginData = userType === 'student' 
          ? { rollNumber: formData.rollNumber, password: formData.password }
          : { clubName: formData.clubName, password: formData.adminPassword };
        
        result = await login(loginData);
      } else {
        // Register
        const registerData = userType === 'student'
          ? {
              rollNumber: formData.rollNumber,
              password: formData.password,
              name: formData.name,
              email: formData.email,
              department: formData.department,
              year: parseInt(formData.year)
            }
          : {
              clubName: formData.clubName,
              adminPassword: formData.adminPassword,
              description: formData.description,
              category: formData.category
            };
        
        result = await register(registerData);
      }

      if (result.success) {
        onClose();
        router.push('/dashboard');
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message });
        }
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      rollNumber: '',
      password: '',
      name: '',
      email: '',
      department: '',
      year: '',
      clubName: '',
      adminPassword: '',
      description: '',
      category: ''
    });
    setErrors({});
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const toggleUserType = (type) => {
    setUserType(type);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[var(--galaxy)]">
              {isLogin ? 'Welcome Back' : 'Join Xplore'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Type Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => toggleUserType('student')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'student'
                  ? 'bg-white text-[var(--planetary)] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => toggleUserType('club')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'club'
                  ? 'bg-white text-[var(--planetary)] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Club Admin
            </button>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {userType === 'student' ? (
              <>
                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent ${
                      errors.rollNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your roll number"
                    required
                  />
                  {errors.rollNumber && (
                    <p className="text-red-600 text-xs mt-1">{errors.rollNumber}</p>
                  )}
                </div>

                {/* Registration fields */}
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                        required
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent ${
                          errors.department ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Computer Science"
                        required
                      />
                      {errors.department && (
                        <p className="text-red-600 text-xs mt-1">{errors.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent ${
                          errors.year ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                      {errors.year && (
                        <p className="text-red-600 text-xs mt-1">{errors.year}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent pr-10 ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Club Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Club Name
                  </label>
                  <input
                    type="text"
                    name="clubName"
                    value={formData.clubName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent ${
                      errors.clubName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter club name"
                    required
                  />
                  {errors.clubName && (
                    <p className="text-red-600 text-xs mt-1">{errors.clubName}</p>
                  )}
                </div>

                {/* Registration fields for club */}
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent ${
                          errors.description ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Brief description of your club"
                        required
                      />
                      {errors.description && (
                        <p className="text-red-600 text-xs mt-1">{errors.description}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent ${
                          errors.category ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Technical">Technical</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Sports">Sports</option>
                        <option value="Academic">Academic</option>
                        <option value="Social">Social</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.category && (
                        <p className="text-red-600 text-xs mt-1">{errors.category}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Admin Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="adminPassword"
                      value={formData.adminPassword}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent pr-10 ${
                        errors.adminPassword ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter admin password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.adminPassword && (
                    <p className="text-red-600 text-xs mt-1">{errors.adminPassword}</p>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[var(--planetary)] to-[var(--sapphire)] hover:from-[var(--sapphire)] hover:to-[var(--planetary)] text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={toggleMode}
                className="ml-1 text-[var(--planetary)] hover:text-[var(--sapphire)] font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}