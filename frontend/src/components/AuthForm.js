'use client';
import { useState } from 'react';
import Button from './Button';
import InputField from './InputField';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthForm({ onClose }) {
  const { login, register } = useAuth();
  const router = useRouter();
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rollNumber: '',
    password: '',
    confirmPassword: '',
    clubName: '',
    adminPassword: '',
    rememberMe: false,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      let result;
      
      // Login logic
      const loginData = userType === 'student' 
        ? { rollNumber: formData.rollNumber, password: formData.password }
        : { clubName: formData.clubName, password: formData.adminPassword };
      
      result = await login(loginData);

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-[var(--galaxy)]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[17px] font-semibold">
              Welcome back to <span className='text-xl font-bold'>Xplore</span> !
            </h2>
            <button
              onClick={onClose}
              className="hover:bg-[var(--galaxy)]/10 p-1.5 rounded-lg cursor-pointer"
            >
              <X size={20}/>
            </button>
          </div>

          {/* User Type Toggle (only for login) */}
          <div className="flex bg-[var(--galaxy)]/10 text-[15px] rounded-2xl p-0.5 mb-6">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`flex-1 p-2 rounded-2xl font-medium transition-all cursor-pointer ${
                userType === 'student'
                  ? 'bg-white font-semibold shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType('clubAdmin')}
              className={`flex-1 p-2 rounded-2xl font-medium transition-all cursor-pointer ${
                userType === 'clubAdmin'
                  ? 'bg-white font-semibold shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
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

          <form onSubmit={handleSubmit} className="space-y-4">

            {userType === 'clubAdmin' && (
              <div>
                <label className="block text-sm font-medium text-[var(--galaxy)] mb-1 px-1">
                  Club Name
                </label>
                <InputField
                  type="text"
                  value={formData.clubName}
                  onChange={(e) => handleInputChange('clubName', e.target.value)}
                  placeholder="Enter your club name"
                  required
                />
                {errors.clubName && (
                  <p className="text-red-600 text-xs mt-1 px-1">{errors.clubName}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--galaxy)] mb-1 px-1">
                  Roll Number
              </label>
                <InputField
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  placeholder="Roll Number"
                  required
                />
                {errors.rollNumber && (
                  <p className="text-red-600 text-xs mt-1 px-1">{errors.rollNumber}</p>
                )}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-[var(--galaxy)] mb-1 px-1">
                  Password
              </label>
              <div className="relative">
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  value={userType === 'clubAdmin' ? formData.adminPassword : formData.password}
                  onChange={(e) => handleInputChange(userType === 'clubAdmin' ? 'adminPassword' : 'password', e.target.value)}
                  placeholder='Password'
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
                <p className="text-red-600 text-xs mt-1 px-1">{errors.password}</p>
              )}
              {errors.adminPassword && (
                <p className="text-red-600 text-xs mt-1 px-1">{errors.adminPassword}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between px-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="w-4 h-4 accent-[var(--planetary)] text-[var(--planetary)] border-gray-300 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-[var(--galaxy)]">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-[var(--galaxy)] cursor-pointer"
                  >
                    Forgot Password?
                  </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--galaxy)]/90 text-[15px] text-white py-3 cursor-pointer mt-4 md:mt-6 rounded-xl tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}