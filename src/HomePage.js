import { Typography, Box, Toolbar } from '@mui/material';
import HeaderView from './HeaderView';

function HomePage({ onLogout, onRegister, onAdmin, darkMode, onToggleDarkMode }) {
  return (
    <>
      <HeaderView showButtons={true} onLogout={onLogout} onRegister={onRegister} onAdmin={onAdmin} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome to Verigo
        </Typography>
      </Box>
    </>
  );
}

export default HomePage;