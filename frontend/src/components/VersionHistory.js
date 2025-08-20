import React, { useEffect, useState } from 'react';
import { getVersions, getDownloadUrl } from '../api';
import { Typography, List, ListItem, Button, Box, Divider, Paper } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

export default function VersionHistory({ file }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    if (file)
      getVersions(file._id).then(res => setVersions(res.data));
  }, [file]);

  if (!file || !versions.length) return null;

  const handleDownload = async (idx) => {
    const res = await getDownloadUrl(file._id, idx);
    window.open(res.data.url, '_blank');
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        <HistoryIcon sx={{ mr: 1 }} />
        Version History
      </Typography>
      <List>
        {versions.map((v, idx) => (
          <Box key={idx}>
            <ListItem
              secondaryAction={
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDownload(idx)}
                >
                  Download
                </Button>
              }
            >
              <Typography variant="body2">
                {new Date(v.uploadedAt).toLocaleString()}
              </Typography>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Paper>
  );
}