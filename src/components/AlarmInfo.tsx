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
import { useAuth } from '../hooks/AuthContext';
import Skeleton from '@mui/material/Skeleton';

interface MyFormData {
  message: string
}

interface AddressFormProps {
  onFormFilled: (formData: MyFormData) => void;
  onFormUnfilled: () => void;
}

export default function AddressForm({ onFormFilled, onFormUnfilled }: AddressFormProps){
  const { id } = useAuth();
  const [loading, setLoading] = useState(true); // Add loading state
  const [admindata, setAdminData] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  // Fetch data from Node.js server
    fetch('http://localhost:3000/admininfo/'+id)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((admindata) => {
      setAdminData(admindata);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

     
  const [formData, setFormData] = useState({
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'message') {
      setFormData({
        message: e.target.value,
      });
    }
  };

  //skeleton loading
  useEffect(() => {
    // Simulate loading by setting a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timeout when the component unmounts or when loading is complete
    return () => clearTimeout(timer);
  }, []);
  
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
        {loading ? (
          <Skeleton sx={{ fontSize: '2rem', mb:1 }} width="40%" animation="wave" />
        ) : (
          <>
          <Typography variant="h6" gutterBottom>
            Details Information
          </Typography>
          </>
        )}
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  disabled
                  id="adminID outlined-required"
                  label="Admin ID"
                  fullWidth
                  variant="standard"
                  value={id}
                />
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12} sm={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <EmailIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  disabled
                  id="email outlined-required"
                  label="Admin Email"
                  fullWidth
                  variant="standard"
                  value={admindata.email}
                />
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12} sm={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <BadgeIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  disabled
                  id="firstName outlined-required"
                  label="First name"
                  fullWidth
                  variant="standard"
                  value={admindata.firstname}
                />
              </Box>
            </>
            )}
            </Grid>
            <Grid item xs={12} sm={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <BadgeIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  disabled
                  id="lastName outlined-required"
                  label="Last name"
                  fullWidth
                  variant="standard"
                  value={admindata.lastname}
                />
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12} sm={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <CalendarMonthIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  disabled
                  id="date outlined-required"
                  label="Date"
                  fullWidth
                  variant="standard"
                  value={Date().substring(4, 15)}
                />
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12} sm={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccessTimeFilledIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  disabled
                  id="time outlined-required"
                  label="Time"
                  fullWidth
                  variant="standard"
                  value={Date().substring(15,21)}
                />
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <MessageIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  id="msg outlined-required"
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
              </>
            )}
            </Grid>
          </Grid>
    </React.Fragment>
    )
}