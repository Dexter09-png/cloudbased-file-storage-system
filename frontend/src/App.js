import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import FileViewer from './components/FileViewer';
import ShareDialog from './components/ShareDialog';
import VersionHistory from './components/VersionHistory';
import { Box, Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSetToken = (t) => {
    setToken(t);
    localStorage.setItem('token', t);
  };

  const handleRefresh = () => setSelectedFile(null);

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="static" color="primary" sx={{ mb: 4, boxShadow: 3 }}>
        <Toolbar>
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
            Cloud Drive
          </Typography>
          {token && (
            <Button color="inherit" onClick={() => {
              setToken(null);
              localStorage.removeItem('token');
              window.location.reload();
            }}>Sign Out</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Routes>
          <Route path="/auth" element={<Auth setToken={handleSetToken} />} />
          <Route
            path="/"
            element={
              token ? (
                <Box>
                  <FileUpload onUpload={handleRefresh} />
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <FileList onSelect={setSelectedFile} selectedFile={selectedFile} />
                    </Box>
                    <Box sx={{ flex: 2 }}>
                      <FileViewer file={selectedFile} />
                      {selectedFile && <ShareDialog file={selectedFile} />}
                      {selectedFile && <VersionHistory file={selectedFile} />}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Auth setToken={handleSetToken} />
              )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}