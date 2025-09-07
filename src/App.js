import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Paper, TextField, Button, Typography, Box, Toolbar, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
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
  const [currentPage, setCurrentPage] = useState('manage');
  const [darkMode, setDarkMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem('verigo_login');
    if (savedLogin) {
      const { email: savedEmail, timestamp, isAdmin: savedIsAdmin } = JSON.parse(savedLogin);
      const now = new Date().getTime();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      
      if (now - timestamp < sevenDays) {
        setEmail(savedEmail);
        setIsLoggedIn(true);
        setIsAdmin(savedIsAdmin || false);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      // First check local credentials (master users)
      const localCredentials = credentialsService.getCredentials();
      const localUser = localCredentials.find(u => u.id === email && u.password === password);
      
      if (localUser) {
        // Master user from local credentials
        setIsLoggedIn(true);
        setIsAdmin(true); // Local users are master users
        
        if (rememberMe) {
          localStorage.setItem('verigo_login', JSON.stringify({
            email: email,
            timestamp: new Date().getTime(),
            isAdmin: true
          }));
        }
        return;
      }
      
      // If not found locally, check API credentials (general users)
      try {
        const response = await fetch('https://5qolrhlh9g.execute-api.ap-south-1.amazonaws.com/prod/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            operation: 'login', 
            id: email, 
            password: password 
          })
        });
        const result = await response.json();
        
        if (result.success) {
          // General user from API
          setIsLoggedIn(true);
          setIsAdmin(false); // API users are general users
          
          if (rememberMe) {
            localStorage.setItem('verigo_login', JSON.stringify({
              email: email,
              timestamp: new Date().getTime(),
              isAdmin: false
            }));
          }
        } else {
          setLoginError('Invalid credentials');
        }
      } catch (apiError) {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login error');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setCurrentPage('manage');
    setRememberMe(false);
    setIsAdmin(false);
    localStorage.removeItem('verigo_login');
  };

  const handleRegister = () => {
    setCurrentPage('register');
  };

  const handleAdmin = () => {
    if (isAdmin) {
      setCurrentPage('admin');
    }
  };

  const handleManage = () => {
    setCurrentPage('manage');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleBack = () => {
    setCurrentPage('manage');
  };

  if (isLoggedIn) {
    if (currentPage === 'register') {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RegisterPage onLogout={handleLogout} onBack={handleBack} onRegister={handleRegister} onManage={handleManage} onAdmin={handleAdmin} isAdmin={isAdmin} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
      );
    }
    if (currentPage === 'admin') {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AdminPage onLogout={handleLogout} onBack={handleBack} onRegister={handleRegister} onManage={handleManage} onAdmin={handleAdmin} isAdmin={isAdmin} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
      );
    }
    // Default to manage page after login
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EditPage onLogout={handleLogout} onBack={handleBack} onRegister={handleRegister} onAdmin={handleAdmin} onManage={handleManage} isAdmin={isAdmin} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
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
              {loginError && (
                <Alert 
                  icon={<ErrorIcon fontSize="inherit" />} 
                  severity="error"
                  sx={{ mb: 2 }}
                  onClose={() => setLoginError('')}
                >
                  {loginError}
                </Alert>
              )}
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