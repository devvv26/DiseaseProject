import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();

  // If there is a logged-in user, render the child route's content via the Outlet.
  // Otherwise, redirect the user to the authentication page.
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;