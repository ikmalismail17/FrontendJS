import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import ReportNoti from './ReportNoti';
import Report from './Report';
import ChartBar from './ChartBar';

export default function DashBoardContent(){
    return (
        <>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <ReportNoti />
        </Grid>
        <Grid item xs={12}>
            <Chart />
        </Grid>
        <Grid item xs={12}>
            <ChartBar />
        </Grid>
        <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Report />
        </Paper>
        </Grid>
        </Grid>
      </>
    )
}