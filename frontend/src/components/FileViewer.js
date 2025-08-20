import React, { useState, useEffect } from 'react';
import { getDownloadUrl } from '../api';
import { Box, Typography, Button, Paper } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function FileViewer({ file }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (file)
      getDownloadUrl(file._id).then(res => setUrl(res.data.url));
  }, [file]);

  if (!file)
    return (
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="body1" color="text.secondary">Select a file to view or download.</Typography>
      </Paper>
    );

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {file.originalName}
      </Typography>
      <Button
        variant="contained"
        color="success"
        startIcon={<VisibilityIcon />}
        sx={{ mt: 2 }}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download/View
      </Button>
    </Paper>
  );
}