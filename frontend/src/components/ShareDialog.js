import React, { useState } from 'react';
import { shareFile } from '../api';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

export default function ShareDialog({ file }) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleShare = async () => {
    try {
      await shareFile(file._id, email);
      setMsg('File shared successfully!');
      setEmail('');
      setError('');
    } catch {
      setError('Failed to share. Check the email.');
      setMsg('');
    }
  };

  return (
    <Box sx={{ mb: 3, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Share File
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="User Email"
          variant="outlined"
          size="small"
          value={email}
          sx={{ flex: 1 }}
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ bgcolor: '#1976D2', color: '#fff' }}
          startIcon={<ShareIcon />}
          onClick={handleShare}
          disabled={!email}
        >
          Share
        </Button>
      </Box>
      {msg && <Alert severity="success" sx={{ mt: 2 }}>{msg}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}