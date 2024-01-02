import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import StraightenIcon from '@mui/icons-material/Straighten';
import Box from '@mui/material/Box';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import { useData } from '../hooks/DataContext';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

interface MyFormData {
  distanceCm: string,
  distanceInch: string,
  date: string,
  time: string,
}

interface PaymentFormProps{
    onFormFilled: (formData: MyFormData) => void;
}

export default function PaymentForm({onFormFilled}: PaymentFormProps) {
    const [loading, setLoading] = useState(true); // Add loading state
    const { dataReport } = useData();
    const { setChangeReport } = useData();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        distanceCm: '',
        distanceInch: '',
        date: '',
        time: '',
      });

      const handleChangeData = () => {
        setChangeReport(true);
        navigate('/admindashboard/data');
      }
      
      useEffect(() => {
        //handle single data search from backend
        fetch('http://localhost:3000/datareport/' + dataReport)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setFormData(data);
          })
          .catch((error) => {
            // console.error('Error fetching data:', error);
          });
      }, [dataReport]);

      //handle text input change
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    // Notify parent component when the form is filled
    useEffect(() => {
      const isFormFilled = Object.values(formData).every(Boolean);
      if (isFormFilled) {
        onFormFilled(formData);
      }
    }, [formData, onFormFilled]);

    //skeleton loading
    React.useEffect(() => {
      // Simulate loading by setting a timeout
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      // Clear the timeout when the component unmounts or when loading is complete
      return () => clearTimeout(timer);
    }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Skeleton sx={{ fontSize: '2rem', mb: 1 }} width="40%" animation="wave" />
      ) : (
        <>
        <Typography variant="h6" gutterBottom>
            Depth Data
        </Typography>
        </>
      )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Grid3x3Icon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  disabled
                  id="dataID"
                  name= "dataID"
                  label="Data ID"
                  fullWidth
                  variant="standard"
                  value={dataReport}
                  onChange={handleInputChange}
                  // disabled={onDisabled === 0 || !isAddressFormFilled}
                />
                <Tooltip title="Change Data" placement="top">
                  <IconButton onClick={handleChangeData}>
                    <ChangeCircleIcon sx={{ color: '#2196f3' }}/>
                  </IconButton>
                </Tooltip>
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12} md={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <StraightenIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  id="dataCM"
                  name="dataCM"
                  label="Data in CM"
                  fullWidth
                  autoComplete="cc-number"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  value={formData.distanceCm}
                  onChange={handleInputChange}
                  disabled
                />
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12} md={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <StraightenIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  id="dataInch"
                  name="dataInch"
                  label="Data in Inch"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">inch</InputAdornment>
                    ),
                  }}
                  value={formData.distanceInch}
                  onChange={handleInputChange}
                  disabled
                />
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12} md={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <CalendarMonthIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  id="date"
                  name="date"
                  label="Date"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  value={formData.date}
                  onChange={handleInputChange}
                  disabled
                />
              </Box>
              </>
            )}
            </Grid>
            <Grid item xs={12} md={6}>
            {loading ? (
              <Skeleton sx={{ p: 3}} variant="rounded" animation="wave" />
            ) : (
              <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <CalendarMonthIcon sx={{ color: '#2196f3', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  id="time"
                  name="time"
                  label="Time"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  value={formData.time}
                  onChange={handleInputChange}
                  disabled
                />
              </Box>
              </>
            )}
            </Grid>
          </Grid>
    </React.Fragment>
  );
}