import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { XAxis, YAxis, Label, ResponsiveContainer, Tooltip, AreaChart, Area, Legend } from 'recharts';
import Title from './Title';
import Paper from '@mui/material/Paper';
import { Grid, Skeleton } from '@mui/material';

// Generate Sales Data
// function createData(time: string, amount?: number) {
//   return { time, amount };
// }

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];

interface DataItem {
  _id: number;
  distanceCm: number;
  distanceInch: number;
  date: string;
  time: string;
}

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = React.useState<DataItem[]>([]);
  const [loading, setLoading] = React.useState(true); // Add loading state

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
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const targetDate = '01/01/2024';
  const filteredData = data.filter(entry => entry.date === targetDate);

  const preferredData = Object.values(filteredData).map(entry => ({
    time: entry.time,
    Cm: entry.distanceCm,
    Inch: entry.distanceInch,
  }));

  // Get today's date
// const today = new Date();

// // Get yesterday's date
// const yesterday = new Date();
// yesterday.setDate(today.getDate() - 1);

// // Format the dates as strings in the 'en-GB' format
// const todayFormatted = today.toLocaleDateString('en-GB');
// const yesterdayFormatted = yesterday.toLocaleDateString('en-GB');

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Paper
          sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 300,
          }}
        >
        <Title>Today</Title>
        {loading ? (
          <Skeleton variant='rectangular' width="100%" height={400} />
        ) : (
          <>
          <ResponsiveContainer>
            <AreaChart
              data={preferredData}
              height={300}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke={theme.palette.text.secondary} style={theme.typography.body2}
              tickFormatter={(tickItem) => {
                const date = new Date(tickItem);
                return `${date.getHours()}:00`;
              }}
              >
              </XAxis>
              <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  Depth
                </Label>
              </YAxis>
              <Area type="monotone" dataKey="Cm" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" dot={true} />
              <Area type="monotone" dataKey="Inch" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" dot={true} />
              <Tooltip />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
          </>
        )}
        </Paper>
        </Grid>
        <Grid item xs={12}>
        <Paper
          sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 300,
          }}
        >
        <Title>Yesterday</Title>
        {loading ? (
          <Skeleton variant='rectangular' width="100%" height={400} />
        ) : (
          <>  
          <ResponsiveContainer>
            <AreaChart
              data={preferredData}
              height={300}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
                tickFormatter={(tickItem) => {
                  const date = new Date(tickItem);
                  return `${date.getHours()}:00`;
                }}
              >
              </XAxis>
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  Depth
                </Label>
              </YAxis>
              <Area type="monotone" dataKey="Cm" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
              <Area type="monotone" dataKey="Inch" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>
              <Tooltip />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
          </>
        )}
        </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}