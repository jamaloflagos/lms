import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ element, user }) => {
    const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to={`/login/${user}`} />;
};

export default ProtectedRoute;