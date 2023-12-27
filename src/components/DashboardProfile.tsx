import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import Button from '@mui/material/Button';


export default function DashBoardContent(){
    const { id } = useAuth();
    const [adminData, setAdminData] = useState({
      firstname: '',
      lastname: '',
      email: '',
    })

    useEffect(() => {

        // Fetch data from Node.js server
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/admininfo/' + id);
    
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }
    
            const admindata = await response.json();
    
            // Check for the success message in local storage only once when the component mounts
            const loginSuccessMessage = localStorage.getItem('loginSuccessMessage');
            console.log('loginSuccessMessage:', loginSuccessMessage); // Add this log statement
    
            setAdminData(admindata);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [id]); // Include 'id' in the dependency array if it's used in the useEffect

    return (
      <>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        {/* First Section */}
        <Box textAlign="center">
            <AccountCircleIcon />
            <Typography>Profile</Typography>
        </Box>

        {/* Second Section */}
        <Box marginTop="20px">
            <div>
            <strong>First Name:</strong> {adminData.firstname}
            </div>
            <div>
            <strong>Last Name:</strong> {adminData.lastname}
            </div>
            <div>
            <strong>Email:</strong> {adminData.email}
            </div>
        </Box>

        {/* Third Section */}
        <Box textAlign="center" marginTop="20px">
            <Button variant="contained" startIcon={<EditIcon />} sx={{ mr:1 }}>
                Edit
            </Button>
            <Button variant="contained" startIcon={<LockIcon />}>
                Password
            </Button>
        </Box>
        </Paper>
        </Container>
      </>
    )
}