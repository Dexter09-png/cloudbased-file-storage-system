import React, { useState } from 'react';
import { uploadFile } from '../api';
import { Button, Box, Typography, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      await uploadFile(file);
      setFile(null);
      onUpload();
    } catch (e) {
      alert('Failed to upload!');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ mb: 3, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Upload a File
      </Typography>
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="outlined" startIcon={<CloudUploadIcon />} component="span" sx={{ mr: 2 }}>
          Choose File
        </Button>
        {file && <Typography variant="body2" display="inline">{file.name}</Typography>}
      </label>
      <Button
        variant="contained"
        color="primary"
        sx={{ ml: 2 }}
        disabled={!file || loading}
        onClick={handleUpload}
      >
        Upload
      </Button>
      {loading && <LinearProgress sx={{ mt: 2 }} />}
    </Box>
  );
}