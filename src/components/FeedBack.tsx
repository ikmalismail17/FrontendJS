// import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Title from './Title';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'; // Import TextField component from MUI

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
        <Title>Feedback</Title>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Please give us feedback to improve our website!
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">E-mail</Typography>
        <TextField
          id="email"
          name='email'
          variant="outlined"
        />
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">Feedback</Typography>
        <TextField
          id="feedback"
          name='feedback'
          multiline
          rows={4}
          variant="outlined"
        />
        </Paper>
      </Container>
    </Box>
  );
}