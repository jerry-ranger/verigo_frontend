import { Typography, Box, Toolbar, Container, Paper, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import HeaderView from './HeaderView';

function EditPage({ onBack, onLogout, darkMode, onToggleDarkMode, onRegister, onAdmin }) {
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
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Position</TableCell>
                      <TableCell align="right">Salary</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((employee, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell align="right">{employee.salary}</TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell>{employee.status}</TableCell>
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