import { Typography, Box, Toolbar } from '@mui/material';
import HeaderView from './HeaderView';

function HomePage({ onLogout, onRegister }) {
  return (
    <>
      <HeaderView showButtons={true} onLogout={onLogout} onRegister={onRegister} />
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