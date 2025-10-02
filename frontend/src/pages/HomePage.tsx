import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Understand Your Diabetes Risk in Minutes
        </Typography>

        <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4 }}>
          Our AI-powered tool provides a quick, confidential risk assessment and helps you take the next steps toward a healthier future.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/assessment"
        >
          Start Your Risk Assessment
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;