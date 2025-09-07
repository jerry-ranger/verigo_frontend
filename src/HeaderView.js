import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function HeaderView({ showButtons, onLogout, onRegister, onBack, onAdmin, onManage, isAdmin, darkMode, onToggleDarkMode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Verigo
          </Typography>
          {showButtons && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button color="inherit" onClick={onRegister}>Register</Button>
              <Button color="inherit" onClick={onManage}>Manage</Button>
              {isAdmin && <Button color="inherit" onClick={onAdmin}>Admin</Button>}
              <Button color="inherit" onClick={onLogout}>Logout</Button>
              <IconButton color="inherit" onClick={onToggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
          {!showButtons && (
            <IconButton color="inherit" onClick={onToggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderView;