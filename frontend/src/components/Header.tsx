import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutConfirmationDialog from './LogoutConfirmationDialog';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

            <Button color="inherit" component={RouterLink} to="/about-diabetes" sx={{ fontWeight: 600 }}>
              About Diabetes
            </Button>

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
      
      <LogoutConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Header;