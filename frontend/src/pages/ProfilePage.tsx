import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Divider, Avatar } from '@mui/material';

const ProfilePage: React.FC = () => {
  // In a real app, you would get user data from your auth context or a state manager
  const [user, setUser] = useState({
    name: 'Test User', // Placeholder
    email: 'user@example.com', // Placeholder
  });

  const handleUpdateProfile = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Add API call to update user's name/email
    alert('Profile update functionality not yet implemented.');
  };

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Add API call to change the password
    alert('Change password functionality not yet implemented.');
  };

  return (
    <Container maxWidth="sm">
      {/* The 'py' property has been removed from the Box below. */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Avatar sx={{ width: 80, height: 80, margin: '0 auto 16px', bgcolor: 'primary.main' }}>
            <Typography variant="h3">{user.username.charAt(0).toUpperCase()}</Typography>
          </Avatar>
          <Typography variant="h4" component="h1" fontWeight="600" gutterBottom>
            {user.name}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {user.email}
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Edit Profile Form */}
          <Typography variant="h6" gutterBottom>Edit Information</Typography>
          <Box component="form" onSubmit={handleUpdateProfile} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              defaultValue={user.name}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              defaultValue={user.email}
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save Changes
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Change Password Form */}
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <Box component="form" onSubmit={handleChangePassword} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              name="currentPassword"
              label="Current Password"
              type="password"
            />
            <TextField
              margin="normal"
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Update Password
            </Button>
          </Box>

        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;