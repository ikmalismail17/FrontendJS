import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import axios, { AxiosError } from 'axios';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { TableRow, TableCell, Table, TableContainer, TableHead, TableBody } from '@mui/material';
import React from 'react';


interface State extends SnackbarOrigin {
  openSnack: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DashBoardContent(){
    const { id, token } = useAuth();
    const [adminData, setAdminData] = useState({
      firstname: '',
      lastname: '',
      email: '',
    })
    // Separate state for edited values
    const [editedAdminData, setEditedAdminData] = useState({
      firstname: '',
      lastname: '',
      email: '',
    });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedAdminData({
        ...editedAdminData,
        [e.target.name]: e.target.value,
      });
    };

    //dialog profile
    const [open, setOpen] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false)
    };

    const handleClickOpenPassword = () => {
      setOpenPassword(true);
    };
  
    const handleClosePassword = () => {
      setOpenPassword(false)
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    };

    const checkNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      const enteredConfirmPassword = e.target.value;
      setConfirmPassword(enteredConfirmPassword);

      if (enteredConfirmPassword.trim() === '') {
      setIsPasswordMatch(null);
      }else if (newPassword !== e.target.value){
        setIsPasswordMatch(false);
      }else{
        setIsPasswordMatch(true);
      }
    }

    const handleClickEditProfile = async() => {
      try {
        console.log('Before Axios POST request');
        const response = await axios.post(
          `http://localhost:3000/editprofile/${id}`,
          {
            firstname: editedAdminData.firstname,
            lastname: editedAdminData.lastname,
            email: editedAdminData.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
          setSnackMessage('Update Profile Successful');
          setSnackSeverity('success');
          handleOpenSnack({ vertical: 'top', horizontal: 'center' })();

          await fetchData();

        } catch (error) {
          const errorAxios = error as AxiosError;
    
          console.log('Inside catch block');
          console.log(errorAxios);
          
          if (errorAxios.response && errorAxios.response.status === 401) {
            setSnackMessage('Token not provided');
            setSnackSeverity('error');
            handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
    
          }else if(errorAxios.response && errorAxios.response.status === 501){
            setSnackMessage('Invalid token');
            setSnackSeverity('error');
            handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
    
          }else if(errorAxios.response && errorAxios.response.status === 601){
            setSnackMessage('Admin not found');
            setSnackSeverity('error');
            handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
          }
        }
    };

    const handleClickPassword = async() => {
      try {
        console.log('Before Axios POST request');
        const response = await axios.post(
          `http://localhost:3000/changepassword/${id}`,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Insert successful:', response);
        setSnackMessage('Change Password Successful');
        setSnackSeverity("success");
        handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
        
        } catch (error) {
          const errorAxios = error as AxiosError;
    
          console.log('Inside catch block');
          console.log(errorAxios);
          
          if (errorAxios.response && errorAxios.response.status === 401) {
            setSnackMessage('Token not provided');
            setSnackSeverity("error");
            handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
    
          }else if(errorAxios.response && errorAxios.response.status === 501){
            setSnackMessage('Invalid token');
            setSnackSeverity("error");
            handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
    
          }else if(errorAxios.response && errorAxios.response.status === 601){
            setSnackMessage('Old Password is incorrect');
            setSnackSeverity("error");
            handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
          
          }else if(errorAxios.response && errorAxios.response.status === 701){
            setSnackMessage('User not found');
            setSnackSeverity("error");
            handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
          
          }else if(errorAxios.response && errorAxios.response.status === 801){
            console.log('Internal Server Error');
          }
        }
    };

    // Snackbar
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('success'); // Add this line
    const [snackMessage, setSnackMessage] = useState('');
    const [stateSnack, setStateSnack] = useState<State>({
      openSnack: false,
      vertical: 'top',
      horizontal: 'center',
    });
  
    const { vertical, horizontal, openSnack } = stateSnack;
  
    const handleOpenSnack = (newState: SnackbarOrigin) => () => {
      setStateSnack({ ...newState, openSnack: true });
    };
  
    const handleCloseSnack = () => {
      setStateSnack({ ...stateSnack, openSnack: false });
    };

    // Fetch data from Node.js server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/admininfo/' + id);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const admindata = await response.json();
        setEditedAdminData(admindata);
      
        setAdminData(admindata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <>
        <Snackbar
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
            {snackMessage}
          </Alert>
        </Snackbar>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
        <DialogTitle id="alert-dialog-title">
          {"Edit Profile"}
        </DialogTitle>
        <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1}}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="firstname"
                label="First Name"
                name='firstname'
                fullWidth
                value={editedAdminData.firstname}
                onChange={handleInputChange}
              />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="lastname"
                label="Last Name"
                name='lastname'
                fullWidth
                value={editedAdminData.lastname}
                onChange={handleInputChange}
              />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="email"
                label="Email"
                name='email'
                fullWidth
                value={editedAdminData.email}
                onChange={handleInputChange}
              />
              </Grid>
            </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={async() => { 
            await handleClickEditProfile(); 
            handleClose();}} autoFocus>
            Yes
          </Button>
        </DialogActions>
        </Dialog>
        <Dialog
          open={openPassword}
          onClose={handleClosePassword}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
        <DialogTitle id="alert-dialog-title">
          {"Change Password"}
        </DialogTitle>
        <DialogContent>
            Pleas insert old password and new password
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2}}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                name="oldpassword"
                label="Old Password"
                type='password'
                id="oldpassword"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                name="newpassword"
                label="New Password"
                type='password'
                id="newpassword"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type='password'
                id="confirmpassword"
                onChange={checkNewPassword}
              />
                {isPasswordMatch !== null && (
                  isPasswordMatch ? (
                    <Alert severity="success" variant="outlined">
                      New password match
                    </Alert>
                  ) : (
                    <Alert severity="error" variant="outlined">
                      New password doesn't match
                    </Alert>
                  )
                )}
              </Grid>
            </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePassword}>Cancel</Button>
          <Button disabled={!isPasswordMatch} onClick={async() => { 
            await handleClickPassword(); 
            handleClosePassword();}} autoFocus>
            Yes
          </Button>
        </DialogActions>
        </Dialog>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 } , p: { xs: 2, md: 3 }, maxWidth: {sm:'fit-content', md: 'fit-content', lg: 'fit-content', xl: 'fit-content' }, mx:'auto'}}>
        {/* First Section */}
        <Box textAlign="center">
          <AccountCircleIcon fontSize='large'/>
          <Typography>Profile</Typography>
        </Box>

        {/* Second Section */}
        <Box sx={{ mt: 2, maxWidth: {sm:'fit-content', md: 'fit-content', lg: 'fit-content', xl: 'fit-content' }, mx:'auto' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}><strong>Profile Details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>First Name:</strong>
                  </TableCell>
                  <TableCell>
                    :
                  </TableCell>
                  <TableCell>
                    {adminData.firstname}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Last Name:</strong>
                  </TableCell>
                  <TableCell>
                    :
                  </TableCell>
                  <TableCell>
                    {adminData.lastname}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Email:</strong>
                  </TableCell>
                  <TableCell>
                    :
                  </TableCell>
                  <TableCell>
                    {adminData.email}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Third Section */}
        <Box textAlign="center" marginTop="20px">
            <Button variant="contained" startIcon={<EditIcon />} sx={{ mr:1 }} onClick={handleClickOpen}>
                Edit
            </Button>
            <Button variant="contained" startIcon={<LockIcon />} onClick={handleClickOpenPassword}>
                Password
            </Button>
        </Box>
        </Paper>
      </>
    )
}