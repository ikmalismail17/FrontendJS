import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useAuth } from '../AuthContext';
import { useState } from 'react';
import Divider from '@mui/material/Divider';

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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review summary
      </Typography>
      <Divider />
      <List disablePadding>
        <ListItem>
          <ListItemText primary="Admin ID" secondary={`${id}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Full Name" secondary={`${admindata.firstname} ${admindata.lastname}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={admindata.email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Date" secondary={Date().substring(4, 15)} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Time" secondary={Date().substring(15,21)} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Message" secondary={alarmInfo.message} />
        </ListItem>
      </List>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Depth Data
          </Typography>
          {/* Display shipping information based on your actual data structure */}
          <Typography gutterBottom>{`ID: ${dataInfo.dataID}`}</Typography>
          {/* Add other shipping details */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Data details
          </Typography>
          {/* Display payment details based on your actual data structure */}
          <Typography gutterBottom>{`Data in CM: ${dataInfo.dataCM}`}</Typography>
          <Typography gutterBottom>{`Data in Inch: ${dataInfo.dataInch}`}</Typography>
          <Typography gutterBottom>{`Data Date: ${dataInfo.date}`}</Typography>
          {/* Add other payment details */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}