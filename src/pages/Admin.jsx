import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('admin') === 'true';

  useEffect(() => {
    // If not logged in and user is trying to access dashboard directly, redirect to login
    if (!isLoggedIn && window.location.pathname === '/admin/dashboard') {
      navigate('/admin');
    }
  }, [isLoggedIn, navigate]);

  // Show login page
  if (!isLoggedIn) {
    return <AdminLogin />;
  }

  // Show admin dashboard
  return <AdminDashboard />;
}