import React, { useEffect } from 'react';
import {emphasize, styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import { useTheme} from '@mui/material/styles';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
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
import TitleAnimation from './TitleAnimation';
import { DataProvider } from '../hooks/DataContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ListItems from './ListItems';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useSelectedIndex } from '../hooks/SelectIndexContext';
import MotionPhotosOffIcon from '@mui/icons-material/MotionPhotosOff';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';


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

interface Props {
  window?: () => Window;
}

interface DashboardProps extends Props {
    toggleColorMode:() => void;
    dashboardContent:() => React.ReactNode;
    adminTitle: string;
}

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// old drawer
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       position: 'relative',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       ...(!open && {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//           width: theme.spacing(9),
//         },
//       }),
//     },
//   }),
// );

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
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {toggleColorMode, dashboardContent, adminTitle} = props;
  const theme = useTheme();
  const { logout } = useAuth(); // Include the logout function
  const navigate = useNavigate();
  const { isAnimationOn, setIsAnimationOn } = useSelectedIndex(); // Include the isAnimationOn state
  const { id } = useAuth();
  const [adminData, setAdminData] = React.useState({
    email: '',
    firstname: '',
    lastname: '',
    role: 0,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleOpenPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);

  const handleOpenProfile = () => {
    navigate('/admindashboard/profile');
  }

  // Drawer
  const container = window !== undefined ? () => window().document.body : undefined;

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

        if (loginSuccessMessage) {
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
  };

  //animation
  const handleClickAnimation = () => {
    setIsAnimationOn(!isAnimationOn);
  };

  // Breadcrumb
let breadcrumbContent;
if (adminTitle === 'Data') {
  breadcrumbContent = [
    <StyledBreadcrumb
      key="data"
      label="Data"
      icon={<StorageIcon fontSize="small" />}
    />,
  ];
} else if (adminTitle === 'Alarm') {
  breadcrumbContent = [
    <StyledBreadcrumb
      key="alarm"
      label="Alarm"
      icon={<NotificationsActiveIcon fontSize="small" />}
    />,
  ];
} else if (adminTitle === 'Profile') {
  breadcrumbContent = [
    <StyledBreadcrumb
      key="profile"
      label="Profile"
      icon={<AccountCircleIcon fontSize="small" />}
    />,
  ];
}else if (adminTitle === 'Report') {
  breadcrumbContent = [
    <StyledBreadcrumb
      key="report"
      label="Report"
      icon={<TextSnippetIcon fontSize="small" />}
    />,
  ];
}else if (adminTitle === 'Log') {
  breadcrumbContent = [
    <StyledBreadcrumb
      key="log"
      label="Log"
      icon={<DocumentScannerIcon fontSize="small" />}
    />,
  ];
}
  

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar 
          position="absolute"
          enableColorOnDark
          sx={{
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            ml: { lg: `${drawerWidth}px` },
          }}
          >
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
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: 'none' } }}
              // sx={{
              //   marginRight: '36px',
              //   ...(open && { display: 'none' }),
              // }}
            >
              <MenuIcon />
            </IconButton>
              <Box component="img" src={companyLogo} alt={`web logo`} style={{ width: '1.5em', height: '1.5em'}} sx={{ display: "flex", mr: 2 }} />
              <TitleAnimation />
            <Tooltip title="More Options" placement="bottom">
              <IconButton sx={{ ml: 1, display: { xs:'block', sm:'none' } }} color="inherit" onClick={handleOpenPop}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="More Options" placement="bottom">
              <IconButton sx={{ ml: 1, display: { xs:'none', sm:'block' } }} color="inherit" onClick={handleOpenPop}>
                <SettingsIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openPop}
              onClose={handleClosePop}
              onClick={handleClosePop}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => { handleClosePop(); handleOpenProfile();}}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { handleClosePop(); toggleColorMode();}}>
                <ListItemIcon>
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </ListItemIcon>
                {theme.palette.mode === 'dark' ? "Light" : "Dark"}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClosePop();
                  handleClickAnimation();
                }}
                sx={{
                  display: {xs:'none', sm:'flex'}, // Set display to flex
                }}
              >
                <ListItemIcon>
                  {isAnimationOn ? <MotionPhotosOffIcon /> : <MotionPhotosAutoIcon />}
                </ListItemIcon>
                Animation
              </MenuItem>
              <MenuItem onClick={() => { handleClosePop(); handleClickOpen();}}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
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
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleLogout} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
        >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { 
              backgroundColor: theme.palette.primary.light,
              boxSizing: 'border-box', 
              width: drawerWidth },
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              // backgroundImage: 'url(https://source.unsplash.com/random)'
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <ListItems adminData={{ firstname: adminData.firstname, lastname: adminData.lastname, role: adminData.role }} />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
            width: drawerWidth,
            '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.primary.light,
            boxSizing: 'border-box', 
            width: drawerWidth
          }}}
          >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              // backgroundImage: 'url(https://source.unsplash.com/random)'
            }}
          >
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          <ListItems adminData={{ firstname: adminData.firstname, lastname: adminData.lastname, role: adminData.role }} />
        </Drawer>
        </Box>
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
            p: 3, 
            width: { lg: `calc(100% - ${drawerWidth}px)` }
          }}
        >
        <Toolbar />
        <DataProvider>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, px: { xs:0, sm: 0, md:0 } }}>
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
                  <Paper className={isAnimationOn ? 'animation' : 'stop-animation'} variant='outlined' sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 }, display: { xs: 'none', sm: 'block'}}}>
                    {dashboardContent()}
                  </Paper>
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    {dashboardContent()}
                  </Box>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </DataProvider>
        </Box>
      </Box>
  );
}