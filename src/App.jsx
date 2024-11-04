import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { CircularProgress, Box } from '@mui/material';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard.jsx';
import { SignInWrapper, SignUpWrapper } from './components/auth/AuthWrapper';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#17153B'
        }}
      >
        <CircularProgress sx={{ color: '#C8ACD6' }} />
      </Box>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  // While loading, show a spinner or loading state
  if (!isLoaded) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#17153B'
        }}
      >
        <CircularProgress sx={{ color: '#C8ACD6' }} />
      </Box>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={isSignedIn ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />
      <Route
        path="/sign-in/*"
        element={isSignedIn ? <Navigate to="/dashboard" replace /> : <SignInWrapper />}
      />
      <Route
        path="/sign-up/*"
        element={isSignedIn ? <Navigate to="/dashboard" replace /> : <SignUpWrapper />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;