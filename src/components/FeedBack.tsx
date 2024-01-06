// import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';


export default function Footer() {

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Paper
          sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          }}
        >
        Feedback section
        </Paper>
      </Container>
    </Box>
  );
}