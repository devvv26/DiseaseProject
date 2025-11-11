import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    // This is the root container.
    <Box>
      <Header />
      <Box component="main">
        {/* 
          THIS IS THE FIX:
          All padding ('pt') and all conditional logic have been completely removed.
          The content for EVERY page will now start at the very top of the screen.
        */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;