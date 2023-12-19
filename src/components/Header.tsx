import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LinkMUI from '@mui/material/Link';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import companyLogo from '../assets/logo 2.svg'


interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
  toggleColorMode:() => void;
}

export default function Header(props: HeaderProps) {
  const { sections, title, toggleColorMode } = props;
  const theme = useTheme();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}
        >
          <IconButton sx={{ mr: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {/* {theme.palette.mode} mode */}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={companyLogo} alt={`web logo`} style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
            }}
          >
            RivDepMon
          </Typography>
        </Box>
        <Link to="/signin">
          <Button variant="outlined" size="small">
            Sign in
          </Button>
        </Link>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <LinkMUI
            underline="hover"
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </LinkMUI>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}