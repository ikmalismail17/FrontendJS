// import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

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

  interface DataItem {
    _id: number;
    adminId: number;
    key: string;
    action: string;
    date: string;
    time: string;
  }

export default function DashBoardLog(){
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const fetchData = () => {
        // Fetch data from Node.js server
        fetch('https://rivdepmonbackend.vercel.app/logdisplay')
        .then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
        setLoading(false);
        setData(data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
        });
    }
    
    useEffect(() => {
        fetchData();

        const refreshTimer = setInterval(fetchData, 1000);

        return () => {
        clearInterval(refreshTimer);
        }
    }, []);

    //skeleton loading
    // useEffect(() => {
    // // Simulate loading by setting a timeout
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 2000);

    //   // Clear the timeout when the component unmounts or when loading is complete
    //   return () => clearTimeout(timer);
    // }, []);
    
    return (
    <>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 } , p: { xs: 2, md: 3 }}}>
    <TableContainer>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("No")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Log Id")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Admin Id")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Admin Key")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Action")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Date")}</StyledTableCell>
                <StyledTableCell align='center'>{loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : ("Time")}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
            {loading ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={7} align='center'>
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
                {data.filter((item => (item._id))).length === 0 ? (
                    <StyledTableRow>
                        <StyledTableCell colSpan={8} align='center'>No data found</StyledTableCell>
                    </StyledTableRow>
                ) : (   
                    data.slice().reverse().map((item, index) => (
                    <StyledTableRow  key={item._id}>
                        <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                        <StyledTableCell align='center'>{item._id}</StyledTableCell>
                        <StyledTableCell align='center'>{item.adminId}</StyledTableCell> 
                        <StyledTableCell align='center'>{item.key}</StyledTableCell>
                        <StyledTableCell align='center'>{item.action}</StyledTableCell>
                        <StyledTableCell align='center'>{item.date}</StyledTableCell>
                        <StyledTableCell align='center'>{item.time}</StyledTableCell>
                    </StyledTableRow>
                    ))
                )}
                </>
              )}
            </TableBody>
        </Table>
    </TableContainer>
    </Paper>
    </>
    )
}