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

  export default function DashBoardReport() {
    const [snackMessage, setSnackMessage] = useState('');
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('error');
    const [expanded, setExpanded] = useState<string | false>(false);
    const [data, setData] = useState<DataItem[]>([]);
    const [dateUI, setDateUI] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state
    
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
        setSnackSeverity('success');
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
          <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
            {snackMessage}
          </Alert>
        </Snackbar>
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
          <Skeleton variant='rounded' width="100%" sx={{ p: 3 }} animation="wave" />
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
                  {index === 0 && item._id === data.slice().reverse()[0]._id ? (
                          <Typography sx={{ width: '5%', flexShrink: 0 }}>
                              <FiberNewIcon />
                          </Typography>
                      ) : (
                          <Typography sx={{ width: '5%', flexShrink: 0 }}>
                              {index+1}
                          </Typography>
                      )} 
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Id: {item._id}
                    </Typography>
                    <Typography sx={{ mr:1 }}>Date: {item.date}</Typography>
                    <Typography >Time: {item.time}</Typography>
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
                    <IconButton aria-label='Delete'>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label='Publish'>
                      <SendIcon />
                    </IconButton>
                  </AccordionActions>
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
                {index === 0 ? (
                        <Typography sx={{ width: '5%', flexShrink: 0 }}>
                            <FiberNewIcon />
                        </Typography>
                    ) : (
                        <Typography sx={{ width: '5%', flexShrink: 0 }}>
                            {index+1}
                        </Typography>
                    )} 
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Id: {item._id}
                  </Typography>
                  <Typography sx={{ mr:1 }}>Date: {item.date}</Typography>
                  <Typography >Time: {item.time}</Typography>
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
                  <IconButton aria-label='Delete'>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label='Publish'>
                    <SendIcon />
                  </IconButton>
                </AccordionActions>
              </Accordion>
              ))
            )
           )}
          </>
        )}
      </>
    );
  }