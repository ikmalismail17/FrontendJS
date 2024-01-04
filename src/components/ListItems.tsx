import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useSelectedIndex } from '../hooks/SelectIndexContext';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useTheme} from '@mui/material/styles';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StorageIcon from '@mui/icons-material/Storage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';


interface AdminData {
  firstname: string;
  lastname: string;
  role: number;
}

interface AdminDataProps {
  adminData: AdminData;
}

export default function ListItems({adminData}: AdminDataProps){
  const { selectedIndex, setSelectedIndex, setIndexByRoute, isAnimationOn } = useSelectedIndex();
  const theme = useTheme();


  //handle list focus when click
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  React.useEffect(() => {
    // Set the selectedIndex based on the route when the route changes
    setIndexByRoute(location.pathname);
  }, [location.pathname, setIndexByRoute]);

  return(
    <React.Fragment>
        <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
          <List component="nav" sx={{ color: theme.palette.primary.contrastText, p: 0 }}>
          <Link to="/admindashboard/profile" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItemButton 
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
            sx={{ 
              backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/026/747/041/small/dark-and-blue-concreate-and-cement-wall-to-present-product-and-background-generative-ai-free-photo.jpg)',
              backgroundSize: 'cover', // Adjust to 'contain' or 'auto' as needed
              backgroundPosition: 'center', // Adjust as needed
            }}>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon sx={{ color: theme.palette.primary.contrastText }}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={adminData.firstname+' '+adminData.lastname} secondary='Admin'/>
            </ListItemButton>
          </Link>
          <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
          <Link to="/admindashboard" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            className={(selectedIndex === 0) ? (isAnimationOn ? 'selected-animation' : 'stop-animation') : ''}
            >
              <ListItemIcon>
                <DashboardIcon sx={{ color: theme.palette.primary.contrastText }}/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
          <Link to="/admindashboard/data" style={{ textDecoration: 'none', color:"inherit" }} >
          <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          className={(selectedIndex === 1) ? (isAnimationOn ? 'selected-animation' : 'stop-animation') : ''}
          >
            <ListItemIcon>
              <StorageIcon sx={{ color: theme.palette.primary.contrastText }}/>
            </ListItemIcon>
            <ListItemText primary="Data" />
          </ListItemButton>
          </Link>
          <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
          <Link to="/admindashboard/alarm" style={{ textDecoration: 'none', color:"inherit" }}>
          <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          className={(selectedIndex === 2) ? (isAnimationOn ? 'selected-animation' : 'stop-animation') : ''}
          >
            <ListItemIcon>
              <NotificationsActiveIcon sx={{ color: theme.palette.primary.contrastText }}/>
            </ListItemIcon>
            <ListItemText primary="Alarm" />
          </ListItemButton>
          </Link>
          <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
          <Link to="/admindashboard/report" style={{ textDecoration: 'none', color:"inherit" }}>
          <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          className={(selectedIndex === 4) ? (isAnimationOn ? 'selected-animation' : 'stop-animation') : ''}
          >
            <ListItemIcon>
              <TextSnippetIcon sx={{ color: theme.palette.primary.contrastText }}/>
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItemButton>
          </Link>
          <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
          {adminData.role === 1 ? (
            <>
            <Link to="/admindashboard/log" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItemButton
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5)}
            className={(selectedIndex === 5) ? (isAnimationOn ? 'selected-animation' : 'stop-animation') : ''}
            >
              <ListItemIcon>
                <DocumentScannerIcon sx={{ color: theme.palette.primary.contrastText }}/>
              </ListItemIcon>
              <ListItemText primary="Log" />
            </ListItemButton>
            </Link>
            <Divider sx={{ backgroundColor: theme.palette.primary.contrastText }}/>
            </>
          ) :(
            ''
          )}
          
        </List>
    </React.Fragment>
  );
} 

