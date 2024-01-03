import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

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
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Paper
          sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
          }}
        >
        <Title>Today</Title>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
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
                Depth (cm)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={true}
              type="monotone"
              dataKey="distanceCm"
              stroke={theme.palette.primary.main}
              dot={true}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        </Paper>
        </Grid>
        <Grid item xs={12}>
        <Paper
          sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
          }}
        >
        <Title>Today</Title>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
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
                Depth (Inch)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="distanceInch"
              stroke={theme.palette.primary.main}
              dot={true}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}