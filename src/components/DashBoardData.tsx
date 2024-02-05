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
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert, { AlertColor } from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import MuiDatePicker from './DatePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import axios, { AxiosError } from 'axios';
import { TextField, Typography } from '@mui/material';
import { useAuth } from '../hooks/AuthContext';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Skeleton from '@mui/material/Skeleton';
import { useData } from '../hooks/DataContext';
import { useNavigate } from 'react-router-dom';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';

interface DataItem {
  _id: number;
  distanceCm: number;
  distanceInch: number;
  date: string;
  time: string;
}

const AlertSnack = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface State extends SnackbarOrigin {
  openSnack: boolean;
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

  //modal
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid red',
    boxShadow: 24,
    p: 4,
  };

export default function DashBoardData(){

  const [data, setData] = useState<DataItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [dateUI, setDateUI] = useState<Date | null>(null);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { token, id } = useAuth();
  const { changeReport, setChangeReport } = useData();

  //dialog
  const handleClickOpen = (id: number) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  //dialog data report
  const { setDataReport } = useData();

  const handleClickOpenReport = (id: number) => {
    setSelectedItemId(id);
    setDialogOpen(true);
  };

  const handleCloseReport = () => {
    setDialogOpen(false)
  };

  const handleClickReport = (id: number) => {
    setDataReport(id.toString());
    setChangeReport(false);
    navigate('/admindashboard/alarm');
  };

  //modal
  const [openModal, setOpenModal] = React.useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [colorModal, setColorModal] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [severityAlert, setSeverityAlert] = useState<AlertColor>('success');

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //Snackbar
  const [snackMessage] = useState('' as string);
  // const [snackSeverity, setSnackSeverity] = useState<AlertColor>('error');
  const [loading, setLoading] = useState(true); // Add loading state
  const theme = useTheme();
  const [stateSnack, setStateSnack] = useState<State>({
    openSnack: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, openSnack } = stateSnack;
  
  // const handleOpenSnack = (newState: SnackbarOrigin) => () => {
  //   // Update the state to open the Snackbar
  // setStateSnack({ ...newState, openSnack: true });
  // };

  const handleCloseSnack = () => {
    // Update the state to close the Snackbar
  setStateSnack({ ...stateSnack, openSnack: false });
  };

  const fetchData = () => {

    // Fetch data from Node.js server
    fetch('https://rivdepmonbackend.vercel.app/datadisplay')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Set loading state to false
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Set loading state to false in case of error
        setLoading(false);
      });
  }

  useEffect(() => {
      fetchData();

      const refreshTimer = setInterval(fetchData, 5000);

      return () => {
      clearInterval(refreshTimer);
      }
  }, []);

    const handleDelete = async (dataId: number) => {
      try {
        console.log('Before Axios DELETE request');
        const response = await axios.delete(`https://rivdepmonbackend.vercel.app/datadelete/${dataId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id, password, action:'Delete depth data' },
        });

        console.log(response)
        setColorModal('green');
        setSeverityAlert('success');
        setModalTitle("Success");
        setModalMessage("Delete Successfully");
        handleOpenModal();
    
        // If you want to perform any action after successful deletion, you can do it here
    
      } catch (error) {
        const errorAxios = error as AxiosError;
    
        console.log('Inside catch block');
        console.error('Delete failed:', error);
    
        // Check if the error is due to unauthorized access (wrong password)
        if (errorAxios.response && errorAxios.response.status === 401) {
          setColorModal('red');
          setSeverityAlert('error');
          setModalTitle("Error");
          setModalMessage("Token not provided");
          handleOpenModal();

        }else if (errorAxios.response && errorAxios.response.status === 501) {
          setColorModal('red');
          setSeverityAlert('error');
          setModalTitle("Invalid Token");
          handleOpenModal();

        }else if (errorAxios.response && errorAxios.response.status === 601) {
          setColorModal('red');
          setSeverityAlert('error');
          setModalTitle("Error");
          setModalMessage("Password does not match");
          handleOpenModal();
          
        }else if (errorAxios.response && errorAxios.response.status === 701) {
          console.log('Eror at verify admin');

        }else if (errorAxios.response && errorAxios.response.status === 801) {
          setColorModal('red');
          setSeverityAlert('error');
          setModalTitle("Error");
          setModalMessage("Data not found");
          handleOpenModal();

        }else if (errorAxios.response && errorAxios.response.status === 901) {
          console.log('Eror at deleteData');

        }
      }
    };
    
    const handleDatePicker = (date: Date | null) => {
      setDateUI(date);
    }

    //skeleton loading
  // React.useEffect(() => {
  //   // Simulate loading by setting a timeout
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   // Clear the timeout when the component unmounts or when loading is complete
  //   return () => clearTimeout(timer);
  // }, []);

    // {loading ? (
    //   <Skeleton sx={{ fontSize: '2rem' }} animation="wave" />
    // ) : (
    //   <>
    //   </>
    // )}

    return (
    <>
      <Grid item xs={12} md={12}>
      <Snackbar 
        open={openSnack} 
        autoHideDuration={5000} 
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <AlertSnack onClose={handleCloseSnack} severity={'success'} sx={{ width: '100%' }}>
          {snackMessage}
        </AlertSnack>
      </Snackbar>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={{ ...style, border: `2px solid ${colorModal}` }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: colorModal }}>
            {modalTitle}
          </Typography>
          <AlertSnack onClose={handleCloseModal} severity={severityAlert} sx={{ width: '100%', mt:2 }}>
            {modalMessage}
          </AlertSnack>
        </Box>
      </Modal>
      <Box sx={{ display: 'flex', alignItems: 'center', my: { xs: 3, md: 2 } }}>
        {loading ? (
          <Skeleton variant='rounded' width="30%" sx={{ p: 3 }} animation="wave" />
        ) : (
          <>
            <MuiDatePicker onDateChange={handleDatePicker} />
            {changeReport && (
              <Box sx={{ ml: 1, p: 1, marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <FiberNewIcon sx={{ mr: 1, color: theme.palette.primary.dark }}></FiberNewIcon>
              </Box>
            )}
          </>
        )}
      </Box>
      <Paper variant='outlined' sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 }}}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("No")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("ID")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Distance in CM")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Distance in Inch")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Date")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Time")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Alert")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Update")}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={8} align='center'>
                    <Skeleton variant='text' animation="wave" sx={{ fontSize: '2rem' }}/>
                    <Skeleton variant='text' animation="wave" sx={{ fontSize: '2rem' }}/>
                    <Skeleton variant='text' animation="wave" sx={{ fontSize: '2rem' }}/>
                    <Skeleton variant='text' animation="wave" sx={{ fontSize: '2rem' }}/>
                    <Skeleton variant='text' animation="wave" sx={{ fontSize: '2rem' }}/>
                    <Skeleton variant='text' animation="wave" sx={{ fontSize: '2rem' }}/>
                    <Skeleton variant='text' animation="wave" sx={{ fontSize: '2rem' }}/>
                    <Skeleton variant='text' animation="wave" sx={{ fontSize: '2rem' }}/>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                <>
                  {dateUI ? (
                    data.filter((item) => dayjs(item.date, 'DD/MM/YYYY').isSame(dayjs(dateUI).format('MM/DD/YYYY'), 'day')).length === 0 ? (
                      <StyledTableRow>
                        <StyledTableCell colSpan={8} align='center'>No data found</StyledTableCell>
                      </StyledTableRow>
                    ) : (
                      data.slice().reverse().filter((item) => dayjs(item.date, 'DD/MM/YYYY').isSame(dayjs(dateUI).format('MM/DD/YYYY'), 'day')).map((item, index) => (
                        <StyledTableRow key={item._id}>
                          <StyledTableCell align='center'>
                          {dayjs(item.date, 'DD/MM/YYYY').isSame(dayjs().format('MM/DD/YYYY'), 'day') ? (
                              <Typography sx={{ flexShrink: 0 }}>
                                  <FiberNewIcon />
                              </Typography>
                          ) : (
                              <Typography sx={{ flexShrink: 0 }}>
                                  {index+1}
                              </Typography>
                          )}
                          </StyledTableCell>
                          <StyledTableCell align='center'>{item._id}</StyledTableCell>
                          <StyledTableCell align='center'>{item.distanceCm}</StyledTableCell> 
                          <StyledTableCell align='center'>{item.distanceInch}</StyledTableCell>
                          <StyledTableCell align='center'>{item.date}</StyledTableCell>
                          <StyledTableCell align='center'>{item.time}</StyledTableCell>
                          <StyledTableCell align='center'>
                            {item.distanceCm < 20 ? <Alert severity="success" variant="outlined">Safe</Alert> : <Alert severity="warning" variant="outlined">Warning!</Alert>}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                              {changeReport ? (
                                  <Button color='success' onClick={() => handleClickOpenReport(item._id)}>Report</Button>
                                ) : (
                                  <>
                                  <Button color='success' onClick={() => handleClickOpenReport(item._id)}>Report</Button>
                                  <Button color='error' onClick={() => handleClickOpen(item._id)}>Delete</Button>
                                  </>
                                )}
                            </ButtonGroup>
                          </StyledTableCell>
                          <Dialog
                            open={dialogOpen && selectedItemId === item._id}
                            onClose={handleCloseReport}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure want to choose this data?"}
                          </DialogTitle>
                          <DialogContent>
                              After this data selected, it will set on notification data info
                              <TableContainer component={Paper} sx={{ mt:1 }}>
                                <Table aria-label="simple table" sx={{ mt: 1 }}>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="center">Data ID</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {data.map((item) => {
                                      if (item._id === selectedItemId) {
                                        return (
                                          <TableRow>
                                            <TableCell align='center'>{item._id}</TableCell>
                                          </TableRow>
                                        );
                                      }
                                      return null;
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseReport}>Cancel</Button>
                            <Button onClick={() => { handleClickReport(item._id); handleCloseReport();}} autoFocus>
                              Yes
                            </Button>
                          </DialogActions>
                          </Dialog>
                          <Dialog
                            open={open && selectedItemId === item._id}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            >
                          <DialogTitle id="alert-dialog-title" sx={{ color: 'red' }}>
                            {"Are you sure want to delete?"}
                          </DialogTitle>
                          <DialogContent>
                              <Alert severity="error" variant="filled">Warning: This data is important and you need to take consideration to delete this</Alert>
                              <TableContainer component={Paper} sx={{ mt: 1 }}>
                                <Table aria-label="simple table" sx={{ mt: 1 }}>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="center">Data ID</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {data.map((item) => {
                                      if (item._id === selectedItemId) {
                                        return (
                                          <TableRow>
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
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} sx={{ color:'red' }}>Cancel</Button>
                            <Button onClick={async () => {
                              await handleDelete(item._id);
                              handleClose();
                            }} autoFocus>
                              Yes
                            </Button>
                          </DialogActions>
                          </Dialog>
                        </StyledTableRow>
                      ))
                    )
                  ) : (
                    data.filter((item => (item._id))).length === 0 ? (
                      <StyledTableRow>
                        <StyledTableCell colSpan={8} align='center'>No data found</StyledTableCell>
                      </StyledTableRow>
                    ) : (   
                      data.slice().reverse().slice(0,150).map((item, index) => (
                        <StyledTableRow  key={item._id}>
                          <StyledTableCell align='center'>
                          {dayjs(item.date, 'DD/MM/YYYY').isSame(dayjs().format('MM/DD/YYYY'), 'day') ? (
                              <Typography sx={{ flexShrink: 0 }}>
                                  <FiberNewIcon />
                              </Typography>
                          ) : (
                              <Typography sx={{ flexShrink: 0 }}>
                                  {index+1}
                              </Typography>
                          )}
                          </StyledTableCell>
                          <StyledTableCell align='center'>{item._id}</StyledTableCell>
                          <StyledTableCell align='center'>{item.distanceCm}</StyledTableCell> 
                          <StyledTableCell align='center'>{item.distanceInch}</StyledTableCell>
                          <StyledTableCell align='center'>{item.date}</StyledTableCell>
                          <StyledTableCell align='center'>{item.time}</StyledTableCell>
                          <StyledTableCell align='center'>
                            {item.distanceCm < 20 ? <Alert severity="success" variant="outlined">Safe</Alert> : <Alert severity="warning" variant="outlined">Warning!</Alert>}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                              {changeReport ? (
                                <Button color='success' onClick={() => handleClickOpenReport(item._id)}>Report</Button>
                              ) : (
                                <>
                                <Button color='success' onClick={() => handleClickOpenReport(item._id)}>Report</Button>
                                <Button color='error' onClick={() => handleClickOpen(item._id)}>Delete</Button>
                                </>
                              )}
                            </ButtonGroup>
                          </StyledTableCell>
                          <Dialog
                            open={dialogOpen && selectedItemId === item._id}
                            onClose={handleCloseReport}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure want to choose this data?"}
                          </DialogTitle>
                          <DialogContent>
                            After this data selected, it will set on notification data info
                              <TableContainer component={Paper} sx={{ mt: 1 }}>
                                <Table aria-label="simple table" sx={{ mt: 1 }}>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="center">Data ID</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {data.map((item) => {
                                      if (item._id === selectedItemId) {
                                        return (
                                          <TableRow key={item._id}>
                                            <TableCell align='center'>{item._id}</TableCell>
                                          </TableRow>
                                        );
                                      }
                                      return null;
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseReport}>Cancel</Button>
                            <Button onClick={() => {
                              handleClickReport(item._id);
                              handleCloseReport();
                            }} autoFocus>
                              Yes
                            </Button>
                          </DialogActions>
                          </Dialog>
                          <Dialog
                            open={open && selectedItemId === item._id}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                          <DialogTitle id="alert-dialog-title" sx={{ color:'red' }}>
                            {"Are you sure want to delete?"}
                          </DialogTitle>
                          <DialogContent>
                            <Alert severity="error" variant="filled">Warning: This data is important and you need to take consideration to delete this</Alert>
                              <TableContainer component={Paper} sx={{ mt: 1 }}>
                                <Table aria-label="simple table" sx={{ mt: 1 }}>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="center">Data ID</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {data.map((item) => {
                                      if (item._id === selectedItemId) {
                                        return (
                                          <TableRow key={item._id}>
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
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} sx={{ color:'red' }}>Cancel</Button>
                            <Button onClick={async () => {
                              await handleDelete(item._id);
                              handleClose();
                            }} autoFocus>
                              Yes
                            </Button>
                          </DialogActions>
                          </Dialog>
                        </StyledTableRow>
                      ))
                    )
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
    </>
    )
}