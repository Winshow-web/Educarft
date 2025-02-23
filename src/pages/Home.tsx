import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LiveSupport } from '../components/LiveSupport';
import { GraduationCap, Globe, Users, BookOpen } from 'lucide-react';

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100">
      <div className="mb-6 text-[#1a0b2e]">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export function HomePage() {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse 4s ease-in-out infinite;
          }
          .animate-fade-in {
            animation: slideIn 1s ease-out forwards;
          }
          .gradient-text {
            background: linear-gradient(45deg, #1a0b2e, #6000ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      {/* Hero Section */}
      <header className="relative min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden">
        <Navbar />

        <div className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
          <div className="flex-1 flex items-center px-4 lg:px-20 py-12 lg:py-0">
            <div className="max-w-2xl mx-auto lg:mx-0 animate-on-scroll opacity-0">
              <h1 
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 lg:mb-8 gradient-text leading-tight animate-pulse-slow text-center lg:text-left"
              >
                EduCraft: Your Pathway to Global Education
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 lg:mb-12 leading-relaxed animate-on-scroll opacity-0 text-center lg:text-left" style={{animationDelay: '0.3s'}}>
                Embrace the flexibility to study anywhere, anytime. Join a community of global learners and unlock your potential with world-class education opportunities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-on-scroll opacity-0" style={{animationDelay: '0.6s'}}>
                <Link 
                  to="/programs"
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white bg-[#1a0b2e] hover:bg-[#2a1b3e] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  Explore courses
                </Link>
              </div>
            </div>
          </div>
          
          {/* Animated Illustration */}
          <div className="hidden lg:block flex-1 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Animated Globe */}
              <div className="absolute top-20 left-20 animate-float" style={{animationDelay: '0.2s'}}>
                <div className="w-24 h-24 bg-[#6000ff] rounded-full flex items-center justify-center">
                  <Globe className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Animated Graduation Cap */}
              <div className="absolute top-40 right-40 animate-float" style={{animationDelay: '0.4s'}}>
                <div className="w-20 h-20 bg-[#00d5ff] rounded-full flex items-center justify-center">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Animated Book */}
              <div className="absolute bottom-40 left-40 animate-float" style={{animationDelay: '0.6s'}}>
                <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Animated Users */}
              <div className="absolute bottom-60 right-60 animate-float" style={{animationDelay: '0.8s'}}>
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Footer />
      <LiveSupport />
    </>
  );
}