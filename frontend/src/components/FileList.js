import React, { useEffect, useState } from 'react';
import { getFiles } from '../api';
import {
  List, ListItem, ListItemButton, ListItemText, Paper, Typography, Box, Divider
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function FileList({ onSelect, selectedFile }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles().then(res => setFiles(res.data));
  }, [selectedFile]);

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Your Files
      </Typography>
      <List>
        {files.map(file => (
          <Box key={file._id}>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedFile && selectedFile._id === file._id}
                onClick={() => onSelect(file)}
              >
                <InsertDriveFileIcon color="primary" sx={{ mr: 1 }} />
                <ListItemText
                  primary={file.originalName}
                  secondary={file.sharedWith.length ? "Shared" : "Owned"}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
        {!files.length && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No files uploaded yet.
          </Typography>
        )}
      </List>
    </Paper>
  );
}