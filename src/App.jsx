import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import HeroSection from '@/components/HeroSection';
    import ServicesSection from '@/components/ServicesSection';
    import AppointmentForm from '@/components/AppointmentForm';
    import AboutSection from '@/components/AboutSection';
    import ContactSection from '@/components/ContactSection';
    import Footer from '@/components/Footer';
    import AdminDashboard from '@/pages/AdminDashboard';
    import AdminLogin from '@/pages/AdminLogin';

    const HomePage = () => (
      <>
        <HeroSection />
        <ServicesSection />
        <AppointmentForm />
        <AboutSection />
        <ContactSection />
      </>
    );

    const ProtectedRoute = ({ children }) => {
      const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
      if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
      }
      return children;
    };

    function App() {
      return (
        <Router>
          <div className="flex flex-col min-h-screen bg-black text-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
            <Toaster />
          </div>
        </Router>
      );
    }

    export default App;