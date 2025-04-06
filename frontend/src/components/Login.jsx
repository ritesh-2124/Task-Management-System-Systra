import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Please fill in both fields.');
      return;
    }

    if (loading) return; // Prevent double click

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) navigate('/todo');
  };

  const isFormValid = email.trim() && password.trim();

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={!isFormValid || loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Box mt={2}>
          <Typography>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
