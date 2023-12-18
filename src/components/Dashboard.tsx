import React, { useEffect } from 'react';
import { styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { mainListItems, secondaryListItems } from './ListItems';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { useTheme} from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
// import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface DashboardProps {
    toggleColorMode:() => void;
    dashboardContent:() => React.ReactNode;
    adminTitle: string;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface State extends SnackbarOrigin {
  openSnack: boolean;
}

export default function Dashboard(props: DashboardProps) {
  const [open, setOpen] = React.useState(true);
  const {toggleColorMode, dashboardContent, adminTitle} = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [adminData, setAdminData] = React.useState({
    email: '',
    firstname: '',
    lastname: '',
  });
  const theme = useTheme();
  const { logout } = useAuth(); // Include the logout function
  const navigate = useNavigate();
  const { id } = useAuth();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  //handle list focus when click
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  //Dialog box
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  //Snackbar
  const [stateSnack, setStateSnack] = React.useState<State>(() => {
    // Check if there is a saved Snackbar state in local storage
    const savedSnackbarState = localStorage.getItem('snackbarState');
    return savedSnackbarState
      ? { ...JSON.parse(savedSnackbarState), openSnack: true }
      : { openSnack: false, vertical: 'top', horizontal: 'center' };
  });

  const { vertical, horizontal, openSnack } = stateSnack;
  
  const handleOpenSnack = (newState: SnackbarOrigin) => () => {
    // Update the state to open the Snackbar
  setStateSnack({ ...newState, openSnack: true });

  // Save the Snackbar state in local storage
  localStorage.setItem('snackbarState', JSON.stringify(newState));
  };

  const handleCloseSnack = () => {
    // Update the state to close the Snackbar
  setStateSnack({ ...stateSnack, openSnack: false });
  };

  useEffect(() => {
    // Fetch data from Node.js server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/admininfo/' + id);
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
  
        const admindata = await response.json();
  
        setAdminData(admindata);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{ 
       // Check if there is a saved Snackbar state in local storage
      const savedSnackbarState = localStorage.getItem('snackbarState');
      if (savedSnackbarState) {
        // Parse the saved state and open the Snackbar
        handleOpenSnack(JSON.parse(savedSnackbarState))();
      } else {
        // If there is no saved state, you can open the Snackbar with some default values
        handleOpenSnack({ vertical: 'top', horizontal: 'center' })();
      }
      }
    };

    fetchData();
  
  }, []);

  const handleLogout = () => {
    // Call the logout function from your authentication context
    logout();
    // Redirect to the login page
    navigate('/');
    // Clear the Snackbar state from local storage
    localStorage.removeItem('snackbarState');
  };

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Snackbar 
            open={openSnack} 
            autoHideDuration={5000} 
            onClose={handleCloseSnack}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
          >
            <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
              Successfully Login!!
            </Alert>
          </Snackbar>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {adminTitle}
            </Typography>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton sx={{ ml: 1 }} color="inherit" onClick={handleClickOpen}>
             <LogoutIcon></LogoutIcon>
            </IconButton>
            <Dialog
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"LOGOUT"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure want to logout?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleLogout} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} color="#448aff">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBoxRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={adminData.firstname+' '+adminData.lastname} secondary="Admin 1" />
          </ListItem>
          <Divider />
          <Link to="/admindashboard" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <Divider />
          <Link to="/admindashboard/report" style={{ textDecoration: 'none', color:"inherit" }} >
          <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
          </Link>
          <Divider />
          <Link to="/admindashboard/alarm" style={{ textDecoration: 'none', color:"inherit" }}>
          <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText primary="Alarm" />
          </ListItemButton>
          </Link>
          <Divider />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {dashboardContent()}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}