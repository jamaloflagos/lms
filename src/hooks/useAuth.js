import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const login = (id) => {
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userId', id);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authToken, setAuthToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
