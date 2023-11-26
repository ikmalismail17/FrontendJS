import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

interface DataItem {
    id: number;
    distanceCm: number;
    distanceInch: number;
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

    return (
    <>
      <Grid item xs={12} md={8}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Distance in CM</StyledTableCell>
              <StyledTableCell>DIstance in Inch</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <StyledTableRow  key={item.id}>
                  <StyledTableCell>{item.id}</StyledTableCell>
                  <StyledTableCell>{item.distanceCm}</StyledTableCell> 
                  <StyledTableCell>{item.distanceInch}</StyledTableCell>
              </StyledTableRow>
             ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    </>
    )
}