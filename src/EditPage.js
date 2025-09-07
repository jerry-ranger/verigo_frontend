import { Typography, Box, Toolbar, Container, Paper, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import HeaderView from './HeaderView';

function EditPage({ onBack, onLogout, darkMode, onToggleDarkMode, onRegister, onAdmin, onEdit }) {
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://5qolrhlh9g.execute-api.ap-south-1.amazonaws.com/prod/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ operation: 'retrieve' })
        });
        const result = await response.json();
        setEmployees(result.data || []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);



  return (
    <>
      <HeaderView 
        showButtons={true} 
        onLogout={onLogout} 
        onBack={onBack} 
        darkMode={darkMode} 
        onToggleDarkMode={onToggleDarkMode}
        onRegister={onRegister}
        onEdit={onEdit}
        onAdmin={onAdmin}
      />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Container maxWidth="xl">
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
              <EditIcon sx={{ fontSize: 32, mr: 1, color: theme.palette.primary.main }} />
              <Typography 
                variant="h4" 
                align="center"
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}
              >
                Employee Management
              </Typography>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Partner ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>DOB</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Father's Name</TableCell>
                      <TableCell>Mother's Name</TableCell>
                      <TableCell>Marital Status</TableCell>
                      <TableCell>Bank Name</TableCell>
                      <TableCell>Account Number</TableCell>
                      <TableCell>IFSC Code</TableCell>
                      <TableCell>Account Name</TableCell>
                      <TableCell>Photo</TableCell>
                      <TableCell>Aadhaar</TableCell>
                      <TableCell>License</TableCell>
                      <TableCell>PAN Card</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((employee, index) => (
                      <TableRow key={index}>
                        <TableCell>{employee.partnerId}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.dob}</TableCell>
                        <TableCell>{employee.phoneNumber}</TableCell>
                        <TableCell>{employee.emailId}</TableCell>
                        <TableCell>{employee.fatherName}</TableCell>
                        <TableCell>{employee.motherName}</TableCell>
                        <TableCell>{employee.maritalStatus}</TableCell>
                        <TableCell>{employee.bankName}</TableCell>
                        <TableCell>{employee.accountNumber}</TableCell>
                        <TableCell>{employee.ifscCode}</TableCell>
                        <TableCell>{employee.accountName}</TableCell>
                        <TableCell>
                          {employee.documents?.photo ? (
                            <a href={employee.documents.photo.replace('s3://', 'https://s3.ap-south-1.amazonaws.com/')} target="_blank" rel="noopener noreferrer">View</a>
                          ) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {employee.documents?.aadhaar ? (
                            <a href={employee.documents.aadhaar.replace('s3://', 'https://s3.ap-south-1.amazonaws.com/')} target="_blank" rel="noopener noreferrer">View</a>
                          ) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {employee.documents?.license ? (
                            <a href={employee.documents.license.replace('s3://', 'https://s3.ap-south-1.amazonaws.com/')} target="_blank" rel="noopener noreferrer">View</a>
                          ) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {employee.documents?.panCard ? (
                            <a href={employee.documents.panCard.replace('s3://', 'https://s3.ap-south-1.amazonaws.com/')} target="_blank" rel="noopener noreferrer">View</a>
                          ) : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default EditPage;