import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to your Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {user ? `Hello, ${user.email}` : 'Loading user data...'}
        </Typography>
        <Box>
          <Typography variant="h5" gutterBottom>
            Your Assessment History
          </Typography>
          <Typography variant="body1">
            Your past assessment results will appear here soon.
          </Typography>
          {/* In the future, a list or chart of past results will be rendered here. */}
        </Box>
      </Paper>
    </Container>
  );
};

export default DashboardPage;