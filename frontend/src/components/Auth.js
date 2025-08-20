import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function Auth({ setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setToken(token);
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, [setToken, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Box sx={{ textAlign: 'center', bgcolor: 'background.paper', py: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome to Cloud Drive
        </Typography>
        <Typography variant="body1" gutterBottom color="text.secondary">
          Secure file storage & sharing made easy.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<GoogleIcon />}
          href="http://localhost:4000/auth/google"
          sx={{ mt: 4, bgcolor: "#4285F4", color: "#fff", fontWeight: "bold" }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
}