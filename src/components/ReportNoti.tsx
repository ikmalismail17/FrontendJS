import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useTheme} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

interface ReportItem {
  _id: number;
  admin: { 
    _id: number;
    firstname: string;
    lastname: string;
    email: string;
  }[];
  data: { 
      _id: number;
      distanceCm: number;
      distanceInch: number;
      date: string;
      time: string;
  }[];
  message: string;
  date: string;
  time: string;
}

interface DataItem {
  _id: number;
  distanceCm: number;
  distanceInch: number;
  date: string;
  time: string;
}

export default function ReportNoti() {
  const [dataReport, setDataReport] = React.useState<ReportItem[]>([]);
  const [data, setData] = React.useState<DataItem[]>([]);
  const theme  = useTheme();
  const [loading, setLoading] = React.useState(true); // Add loading state

  const fetchReport = () => {
      // Fetch data from Node.js server
      fetch('https://rivdepmonbackend.vercel.app/displayreport')
      .then((response) => {
      if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
      })
      .then((data) => {
      setLoading(false);
      setDataReport(data);
      })
      .catch((error) => {
      setLoading(false);
      console.error('Error fetching data:', error);
      });
  }

  const fetchData = () => {
    // Fetch data from Node.js server
    fetch('https://rivdepmonbackend.vercel.app/datadisplay')
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

  React.useEffect (() => {
    fetchData();
    fetchReport();
    const refreshTimer = setInterval(fetchData, 100000);
    const refreshTimer1 = setInterval(fetchReport, 100000);

    return () => {
      clearInterval(refreshTimer);
      clearInterval(refreshTimer1);
    }
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
              Number of Data
            </Typography>
            <Typography variant="h2" sx={{ fontFamily: 'monospace', fontWeight: 700, color: theme.palette.primary.main }}>
              {loading ? (<Skeleton variant="rectangular" width="25%" height={50} animation="wave" />) : (data.length >= 1000 ? `${(data.length / 1000).toFixed(1)}k` : data.length)}
            </Typography>
            <Typography color={theme.palette.primary.contrastText} sx={{ flex: 1, mt:1 }}>
              {loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : (`Latest data on ${data.slice().reverse()[0]?.date} at ${data.slice().reverse()[0]?.time}`)}
            </Typography>
            <Link style={{ color:"inherit" }} to='/admindashboard/data'>
              <Typography sx={{ display:'flex' }}>
                View Data <ArrowCircleRightIcon sx={{ ml:1 }}/>
              </Typography>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
              Number of Report
            </Typography>
            <Typography variant="h2" sx={{ fontFamily: 'monospace', fontWeight: 700, color: theme.palette.primary.main }}>
              {loading ? (<Skeleton variant="rectangular" width="25%" height={50} animation="wave" />) : (dataReport.length)}
            </Typography>
            <Typography color={theme.palette.primary.contrastText} sx={{ flex: 1, mt:1 }}>
              {loading ? (<Skeleton sx={{ fontSize: '2rem' }} animation="wave" />) : (`Latest report on ${dataReport.slice().reverse()[0]?.date} at ${dataReport.slice().reverse()[0]?.time}`)}
            </Typography>
            <Link style={{ color:"inherit" }} to='/admindashboard/report'>
              <Typography sx={{ display:'flex' }}>
                View Report <ArrowCircleRightIcon sx={{ ml:1 }}/>
              </Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}