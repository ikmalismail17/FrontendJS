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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Depth Table" {...a11yProps(0)} />
            <Tab label="Daily Data" {...a11yProps(1)} />
            <Tab label="Weekly's Average" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
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
            {data.slice().reverse().slice(0, 5).map((item, index) => (
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Chart />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ChartBar />
        </CustomTabPanel>
      </Box>
    </React.Fragment>
  );
}

export default MainSec;