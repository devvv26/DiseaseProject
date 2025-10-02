import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

// Component Imports
import Header from './components/Header';

// Page Imports
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container sx={{ mt: 4 }}> {/* Adds a 32px top margin */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultPage />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;