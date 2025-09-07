import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Paper, TextField, Button, Typography, Box, Toolbar, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import HeaderView from './HeaderView';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import AdminPage from './AdminPage';
import EditPage from './EditPage';
import { credentialsService } from './credentialsService';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('edit');
  const [darkMode, setDarkMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem('verigo_login');
    if (savedLogin) {
      const { email: savedEmail, timestamp } = JSON.parse(savedLogin);
      const now = new Date().getTime();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      
      if (now - timestamp < sevenDays) {
        setEmail(savedEmail);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('verigo_login');
      }
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const credentials = credentialsService.getCredentials();
      const user = credentials.find(u => u.id === email && u.password === password);
      if (user) {
        setIsLoggedIn(true);
        
        if (rememberMe) {
          localStorage.setItem('verigo_login', JSON.stringify({
            email: email,
            timestamp: new Date().getTime()
          }));
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login error');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setCurrentPage('home');
    setRememberMe(false);
    localStorage.removeItem('verigo_login');
  };

  const handleRegister = () => {
    setCurrentPage('register');
  };

  const handleAdmin = () => {
    setCurrentPage('admin');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleBack = () => {
    setCurrentPage('edit');
  };

  if (isLoggedIn) {
    if (currentPage === 'register') {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RegisterPage onLogout={handleLogout} onBack={handleBack} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
      );
    }
    if (currentPage === 'admin') {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AdminPage onLogout={handleLogout} onBack={handleBack} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
      );
    }
    if (currentPage === 'home') {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HomePage onLogout={handleLogout} onRegister={handleRegister} onAdmin={handleAdmin} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EditPage onLogout={handleLogout} onBack={handleBack} onRegister={handleRegister} onAdmin={handleAdmin} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderView darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
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
                  label="ID"
                  type="text"
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Remember me for 7 days"
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