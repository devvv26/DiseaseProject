import { Routes, Route } from 'react-router-dom'; // REMOVED BrowserRouter as Router
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultPage from './pages/ResultPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* The <Router> from main.tsx wraps everything, so we remove it from here */}
      <Header />
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;