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
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

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

    const handleDelete = async (id: number) => {
      try {
        // Send a delete request to the server
        const response = await fetch(`http://localhost:3000/datadelete/${id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result); // Log the result from the server
    
        // Optionally, you can fetch the updated data after deletion
        fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };
    

    return (
    <>
      <Grid item xs={12} md={8}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align='center'>No</StyledTableCell>
              <StyledTableCell align='center'>ID</StyledTableCell>
              <StyledTableCell align='center'>Distance in CM</StyledTableCell>
              <StyledTableCell align='center'>DIstance in Inch</StyledTableCell>
              <StyledTableCell align='center'>Alert</StyledTableCell>
              <StyledTableCell align='center'>Update</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow  key={item.id}>
                  <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                  <StyledTableCell align='center'>{item.id}</StyledTableCell>
                  <StyledTableCell align='center'>{item.distanceCm}</StyledTableCell> 
                  <StyledTableCell align='center'>{item.distanceInch}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {item.distanceCm < 200 ? <Alert severity="success" variant="outlined">Safe</Alert> : <Alert severity="warning" variant="outlined">Warning!</Alert>}
                    </StyledTableCell>
                  <StyledTableCell align='center'>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button href="#text-buttons" color='success'>Edit</Button>
                    <Button href="#text-buttons" color='error' onClick={() => handleClickOpen(item.id)}>Delete</Button>
                    {/* <Button href="#text-buttons" color='error' onClick={() => handleDelete(item.id)}>Delete</Button> */}
                    <Dialog
                      open={open && selectedItemId === item.id}
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
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={async() => { await handleDelete(item.id); handleClose();}} autoFocus>
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </ButtonGroup>
                  </StyledTableCell>
              </StyledTableRow>
             ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    </>
    )
}