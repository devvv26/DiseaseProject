import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Alert, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Grid, 
  CircularProgress, 
  Container 
} from '@mui/material';
import type { CircularProgressProps } from '@mui/material/CircularProgress';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Warning from '@mui/icons-material/Warning';
import DietPlanModal from '../components/DietPlanModal'; // NEW: Import the modal

// A component to display the circular progress with a label in the middle
function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  // FIX: Add 'warning' color for mid-range risk to match the text color
  const scoreColor = props.value > 50 ? 'error' : (props.value > 25 ? 'warning' : 'success');
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} size={150} thickness={4} color={scoreColor} />
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
        <Typography variant="h4" component="div" color="text.primary" sx={{fontWeight: 'bold'}}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

// Define a type for the state passed from the previous page for better type safety
interface LocationState {
  result: {
    prediction: number;
    confidence: number;
    factors: string[]; // Add factors array from the backend
  };
}

const ResultPage = () => {
  const location = useLocation();
  // Safely access the result with the defined type
  const result = (location.state as LocationState)?.result;

  // NEW: State for diet plan modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [isDietLoading, setIsDietLoading] = useState(false);

  // NEW: Function to fetch diet plan
  const handleGenerateDietPlan = async () => {
    setIsModalOpen(true);
    setIsDietLoading(true);
    try {
      // We'll pass the prediction class to the backend to get a tailored plan
      const response = await fetch(`http://localhost:8000/generate-diet-plan?risk_level=${result.prediction}`);
      if (!response.ok) {
        throw new Error('Failed to fetch diet plan');
      }
      const data = await response.json();
      setDietPlan(data.diet_plan);
    } catch (error) {
      console.error("Error generating diet plan:", error);
      // You could set an error state here to show in the modal
    } finally {
      setIsDietLoading(false);
    }
  };


  if (!result) {
    return (
      <Alert severity="warning">
        No assessment result found. Please <RouterLink to="/assessment">complete the assessment</RouterLink> first.
      </Alert>
    );
  }

  // NEW: Handle the 3 prediction classes from the new model
  const getPredictionText = (prediction: number) => {
    if (prediction === 2) {
      return 'High Risk of Diabetes';
    }
    if (prediction === 1) {
      return 'Potential Risk of Prediabetes';
    }
    return 'Low Risk of Diabetes';
  };

  const predictionText = getPredictionText(result.prediction);
  const riskPercentage = result.confidence || 0;
  const scoreTextColor = riskPercentage > 50 ? 'error.main' : (riskPercentage > 25 ? 'warning.main' : 'success.main');

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
        <Grid container spacing={4}>
          {/* Left Side: Result */}
          <Grid xs={12} md={5} sx={{ textAlign: 'center', borderRight: { md: '1px solid rgba(255, 255, 255, 0.12)' }, pr: { md: 4 } }}>
            <Typography variant="h6" component="h2" sx={{ color: 'text.secondary', mb: 2 }}>
              Your Result
            </Typography>
            <CircularProgressWithLabel value={riskPercentage} />
            <Typography variant="h5" component="p" sx={{ mt: 2, color: scoreTextColor, fontWeight: 'bold' }}>
              {predictionText}
            </Typography>
          </Grid>

          {/* Right Side: Details */}
          <Grid xs={12} md={7} sx={{ pl: { md: 4 } }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Key Factors in Your Result
            </Typography>
            {/* NEW: Dynamically display risk factors from the backend */}
            <List dense>
              {result.factors && result.factors.length > 0 ? (
                result.factors.map((factor, index) => (
                  <ListItem key={index}>
                    <ListItemIcon><Warning color="warning" /></ListItemIcon>
                    <ListItemText primary={`${factor} was a significant factor.`} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="No significant risk factors identified." />
                </ListItem>
              )}
            </List>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Recommended Next Steps
            </Typography>
            <List dense>
              <ListItem><ListItemIcon><CheckCircle color="success"/></ListItemIcon><ListItemText primary="Consult with a healthcare professional to discuss your results." /></ListItem>
              <ListItem><ListItemIcon><CheckCircle color="success"/></ListItemIcon><ListItemText primary="Explore personalized diet and lifestyle changes." /></ListItem>
            </List>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              sx={{ mt: 3 }}
              onClick={handleGenerateDietPlan} // NEW: Add onClick handler
            >
              Generate My Diet Plan
            </Button>
          </Grid>

        </Grid>
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 4, textAlign: 'center' }}>
          *Disclaimer: This tool provides a risk assessment based on provided data and is not a substitute for a professional medical diagnosis.
        </Typography>
      </Paper>

      {/* NEW: Render the modal */}
      <DietPlanModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dietPlan={dietPlan}
        isLoading={isDietLoading}
      />
    </Container>
  );
};

export default ResultPage;