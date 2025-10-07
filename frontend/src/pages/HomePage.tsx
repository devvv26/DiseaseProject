import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import heroIllustration from '../assets/health_illustration.svg'; // Using the new SVG

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#E8F5E9', py: 5, px: 3 }}> {/* Adjusted padding and removed border radius */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side: Text Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Take control of your health journey.
            </Typography>
            <Typography variant="h5" paragraph>
              Our quick and confidential assessment helps you understand your potential risk for diabetes and provides personalized insights.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate('/assessment')}
              sx={{ mt: 2 }}
            >
              Start Your Assessment
            </Button>
          </Grid>

          {/* Right Side: Illustration */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={heroIllustration}
              alt="A person managing their health with digital tools"
              sx={{
                width: '100%',
                maxWidth: '450px',
                display: 'block',
                mx: 'auto'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;