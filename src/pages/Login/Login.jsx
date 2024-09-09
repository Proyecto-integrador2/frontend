import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { AuthContext } from '../../utils/auth';  // Importar el contexto de autenticación
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Inicializar el hook de navegación

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password); // Llamar a la función de login del contexto
      navigate('/employee/orders');    // Redirigir al usuario después de autenticarse
    } catch (error) {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box sx={{ mt: 2, position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;