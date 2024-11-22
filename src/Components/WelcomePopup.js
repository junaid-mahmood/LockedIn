import React, { useState, useEffect } from 'react';
import { HiX, HiLightningBolt, HiUpload, HiPencil } from 'react-icons/hi';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <HiX className="text-xl" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">Welcome to Locked-In!</h2>
          <p className="text-gray-600">Your personal study companion for better learning</p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <HiUpload className="text-2xl text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Upload PDF Notes</h3>
              <p className="text-gray-600 text-sm">Convert your PDF study materials into interactive flashcards instantly</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HiPencil className="text-2xl text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Create Manually</h3>
              <p className="text-gray-600 text-sm">Create custom flashcards for your homework, tests, or exams</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <HiLightningBolt className="text-2xl text-indigo-600" />
            <h3 className="font-semibold text-gray-800">Get Started!</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Whether you're preparing for homework, tests, or exams, Locked-In helps you create and organize your study materials effectively.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          Start Creating Flashcards
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup; 