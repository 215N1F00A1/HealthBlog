import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import CreateEditPost from './pages/doctor/CreateEditPost';

const ProtectedRoute: React.FC<{ 
  element: React.ReactNode; 
  allowedRole?: 'doctor' | 'patient'; 
}> = ({ element, allowedRole }) => {
  const { user, isDoctor, isPatient } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRole === 'doctor' && !isDoctor) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRole === 'patient' && !isPatient) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/category/:categoryId" element={<BlogListPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          
          {/* Doctor Routes */}
          <Route 
            path="/doctor/dashboard" 
            element={
              <ProtectedRoute 
                element={<DoctorDashboard />} 
                allowedRole="doctor" 
              />
            } 
          />
          <Route 
            path="/doctor/create-post" 
            element={
              <ProtectedRoute 
                element={<CreateEditPost />} 
                allowedRole="doctor" 
              />
            } 
          />
          <Route 
            path="/doctor/edit-post/:id" 
            element={
              <ProtectedRoute 
                element={<CreateEditPost />} 
                allowedRole="doctor" 
              />
            } 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;