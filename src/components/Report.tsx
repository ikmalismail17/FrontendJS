import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
// import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
// import { Title } from '@mui/icons-material';
import React from 'react';
import Title from './Title';
import Alert from '@mui/material/Alert';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

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

export default function Report() {

  const [data, setData] = useState<DataItem[]>([]);

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

      // Sort data in descending order based on id
      const sortedData = data.sort((a: DataItem, b: DataItem) => b._id - a._id);

      // Update state with the sorted data
      setData(sortedData);
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
      <Title>Latest Data</Title>
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
            {data.reverse().slice(0, 5).map((item, index) => (
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
      <Link to="/admindashboard/data" style={{ color:"inherit", marginTop: '10px'}}>
        <Typography sx={{ display:'flex' }}>
          See more data... <ArrowCircleRightIcon sx={{ ml:1 }}/>
        </Typography>
      </Link>
    </React.Fragment>
  );
}