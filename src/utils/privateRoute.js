import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './auth';

const PrivateRoute = ({ children }) => {
  const { authToken, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Mostrar un loading mientras se verifica la autenticación
  }

  return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
