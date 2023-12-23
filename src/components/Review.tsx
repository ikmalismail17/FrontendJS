import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useAuth } from '../AuthContext';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

interface FormData {
  alarmInfo: {
    // firstName: string,
    // lastName: string,
    // adminID: string,
    // email: string,
    message: string
  };
  dataInfo: {
    dataID: string,
    dataCM: string,
    dataInch: string,
    date: string,
  };
}

export default function Review({alarmInfo, dataInfo}: FormData) {
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
              <ListItemText primary="Date" secondary={Date().substring(4, 15)} />
            </ListItem>
            </>
          )}

          {loading ? (
            <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} width="70%" animation="wave" />
          ) : (
            <>
            <ListItem>
              <ListItemText primary="Time" secondary={Date().substring(15,21)} />
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
              <Typography gutterBottom>{`ID: ${dataInfo.dataID}`}</Typography>
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
              <Typography gutterBottom>{`Data in CM: ${dataInfo.dataCM}`}</Typography>
              </>
            )}

            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} animation="wave" />
            ) : (
              <>
              <Typography gutterBottom>{`Data in Inch: ${dataInfo.dataInch}`}</Typography>
              </>
            )}
            
            {loading ? (
              <Skeleton sx={{ fontSize: '1.5rem', pt: 2 }} animation="wave" />
            ) : (
              <>
              <Typography gutterBottom>{`Data Date: ${dataInfo.date}`}</Typography>
              </>
            )}
            </Grid>
          </Grid>
    </React.Fragment>
  );
}