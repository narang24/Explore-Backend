'use client';

import React from 'react';
import { X, Info, Clock } from 'lucide-react';

// Toast Component
export function Toast({ message, onClose, isVisible }) {
  if (!isVisible) return null;
  
  return (
    <>
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className="bg-white border-l-4 border-indigo-600 rounded-lg shadow-lg p-4 flex items-start space-x-3 max-w-md">
          <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Feature Coming Soon</p>
            <p className="text-sm text-gray-600 mt-1">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

// Modal Component
export function FeatureModal({ isOpen, onClose, featureName }) {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Feature Under Development
          </h3>
          
          <p className="text-gray-600 text-center mb-6">
            The <span className="font-medium text-indigo-600">{featureName}</span> feature 
            is currently being developed and will be available soon.
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}