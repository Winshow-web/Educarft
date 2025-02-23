import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Building2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-[#1a0b2e] py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full transform rotate-45"></div>
                <div className="absolute inset-0 bg-purple-600 rounded-full transform -rotate-45 opacity-70"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full transform translate-x-1 opacity-70"></div>
              </div>
              <span className="text-xl font-bold">Educraft</span>
            </div>
            <p className="text-sm text-gray-600">
              Empowering students to achieve their global education dreams.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600 flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                A PYXO Group Company
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Registration No: LV40203432220
              </p>
              <p className="text-xs text-gray-500">
                Address: Rupniecibas iela 19-2, Riga, LV-1010, Latvia
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase text-gray-900 mb-4">Navigation</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/" className="text-gray-600 hover:text-[#1a0b2e] transition">Home</Link>
              <Link to="/#about" className="text-gray-600 hover:text-[#1a0b2e] transition">About Us</Link>
              <Link to="/programs" className="text-gray-600 hover:text-[#1a0b2e] transition">Programs</Link>
              <Link to="/privacy-policy" className="text-gray-600 hover:text-[#1a0b2e] transition">Privacy Policy</Link>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm uppercase text-gray-900 mb-4">Contact & Connect</h3>
            <div className="space-y-3">
              <a 
                href="mailto:info@educrafters.eu" 
                className="flex items-center text-gray-600 hover:text-[#1a0b2e] transition"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">info@educrafters.eu</span>
              </a>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://www.instagram.com/educrafteu2000/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#1a0b2e] transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/educrafters.eu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#1a0b2e] transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-gray-600">
              © 2024 PYXO Group. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Learn without limits
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}