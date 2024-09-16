import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { AuthContext } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../resources/image.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const usernameError = errorData.username ? errorData.username.join(' ') : '';
        const passwordError = errorData.password ? errorData.password.join(' ') : '';

        if (usernameError || passwordError) {
          setError(`Username: ${usernameError} Password: ${passwordError}`);
          toast.error(`Username: ${usernameError} Password: ${passwordError}`, {
            style: { fontSize: '1.5rem' },
          });
        } else if (errorData.detail) {
          setError(errorData.detail);
          toast.error(errorData.detail, {
            style: { fontSize: '1.5rem' },
          });
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred. Please try again.', {
          style: { fontSize: '1.5rem' },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirigir si está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/employee/orders');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="md" sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Elixify
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px' }}>
        <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ 
              fontSize: '1.5rem', 
              '& .MuiInputBase-input': { 
                fontSize: '2rem',
                padding: '10px',
              },
              '& .MuiInputLabel-root': {
                fontSize: '2rem',
              },
              '& .MuiFormControl-root': {
                marginBottom: '16px',
              }
            }}
            inputProps={{ style: { height: '60px' } }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ 
              fontSize: '1.5rem', 
              '& .MuiInputBase-input': { 
                fontSize: '2rem',
                padding: '10px',
              },
              '& .MuiInputLabel-root': {
                fontSize: '2rem',
              },
              '& .MuiFormControl-root': {
                marginBottom: '16px',
              }
            }}
            inputProps={{ style: { height: '60px' } }}
          />

          <Box sx={{ mt: 2, position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ fontSize: '1.5rem', padding: '12px' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            {error && (
              <Typography color="error" sx={{ marginTop: 2, fontSize: '1.5rem' }}>
                {error}
              </Typography>
            )}
          </Box>

        </form>
      </Box>
    </Container>
  );
};

export default Login;