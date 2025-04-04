import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(email, password , username);
    if (success) navigate('/todo');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4">Register</Typography>
        <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" value={username} onChange={e => setName(e.target.value)} />
          <TextField fullWidth margin="normal" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField fullWidth margin="normal" type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button fullWidth variant="contained" type="submit">Register</Button>
        </form>
        <Box mt={2}>
          <Typography>Already have an account? <Link to="/login">Login</Link></Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
