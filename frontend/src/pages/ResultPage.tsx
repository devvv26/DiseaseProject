import React, { useEffect, useState } from 'react'; // Ensure useState is imported
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom'; // Ensure RouterLink is imported
import {
  Box, Container, Typography, Button, Paper, List, ListItem, ListItemIcon, ListItemText,
  CircularProgress, circularProgressClasses, type CircularProgressProps, Alert, Modal, Grid // Ensure Modal and Grid are imported
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { motion } from 'framer-motion';

// A component to display the circular progress with a label in the middle
function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  const { value, ...other } = props;
  let color: CircularProgressProps['color'] = 'primary';
  if (value > 70) {
    color = 'error';
  } else if (value > 30) {
    color = 'warning';
  } else {
    color = 'success'; // Default to success for low risk
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={150}
        thickness={4}
        {...other}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={150}
        thickness={4}
        {...other}
        value={value}
        color={color}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

// Define a type for the state passed from the previous page for better type safety
interface LocationState {
  result: {
    prediction: number; // 0, 1, or 2
    probability: number; // 0.0 to 1.0
    factors: string[];
  };
}

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- FIX IS HERE: Safely destructure the nested 'result' object ---
  const { result } = (location.state || {}) as { result?: LocationState['result'] };
  const prediction = result?.prediction;
  const probability = result?.probability;
  const factors = result?.factors;
  // --- END FIX ---

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dietPlan, setDietPlan] = useState<string[] | null>(null);
  const [isDietLoading, setIsDietLoading] = useState(false);

  useEffect(() => {
    // If no prediction data is found, redirect to the assessment page
    if (prediction === undefined || probability === undefined) {
      navigate('/assessment', { replace: true });
    }
  }, [prediction, probability, navigate]);

  // Display a message if no result is found (e.g., direct navigation)
  if (prediction === undefined || probability === undefined) {
    return (
      <Container maxWidth="md" sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No assessment result found. Please complete the assessment first.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/assessment')}>
          Go to Assessment
        </Button>
      </Container>
    );
  }

  const handleGenerateDietPlan = async () => {
    setIsModalOpen(true);
    setIsDietLoading(true);
    try {
      // Use result.prediction (0, 1, or 2) for the diet plan logic
      const response = await fetch(`http://localhost:8000/generate-diet-plan?risk_level=${prediction}`); // Use 'prediction' directly
      if (!response.ok) {
        throw new Error('Failed to fetch diet plan');
      }
      const data = await response.json();
      setDietPlan(data.diet_plan);
    } catch (error) {
      console.error("Error generating diet plan:", error);
      setDietPlan(["Failed to load diet plan. Please try again later."]); // Provide fallback message
    } finally {
      setIsDietLoading(false);
    }
  };

  const riskPercentage = Math.round(probability * 100); // Convert probability to percentage

  let riskLevelText = '';
  let scoreTextColor = 'success.main';
  let mainIcon = <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />;

  if (riskPercentage > 70) { // High Risk
    riskLevelText = 'High Risk of Diabetes';
    scoreTextColor = 'error.main';
    mainIcon = <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />;
  } else if (riskPercentage > 30) { // Moderate Risk
    riskLevelText = 'Moderate Risk of Diabetes';
    scoreTextColor = 'warning.main';
    mainIcon = <WarningAmberIcon color="warning" sx={{ fontSize: 40 }} />;
  } else { // Low Risk
    riskLevelText = 'Low Risk of Diabetes';
    scoreTextColor = 'success.main';
    mainIcon = <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: '16px', bgcolor: 'background.paper', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
          <Grid container spacing={4}>
            {/* Left Side: Result */}
            <Grid item xs={12} md={5} sx={{ textAlign: 'center', borderRight: { md: '1px solid rgba(0,0,0,0.12)' }, pr: { md: 4 } }}>
              <Typography variant="h6" component="h2" sx={{ color: 'text.secondary', mb: 2 }}>
                Your Risk Score
              </Typography>
              <CircularProgressWithLabel value={riskPercentage} />
              <Typography variant="h5" component="p" sx={{ mt: 2, color: scoreTextColor, fontWeight: 'bold' }}>
                {riskLevelText}
              </Typography>
              <Box sx={{ mt: 3 }}>
                {mainIcon}
                <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
                  Based on your answers, there is a **{riskPercentage}% chance** you may develop diabetes.
                </Typography>
              </Box>
            </Grid>

            {/* Right Side: Details */}
            <Grid item xs={12} md={7} sx={{ pl: { md: 4 } }}>
              <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Understanding Your Result
              </Typography>

              {factors && factors.length > 0 && (
                <Box sx={{ mt: 3, textAlign: 'left' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Key Risk Factors Identified:
                  </Typography>
                  <List>
                    {factors.map((factor, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <WarningAmberIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText primary={factor} />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    It's important to discuss these factors with a healthcare professional.
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateDietPlan}
                  disabled={isDietLoading}
                >
                  {isDietLoading ? <CircularProgress size={24} /> : 'Get Diet Plan'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/assessment', { replace: true })}
                >
                  Retake Assessment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Diet Plan Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="diet-plan-modal-title"
        aria-describedby="diet-plan-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <Typography id="diet-plan-modal-title" variant="h6" component="h2" gutterBottom>
            Personalized Diet Plan
          </Typography>
          {isDietLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List id="diet-plan-modal-description">
              {dietPlan && dietPlan.length > 0 ? (
                dietPlan.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))
              ) : (
                <Typography>No specific diet plan available at this moment.</Typography>
              )}
            </List>
          )}
          <Button onClick={() => setIsModalOpen(false)} sx={{ mt: 3 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ResultPage;