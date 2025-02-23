import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/Home';
import { ProgramsPage } from './pages/Programs';
import { LoginPage } from './pages/Login';
import { AdminPage } from './pages/Admin';
import { AdminLayout } from './components/AdminLayout';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ApplicationForm } from './pages/ApplicationForm';
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/apply/:programId" element={<ApplicationForm />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/admin/login" replace />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}