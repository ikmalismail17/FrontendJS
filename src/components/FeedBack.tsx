// import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Title from './Title';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert';

const AlertSnack = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid red',
  boxShadow: 24,
  p: 4,
};

export default function Feedback() {
  const [namefb, setNamefb] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isFeedback, setIsFeedback] = useState(false);

  //modal
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [colorModal, setColorModal] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [severityAlert, setSeverityAlert] = useState<AlertColor>('success');

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmitFeedback = async() => {
    try {
      console.log('Before Axios POST request');
      await axios.post(
        'https://rivdepmonbackend.vercel.app/addfeedback',{ namefb, feedback }
      );
        setColorModal('green');
        setSeverityAlert('success');
        setModalTitle("Thank You!");
        setModalMessage("Thank you for your feedback!");
        handleOpenModal();

        setNamefb('');
        setFeedback('');

      } catch (error) {
        const errorAxios = error as AxiosError;
  
        console.log('Inside catch block');
        console.log(errorAxios);
        
        if (errorAxios.response && errorAxios.response.status === 401) {
          setColorModal('red');
          setSeverityAlert('error');
          setModalTitle("Error");
          setModalMessage("Sorry, something went wrong. Please try again later.");
          handleOpenModal();
        }

        setNamefb('');
        setFeedback('');
      }
  };

  //check if feedback is empty
  React.useEffect(() => {
    if(namefb !== '' && feedback !== ''){
      setIsFeedback(true);
    }else{
      setIsFeedback(false);
    }
  }, [namefb, feedback]);

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={{ ...style, border: `2px solid ${colorModal}` }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: colorModal }}>
            {modalTitle}
          </Typography>
          <AlertSnack onClose={handleCloseModal} severity={severityAlert} sx={{ width: '100%', mt:2 }}>
            {modalMessage}
          </AlertSnack>
        </Box>
      </Modal>
      <Container maxWidth="lg">
        <Paper
          sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          }}
        >
        <Box sx={{ my:3, mx:{ xs:1, sm:5 } }} id="feedback">
          <Title >FEEDBACK</Title>
          <Typography variant="subtitle1" color="text.secondary" component="p">
            Please give a feedback to improve my website!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="p" sx={{ mt:1 }}>Name</Typography>
          <TextField
            id="name"
            name='name'
            variant="outlined"
            onChange={(e) => setNamefb(e.target.value)}
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
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            placeholder='Insert your feedback here and let me know what to improve!'
          />
          <Button disabled={!isFeedback} onClick={handleSubmitFeedback} variant="contained" sx={{ mt:2, mb: 2, ml:'auto' }}>Submit</Button>
        </Box>
        </Paper>
      </Container>
    </Box>
  );
}