import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutConfirmationDialog from './LogoutConfirmationDialog';
import MegaMenu from './navigation/megaMenu';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // THIS IS THE FIX: Create a ref for the menu's trigger button.
  const megaMenuTriggerRef = useRef<HTMLButtonElement>(null);

  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [megaMenuAnchor, setMegaMenuAnchor] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const menuCloseTimer = useRef<number>();

  useEffect(() => {
    setMegaMenuAnchor(null);
  }, [location.pathname]);

  const handleMegaMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    clearTimeout(menuCloseTimer.current);
    setMegaMenuAnchor(event.currentTarget);
  };

  const handleMegaMenuClose = () => {
    menuCloseTimer.current = window.setTimeout(() => {
      setMegaMenuAnchor(null);
    }, 300);
  };

  const handleMegaMenuEnter = () => {
    clearTimeout(menuCloseTimer.current);
  };

  // THIS IS THE FIX: The navigation handler now correctly manages focus.
  const handleMenuNavigation = (path: string) => {
    // 1. Move focus back to the trigger button BEFORE closing the menu.
    megaMenuTriggerRef.current?.focus();
    // 2. Close the menu.
    setMegaMenuAnchor(null);
    // 3. Navigate to the new page.
    navigate(path);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleLogoutClick = () => {
    setDialogOpen(true);
    handleProfileMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    handleDialogClose();
    navigate('/');
  };

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 'bold' }}>
            HealthCheck
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/assessment" sx={{ fontWeight: 600 }}>
              Risk Assessment
            </Button>

            <Box onMouseLeave={handleMegaMenuClose}>
              {/* THIS IS THE FIX: Attach the ref to the trigger button. */}
              <Button ref={megaMenuTriggerRef} color="inherit" onMouseEnter={handleMegaMenuOpen} sx={{ fontWeight: 600 }}>
                About Diabetes
              </Button>
            </Box>

            <Button color="inherit" component={RouterLink} to="/about/diet-plan" sx={{ fontWeight: 600 }}>
              Food & Diet Plan
            </Button>
          </Box>

          {user ? (
            <>
              <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>{user.username.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
              <Menu anchorEl={profileMenuAnchor} open={Boolean(profileMenuAnchor)} onClose={handleProfileMenuClose}>
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button variant="contained" component={RouterLink} to="/auth">
              Login / Register
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <MegaMenu
        open={Boolean(megaMenuAnchor)}
        anchorEl={megaMenuAnchor}
        onClose={handleMegaMenuClose}
        onEnter={handleMegaMenuEnter}
        onNavigate={handleMenuNavigation}
      />
      
      <LogoutConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Header;