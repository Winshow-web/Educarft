import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, LayoutDashboard } from 'lucide-react';

export function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/admin" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Admin Portal</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}