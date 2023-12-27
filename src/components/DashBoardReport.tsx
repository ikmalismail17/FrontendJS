import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import React, { useEffect, useState } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  interface State extends SnackbarOrigin {
    openSnack: boolean;
  }

  export default function DashBoardReport() {
    const [snackMessage, setSnackMessage] = useState('');
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('error');
  
    // Snackbar
    const [stateSnack, setStateSnack] = React.useState<State>({
      openSnack: false,
      vertical: 'top',
      horizontal: 'center',
    });
  
    const { vertical, horizontal, openSnack } = stateSnack;
  
    const handleOpenSnack = (newState: SnackbarOrigin) => () => {
      setStateSnack({ ...newState, openSnack: true });
    };
  
    const handleCloseSnack = () => {
      setStateSnack({ ...stateSnack, openSnack: false });
    };
  
    useEffect(() => {
      if (localStorage.getItem('snackReport') === 'success') {
        setSnackSeverity('success');
        setSnackMessage('Insert report successful');
        handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
        localStorage.removeItem('snackReport');
      } else if (localStorage.getItem('snackReport') === 'error'){
        setSnackSeverity('error');
        setSnackMessage('Insert report failed');
        handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
        localStorage.removeItem('snackReport');
      }
    }, []); // Empty dependency array ensures this effect runs only once
  
    return (
      <>
        <Snackbar
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
            {snackMessage}
          </Alert>
        </Snackbar>
        Report
      </>
    );
  }