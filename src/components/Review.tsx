import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useAuth } from '../hooks/AuthContext';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { useData } from '../hooks/DataContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AxiosError } from 'axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface FormData {
  alarmInfo: {
    message: string
  };

  dataInfo: {
    distanceCm: string,
    distanceInch: string,
    date: string,
    time: string,
  };
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

export default function Review({alarmInfo, dataInfo}: FormData) {
  const { id, token } = useAuth();
  const [loading, setLoading] = useState(true); // Add loading state
  const { dataReport, setDataReport } = useData();
  const [snackMessage, setSnackMessage] = useState('');
  const navigate = useNavigate();
  const [admindata, setAdminData] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  // Snackbar
  const [stateSnack, setStateSnack] = React.useState<State>({
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

  const handleInsertReport = async() => {
    try {
    console.log('Before Axios POST request');
    const response = await axios.post(
      `http://localhost:3000/alarmreport/${dataReport}`,
      {
        id: id,
        dataId: dataReport,
        message: alarmInfo.message,
        action: 'Insert new report'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      console.log('Insert successful:', response);
      localStorage.setItem('snackReport', 'success')

      setDataReport('');
      navigate('/admindashboard/report');
    } catch (error) {
      const errorAxios = error as AxiosError;

      console.log('Inside catch block');
      console.log(errorAxios);
      
      if (errorAxios.response && errorAxios.response.status === 401) {
        setSnackMessage('Token not provided');
        handleOpenSnack({ vertical: 'bottom', horizontal: 'right' })();

      }else if(errorAxios.response && errorAxios.response.status === 501){
        setSnackMessage('Invalid token');
        handleOpenSnack({ vertical: 'bottom', horizontal: 'right' })();

      }else if(errorAxios.response && errorAxios.response.status === 601){
        setSnackMessage('Data Id or Message are empty');
        handleOpenSnack({ vertical: 'bottom', horizontal: 'right' })();
      }
    }
  }

  React.useEffect(() => {
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
      .catch((error) => {
        // console.error('Error fetching data:', error);

        // // Log additional information about the error
        // console.error('Error details:', {
        //   message: error.message,
        //   stack: error.stack,
        // });
      });
  }, []);
  
  //skeleton loading
  React.useEffect(() => {
    // Simulate loading by setting a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timeout when the component unmounts or when loading is complete
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
          {loading ? (
            <Skeleton sx={{ fontSize: '2rem' }} width="40%" animation="wave" />
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Review summary
              </Typography>
            </>
          )}
          <Divider />
          <List disablePadding>
          {loading ? (
            <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="70%" animation="wave" />
          ) : (
            <>
            <ListItem>
              <ListItemText primary="Admin ID" secondary={`${id}`} />
            </ListItem>
            </>
          )}

          {loading ? (
            <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="70%" animation="wave" />
          ) : (
            <>
            <ListItem>
              <ListItemText primary="Full Name" secondary={`${admindata.firstname} ${admindata.lastname}`} />
            </ListItem>
            </>
          )}

          {loading ? (
            <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="70%" animation="wave" />
          ) : (
            <>
            <ListItem>
              <ListItemText primary="Email" secondary={admindata.email} />
            </ListItem>
            </>
          )}

          {loading ? (
            <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="70%" animation="wave" />
          ) : (
            <>
            <ListItem>
              <ListItemText primary="Date" secondary={new Date().toLocaleDateString('en-GB')} />
            </ListItem>
            </>
          )}

          {loading ? (
            <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="70%" animation="wave" />
          ) : (
            <>
            <ListItem>
              <ListItemText primary="Time" secondary={new Date().toLocaleTimeString()} />
            </ListItem>
            </>
          )}
            
          {loading ? (
            <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="70%" animation="wave" />
          ) : (
            <>
            <ListItem>
              <ListItemText primary="Message" secondary={alarmInfo.message} />
            </ListItem>
            </>
          )}
          </List>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="40%" animation="wave" />
            ) : (
              <>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Depth ID
              </Typography>
              </>
            )}
            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} animation="wave" />
            ) : (
              <>
              <Typography gutterBottom>{`ID: ${dataReport}`}</Typography>
              </>
            )}
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="40%" animation="wave" />
            ) : (
              <>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Data details
              </Typography>
              </>
            )}

            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} animation="wave" />
            ) : (
              <>
              <Typography gutterBottom>{`CM: ${dataInfo.distanceCm}`}</Typography>
              </>
            )}

            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} animation="wave" />
            ) : (
              <>
              <Typography gutterBottom>{`Inch: ${dataInfo.distanceInch}`}</Typography>
              </>
            )}
            
            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} animation="wave" />
            ) : (
              <>
              <Typography gutterBottom>{`Date: ${dataInfo.date}`}</Typography>
              </>
            )}

            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} animation="wave" />
            ) : (
              <>
              <Typography gutterBottom>{`Time: ${dataInfo.time}`}</Typography>
              </>
            )}
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{  mt:1 }}>
          <Snackbar
            open={openSnack}
            autoHideDuration={5000}
            onClose={handleCloseSnack}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
          >
            <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
              {snackMessage}
            </Alert>
          </Snackbar>
            {loading ? (
              <Skeleton sx={{ fontSize: '2rem', display: 'flex', justifyContent: 'flex-end' }} animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                sx={{ mt: 0.5, ml: 1 }}
                onClick={handleInsertReport}
              >
                SUBMIT
              </Button>
              </Box>
              </>
            )}
          </Box>
    </React.Fragment>
  );
}