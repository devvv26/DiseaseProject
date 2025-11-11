import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import the animation library
import RestaurantIcon from '@mui/icons-material/Restaurant';

// A high-quality, relevant background image for the hero section.
const heroImageUrl = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Animation variants for sections that fade in on scroll
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <Box>
      {/* --- Hero Section (Now Fullscreen) --- */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh', // Changed to fullscreen
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)', // Darkens the image to make text readable
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" component="h1" fontWeight="700">
            The Path to Understanding Diabetes Starts Here
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
            No matter where you are in your journey, here's where you need to be.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/assessment')}
          >
            Take the Free Assessment
          </Button>
        </Container>
      </Box>

      {/* --- "Are you at risk?" Section (Updated) --- */}
      {/* <Box sx={{ bgcolor: '#263238', color: 'white', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Paper
              elevation={0}
              sx={{
                bgcolor: 'transparent',
                p: 4,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {/* <Box>
                <Typography variant="h4" component="h2" fontWeight="600">
                  Are you at risk?
                </Typography>
                <Typography sx={{ mt: 1, maxWidth: '600px' }}>
                  Understanding your personal risk is the key to proactive health. Our quick assessment helps identify your risk for Type 2 diabetes and provides the first step on your wellness journey.
                </Typography>
              </Box> */}
              {/* <Box sx={{ flexShrink: 0 }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate('/assessment')}
                >
                  Take the Test
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box> */} 

      {/* --- NEW: Food & Diet Plan Section --- */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <RestaurantIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h2" fontWeight="600">
              Personalized Food & Diet Plans
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
              Coming Soon
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '500px', mx: 'auto' }}>
              We are developing a state-of-the-art tool to provide you with personalized meal plans and nutritional guidance to help you manage your health effectively.
            </Typography>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;