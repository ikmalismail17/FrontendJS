import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Grid from '@mui/material/Grid';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isAddressFormFilled, setIsAddressFormFilled] = React.useState(false)

    const handleAddressFormFilled = () => {
      // Advance to the next step when AddressForm is filled
      setIsAddressFormFilled(true);
      setActiveStep(1);
    };

    const resAddressFormFilled = () => {
      // Advance to the next step when AddressForm is filled
      setIsAddressFormFilled(false);
      setActiveStep(0);
    };

    const handlePaymentFormFilled = () => {
      // Advance to the next step when PaymentForm is filled
      setActiveStep(2);
    };

  return (
    <React.Fragment>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            </Paper>
        </Grid>
        <Grid item xs={6} spacing={2}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
              <AddressForm onFormFilled={handleAddressFormFilled} onFormUnfilled={resAddressFormFilled}></AddressForm>
            </Paper>
            <Grid xs={12}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
                <PaymentForm onFormFilled={handlePaymentFormFilled} onDisabled={activeStep} isAddressFormFilled={isAddressFormFilled}></PaymentForm>
            </Paper>
            </Grid>
        </Grid>
        <Grid item xs={6}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
                <Review></Review>
            </Paper>
            <Grid xs={12}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                >
                  SUBMIT
                </Button>
                </Box>
            </Paper>
            </Grid>
        </Grid>
        </Grid>
        {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
        </Paper> */}
        
    </React.Fragment>
  );
}