import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from './Title';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useTheme} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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

export default function Deposits() {
  const [dataReport, setDataReport] = React.useState<ReportItem[]>([]);
  const [data, setData] = React.useState<DataItem[]>([]);
  const theme  = useTheme();

  const fetchReport = () => {
      // Fetch data from Node.js server
      fetch('http://localhost:3000/displayreport')
      .then((response) => {
      if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
      })
      .then((data) => {
      setDataReport(data);
      })
      .catch((error) => {
      console.error('Error fetching data:', error);
      });
  }

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
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  React.useEffect (() => {
    fetchData();
    fetchReport();
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
                {data.length}
            </Typography>
            <Typography color={theme.palette.primary.contrastText} sx={{ flex: 1, mt:1 }}>
                Latest report on {data.slice().reverse()[0]?.date} at {data.slice().reverse()[0]?.time}
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
                {dataReport.length}
            </Typography>
            <Typography color={theme.palette.primary.contrastText} sx={{ flex: 1, mt:1 }}>
                Latest report on {dataReport.slice().reverse()[0]?.date} at {dataReport.slice().reverse()[0]?.time}
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