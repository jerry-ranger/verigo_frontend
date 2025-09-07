import { Typography, Box, Toolbar, Container, Paper, TextField, Button, Grid, Alert, Divider, useTheme } from '@mui/material';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HeaderView from './HeaderView';

function RegisterPage({ onBack, onLogout, darkMode, onToggleDarkMode }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    fatherName: '',
    motherName: '',
    phoneNumber: '',
    emailId: '',
    maritalStatus: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountName: '',
    photo: null,
    aadhaar: null,
    license: null,
    panCard: null
  });
  const [alert, setAlert] = useState(null);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFileChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.name.trim()) {
      setAlert({ type: 'error', message: 'Please enter your name' });
      return;
    }
    
    if (!validateEmail(formData.emailId)) {
      setAlert({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }
    
    try {
      const response = await fetch('https://5qolrhlh9g.execute-api.ap-south-1.amazonaws.com/prod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log('Registration response:', result);
      setAlert({ type: 'success', message: 'Registration submitted successfully!' });
    } catch (error) {
      console.error('Registration error:', error);
      setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
    }
  };

  return (
    <>
      <HeaderView showButtons={true} onLogout={onLogout} onBack={onBack} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Container maxWidth="md">
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              boxShadow: theme.shadows[3],
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              <PersonAddIcon sx={{ fontSize: 32, mr: 1, color: theme.palette.primary.main }} />
              <Typography 
                variant="h4" 
                align="center"
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}
              >
                Partner Registration
              </Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />
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
            <Box component="form" onSubmit={handleSubmit}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1,
                  display: 'inline-block'
                }}
              >
                Essential Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    sx={{ flex: 1 }}
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    required
                    variant="outlined"
                  />
                  <TextField
                    sx={{ flex: 1 }}
                    label="Date of Birth"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange('dob')}
                    required
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  required
                  variant="outlined"
                  multiline
                  rows={2}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    sx={{ flex: 1 }}
                    label="Father's Name"
                    value={formData.fatherName}
                    onChange={handleInputChange('fatherName')}
                    required
                    variant="outlined"
                  />
                  <TextField
                    sx={{ flex: 1 }}
                    label="Mother's Name"
                    value={formData.motherName}
                    onChange={handleInputChange('motherName')}
                    required
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    sx={{ flex: 1 }}
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange('phoneNumber')}
                    required
                    variant="outlined"
                  />
                  <TextField
                    sx={{ flex: 1 }}
                    label="Email Address"
                    type="email"
                    value={formData.emailId}
                    onChange={handleInputChange('emailId')}
                    required
                    variant="outlined"
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Marital Status"
                  value={formData.maritalStatus}
                  onChange={handleInputChange('maritalStatus')}
                  required
                  variant="outlined"
                  placeholder="Enter marital status"
                />
              </Box>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  mt: 5, 
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1,
                  display: 'inline-block'
                }}
              >
                Banking Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    sx={{ flex: 1 }}
                    label="Bank Name"
                    value={formData.bankName}
                    onChange={handleInputChange('bankName')}
                    required
                    variant="outlined"
                  />
                  <TextField
                    sx={{ flex: 1 }}
                    label="Account Number"
                    value={formData.accountNumber}
                    onChange={handleInputChange('accountNumber')}
                    required
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    sx={{ flex: 1 }}
                    label="IFSC Code"
                    value={formData.ifscCode}
                    onChange={handleInputChange('ifscCode')}
                    required
                    variant="outlined"
                  />
                  <TextField
                    sx={{ flex: 1 }}
                    label="Account Holder Name"
                    value={formData.accountName}
                    onChange={handleInputChange('accountName')}
                    required
                    variant="outlined"
                  />
                </Box>
              </Box>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  mt: 5, 
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1,
                  display: 'inline-block'
                }}
              >
                Document Uploads
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth
                    sx={{ 
                      py: 1.5, 
                      borderRadius: 1,
                      borderWidth: '1px',
                      '&:hover': {
                        borderWidth: '1px'
                      }
                    }}
                  >
                    Upload Photo
                    <input type="file" hidden accept="image/*" onChange={handleFileChange('photo')} />
                  </Button>
                  {formData.photo && (
                    <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', wordBreak: 'break-all' }}>
                        {formData.photo.name}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth
                    sx={{ 
                      py: 1.5, 
                      borderRadius: 1,
                      borderWidth: '1px',
                      '&:hover': {
                        borderWidth: '1px'
                      }
                    }}
                  >
                    Upload Aadhaar
                    <input type="file" hidden accept=".pdf,image/*" onChange={handleFileChange('aadhaar')} />
                  </Button>
                  {formData.aadhaar && (
                    <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', wordBreak: 'break-all' }}>
                        {formData.aadhaar.name}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth
                    sx={{ 
                      py: 1.5, 
                      borderRadius: 1,
                      borderWidth: '1px',
                      '&:hover': {
                        borderWidth: '1px'
                      }
                    }}
                  >
                    Upload PAN Card
                    <input type="file" hidden accept=".pdf,image/*" onChange={handleFileChange('panCard')} />
                  </Button>
                  {formData.panCard && (
                    <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', wordBreak: 'break-all' }}>
                        {formData.panCard.name}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth
                    sx={{ 
                      py: 1.5, 
                      borderRadius: 1,
                      borderWidth: '1px',
                      '&:hover': {
                        borderWidth: '1px'
                      }
                    }}
                  >
                    Upload License
                    <input type="file" hidden accept=".pdf,image/*" onChange={handleFileChange('license')} />
                  </Button>
                  {formData.license && (
                    <Box sx={{ mt: 1, p: 1, bgcolor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', wordBreak: 'break-all' }}>
                        {formData.license.name}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 4 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      sx={{ 
                        height: 40,
                        fontWeight: 600,
                        px: 3
                      }}
                    >
                      Submit
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={onBack}
                      sx={{ 
                        height: 40,
                        px: 3
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default RegisterPage;
