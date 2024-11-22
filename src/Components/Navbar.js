import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/image.png" 
              alt="Locked-In Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-indigo-600">Locked-In</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
