import { Typography, Box, Toolbar, Paper, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import HeaderView from './HeaderView';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

function AdminPage({ onLogout, onBack, onRegister, onManage, onAdmin, isAdmin, darkMode, onToggleDarkMode }) {
  const [newId, setNewId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newId || !newPassword) {
      setAlert({ type: 'error', message: 'Please fill in both ID and password' });
      return;
    }

    try {
      const response = await fetch('https://5qolrhlh9g.execute-api.ap-south-1.amazonaws.com/prod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          operation: 'create_user', 
          id: newId, 
          password: newPassword 
        })
      });
      const result = await response.json();
      
      if (response.ok) {
        setAlert({ type: 'success', message: 'User created successfully' });
        setNewId('');
        setNewPassword('');
      } else {
        setAlert({ type: 'error', message: result.error || 'Error creating user' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setAlert({ type: 'error', message: 'Error creating user' });
    }
  };

  return (
    <>
      <HeaderView showButtons={true} onLogout={onLogout} onRegister={onRegister} onManage={onManage} onAdmin={onAdmin} isAdmin={isAdmin} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Create New User
          </Typography>
          {alert && (
            <Alert 
              icon={alert.type === 'success' ? <CheckIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />} 
              severity={alert.type}
              sx={{ mb: 2 }}
              onClose={() => setAlert(null)}
            >
              {alert.message}
            </Alert>
          )}
          <Box component="form" onSubmit={handleCreateUser} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="New ID"
              type="text"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              required
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" sx={{ mt: 1 }}>
              Create User
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default AdminPage;