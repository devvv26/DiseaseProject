import { useState, type ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stepper, Step, StepLabel, Button, Typography, Box, Container,
  TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  Select, MenuItem, InputLabel, CircularProgress, Alert
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  'Introduction',
  'Demographics',
  'BMI',
  'Core Health Indicators',
  'Lifestyle & Habits',
  'Overall Well-being',
  'Healthcare Access'
];

const AssessmentPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Fields for the model (ensure these are initialized with default values if not filled by user)
    HighBP: '', HighChol: '', BMI: '', GenHlth: '3', Age: '',
    PhysActivity: '', Fruits: '', Veggies: '', Sex: '',
    Stroke: '', HeartDiseaseorAttack: '', AnyHealthcare: '', NoDocbcCost: '',
    MentHlth: '', PhysHlth: '', DiffWalk: '',
    // Helper fields for the form
    height: '', weight: '',
  });

  useEffect(() => {
    const weightInKg = parseFloat(formData.weight);
    const heightInM = parseFloat(formData.height) / 100;
    if (weightInKg > 0 && heightInM > 0) {
      const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(2);
      setFormData(prevData => ({ ...prevData, BMI: bmiValue }));
    } else {
      setFormData(prevData => ({ ...prevData, BMI: '' }));
    }
  }, [formData.height, formData.weight]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name as string]: value
    }));
  };

  // --- THIS IS THE FIX: Update the payload type definition ---
  const submitAssessment = async (payload: {
    HighBP:number; HighChol:number; BMI:number; GenHlth:number; Age:number;
    PhysActivity:number; Fruits:number; Veggies:number; Sex:number;
    Stroke:number; HeartDiseaseorAttack:number; AnyHealthcare:number; NoDocbcCost:number;
    MentHlth:number; PhysHlth:number; DiffWalk:number;
  }) => {
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(()=>null);
        throw new Error(err?.detail || "Prediction failed");
      }
      const data = await res.json();
      // Navigate to the result page and pass prediction data
      navigate('/result', {
        state: {
          result: {
            prediction: data.prediction,
            probability: data.probability,
            factors: data.factors,
          }
        }
      });
    } catch (err) {
      console.error("Error submitting assessment:", err);
      // Propagate the error so handleNext can catch it and display the Alert
      throw err; 
    }
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setIsLoading(true);
      setError(null);
      
      try {
        // --- THIS IS THE UPDATED FIX ---
        // Create a payload with ALL the fields collected by the form.
        // Convert all values to numbers as expected by the backend.
        const payload = {
          HighBP: parseInt(formData.HighBP, 10),
          HighChol: parseInt(formData.HighChol, 10),
          BMI: parseFloat(formData.BMI),
          GenHlth: parseInt(formData.GenHlth, 10),
          Age: parseInt(formData.Age, 10),
          PhysActivity: parseInt(formData.PhysActivity, 10),
          Fruits: parseInt(formData.Fruits, 10),
          Veggies: parseInt(formData.Veggies, 10),
          Sex: parseInt(formData.Sex, 10),
          Stroke: parseInt(formData.Stroke, 10), 
          HeartDiseaseorAttack: parseInt(formData.HeartDiseaseorAttack, 10), 
          AnyHealthcare: parseInt(formData.AnyHealthcare, 10), 
          NoDocbcCost: parseInt(formData.NoDocbcCost, 10), 
          MentHlth: parseInt(formData.MentHlth, 10), 
          PhysHlth: parseInt(formData.PhysHlth, 10), 
          DiffWalk: parseInt(formData.DiffWalk, 10), 
        };

        // Simple validation for required fields
        for (const [key, value] of Object.entries(payload)) {
          // Check for NaN or empty strings if any field is not filled
          if (isNaN(value as number) || value === null || value === undefined) {
            throw new Error(`Please answer all questions. The value for '${key}' is missing or invalid.`);
          }
        }

        await submitAssessment(payload);

      } catch (error: any) {
        console.error('Error submitting assessment:', error);
        setError(error.message || 'Failed to get prediction. Please check your answers and try again.');
      } finally {
        setIsLoading(false);
      }

    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  function getStepContent(step: number) {
    const StyledFormLabel = (props: { children: React.ReactNode }) => (
      <FormLabel component="legend" sx={{ mb: 1, fontWeight: '500', color: 'text.primary' }}>
        {props.children}
      </FormLabel>
    );

    switch (step) {
      case 0: // Introduction Step
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Take the 2-Minute Diabetes Risk Test
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, maxWidth: '500px' }}>
              Find out your risk for Type 2 diabetes in just a couple of minutes with this free, anonymous assessment.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Click "Next" to begin your assessment.
            </Typography>
          </Box>
        );
      case 1: // Demographics: Age, Sex, Education, Income
        return (
          <Box>
            <StyledFormLabel>What is your Age?</StyledFormLabel>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Age (Years)" 
              name="Age" 
              value={formData.Age} 
              onChange={handleChange} 
              type="number" 
              inputProps={{ min: 1, max: 100 }}
              required
            />
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>What is your gender?</StyledFormLabel>
              <RadioGroup row name="Sex" value={formData.Sex} onChange={handleChange}>
                <FormControlLabel value="0" control={<Radio />} label="Female" />
                <FormControlLabel value="1" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 2: // New Body Mass Index Step
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>Calculate Your BMI</Typography>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Height (in cm)" 
              name="height" 
              value={formData.height} 
              onChange={handleChange} 
              type="number" 
              required
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Weight (in kg)" 
              name="weight" 
              value={formData.weight} 
              onChange={handleChange} 
              type="number" 
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Your Calculated BMI"
              name="BMI"
              value={formData.BMI}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </Box>
        );
      case 3: // Core Health Indicators: HighBP, HighChol, etc.
        return (
          <Box>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Have you ever been told you have high blood pressure?</StyledFormLabel>
              <RadioGroup row name="HighBP" value={formData.HighBP} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Have you ever been told you have high cholesterol?</StyledFormLabel>
              <RadioGroup row name="HighChol" value={formData.HighChol} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Have you ever had a stroke?</StyledFormLabel>
              <RadioGroup row name="Stroke" value={formData.Stroke} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Have you ever had coronary heart disease or a heart attack?</StyledFormLabel>
              <RadioGroup row name="HeartDiseaseorAttack" value={formData.HeartDiseaseorAttack} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 4: // Lifestyle & Habits: Smoker, PhysActivity, Fruits, Veggies, HvyAlcoholConsump
        return (
          <Box>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Have you had physical activity in the past 30 days (not including your job)?</StyledFormLabel>
              <RadioGroup row name="PhysActivity" value={formData.PhysActivity} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Do you consume fruit one or more times per day?</StyledFormLabel>
              <RadioGroup row name="Fruits" value={formData.Fruits} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Do you consume vegetables one or more times per day?</StyledFormLabel>
              <RadioGroup row name="Veggies" value={formData.Veggies} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 5: // Overall Well-being: GenHlth, MentHlth, PhysHlth, DiffWalk
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="genhlth-label">How would you rate your general health?</InputLabel>
              <Select 
                labelId="genhlth-label" 
                name="GenHlth" 
                value={formData.GenHlth} 
                label="How would you rate your general health?" 
                onChange={handleChange}
                required
              >
                <MenuItem value="1">Excellent</MenuItem>
                <MenuItem value="2">Very Good</MenuItem>
                <MenuItem value="3">Good</MenuItem>
                <MenuItem value="4">Fair</MenuItem>
                <MenuItem value="5">Poor</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Number of days in past 30 where mental health was not good" 
              name="MentHlth" 
              value={formData.MentHlth} 
              onChange={handleChange} 
              type="number" 
              inputProps={{ min: 0, max: 30 }} 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Number of days in past 30 where physical health was not good" 
              name="PhysHlth" 
              value={formData.PhysHlth} 
              onChange={handleChange} 
              type="number" 
              inputProps={{ min: 0, max: 30 }} 
            />
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Do you have serious difficulty walking or climbing stairs?</StyledFormLabel>
              <RadioGroup row name="DiffWalk" value={formData.DiffWalk} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 6: // Healthcare Access: AnyHealthcare, NoDocbcCost
        return (
          <Box>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Do you have any kind of health care coverage?</StyledFormLabel>
              <RadioGroup row name="AnyHealthcare" value={formData.AnyHealthcare} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal" component="fieldset">
              <StyledFormLabel>Was there a time in the past 12 months when you needed to see a doctor but could not because of cost?</StyledFormLabel>
              <RadioGroup row name="NoDocbcCost" value={formData.NoDocbcCost} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  }

  return (
    <Container 
      maxWidth="md" 
      sx={{
        // The 'py' property has been removed from here.
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Stepper activeStep={activeStep} sx={{ mb: 4, '& .MuiStep-root': { flex: 1 } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ 
        height: '380px',
        p: 4, 
        border: '1px solid #F0F0F0', 
        borderRadius: '16px', 
        bgcolor: 'background.paper', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%' }}
          >
            {getStepContent(activeStep)}
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 3 }}>
        {isLoading && <CircularProgress size={24} sx={{ mr: 2 }} />}
        <Button disabled={activeStep === 0 || isLoading} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={isLoading}>
          {activeStep === steps.length - 1 ? 'Finish Assessment' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default AssessmentPage;