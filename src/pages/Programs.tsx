import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Search, Globe, Clock, BookOpen, Building2, ArrowRight, Users, DollarSign, RefreshCw } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LiveSupport } from '../components/LiveSupport';
import { useUniversities } from '../hooks/useUniversities';
import type { Program } from '../types/university';

interface ProgramWithUniversity extends Program {
  universityName: string;
  universityLogo: string;
  universityLocation: string;
  universityCountry: string;
}

export function ProgramsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [hoveredProgram, setHoveredProgram] = useState<string | null>(null);
  const { universities, loading, error, refreshUniversities } = useUniversities();

  const allPrograms: ProgramWithUniversity[] = useMemo(() => 
    universities.flatMap(uni => 
      uni.programs.map(prog => ({
        ...prog,
        universityName: uni.name,
        universityLogo: uni.logo,
        universityLocation: uni.location,
        universityCountry: uni.country
      }))
    ), [universities]
  );

  const languages = useMemo(() => 
    Array.from(new Set(allPrograms.map(prog => prog.language))).sort(),
    [allPrograms]
  );

  const countries = useMemo(() => 
    Array.from(new Set(universities.map(uni => uni.country))).sort(),
    [universities]
  );

  const filteredPrograms = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return allPrograms.filter(prog => {
      const matchesSearch = 
        prog.title.toLowerCase().includes(searchLower) ||
        prog.universityName.toLowerCase().includes(searchLower);
      
      const matchesCountry = selectedCountry === 'all' || prog.universityCountry === selectedCountry;
      const matchesLanguage = selectedLanguage === 'all' || prog.language === selectedLanguage;
      
      return matchesSearch && matchesCountry && matchesLanguage;
    });
  }, [allPrograms, searchQuery, selectedCountry, selectedLanguage]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <GraduationCap className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Programs</h2>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button
              onClick={() => refreshUniversities()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6000ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading amazing programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#1a0b2e] to-[#6000ff] bg-clip-text text-transparent">
            Discover Your Future
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Explore our comprehensive selection of programs designed to shape tomorrow's leaders
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6000ff] focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <select
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6000ff] focus:border-transparent transition-all"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="all">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <select
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6000ff] focus:border-transparent transition-all"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="all">All Languages</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => {
                const programId = `${program.universityName}-${program.title}`;
                return (
                  <div
                    key={programId}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    onMouseEnter={() => setHoveredProgram(programId)}
                    onMouseLeave={() => setHoveredProgram(null)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#1a0b2e] mb-3 line-clamp-2 hover:text-[#6000ff] transition-colors">
                            {program.title}
                          </h3>
                          <div className="flex items-center mb-2">
                            {program.universityLogo ? (
                              <img 
                                src={program.universityLogo} 
                                alt={program.universityName}
                                className="w-6 h-6 object-contain mr-2"
                              />
                            ) : (
                              <Building2 className="w-5 h-5 mr-2 text-[#6000ff]" />
                            )}
                            <p className="text-sm text-gray-600">{program.universityName}</p>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Globe className="w-4 h-4 mr-2 text-[#00d5ff]" />
                            {program.universityLocation}
                          </p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          hoveredProgram === programId ? 'bg-[#6000ff]' : 'bg-[#1a0b2e]'
                        }`}>
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Clock className="w-4 h-4 mr-2 text-[#6000ff]" />
                            <span className="text-sm font-medium">Duration</span>
                          </div>
                          <p className="text-sm text-[#1a0b2e]">{program.duration}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Globe className="w-4 h-4 mr-2 text-[#00d5ff]" />
                            <span className="text-sm font-medium">Language</span>
                          </div>
                          <p className="text-sm text-[#1a0b2e]">{program.language}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-gray-600 mb-1">
                            <BookOpen className="w-4 h-4 mr-2 text-[#6000ff]" />
                            <span className="text-sm font-medium">Intake</span>
                          </div>
                          <p className="text-sm text-[#1a0b2e]">{program.intake}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center text-gray-600 mb-1">
                            <DollarSign className="w-4 h-4 mr-2 text-[#00d5ff]" />
                            <span className="text-sm font-medium">Tuition</span>
                          </div>
                          <p className="text-sm text-[#1a0b2e]">{program.tuition}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-5 h-5 mr-2 text-[#6000ff]" />
                          <span className="text-sm">International Students</span>
                        </div>
                        <button
                          onClick={() => navigate(`/apply/${encodeURIComponent(program.universityName)}---${encodeURIComponent(program.title)}`)}
                          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-full text-white bg-[#1a0b2e] hover:bg-[#6000ff] transition-colors group text-sm"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Programs Found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <LiveSupport />
    </div>
  );
}