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
        <Box sx={{ my:2, mx:5 }}>
          <Title>FEEDBACK</Title>
          <Typography variant="subtitle1" color="text.secondary" component="p">
            Please give us feedback to improve our website!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="p" sx={{ mt:1 }}>Name</Typography>
          <TextField
            id="name"
            name='name'
            variant="outlined"
            fullWidth
            placeholder='Insert your name for reference'
          />
          <Typography variant="subtitle1" color="text.secondary" component="p" sx={{ mt:1 }}>Feedback</Typography>
          <TextField
            id="feedback"
            name='feedback'
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            placeholder='Insert your feedback here and let me know what to improve!'
          />
        </Box>
        </Paper>
      </Container>
    </Box>
  );
}