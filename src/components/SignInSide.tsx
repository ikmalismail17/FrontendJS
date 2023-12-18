import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { AxiosError } from 'axios';
// import { useHistory } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface State extends SnackbarOrigin {
  openSnack: boolean;
}


export default function SignInSide() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setId } = useAuth(); // Use useAuth to access setToken
  const navigate = useNavigate();
  const { token } = useAuth();

   //Snackbar
   const [state, setState] = React.useState<State>({
    openSnack: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, openSnack } = state;

  const handleOpenSnack = (newState: SnackbarOrigin) => () => {
    console.log('Snackbar opened:', newState); // Add this log statement
    setState({ ...newState, openSnack: true});
  };

  const handleCloseSnack = () => {
    console.log('Snackbar closed'); // Add this log statement
    setState({ ...state, openSnack: false });
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { resToken, userId } = response.data;
      setToken(resToken);
      setId(userId);
      // console.log('Token: ', resToken);
      // console.log('ID: ', userId);
      // console.log('Email: ', email);
      // console.log('Password: ', password);
      // console.log('Login successful: ', response);

      // Manually navigate to /admindashboard
      navigate('/admindashboard');
    } catch (error) {

    // Use type assertion to inform TypeScript about the type of 'error'
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status === 401) {
      // Unauthorized (401) response
      console.log('Unauthorized request. Displaying snackbar.');

      // Call handleOpenSnack function here with appropriate parameters
      handleOpenSnack({ vertical: 'top', horizontal: 'center'});

      return;
    } else if (axiosError.response) {
      // The request was made and the server responded with a status code
      // other than 401.
      console.log('Server responded with:', axiosError.response.data);
      console.log('Status code:', axiosError.response.status);
    } else {
      // Handle other types of errors
      console.error('Non-Axios error occurred:', axiosError.message);
    }
    }
  };

  React.useEffect(() => {
    if (token) {
      navigate('/admindashboard');
    }
  }, [token, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Snackbar 
          open={openSnack} 
          autoHideDuration={5000} 
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
            User not found!!
          </Alert>
        </Snackbar>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1419133203517-f3b3ed0ba2bb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpdmVyfGVufDB8fDB8fHww)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AdminPanelSettingsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                fullWidth
                type='submit'
                onClick={handleLogin}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}