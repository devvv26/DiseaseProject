import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';

// Define the height of the header for different screen sizes
const HEADER_HEIGHT_DESKTOP = '64px';
const HEADER_HEIGHT_MOBILE = '56px';

const Layout: React.FC = () => {
  // Get the current URL to check if we are on the homepage
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Box>
      <Header />
      <Box 
        component="main" 
        sx={{ 
          // THIS IS THE FINAL FIX:
          // We apply padding-top conditionally.
          // If it's the homepage, padding-top is 0. This removes the black bar.
          // For all other pages, we add padding-top to push their content below the header.
          pt: isHomePage ? 0 : {
            xs: HEADER_HEIGHT_MOBILE, // for mobile
            sm: HEADER_HEIGHT_DESKTOP  // for desktop
          }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;