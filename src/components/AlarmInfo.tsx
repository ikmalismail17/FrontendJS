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
import MenuItem from '@mui/material/MenuItem';

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

  useEffect(() => {
    // Fetch data from Node.js server
    fetch('http://localhost:3000/admininfo/' + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((admindata) => {
        setAdminData(admindata);
      })
      // .catch((error) => {
      //   // console.error('Error fetching data:', error);
      // });
  }, [id]);


     
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

  //message option
  const messageChoice = [
    {
      title: 'Warning',
      value: `I regret to inform you that our system has detected an unexpected high depth reading at our river today.

    This anomaly raises concerns, and we are actively investigating the issue to determine its cause whether the reading is true or our sensor error. Please be assured that we are taking all necessary measures to address and rectify the situation promptly.
      
    In the meantime, I recommend that precautionary measures be taken in the affected area, and we will keep you updated on our progress in resolving this matter. Your cooperation and swift response in implementing any necessary actions are highly appreciated.`,
    },
    {
      title: 'Daily Update',
      value: `As of today, the system has been running smoothly, and we have received the daily data update from monitoring system. 

    The information collected includes real-time river depth measurements, ensuring that we stay informed about the current conditions of our river depth.`,
    },
    {
      title: 'System Testing',
      value: `Additionally, our team will be conducting routine system testing over the next few days to ensure the overall functionality and reliability of the River Depth Monitoring System. 

    During this period, you may experience temporary sending in data details. We apologize for any inconvenience this may cause and appreciate your understanding as we work to enhance the system's performance. 
      
    If you have any questions or concerns regarding the system update, warning, or testing, please do not hesitate to contact us.`,
    },
  ];

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
                  value={new Date().toLocaleDateString('en-GB')}
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
                  value={new Date().toLocaleTimeString()}
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
                  select
                  fullWidth
                  maxRows={4}
                  variant="standard"
                  value={formData.message}
                  onChange={handleInputChange}
                >
                  {messageChoice.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              </>
            )}
            </Grid>
          </Grid>
    </React.Fragment>
    )
}