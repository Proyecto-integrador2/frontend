import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear contexto de autenticación
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar token almacenado en localStorage al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true); // Se considera autenticado si el token existe
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
      
      if (response.status === 200) {
        const { access, refresh } = response.data;

        // Almacenar los tokens en localStorage
        localStorage.setItem('authToken', access);
        localStorage.setItem('refreshToken', refresh);

        // Actualizar estado de autenticación
        setAuthToken(access);
        setIsAuthenticated(true);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Eliminar token al cerrar sesión
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;