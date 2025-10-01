// frontend/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import DietPlanPage from './pages/DietPlanPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/diet-plan" element={<DietPlanPage />} />
    </Routes>
  );
}

export default App;