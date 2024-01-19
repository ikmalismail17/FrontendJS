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
  description1: string;
  description2: string;
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
    link: string;
  }>;
  title: string;
}

export default function Sidebar(props: SidebarProps) {
  const { description1, description2, social, title } = props;

  return (
    <React.Fragment>
      <Paper className='selected-animation' elevation={0} sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={8}>
          <Typography variant="h6" gutterBottom sx={{ color:'black' }} id="about">
            {title}
          </Typography>
          <Typography sx={{ color:'black' }}>{description1}</Typography>
          <Typography sx={{ color:'black', mt:1 }}>{description2}</Typography>
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
                underline='none'
                display="block"
                variant="body1"
                href={network.link}
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