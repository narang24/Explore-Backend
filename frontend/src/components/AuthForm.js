'use client';
import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/navigation';
import Toast from './Toast';

const AuthForm = ({ onClose }) => {
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: '',
    clubName: ''
  });

  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let credentials = {};
      
      if (userType === 'student') {
        credentials = {
          rollNumber: formData.rollNumber,
          password: formData.password
        };
      } else {
        credentials = {
          clubName: formData.clubName,
          password: formData.password
        };
      }

      const result = await login(credentials);

      if (result.success) {
        setToast({
          message: `Welcome ${result.user.name || result.user.clubName}! Login successful.`,
          type: 'success'
        });
        
        setTimeout(() => {
          onClose();
          router.push('/dashboard');
        }, 1500);
      } else {
        setToast({
          message: result.message || 'Login failed. Please check your credentials.',
          type: 'error'
        });
      }
    } catch (error) {
      setToast({
        message: 'Network error. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-semibold text-[var(--galaxy)] mb-6">Login to Xplore</h2>

          {/* User Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'student'
                  ? 'bg-[var(--planetary)] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType('club')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'club'
                  ? 'bg-[var(--planetary)] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Club Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {userType === 'student' ? (
              <div>
                <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                  placeholder="Enter your roll number"
                  required
                />
              </div>
            ) : (
              <div>
                <label htmlFor="clubName" className="block text-sm font-medium text-gray-700 mb-1">
                  Club Name
                </label>
                <input
                  type="text"
                  id="clubName"
                  name="clubName"
                  value={formData.clubName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                  placeholder="Enter club name"
                  required
                />
              </div>
            )}

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--planetary)] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--planetary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--sapphire)] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Test Credentials:</p>
            <p>Student: CS21001 / student123</p>
            <p>Club Admin: Tech Club / admin123</p>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default AuthForm;