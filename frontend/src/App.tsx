import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultPage from './pages/ResultPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
          bgcolor: 'background.default' 
        }}
      >
        <Header />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column' 
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;