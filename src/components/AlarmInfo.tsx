import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface MyFormData {
  firstName: string,
  lastName: string,
  adminID: string,
  email: string,
}

interface AddressFormProps {
  onFormFilled: (formData: MyFormData) => void;
  onFormUnfilled: () => void;
}

export default function AddressForm({ onFormFilled, onFormUnfilled }: AddressFormProps){
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    adminID: '',
    email: '',
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            name="email"
            label="Admin Email"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>

    )
}