// import * as React from 'react';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
// import Title from './Title';
import {  Alert } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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

export default function MainPDF() {

  return (
    <Box>
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
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Download...</StyledTableCell>
            </StyledTableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow >
                <StyledTableCell>1</StyledTableCell>
                <StyledTableCell>Today's data</StyledTableCell>
                <StyledTableCell>The data might not completed yet...</StyledTableCell>
                <StyledTableCell>
                    <Alert severity="warning">In development...</Alert>
                    {/* <IconButton>
                        <PictureAsPdfIcon/>
                    </IconButton> */}
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
                <StyledTableCell>2</StyledTableCell>
                <StyledTableCell>Last week data</StyledTableCell>
                <StyledTableCell>Download last week data now!</StyledTableCell>
                <StyledTableCell>
                    <Alert severity="warning">In development...</Alert>
                    {/* <IconButton>
                        <PictureAsPdfIcon/>
                    </IconButton> */}
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell>3</StyledTableCell>
                <StyledTableCell>Last month data</StyledTableCell>
                <StyledTableCell>Download last month data now!</StyledTableCell>
                <StyledTableCell>
                    <Alert severity="warning">In development...</Alert>
                    {/* <IconButton>
                        <PictureAsPdfIcon/>
                    </IconButton> */}
                </StyledTableCell>
            </StyledTableRow>
        </TableBody>
        </Table>
    </TableContainer>
    </Paper>
    </Box>
  );
}