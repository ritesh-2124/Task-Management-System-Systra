import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/todo');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField fullWidth margin="normal" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button fullWidth variant="contained" type="submit">Login</Button>
        </form>
        <Box mt={2}>
          <Typography>Don't have an account? <Link to="/register">Register</Link></Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;