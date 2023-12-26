import React, { useEffect } from 'react';
import {emphasize, styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { useTheme} from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Paper from '@mui/material/Paper';
import companyLogo from '../assets/logo 2.svg'
import '../assets/css/PaperAnimation.css'
import '../assets/css/ListItemButton.css'
import TypingAnimation from './TitleAnimation';
import { DataProvider } from '../hooks/DataContext';
import { useSelectedIndex } from '../hooks/SelectIndexContext';

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

//breadcrumbs
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

export default function Dashboard(props: DashboardProps) {
  const [open, setOpen] = React.useState(true);
  const {toggleColorMode, dashboardContent, adminTitle} = props;
  const { selectedIndex, setSelectedIndex, setIndexByRoute } = useSelectedIndex();
  const theme = useTheme();
  const { logout } = useAuth(); // Include the logout function
  const navigate = useNavigate();
  const { id } = useAuth();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [adminData, setAdminData] = React.useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  //handle list focus when click
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    // Set the selectedIndex based on the route when the route changes
    setIndexByRoute(location.pathname);
  }, [location.pathname, setIndexByRoute]);

  //Dialog box
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  //Snackbar
  const [stateSnack, setStateSnack] = React.useState<State>({
    openSnack: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, openSnack } = stateSnack;
  
  const handleOpenSnack = (newState: SnackbarOrigin) => () => {
    // Update the state to open the Snackbar
  setStateSnack({ ...newState, openSnack: true });
  };

  const handleCloseSnack = () => {
    // Update the state to close the Snackbar
  setStateSnack({ ...stateSnack, openSnack: false });

  // Clear the success message from local storage
  localStorage.removeItem('loginSuccessMessage');
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

        // Check for the success message in local storage only once when the component mounts
        const loginSuccessMessage = localStorage.getItem('loginSuccessMessage');
        console.log('loginSuccessMessage:', loginSuccessMessage); // Add this log statement

        if (loginSuccessMessage === null) {
          console.log('No success message found in local storage'); // Add this log statement
        }else{  
          // Parse the message and open the Snackbar
          handleOpenSnack({ vertical: 'top', horizontal: 'center' })();

          // Clear the success message from local storage
         localStorage.removeItem('loginSuccessMessage');
        }

        setAdminData(admindata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Include 'id' in the dependency array if it's used in the useEffect

  const handleLogout = () => {
    // Call the logout function from your authentication context
    logout();
    // Redirect to the login page
    navigate('/');
    // Clear the Snackbar state from local storage
    localStorage.removeItem('snackbarState');
  };

  //breadcrumb
  let breadcrumbContent;
  if(adminTitle == 'Report'){
    breadcrumbContent = (
      <>
        <StyledBreadcrumb
          label="Report"
          icon={<BarChartIcon fontSize="small" />}
        />
      </>
    )
  }else if(adminTitle == 'Alarm'){
    breadcrumbContent = (
      <>
        <StyledBreadcrumb
          label="Alarm"
          icon={<NotificationsActiveIcon fontSize="small" />}
        />
      </>
    )
  }

  // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //   const confirmationMessage = 'Are you sure you want to leave this page?';

  //   // Check if the event's properties have been modified (indicating a refresh)
  //   if (event.defaultPrevented || event.returnValue === confirmationMessage) {
  //     // Page is being closed or browser is being closed
  //     handleLogout();
  //   } else {
  //     // Page is being refreshed, so prevent logout
  //     event.preventDefault();
  //   }
  // };

  // window.addEventListener('beforeunload', handleBeforeUnload);

  // return () => {
  //   window.removeEventListener('beforeunload', handleBeforeUnload);
  // };
  

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} enableColorOnDark>
          <Snackbar 
            open={openSnack} 
            autoHideDuration={5000} 
            onClose={handleCloseSnack}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
          >
            <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
              {'Successfully Log in, Welcome '+adminData.firstname+' '+adminData.lastname}
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
              <Box component="img" src={companyLogo} alt={`web logo`} style={{ width: '1.5em', height: '1.5em'}} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
              <TypingAnimation />
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton sx={{ ml: 1 }} color="inherit" onClick={handleClickOpen}>
             <LogoutIcon></LogoutIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
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
        <Drawer variant="permanent" open={open} sx={{'& .MuiDrawer-paper': {backgroundColor: theme.palette.primary.light}}}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              // backgroundImage: 'url(https://source.unsplash.com/random)'
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
          <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
            <List component="nav" sx={{ color: theme.palette.primary.contrastText, p: 0 }}>
            <ListItem 
            sx={{ 
              backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/026/747/041/small/dark-and-blue-concreate-and-cement-wall-to-present-product-and-background-generative-ai-free-photo.jpg)',
              backgroundSize: 'cover', // Adjust to 'contain' or 'auto' as needed
              backgroundPosition: 'center', // Adjust as needed
            }}>
              <ListItemAvatar>
                <Avatar>
                  <AccountBoxRoundedIcon sx={{ color: theme.palette.primary.contrastText }}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={adminData.firstname+' '+adminData.lastname} secondary='Admin'/>
            </ListItem>
            <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
            <Link to="/admindashboard" style={{ textDecoration: 'none', color:"inherit" }}>
              <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              className={selectedIndex === 0 ? 'selected-animation' : ''}
              >
                <ListItemIcon>
                  <DashboardIcon sx={{ color: theme.palette.primary.contrastText }}/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </Link>
            <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
            <Link to="/admindashboard/report" style={{ textDecoration: 'none', color:"inherit" }} >
            <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            className={selectedIndex === 1 ? 'selected-animation' : ''}
            >
              <ListItemIcon>
                <BarChartIcon sx={{ color: theme.palette.primary.contrastText }}/>
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
            </Link>
            <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
            <Link to="/admindashboard/alarm" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            className={selectedIndex === 2 ? 'selected-animation' : ''}
            >
              <ListItemIcon>
                <NotificationsActiveIcon sx={{ color: theme.palette.primary.contrastText }}/>
              </ListItemIcon>
              <ListItemText primary="Alarm" />
            </ListItemButton>
            </Link>
            <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
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
        <DataProvider>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} fixed={false}>
                <Breadcrumbs 
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon fontSize="small" />}
                >
                  <StyledBreadcrumb
                    label="Dashboard"
                    icon={<DashboardIcon fontSize="small" />}
                  />
                  {breadcrumbContent}
                </Breadcrumbs>
                  <Paper className="animation" variant='outlined' sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 }}} elevation={3}>
                    {dashboardContent()}
                  </Paper>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </DataProvider>
        </Box>
      </Box>
  );
}