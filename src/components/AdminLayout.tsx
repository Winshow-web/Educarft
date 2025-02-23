import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';

export function AdminLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <AdminNavbar />}
      <Outlet />
    </div>
  );
}