import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import '../assets/css/ListItemButton.css';

interface SidebarProps {
  archives: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
  title: string;
}

export default function Sidebar(props: SidebarProps) {
  const { description, social, title } = props;

  return (
    <React.Fragment>
      <Paper className='selected-animation' elevation={0} sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={8}>
          <Typography variant="h6" gutterBottom sx={{ color:'black' }}>
            {title}
          </Typography>
          <Typography sx={{ color:'black' }}>{description}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
          <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            }}
          >
          <Typography variant="h6" gutterBottom>
            Social
          </Typography>
            {social.map((network) => (
              <Link
                display="block"
                variant="body1"
                href="#"
                key={network.name}
                sx={{ mb: 0.5 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <network.icon />
                  <span>{network.name}</span>
                </Stack>
              </Link>
            ))}
          </Paper>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}