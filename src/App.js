import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './features/authentication/AuthPage';
import Dashboard from './features/dashboard/Dashboard';
import MoneyPot from './features/moneyPot/MoneyPot';
import NotFoundPage from './features/NotFoundPage';
import { useAuth } from './features/authentication/authContext';
import LoggedInLayout from './features/layout/LoggedInLayout';
import { AuthProvider } from './features/authentication/authContext';
import NewApp from './NewApp';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <LoggedInLayout>{element}</LoggedInLayout>;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<NewApp />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/money-pots" element={<ProtectedRoute element={<MoneyPot />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
