import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Building2, GraduationCap, Users } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { useUniversities } from '../hooks/useUniversities';
import { UniversityModal } from '../components/UniversityModal';
import { AdminSidebar } from '../components/AdminSidebar';
import { ApplicationsPage } from './Applications';
import { useAuth } from '../context/AuthContext';
import type { University } from '../types/university';

export function AdminPage() {
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [activeSection, setActiveSection] = useState('universities');
  const navigate = useNavigate();
  const { universities, loading, error, updateUniversities } = useUniversities();
  const { logout } = useAuth();

  const handleSave = async (university: University) => {
    try {
      const updatedUniversities = editingUniversity
        ? universities.map(u => u.name === editingUniversity.name ? university : u)
        : [...universities, university];
      
      await updateUniversities(updatedUniversities);
      setEditingUniversity(null);
    } catch (err) {
      console.error('Error saving university:', err);
    }
  };

  const handleDelete = async (universityName: string) => {
    try {
      const updatedUniversities = universities.filter(u => u.name !== universityName);
      await updateUniversities(updatedUniversities);
    } catch (err) {
      console.error('Error deleting university:', err);
    }
  };

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = 
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.programs.some(prog => prog.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCountry = selectedCountry === 'all' || uni.country === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'applications':
        return <ApplicationsPage />;
      case 'universities':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">University Management</h1>
                <button
                  onClick={() => setEditingUniversity({
                    name: '',
                    logo: '',
                    description: '',
                    location: '',
                    country: '',
                    programs: [],
                    features: []
                  })}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add University
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Countries</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lithuania">Lithuania</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Universities</p>
                    <h3 className="text-2xl font-bold text-gray-900">{universities.length}</h3>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Programs</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {universities.reduce((acc, uni) => acc + uni.programs.length, 0)}
                    </h3>
                  </div>
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Countries</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {new Set(universities.map(uni => uni.country)).size}
                    </h3>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="divide-y divide-gray-200">
                {filteredUniversities.map((university) => (
                  <div key={university.name} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-medium text-gray-900 mr-4">{university.name}</h3>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {university.country}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{university.location}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Programs</h4>
                            <ul className="space-y-1">
                              {university.programs.map((program, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-center">
                                  <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                                  {program.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Features</h4>
                            <ul className="space-y-1">
                              {university.features.map((feature, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-center">
                                  <Plus className="w-4 h-4 mr-2 text-blue-600" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-4 ml-4">
                        <button
                          onClick={() => setEditingUniversity(university)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(university.name)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={logout}
        />
        
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>

      {/* Edit Modal */}
      {editingUniversity && (
        <UniversityModal
          university={editingUniversity}
          onSave={handleSave}
          onClose={() => setEditingUniversity(null)}
        />
      )}
    </div>
  );
}