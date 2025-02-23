import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/admin');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <nav className={`relative z-10 ${isAdminPage ? 'text-gray-800' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full transform rotate-45"></div>
              <div className="absolute inset-0 bg-purple-600 rounded-full transform -rotate-45 opacity-70"></div>
              <div className="absolute inset-0 bg-green-500 rounded-full transform translate-x-1 opacity-70"></div>
            </div>
            <span className={`text-2xl font-bold ${
              isAdminPage ? 'text-gray-900' : 'text-[#1a0b2e]'
            }`}>
              Educraft
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-[#1a0b2e] transition font-medium ${
                isAdminPage ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/#about" 
              className={`hover:text-[#1a0b2e] transition font-medium ${
                isAdminPage ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              About us
            </Link>
            <Link 
              to="/programs" 
              className={`hover:text-[#1a0b2e] transition font-medium ${
                isAdminPage ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              Programs
            </Link>
            {isAdminPage && (
              <Link 
                to="/admin" 
                className="text-[#1a0b2e] font-medium hover:text-[#6000ff] transition"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleAuthClick}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-[#1a0b2e] hover:bg-[#6000ff] transition-colors"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {isAuthenticated ? 'Dashboard' : 'Login'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1a0b2e] hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1a0b2e] hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                to="/programs"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1a0b2e] hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </Link>
              {isAdminPage && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#1a0b2e] hover:text-[#6000ff] hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  handleAuthClick();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#1a0b2e] hover:text-[#6000ff] hover:bg-gray-50"
              >
                {isAuthenticated ? 'Dashboard' : 'Login'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}