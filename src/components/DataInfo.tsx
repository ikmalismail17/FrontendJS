import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import StraightenIcon from '@mui/icons-material/Straighten';
import Box from '@mui/material/Box';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';

interface MyFormData {
  dataID: string,
  dataCM: string,
  dataInch: string,
  date: string,
}

interface PaymentFormProps{
    onFormFilled: (formData: MyFormData) => void;
    onDisabled: number;
    isAddressFormFilled: boolean;
}

export default function PaymentForm({onFormFilled, onDisabled, isAddressFormFilled}: PaymentFormProps) {
    const [formData, setFormData] = useState({
        dataID: '',
        dataCM: '',
        dataInch: '',
        date: '',
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
      if (isFormFilled && isAddressFormFilled) {
        onFormFilled(formData);
      }
    }, [formData, onFormFilled, isAddressFormFilled]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Depth Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Grid3x3Icon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="dataID"
            name= "dataID"
            label="Data ID"
            fullWidth
            variant="standard"
            value={formData.dataID}
            onChange={handleInputChange}
            disabled={onDisabled === 0 || !isAddressFormFilled}
          />
        </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <StraightenIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="dataCM"
            name="dataCM"
            label="Data in CM"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">cm</InputAdornment>
              ),
            }}
            value={formData.dataCM}
            onChange={handleInputChange}
            disabled={onDisabled === 0 || !isAddressFormFilled}
          />
        </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <StraightenIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="dataInch"
            name="dataInch"
            label="Data in Inch"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">inch</InputAdornment>
              ),
            }}
            value={formData.dataInch}
            onChange={handleInputChange}
            disabled={onDisabled === 0 || !isAddressFormFilled}
          />
        </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <CalendarMonthIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="date"
            name="date"
            label="Date"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={formData.date}
            onChange={handleInputChange}
            disabled={onDisabled === 0 || !isAddressFormFilled}
          />
        </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}