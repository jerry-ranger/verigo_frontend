import { Typography, Box, Toolbar, Container, Paper, TextField, Button, MenuItem, Grid } from '@mui/material';
import { useState } from 'react';
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
    photo: null,
    aadhaar: null,
    license: null
  });

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFileChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', formData);
    alert('Registration submitted!');
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
            <Box component="form" onSubmit={handleSubmit}>
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
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Photo
                    <input type="file" hidden accept="image/*" onChange={handleFileChange('photo')} />
                  </Button>
                  {formData.photo && <Typography variant="caption">{formData.photo.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Aadhaar
                    <input type="file" hidden accept=".pdf,image/*" onChange={handleFileChange('aadhaar')} />
                  </Button>
                  {formData.aadhaar && <Typography variant="caption">{formData.aadhaar.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload License
                    <input type="file" hidden accept=".pdf,image/*" onChange={handleFileChange('license')} />
                  </Button>
                  {formData.license && <Typography variant="caption">{formData.license.name}</Typography>}
                </Grid>
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