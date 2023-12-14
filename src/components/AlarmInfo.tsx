import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AccountCircle } from '@mui/icons-material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import MessageIcon from '@mui/icons-material/Message';
import { useAuth } from '../AuthContext';

interface MyFormData {
  firstName: string | null,
  lastName: string | null,
  adminID: string | null,
  email: string | null,
  message: string | null
}

interface AddressFormProps {
  onFormFilled: (formData: MyFormData) => void;
  onFormUnfilled: () => void;
}

export default function AddressForm({ onFormFilled, onFormUnfilled }: AddressFormProps){
  const { id } = useAuth();
  const [admindata, setAdminData] = useState<MyFormData | null>(null);

  // Fetch data from Node.js server
    fetch('http://localhost:3000/admininfo/'+id)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((admindata) => {
      console.log('Received data:', admindata); // Log the received data
      setAdminData(admindata);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

    
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    adminID: id,
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Notify parent component when the form is filled
  useEffect(() => {
    const isFormFilled = Object.values(formData).every(Boolean);
    if (isFormFilled) {
      onFormFilled(formData);
    }else{
      onFormUnfilled();
    }
  }, [formData, onFormFilled, onFormUnfilled]);
  
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Details Information
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="adminID"
            name="adminID"
            label="Admin ID"
            fullWidth
            variant="standard"
            value={formData.adminID}
            onChange={handleInputChange}
          />
        </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            id="email"
            name="email"
            label="Admin Email"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <BadgeIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <BadgeIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <CalendarMonthIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="date"
            name="date"
            label="Date"
            fullWidth
            variant="standard"
            value={Date().substring(4, 15)}
            onChange={handleInputChange}
          />
        </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccessTimeFilledIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="time"
            name="time"
            label="Time"
            fullWidth
            variant="standard"
            value={Date().substring(15,21)}
            onChange={handleInputChange}
          />
        </Box>
        </Grid>
        <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <MessageIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="msg"
            name="message"
            label="Message"
            multiline
            fullWidth
            maxRows={4}
            variant="standard"
            value={formData.message}
            onChange={handleInputChange}
          />
        </Box>
        </Grid>
      </Grid>
    </React.Fragment>

    )
}