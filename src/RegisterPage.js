import { Typography, Box, Toolbar, Container, Paper, TextField, Button, MenuItem, Grid, Alert } from '@mui/material';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import HeaderView from './HeaderView';

function RegisterPage({ onBack, onLogout, darkMode, onToggleDarkMode }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
              Register New Partner
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
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                General Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange('dob')}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange('address')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Father's Name"
                    value={formData.fatherName}
                    onChange={handleInputChange('fatherName')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mother's Name"
                    value={formData.motherName}
                    onChange={handleInputChange('motherName')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange('phoneNumber')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email ID"
                    type="email"
                    value={formData.emailId}
                    onChange={handleInputChange('emailId')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Marital Status"
                    value={formData.maritalStatus}
                    onChange={handleInputChange('maritalStatus')}
                    required
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              
              <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                Bank Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>  
                  <TextField
                    fullWidth
                    label="Account Name"
                    value={formData.accountName}
                    onChange={handleInputChange('accountName')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    value={formData.bankName}
                    onChange={handleInputChange('bankName')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    value={formData.accountNumber}
                    onChange={handleInputChange('accountNumber')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="IFSC Code"
                    value={formData.ifscCode}
                    onChange={handleInputChange('ifscCode')}
                    required
                  />
                </Grid>
              </Grid>
              
              <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                Document Uploads
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Photo
                    <input type="file" hidden accept="image/*" onChange={handleFileChange('photo')} />
                  </Button>
                  {formData.photo && <Typography variant="caption">{formData.photo.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Aadhaar
                    <input type="file" hidden accept=".pdf,image/*" onChange={handleFileChange('aadhaar')} />
                  </Button>
                  {formData.aadhaar && <Typography variant="caption">{formData.aadhaar.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload PAN Card
                    <input type="file" hidden accept=".pdf,image/*" onChange={handleFileChange('panCard')} />
                  </Button>
                  {formData.panCard && <Typography variant="caption">{formData.panCard.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload License
                    <input type="file" hidden accept=".pdf,image/*" onChange={handleFileChange('license')} />
                  </Button>
                  {formData.license && <Typography variant="caption">{formData.license.name}</Typography>}
                </Grid>
              </Grid>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button type="submit" variant="contained" fullWidth>
                      Register
                    </Button>
                    <Button variant="outlined" fullWidth onClick={onBack}>
                      Back
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