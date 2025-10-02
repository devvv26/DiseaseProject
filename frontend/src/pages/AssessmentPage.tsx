import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stepper, Step, StepLabel, Button, Typography, Box, Container,
  TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  Select, MenuItem, InputLabel, CircularProgress
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

const steps = ['About You', 'Lifestyle Habits', 'Core Health Indicators', 'Overall Well-being', 'Medical History & Access'];

const AssessmentPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    HighBP: '0', HighChol: '0', CholCheck: '1', BMI: '', Smoker: '0', Stroke: '0',
    HeartDiseaseorAttack: '0', PhysActivity: '1', Fruits: '1', Veggies: '1',
    HvyAlcoholConsump: '0', AnyHealthcare: '1', NoDocbcCost: '0', GenHlth: '3',
    MentHlth: '', PhysHlth: '', DiffWalk: '0', Sex: '0', Age: '',
    Education: '4', Income: '5'
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name as string]: value
    }));
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setIsLoading(true);
      console.log('Form Submitted!', formData);
      setTimeout(() => {
        const mockResult = { prediction: 1, risk_probability: 0.75 };
        navigate('/results', { state: { result: mockResult } });
        setIsLoading(false);
      }, 1000);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  function getStepContent(step: number) {
    switch (step) {
      case 0: // About You
        return (
          <Box>
            <TextField fullWidth margin="normal" label="Age" name="Age" value={formData.Age} onChange={handleChange} type="number" />
            <FormControl fullWidth margin="normal">
              <FormLabel>Sex</FormLabel>
              <RadioGroup row name="Sex" value={formData.Sex} onChange={handleChange}>
                <FormControlLabel value="0" control={<Radio />} label="Female" />
                <FormControlLabel value="1" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Highest Level of Education Completed</InputLabel>
              <Select name="Education" value={formData.Education} label="Highest Level of Education Completed" onChange={handleChange}>
                <MenuItem value="1">Never attended school or only kindergarten</MenuItem>
                <MenuItem value="2">Grades 1 through 8 (Elementary)</MenuItem>
                <MenuItem value="3">Grades 9 through 11 (Some high school)</MenuItem>
                <MenuItem value="4">Grade 12 or GED (High school graduate)</MenuItem>
                <MenuItem value="5">College 1 year to 3 years (Some college)</MenuItem>
                <MenuItem value="6">College 4 years or more (College graduate)</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Annual Income</InputLabel>
              <Select name="Income" value={formData.Income} label="Annual Income" onChange={handleChange}>
                <MenuItem value="1">Less than $10,000</MenuItem>
                <MenuItem value="2">$10,000 to $14,999</MenuItem>
                <MenuItem value="3">$15,000 to $19,999</MenuItem>
                <MenuItem value="4">$20,000 to $24,999</MenuItem>
                <MenuItem value="5">$25,000 to $34,999</MenuItem>
                <MenuItem value="6">$35,000 to $49,999</MenuItem>
                <MenuItem value="7">$50,000 to $74,999</MenuItem>
                <MenuItem value="8">$75,000 or more</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      case 1: // Lifestyle Habits
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <FormLabel>Have you smoked at least 100 cigarettes in your entire life?</FormLabel>
              <RadioGroup row name="Smoker" value={formData.Smoker} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Have you had physical activity in the past 30 days (not including your job)?</FormLabel>
              <RadioGroup row name="PhysActivity" value={formData.PhysActivity} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Do you consume fruit one or more times per day?</FormLabel>
              <RadioGroup row name="Fruits" value={formData.Fruits} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Do you consume vegetables one or more times per day?</FormLabel>
              <RadioGroup row name="Veggies" value={formData.Veggies} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Are you a heavy drinker (adult men having &gt;14 drinks/week and women &gt;7 drinks/week)?</FormLabel>
              <RadioGroup row name="HvyAlcoholConsump" value={formData.HvyAlcoholConsump} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 2: // Core Health Indicators
        return (
          <Box>
            <TextField fullWidth margin="normal" label="Body Mass Index (BMI)" name="BMI" value={formData.BMI} onChange={handleChange} type="number" />
            <FormControl fullWidth margin="normal">
              <FormLabel>Have you ever been told you have high blood pressure?</FormLabel>
              <RadioGroup row name="HighBP" value={formData.HighBP} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Have you ever been told you have high cholesterol?</FormLabel>
              <RadioGroup row name="HighChol" value={formData.HighChol} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Have you had a cholesterol check in the past 5 years?</FormLabel>
              <RadioGroup row name="CholCheck" value={formData.CholCheck} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 3: // Overall Well-being
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>How would you rate your general health?</InputLabel>
              <Select name="GenHlth" value={formData.GenHlth} label="How would you rate your general health?" onChange={handleChange}>
                <MenuItem value="1">Excellent</MenuItem>
                <MenuItem value="2">Very Good</MenuItem>
                <MenuItem value="3">Good</MenuItem>
                <MenuItem value="4">Fair</MenuItem>
                <MenuItem value="5">Poor</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth margin="normal" label="Days mental health not good in past 30 days" name="MentHlth" value={formData.MentHlth} onChange={handleChange} type="number" />
            <TextField fullWidth margin="normal" label="Days physical health not good in past 30 days" name="PhysHlth" value={formData.PhysHlth} onChange={handleChange} type="number" />
            <FormControl fullWidth margin="normal">
              <FormLabel>Do you have serious difficulty walking or climbing stairs?</FormLabel>
              <RadioGroup row name="DiffWalk" value={formData.DiffWalk} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 4: // Medical History & Access
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <FormLabel>Have you ever had a stroke?</FormLabel>
              <RadioGroup row name="Stroke" value={formData.Stroke} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Have you ever had coronary heart disease or a heart attack?</FormLabel>
              <RadioGroup row name="HeartDiseaseorAttack" value={formData.HeartDiseaseorAttack} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Do you have any kind of health care coverage?</FormLabel>
              <RadioGroup row name="AnyHealthcare" value={formData.AnyHealthcare} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Was there a time in the past 12 months when you needed to see a doctor but could not because of cost?</FormLabel>
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
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{mt: 2}}>
        Diabetes Risk Assessment
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ minHeight: '300px', my: 2, p: 3, border: '1px solid #ddd', borderRadius: '8px', bgcolor: '#fafafa' }}>
        {getStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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