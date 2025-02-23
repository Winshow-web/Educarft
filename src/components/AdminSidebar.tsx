import React from 'react';
import { Building2, GraduationCap, Users, Settings, LogOut } from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeSection, onSectionChange, onLogout }: AdminSidebarProps) {
  const sidebarItems: SidebarItem[] = [
    {
      icon: <Building2 className="w-5 h-5" />,
      label: 'Universities',
      onClick: () => onSectionChange('universities'),
      active: activeSection === 'universities'
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: 'Programs',
      onClick: () => onSectionChange('programs'),
      active: activeSection === 'programs'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Applications',
      onClick: () => onSectionChange('applications'),
      active: activeSection === 'applications'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      onClick: () => onSectionChange('settings'),
      active: activeSection === 'settings'
    }
  ];

  return (
    <div className="w-64 bg-white h-full shadow-lg flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#1a0b2e]">Admin Dashboard</h2>
      </div>
      
      <nav className="flex-1">
        <div className="px-4">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                item.active
                  ? 'bg-[#1a0b2e] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}