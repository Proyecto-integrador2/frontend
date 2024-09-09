import React, { createContext, useState, useEffect } from 'react';

// Crear contexto de autenticación
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar token almacenado en localStorage al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthToken(data.access);
        localStorage.setItem('authToken', data.access); // Guardar token
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Eliminar token al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
