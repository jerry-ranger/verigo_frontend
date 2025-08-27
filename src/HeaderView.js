import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function HeaderView({ showButtons, onLogout, onRegister, onBack }) {
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
            <Box sx={{ display: 'flex', gap: 1 }}>
              {onBack ? (
                <Button color="inherit" onClick={onBack}>Back</Button>
              ) : (
                <>
                  <Button color="inherit" onClick={onRegister}>Register</Button>
                  <Button color="inherit">Edit</Button>
                </>
              )}
              <Button color="inherit" onClick={onLogout}>Logout</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderView;