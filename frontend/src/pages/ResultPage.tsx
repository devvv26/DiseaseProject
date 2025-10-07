import { useLocation, Link as RouterLink } from 'react-router-dom';
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

// A component to display the circular progress with a label in the middle
function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  const scoreColor = props.value > 50 ? 'error' : 'success';
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

const ResultPage = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <Alert severity="warning">
        No assessment result found. Please <RouterLink to="/assessment">complete the assessment</RouterLink> first.
      </Alert>
    );
  }

  const predictionText = result.prediction === 1 ? 'High Risk of Diabetes' : 'Low Risk of Diabetes';
  // FIX: Use 'result.confidence' which is sent from the backend, not 'risk_probability'.
  const riskPercentage = result.confidence || 0;
  const scoreColor = riskPercentage > 50 ? 'error.main' : 'success.main';

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
            <Typography variant="h5" component="p" sx={{ mt: 2, color: scoreColor, fontWeight: 'bold' }}>
              {predictionText}
            </Typography>
          </Grid>

          {/* Right Side: Details */}
          <Grid xs={12} md={7} sx={{ pl: { md: 4 } }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Key Factors in Your Result
            </Typography>
            <List dense>
              <ListItem><ListItemIcon><Warning color="warning"/></ListItemIcon><ListItemText primary="Body Mass Index (BMI) was a significant factor." /></ListItem>
              <ListItem><ListItemIcon><Warning color="warning"/></ListItemIcon><ListItemText primary="Age was a significant factor." /></ListItem>
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
            >
              Generate My Diet Plan
            </Button>
          </Grid>

        </Grid>
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 4, textAlign: 'center' }}>
          *Disclaimer: This tool provides a risk assessment based on provided data and is not a substitute for a professional medical diagnosis.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ResultPage;