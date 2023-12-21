import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import MuiDatePicker from './DatePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import axios, { AxiosError } from 'axios';
import { TextField } from '@mui/material';
import { useAuth } from '../AuthContext';

interface DataItem {
  _id: number;
  distanceCm: number;
  distanceInch: number;
  date: string;
  time: string;
}

  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function DashBoardReport(){

  const [data, setData] = useState<DataItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [dateUI, setDateUI] = useState<Date | null>(null);
  const [password, setPassword] = useState('');
  const { token, id } = useAuth();

  const handleClickOpen = (id: number) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    // Fetch data from Node.js server
    fetch('http://localhost:3000/datadisplay')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data); // Log the received data
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

    useEffect(() => {
        fetchData();

        const refreshTimer = setInterval(fetchData, 10000);

        return () => {
        clearInterval(refreshTimer);
        }
    }, []);

    const handleDelete = async (dataId: number) => {
      try {
        console.log('Before Axios DELETE request');
        const response = await axios.delete(`http://localhost:3000/datadelete/${dataId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id, password },
        });
    
        console.log('Delete successful:', response);
        console.log('Admin ID:', id);
        console.log('Data ID:', dataId);
        console.log('Token:', token);
        console.log('Password:', password);
    
        // If you want to perform any action after successful deletion, you can do it here
    
      } catch (error) {
        const errorAxios = error as AxiosError;
    
        console.log('Inside catch block');
        console.error('Delete failed:', error);
    
        // Check if the error is due to unauthorized access (wrong password)
        if (errorAxios.response && errorAxios.response.status === 401) {
          console.log('Token not provided');
        }else if (errorAxios.response && errorAxios.response.status === 501) {
          console.log('Invalid Token');
        }else if (errorAxios.response && errorAxios.response.status === 601) {
          console.log('Password doesnt match');
        }else if (errorAxios.response && errorAxios.response.status === 701) {
          console.log('Eror at verify admin');  
        }else if (errorAxios.response && errorAxios.response.status === 801) {
          console.log('No data found');  
        }else if (errorAxios.response && errorAxios.response.status === 901) {
          console.log('Eror at deleteData');  
        }
      }
    };
    
    
    
    
    const handleDatePicker = (date: Date | null) => {
      setDateUI(date);
      console.log(dayjs(date).format('DD/MM/YYYY'));
    }

    return (
    <>
      <Grid item xs={12} md={12}>
      <Box sx={{ my: { xs: 3, md: 2 }}}>
        <MuiDatePicker onDateChange={handleDatePicker} />
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align='center'>No</StyledTableCell>
              <StyledTableCell align='center'>ID</StyledTableCell>
              <StyledTableCell align='center'>Distance in CM</StyledTableCell>
              <StyledTableCell align='center'>DIstance in Inch</StyledTableCell>
              <StyledTableCell align='center'>Date</StyledTableCell>
              <StyledTableCell align='center'>Time</StyledTableCell>
              <StyledTableCell align='center'>Alert</StyledTableCell>
              <StyledTableCell align='center'>Update</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {dateUI ? 
            data.filter((item) => dayjs(item.date).isSame(dayjs(dateUI).format('DD/MM/YYYY'), 'day')).length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align='center'>No data found</StyledTableCell>
              </StyledTableRow>
            ) : (
              data.filter((item) => dayjs(item.date).isSame(dayjs(dateUI).format('DD/MM/YYYY'), 'day')).map((item, index) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                  <StyledTableCell align='center'>{item._id}</StyledTableCell>
                  <StyledTableCell align='center'>{item.distanceCm}</StyledTableCell> 
                  <StyledTableCell align='center'>{item.distanceInch}</StyledTableCell>
                  <StyledTableCell align='center'>{item.date}</StyledTableCell>
                  <StyledTableCell align='center'>{item.time}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {item.distanceCm < 200 ? <Alert severity="success" variant="outlined">Safe</Alert> : <Alert severity="warning" variant="outlined">Warning!</Alert>}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button href="#text-buttons" color='success'>Edit</Button>
                      <Button href="#text-buttons" color='error' onClick={() => handleClickOpen(item._id)}>Delete</Button>
                      <Dialog
                        open={open && selectedItemId === item._id}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure want to delete?"}
                        </DialogTitle>
                        {/* Dialog content */}
                      </Dialog>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )
            : 
            data.filter((item => (item._id))).length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align='center'>No data found</StyledTableCell>
              </StyledTableRow>
            ) : (   
            data.map((item, index) => (
              <StyledTableRow  key={item._id}>
                  <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                  <StyledTableCell align='center'>{item._id}</StyledTableCell>
                  <StyledTableCell align='center'>{item.distanceCm}</StyledTableCell> 
                  <StyledTableCell align='center'>{item.distanceInch}</StyledTableCell>
                  <StyledTableCell align='center'>{item.date}</StyledTableCell>
                  <StyledTableCell align='center'>{item.time}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {item.distanceCm < 200 ? <Alert severity="success" variant="outlined">Safe</Alert> : <Alert severity="warning" variant="outlined">Warning!</Alert>}
                    </StyledTableCell>
                  <StyledTableCell align='center'>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button href="#text-buttons" color='success'>Edit</Button>
                    <Button href="#text-buttons" color='error' onClick={() => handleClickOpen(item._id)}>Delete</Button>
                    <Dialog
                      open={open && selectedItemId === item._id}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure want to delete?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Warning: This data is important and you need to take consideration to delete this
                          <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">Data ID</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.map((item) => {
                                  if (item._id === selectedItemId) {
                                    return (
                                      <TableRow
                                      >
                                        <TableCell align='center'>{item._id}</TableCell>
                                      </TableRow>
                                    );
                                  }
                                  return null;
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
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
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={async () => {
                          await handleDelete(item._id);
                          handleClose();
                        }} autoFocus>
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </ButtonGroup>
                  </StyledTableCell>
              </StyledTableRow>
             ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    </>
    )
}