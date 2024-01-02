import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AccordionActions from '@mui/material/AccordionActions';
import MuiDatePicker from './DatePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../hooks/AuthContext';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  interface State extends SnackbarOrigin {
    openSnack: boolean;
  }

  interface DataItem {
    _id: number;
    admin: { 
      _id: number;
      firstname: string;
      lastname: string;
      email: string;
    }[];
    data: { 
        _id: number;
        distanceCm: number;
        distanceInch: number;
        date: string;
        time: string;
    }[];
    message: string;
    date: string;
    time: string;
  }

  //modal
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  export default function DashBoardReport() {
    const [snackMessage, setSnackMessage] = useState('');
    const [expanded, setExpanded] = useState<string | false>(false);
    const [data, setData] = useState<DataItem[]>([]);
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [password, setPassword] = useState('');
    const [colorModal, setColorModal] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [severityAlert, setSeverityAlert] = useState<AlertColor>('success');
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [dateUI, setDateUI] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const { token, id } = useAuth();

    //backdrop
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const handleCloseBackDrop = () => {
      setOpenBackDrop(false);
    };
    const handleOpenBackDrop = () => {
      setOpenBackDrop(true);
    };

    //publish report
    const[openPublish, setOpenPublish] = useState(false);

    const handleClickOpenPublish = (id: number) => {
      setSelectedItemId(id);
      setOpenPublish(true);
    };

    const handleClosePublish = async () => {
      setOpenPublish(false);
    }

    const [toEmails, setToEmails] = useState<string[]>([]);
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState(''); 

    const handleAddToEmail = () => {
      if (email.trim() !== '') {
        setToEmails((prevEmails) => [...prevEmails, email.trim()]);
        setEmail('');
        const addEmailInput = document.getElementById('addEmail') as HTMLInputElement;
        addEmailInput.value = '';
      }
    };

    const handleRemoveToEmail = (index: number) => {
      setToEmails((prevEmails) => {
        const updatedEmails = [...prevEmails];
        updatedEmails.splice(index, 1);
        return updatedEmails;
      });
    };

    const handleSubmitReport = async (reportId : number) => {

      handleClosePublish();
      handleOpenBackDrop();
      try {

        const message = data.filter((item) => item._id === reportId)[0].message;
        const adminFirstName = data.filter((item) => item._id === reportId)[0].admin[0].firstname;
        const adminLastName = data.filter((item) => item._id === reportId)[0].admin[0].lastname;
        const dataCm = data.filter((item) => item._id === reportId)[0].data[0].distanceCm;
        const dataInch = data.filter((item) => item._id === reportId)[0].data[0].distanceInch;
        const dataDate = data.filter((item) => item._id === reportId)[0].data[0].date;
        const dataTime = data.filter((item) => item._id === reportId)[0].data[0].time;

        let allEmailsSuccessful = true;

        // Send emails with pre-defined subject and text
        for (const to of toEmails) {
          const response = await axios.post(`http://localhost:3000/sendemail/${reportId}`, {
            to,
            subject,
            message: message,
            name : `${adminFirstName} ${adminLastName}`,
            dataCm : dataCm,
            dataInch : dataInch,
            dataDate : dataDate,
            dataTime : dataTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
          );

          if (response.status !== 200) {
            allEmailsSuccessful = false;
            break; // exit the loop if one email fails
          }
        }

        if (allEmailsSuccessful) {
          handleCloseBackDrop();
          setColorModal('green');
          setSeverityAlert('success');
          setModalTitle("Success");
          setModalMessage("Report sent successfully");
          handleOpenModal();
        }

      } catch (error) {
        const errorAxios = error as AxiosError;
        console.error('Error sending emails:', errorAxios);

        handleCloseBackDrop();

        // Check if the error is due to unauthorized access (wrong password)
        if (errorAxios.response && errorAxios.response.status === 401) {
          console.log('Token not provided');
          setColorModal('red');
          setModalTitle("Error");
          setSeverityAlert('error');
          setModalMessage("Token not provided");
          handleOpenModal();

        }else if (errorAxios.response && errorAxios.response.status === 501) {
          console.log('Invalid Token');
          setColorModal('red');
          setModalTitle("Error");
          setSeverityAlert('error');
          setModalMessage("Invalid Token");
          handleOpenModal();

        }else if (errorAxios.response && errorAxios.response.status === 601) {
          console.log('Error sending email');
          setColorModal('red');
          setModalTitle("Error");
          setSeverityAlert('error');
          setModalMessage("Error sending email");
          handleOpenModal();
          
        }else if (errorAxios.response && errorAxios.response.status === 701) {
          console.log('Internal server error');
          
        }
      }
    };

    const subjectEmail = [
      {
        value: `Daily River Depth Update - ${new Date().toLocaleDateString('en-GB')}`,
      },
      {
        value: `Warning: Unusual River Depth Conditions Detected Today - ${new Date().toLocaleDateString('en-GB')}`,
      },
      {
        value: `System Testing - ${new Date().toLocaleDateString('en-GB')}`,
      },
    ];

    //dialog
    const handleClickOpen = (id: number) => {
      setSelectedItemId(id);
      setOpen(true);
    };
  
    const handleClose = async () => {
      setOpen(false)
    };

    //handle modal
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    //delete report
    const handleDelete = async (dataId: number) => {
      try {
        console.log('Before Axios DELETE request');
        const response = await axios.delete(`http://localhost:3000/reportdelete/${dataId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id, password },
        });

        console.log(response);
        setColorModal('green');
        setModalTitle("Success");
        setSeverityAlert('success');
        setModalMessage("Delete report successful");
        handleOpenModal();
    
        // If you want to perform any action after successful deletion, you can do it here
    
      } catch (error) {
        const errorAxios = error as AxiosError;
    
        console.log('Inside catch block');
        console.error('Delete failed:', errorAxios);
    
        // Check if the error is due to unauthorized access (wrong password)
        if (errorAxios.response && errorAxios.response.status === 401) {
          console.log('Token not provided');
          setColorModal('red');
          setModalTitle("Error");
          setSeverityAlert('error');
          setModalMessage("Token not provided");
          handleOpenModal();

        }else if (errorAxios.response && errorAxios.response.status === 501) {
          console.log('Invalid Token');
          setColorModal('red');
          setModalTitle("Error");
          setSeverityAlert('error');
          setModalMessage("Invalid Token");
          handleOpenModal();

        }else if (errorAxios.response && errorAxios.response.status === 601) {
          console.log('Password doesnt match');
          setColorModal('red');
          setModalTitle("Error");
          setSeverityAlert('error');
          setModalMessage("Password doesn't match");
          handleOpenModal();
          
        }else if (errorAxios.response && errorAxios.response.status === 701) {
          console.log('Eror at verify admin');

        }else if (errorAxios.response && errorAxios.response.status === 801) {
          console.log('No data found');
          setColorModal('red');
          setModalTitle("Error");
          setSeverityAlert('error');
          setModalMessage("No data found");
          handleOpenModal();

        }else if (errorAxios.response && errorAxios.response.status === 901) {
          console.log('Eror at deleteData');

        }
      }
    };
    
    //handle accordion
    const handleChangeAccordian = (panel: string) => (
        event: React.SyntheticEvent,
        isExpanded: boolean
      ) => {
        setExpanded(isExpanded ? panel : false);
      };
      
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
  
    useEffect(() => {
      if (localStorage.getItem('snackReport') === 'success') {
        setSnackMessage('Insert report successful');
        handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
        localStorage.removeItem('snackReport');
      }
    }, []); // Empty dependency array ensures this effect runs only once

    //calling report data
    const fetchData = () => {
    // Fetch data from Node.js server
    fetch('http://localhost:3000/displayreport')
        .then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
        setData(data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    }

    useEffect(() => {
        fetchData();

        const refreshTimer = setInterval(fetchData, 1000);

        return () => {
        clearInterval(refreshTimer);
        }
    }, []);

    //handle date picker
    const handleDatePicker = (date: Date | null) => {
      setDateUI(date);
      // console.log('Date:', date);
      // console.log('Raw Date: ', data[0] ? dayjs(data[0].date, 'DD/MM/YYYY') : null)
      // console.log('Formatted Date: ', dayjs(date).format('DD/MM/YYYY'));
      // console.log('Formatted Raw Date: ', data[0] ? dayjs(data[0].date).format('DD/MM/YYYY') : null);
      // console.log('Try ChatGPT suggest: ', new Date())
    }

    //skeleton loading
    useEffect(() => {
      // Simulate loading by setting a timeout
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      // Clear the timeout when the component unmounts or when loading is complete
      return () => clearTimeout(timer);
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
          <Alert onClose={handleCloseSnack} severity={'success'} sx={{ width: '100%' }}>
            {snackMessage}
          </Alert>
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
            <Alert onClose={handleCloseModal} severity={severityAlert} sx={{ width: '100%', mt:2 }}>
              {modalMessage}
            </Alert>
          </Box>
        </Modal>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          open={openBackDrop}
          // onClick={handleCloseBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box sx={{ display: 'flex', alignItems: 'center', my: { xs: 3, md: 2 } }}>
          {loading ? (
            <Skeleton variant='rounded' width="30%" sx={{ p: 3 }} animation="wave" />
          ) : (
            <>
              <MuiDatePicker onDateChange={handleDatePicker} />
            </>
          )}
        </Box>
        { loading ? (
          <>
          <Skeleton variant='rounded' width="100%" sx={{ p: 3, mb:1 }} animation="wave" />
          <Skeleton variant='rounded' width="100%" sx={{ p: 3, mb:1 }} animation="wave" />
          <Skeleton variant='rounded' width="100%" sx={{ p: 3, mb:1 }} animation="wave" />
          <Skeleton variant='rounded' width="100%" sx={{ p: 3 }} animation="wave" />
          </>
        ) : (
          <>
           { dateUI ? (
              data.filter((item) => dayjs(item.date, 'DD/MM/YYYY').isSame(dayjs(dateUI).format('MM/DD/YYYY'), 'day')).slice().reverse().length === 0 ? (
                <Accordion>
                  <AccordionSummary >No data found</AccordionSummary>
                </Accordion>
              ) : (
                data.filter((item) => dayjs(item.date, 'DD/MM/YYYY').isSame(dayjs(dateUI).format('MM/DD/YYYY'), 'day')).slice().reverse().map((item, index) => (
                  <Accordion 
                      expanded={expanded === item._id.toString()} 
                      onChange={handleChangeAccordian(item._id.toString())} 
                      key={item._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={1} lg={1}>
                        {index === 0 && item._id === data.slice().reverse()[0]._id ? (
                            <Typography sx={{ flexShrink: 0 }}>
                                <FiberNewIcon />
                            </Typography>
                        ) : (
                            <Typography sx={{ flexShrink: 0 }}>
                                {index+1}
                            </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <Typography sx={{flexShrink: 0 }}>
                          Id: {item._id}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={5} lg={5}>
                        <Typography sx={{ mr:1 }}>Date: {item.date}</Typography>
                        <Typography >Time: {item.time}</Typography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Grid container spacing={2}>
                  {/* Admin Details Table */}
                  <Grid item xs={12} md={12} lg={6}>
                      <TableContainer component={Paper}>
                      <Table>
                          <TableHead>
                          <TableRow>
                              <TableCell colSpan={2}><strong>Admin Details</strong></TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          <TableRow>
                              <TableCell><strong>Admin Id</strong></TableCell>
                              <TableCell>{item.admin[0]._id}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell><strong>Admin Name</strong></TableCell>
                              <TableCell>{`${item.admin[0].firstname} ${item.admin[0].lastname}`}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell><strong>Admin Email</strong></TableCell>
                              <TableCell>{item.admin[0].email}</TableCell>
                          </TableRow>
                          </TableBody>
                      </Table>
                      </TableContainer>
                  </Grid>

                  {/* Data Table */}
                  <Grid item xs={12} md={12} lg={6}>
                  <TableContainer component={Paper}>
                      <Table>
                          <TableHead>
                          <TableRow>
                              <TableCell colSpan={2}><strong>Data Details</strong></TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          <TableRow>
                              <TableCell><strong>Data Id</strong></TableCell>
                              <TableCell>{item.data[0]._id}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell><strong>Distance in Cm</strong></TableCell>
                              <TableCell>{item.data[0].distanceCm}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell><strong>Distance in Inch</strong></TableCell>
                              <TableCell>{item.data[0].distanceInch}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell><strong>Date</strong></TableCell>
                              <TableCell>{item.data[0].date}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell><strong>Time</strong></TableCell>
                              <TableCell>{item.data[0].time}</TableCell>
                          </TableRow>
                          </TableBody>
                      </Table>
                      </TableContainer>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
                      <Table>
                          <TableHead>
                          <TableRow>
                              <TableCell colSpan={2}><strong>Report</strong></TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          <TableRow>
                              <TableCell><strong>Message</strong></TableCell>
                              <TableCell>{item.message}</TableCell>
                          </TableRow>
                          </TableBody>
                      </Table>
                      </TableContainer>
                  </Grid>
                  </Grid>
                  </AccordionDetails>
                  <AccordionActions disableSpacing={true}>
                    <Tooltip title="Delete" placement='top'>
                      <IconButton onClick={() => handleClickOpen(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Report" placement='top'>
                      <IconButton aria-label='Report' onClick={() => handleClickOpenPublish(item._id)}>
                        <SendIcon />
                      </IconButton>
                    </Tooltip>
                  </AccordionActions>
                  <Dialog
                    open={openPublish && selectedItemId === item._id}
                    onClose={handleClosePublish}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Publish Details"}
                    </DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1}}>
                          <TextField
                            id="addEmail"
                            label="To"
                            fullWidth
                            placeholder="Add email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <Tooltip title="Add Email" placement="top">
                            <IconButton onClick={handleAddToEmail} size='large'>
                              <AddCircleIcon sx={{ color: '#2196f3', fontSize: 30 }}/>
                            </IconButton>
                          </Tooltip>
                        </Box>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                          <Divider sx={{ mt:1, mb:1 }} />
                          <Box sx={{ margin: '1rem', minHeight: '100px' }}>
                            <Typography sx={{ mb:1 }}>Email</Typography>
                            <Stack spacing={1}>
                              {toEmails.length === 0 ? (
                                <>
                                <Chip
                                  label={"No email added"}
                                  disabled
                                  deleteIcon={<QuestionMarkIcon />}
                                  onDelete={() => handleRemoveToEmail(index)}
                                />
                                </>
                              ) : (
                                <>
                                {toEmails.map((email, index) => (
                                  <>
                                    <Chip
                                      key={index}
                                      label={email}
                                      onDelete={() => handleRemoveToEmail(index)}
                                      sx={{
                                        color: toEmails.slice(0, index).includes(email) ? 'red' : undefined,
                                        border: toEmails.slice(0, index).includes(email) ? '2px solid red' : undefined,
                                      }}
                                    />
                                    <Alert severity="error" variant="outlined">There's same email</Alert>
                                  </>
                                ))}
                                </>
                              )}
                            </Stack>
                          </Box>
                          <Divider sx={{ mt:1, mb:1 }} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                        <TextField
                          label="Subject"
                          select
                          fullWidth
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        >
                          {subjectEmail.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                          <TextField
                            label="Message"
                            disabled
                            fullWidth
                            multiline
                            rows={4}
                            value={item.message}
                          />
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClosePublish}>Cancel</Button>
                      <Button 
                      onClick={async () => {
                        await handleSubmitReport(item._id);
                      }} autoFocus
                      >
                        <SendIcon />
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
                    <Alert severity="error" variant="filled">Warning: This report will be deleted and are you sure?</Alert>
                      <TableContainer component={Paper} sx={{ mt: 1 }}>
                        <Table aria-label="simple table" sx={{ mt: 1 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Report ID</TableCell>
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
                </Accordion>
                ))
              )
           ) : (
            data.filter((item => (item._id))).length === 0 ? (
              <Accordion>
                <AccordionSummary >No data found</AccordionSummary>
              </Accordion>
            ) : (
              data.slice().reverse().map((item, index) => (
                <Accordion 
                    expanded={expanded === item._id.toString()} 
                    onChange={handleChangeAccordian(item._id.toString())} 
                    key={item._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                      {index === 0 ? (
                          <Typography sx={{ flexShrink: 0 }}>
                              <FiberNewIcon />
                          </Typography>
                      ) : (
                          <Typography sx={{ flexShrink: 0 }}>
                              {index+1}
                          </Typography>
                      )}
                    </Grid>
                    <Grid item xs={11} sm={6} md={6} lg={6}>
                      <Typography sx={{flexShrink: 0 }}>
                        Id: {item._id}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                      <Typography sx={{ mr:1 }}>Date: {item.date}</Typography>
                      <Typography >Time: {item.time}</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={2}>
                {/* Admin Details Table */}
                <Grid item xs={12} md={12} lg={6}>
                    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}><strong>Admin Details</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell><strong>Admin Id</strong></TableCell>
                            <TableCell>{item.admin[0]._id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Admin Name</strong></TableCell>
                            <TableCell>{`${item.admin[0].firstname} ${item.admin[0].lastname}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Admin Email</strong></TableCell>
                            <TableCell>{item.admin[0].email}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>

                {/* Data Table */}
                <Grid item xs={12} md={12} lg={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}><strong>Data Details</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell><strong>Data Id</strong></TableCell>
                            <TableCell>{item.data[0]._id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Distance in Cm</strong></TableCell>
                            <TableCell>{item.data[0].distanceCm}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Distance in Inch</strong></TableCell>
                            <TableCell>{item.data[0].distanceInch}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell>{item.data[0].date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Time</strong></TableCell>
                            <TableCell>{item.data[0].time}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}><strong>Report</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell><strong>Message</strong></TableCell>
                            <TableCell>{item.message}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
                </Grid>
                </AccordionDetails>
                <AccordionActions disableSpacing={true}>
                  <Tooltip title="Delete" placement='top'>
                      <IconButton onClick={() => handleClickOpen(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Report" placement='top'>
                      <IconButton aria-label='Report' onClick={() => handleClickOpenPublish(item._id)}>
                        <SendIcon />
                      </IconButton>
                    </Tooltip>
                </AccordionActions>
                <Dialog
                  open={openPublish && selectedItemId === item._id}
                  onClose={handleClosePublish}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Publish Details"}
                  </DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12} lg={12}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1}}>
                        <TextField
                          id="addEmail"
                          label="To"
                          fullWidth
                          placeholder="Add email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Tooltip title="Add Email" placement="top">
                          <IconButton onClick={handleAddToEmail} size='large'>
                            <AddCircleIcon sx={{ color: '#2196f3', fontSize: 30 }}/>
                          </IconButton>
                        </Tooltip>
                      </Box>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <Divider sx={{ mt:1, mb:1 }} />
                        <Box sx={{ margin: '1rem', minHeight: '100px' }}>
                          <Typography sx={{ mb:1 }}>Email</Typography>
                          <Stack spacing={1}>
                            {toEmails.length === 0 ? (
                              <>
                              <Chip
                                label={"No email added"}
                                disabled
                                deleteIcon={<QuestionMarkIcon />}
                                onDelete={() => handleRemoveToEmail(index)}
                              />
                              </>
                            ) : (
                              <>
                              {toEmails.map((email, index) => (
                                <>
                                  <Chip
                                    key={index}
                                    label={email}
                                    onDelete={() => handleRemoveToEmail(index)}
                                    sx={{
                                      color: toEmails.slice(0, index).includes(email) ? 'red' : undefined,
                                      border: toEmails.slice(0, index).includes(email) ? '2px solid red' : undefined,
                                    }}
                                  />
                                  {toEmails.slice(0, index).includes(email) ? (<Alert severity="error" variant="outlined">There's same email</Alert>) : undefined}
                                </>
                              ))}
                              </>
                            )}
                          </Stack>
                        </Box>
                        <Divider sx={{ mt:1, mb:1 }} />
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <TextField
                          label="Subject"
                          select
                          fullWidth
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        >
                          {subjectEmail.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <TextField
                          label="Message"
                          disabled
                          fullWidth
                          multiline
                          rows={4}
                          value={item.message}
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClosePublish}>Cancel</Button>
                    <Button 
                      onClick={async () => {
                        await handleSubmitReport(item._id);
                      }} autoFocus
                      >
                        <SendIcon />
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
                    <Alert severity="error" variant="filled">Warning: This report will be deleted and are you sure?</Alert>
                      <TableContainer component={Paper} sx={{ mt: 1 }}>
                        <Table aria-label="simple table" sx={{ mt: 1 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Report ID</TableCell>
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
              </Accordion>
              ))
            )
           )}
          </>
        )}
      </>
    );
  }