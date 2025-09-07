import { Typography, Box, Toolbar, Paper, TextField, Button } from '@mui/material';
import { useState } from 'react';
import HeaderView from './HeaderView';
import { credentialsService } from './credentialsService';

function AdminPage({ onLogout, onBack, onRegister, onEdit, onAdmin, darkMode, onToggleDarkMode }) {
  const [newId, setNewId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newId || !newPassword) {
      alert('Please fill in both ID and password');
      return;
    }

    try {
      const existingCredentials = credentialsService.getCredentials();
      const userExists = existingCredentials.find(user => user.id === newId);
      if (userExists) {
        alert('User ID already exists');
        return;
      }

      credentialsService.createUser(newId, newPassword);
      alert('User created successfully');
      setNewId('');
      setNewPassword('');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  return (
    <>
      <HeaderView showButtons={true} onLogout={onLogout} onBack={onBack} onRegister={onRegister} onEdit={onEdit} onAdmin={onAdmin} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Create New User
          </Typography>
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