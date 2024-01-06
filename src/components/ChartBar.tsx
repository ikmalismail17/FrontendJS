import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, Legend, Bar, LabelList } from 'recharts';
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
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

//   const fetchWeeklyData = () => {
//     const today = new Date();
//     const lastWeek = new Date();
//     lastWeek.setDate(today.getDate() - 7); // Subtract 7 days to get data for the past week

//     const formattedToday = today.toISOString().split('T')[0];
//     const formattedLastWeek = lastWeek.toISOString().split('T')[0];

//     fetch(`http://localhost:3000/datadisplay?startDate=${formattedLastWeek}&endDate=${formattedToday}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setData(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }

//   React.useEffect(() => {
//     fetchWeeklyData();
//   }, []);

  // Preprocess the data to aggregate distances for each unique date
const aggregatedData = data.reduce<Record<string, { date: string; distanceCmSum: number; distanceInchSum: number; count: number }>>(
    (result, entry) => {
      const date = entry.date;
      if (!result[date]) {
        result[date] = { date, distanceCmSum: 0, distanceInchSum: 0, count: 0 };
      }
      result[date].distanceCmSum += entry.distanceCm;
      result[date].distanceInchSum += entry.distanceInch;
      result[date].count += 1;
      return result;
    },
    {}
  );
  
  // Calculate average distances for each date
  const averagedData = Object.values(aggregatedData).map(entry => ({
    date: entry.date,
    Cm: (entry.distanceCmSum / entry.count).toFixed(2),
    Inch: (entry.distanceInchSum / entry.count).toFixed(2),
  }));

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Paper
          sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 400,
          }}
        >
        <Title>Weekly's Average</Title>
        <ResponsiveContainer>
        <BarChart  height={400} data={averagedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <XAxis dataKey="date" />
            <YAxis type="number" domain={[ 0 , 250]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Cm" fill="#8884d8">
                <LabelList dataKey="Cm" position="top" />
            </Bar>
            <Bar dataKey="Inch" fill="#82ca9d">
                <LabelList dataKey="Inch" position="top" />
            </Bar>
        </BarChart>
        </ResponsiveContainer>
        </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}