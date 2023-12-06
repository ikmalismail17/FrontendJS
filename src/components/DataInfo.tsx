import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';

interface PaymentFormProps{
    onFormFilled: () => void;
    onDisabled: number;
    isAddressFormFilled: boolean;
}

export default function PaymentForm({onFormFilled, onDisabled, isAddressFormFilled}: PaymentFormProps) {
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
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
        onFormFilled();
      }
    }, [formData, onFormFilled, isAddressFormFilled]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Depth Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name= "cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={formData.cardName}
            onChange={handleInputChange}
            disabled={onDisabled === 0 || !isAddressFormFilled}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={formData.cardNumber}
            onChange={handleInputChange}
            disabled={onDisabled === 0 || !isAddressFormFilled}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={formData.expDate}
            onChange={handleInputChange}
            disabled={onDisabled === 0 || !isAddressFormFilled}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={formData.cvv}
            onChange={handleInputChange}
            disabled={onDisabled === 0 || !isAddressFormFilled}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}