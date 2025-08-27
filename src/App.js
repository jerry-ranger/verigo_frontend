import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Paper, TextField, Button, Typography, Box, Toolbar } from '@mui/material';
import { useState } from 'react';
import HeaderView from './HeaderView';

const theme = createTheme();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderView />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Container maxWidth="sm">
          <Box sx={{ mt: 8 }}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Login
              </Typography>
              <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" sx={{ mt: 1 }}>
                  Login
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;