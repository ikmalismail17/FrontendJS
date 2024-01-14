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
// import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AlarmInfo';
import PaymentForm from './DataInfo';
import Review from './Review';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const steps = ['Details Information', 'Depth Data', 'Reviewing'];

interface FormAlarm {
  message: string
}

interface FormData {
  distanceCm: string,
  distanceInch: string,
  date: string,
  time: string,
}

export default function DashboardAlarm() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = React.useState(true); // Add loading state
    // const [isAddressFormFilled, setIsAddressFormFilled] = React.useState(false);
    const [alarmInfo, setAlarmInfo] = React.useState({
      // firstName: '',
      // lastName: '',
      // adminID: '',
      // email: '',
      message: ''
    })

    const [dataInfo, setDataInfo] = React.useState({
      distanceCm: '',
      distanceInch: '',
      date: '',
      time: '',
    })

    const handleAddressFormFilled = (formData: FormAlarm) => {
      // Advance to the next step when AddressForm is filled
      setAlarmInfo(formData)
      // setIsAddressFormFilled(true);
      setActiveStep(1);
    };

    const resAddressFormFilled = () => {
      // Advance to the next step when AddressForm is filled
      // setIsAddressFormFilled(false);
      setActiveStep(0);
    };

    const handlePaymentFormFilled = (formData: FormData) => {
      // Advance to the next step when PaymentForm is filled
      setDataInfo(formData)
      setActiveStep(2);
    };

    //skeleton loading
  React.useEffect(() => {
    // Simulate loading by setting a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timeout when the component unmounts or when loading is complete
    return () => clearTimeout(timer);
  }, []);

  // {loading ? (
  //   <Skeleton sx={{ fontSize: '2rem' }} animation="wave" />
  // ) : (
  //   <>
  //   </>
  // )}

  return (
    <React.Fragment>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
            {loading ? (
            <Skeleton sx={{ fontSize: '2.5rem', margin: 'auto' }} width="50%" animation="wave" />
            ) : (
              <> 
              <Typography component="h1" variant="h4" align="center">
                Report Progress
              </Typography>
              </>
            )}
            {loading ? (
            <Skeleton sx={{ fontSize: '2.5rem' }} animation="wave" />
            ) : (
              <>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel><Box sx={{ display: { xs: 'none', sm: 'block' } }}>{label}</Box></StepLabel>
                </Step>
                ))}
              </Stepper>
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 1 }, p: { xs: 2, md: 3 } }}>
              <AddressForm onFormFilled={handleAddressFormFilled} onFormUnfilled={resAddressFormFilled}></AddressForm>
            </Paper>
            <Grid item xs={12}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
                <PaymentForm onFormFilled={handlePaymentFormFilled}
                // isAddressFormFilled={isAddressFormFilled}
                ></PaymentForm>
            </Paper>
            </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 1 }, p: { xs: 2, md: 3 } }}>
            <Review alarmInfo={alarmInfo} dataInfo={dataInfo}></Review>
          </Paper>
        </Grid>
        </Grid>
    </React.Fragment>
  );
}