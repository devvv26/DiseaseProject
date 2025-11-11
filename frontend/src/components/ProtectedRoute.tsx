import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();

  // The AuthProvider is still checking for a token in localStorage.
  // We show a loading spinner until the check is complete.
  // 'isAuthLoading' is a new state we will add to the context.
  if (auth.isAuthLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If loading is finished and there is no token, redirect to login.
  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If loading is finished and there is a token, show the requested page.
  return <Outlet />;
};

export default ProtectedRoute;