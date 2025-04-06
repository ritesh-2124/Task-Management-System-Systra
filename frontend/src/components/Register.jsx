import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !username.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (loading) return; // Prevent duplicate requests

    setLoading(true);
    const success = await register(email, password, username);
    setLoading(false);

    if (success) navigate('/todo');
  };

  const isFormValid = email.trim() && password.trim() && password.length >= 5 && username.trim();

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={username}
            onChange={e => setName(e.target.value)}
            required
          />
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
            label="Password (min 5 characters)"
            value={password}
            inputProps={{ minLength: 5 }}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={!isFormValid || loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <Box mt={2}>
          <Typography>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
