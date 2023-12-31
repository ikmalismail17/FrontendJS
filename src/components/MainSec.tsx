// import {Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Title from './Title';
import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Chart from './Chart';
import ChartBar from './ChartBar';
import Alert from '@mui/material/Alert';
import MainPDF from './MainPDF';
import Paper from '@mui/material/Paper';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MainSec() {
  const [data, setData] = useState<DataItem[]>([]);
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [valueSub, setValueSub] = React.useState(1);

  const handleChangeSub = (event: React.SyntheticEvent, newValue: number) => {
    setValueSub(newValue);
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

  return (
    <React.Fragment>
      <AlertSnack severity="warning" sx={{ mt: 2, mb: 2 }}>This system is under development. Please patiently wait...Thanks</AlertSnack>
      <AlertSnack severity="info" sx={{ mt: 2, mb: 2 }}>There's no warning data detect. Please refer data below </AlertSnack>
      <AlertSnack severity="error" sx={{ mt: 2, mb: 2 }}>Today's reading detect high depth at our river. Please refer data below </AlertSnack>
      <Box sx={{ width: '100%' }} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
            <Tab label="VISUAL" {...a11yProps(0)} disabled sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', }}/>
            <Tab label="Daily Data" {...a11yProps(1)} />
            <Tab label="Past 7 Days Average" {...a11yProps(2)} />
            <Tab label="Soon..." {...a11yProps(3)} disabled/>
            <Tab label="Soon..." {...a11yProps(4)} disabled/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Chart />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ChartBar />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
        </CustomTabPanel>
      </Box>
      <Box sx={{ width: '100%', mt:2 }} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={valueSub} onChange={handleChangeSub} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
            <Tab label="DATA & REPORT" {...a11yProps(0)} disabled sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', }}/>
            <Tab label="Depth Data" {...a11yProps(1)} />
            <Tab label="Download..." {...a11yProps(2)} />
            <Tab label="Soon..." {...a11yProps(3)} disabled/>
          </Tabs>
        </Box>
        <CustomTabPanel value={valueSub} index={0}>
        </CustomTabPanel>
        <CustomTabPanel value={valueSub} index={1}>
        <Paper
          sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          }}
        >
        <TableContainer>
          <Table size="small">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Distance in CM</StyledTableCell>
                <StyledTableCell>DIstance in Inch</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell align='center'>Alert</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.slice().reverse().slice(0, 10).map((item, index) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{item.distanceCm}</StyledTableCell>
                  <StyledTableCell>{item.distanceInch}</StyledTableCell>
                  <StyledTableCell>{item.date}</StyledTableCell>
                  <StyledTableCell>{item.time}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {item.distanceCm < 200 ? <Alert severity="success" variant="outlined">Safe</Alert> : <Alert severity="warning" variant="outlined">Warning!</Alert>}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
        </CustomTabPanel>
        <CustomTabPanel value={valueSub} index={2}>
          <MainPDF />
        </CustomTabPanel>
        <CustomTabPanel value={valueSub} index={3}>
        </CustomTabPanel>
      </Box>
    </React.Fragment>
  );
}

export default MainSec;