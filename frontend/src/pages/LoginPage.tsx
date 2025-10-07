import { Box, Typography, Container } from '@mui/material';

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for your login form.
        </Typography>
        {/* You would add your actual login form components here */}
      </Box>
    </Container>
  );
};

export default LoginPage;