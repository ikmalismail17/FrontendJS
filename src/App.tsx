// import {GridItem} from '@chakra-ui/react'
// import './assets/css/App.css'
import  MainSec  from "./components/MainSec";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import {ThemeProvider, useTheme } from '@mui/material/styles';
import Header from './components/Header';
import MainFeaturedPost from './components/MainFeaturedPost';
import FeaturedPost from './components/FeaturedPost';
import Sidebar from './components/SideBar';
import Footer from './components/Footer';
import { useColorMode } from './hooks/ToggleColorMode';
import SignInSide from "./components/SignInSide";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashBoardContent from "./components/DashBoardContent";
import DashBoardData from "./components/DashBoardData";
import DashboardAlarm from "./components/DashboardAlarm";
import DashboardProfile from "./components/DashboardProfile";
import DashBoardUpdate from "./components/DashboardUpdate";
import DashBoardLog from "./components/DashboardLog";
import { useAuth } from "./hooks/AuthContext";
import React from "react";
import { SelectedIndexProvider } from "./hooks/SelectIndexContext";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link, Tooltip } from "@mui/material";
import FeedBack from "./components/FeedBack";


const sections = [
  { title: 'Main Post', url: '#mainpost' },
  { title: 'Visualization', url: '#tabledataoutside' },
  { title: 'About', url: '#about' },
  { title: 'Feedback', url: '#feedback' }
];

const mainFeaturedPost = {
  title: 'River Depth Monitoring System',
  description:
    "This system will provide people the real time data on the depth of the river that can ensure safety of the people",
  image: 'https://img.freepik.com/premium-vector/vector-abstract-gradiente-background-blue-wallpaper_901408-861.jpg',
  imageText: 'main image description',
  linkText: 'Click For More...',
};

const featuredPosts = [
  {
    title: 'Importance of River',
    date: 'Nov 12',
    description:
      'River depth is crucial for various reasons. It ensures safe navigation...',
    extend:'River depth matters a lot. It keeps boats safe, helps fish and other water creatures thrive, and prevents floods. Having the right depth is important for water supply, making electricity, and fun activities like swimming and boating. It also stops the land next to the river from washing away. So, keeping an eye on river depth is like taking care of the river and everything around it.',
    image: 'https://t3.ftcdn.net/jpg/01/90/18/20/360_F_190182089_kVJgPPov9cI0AJ84CdCVqVxx2a57928j.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Significance',
    date: 'Nov 11',
    description:
      'Monitoring river depth is vital for safe navigation, flood prevention, and sustaining aquatic life...',
    extend:'Monitoring river depth is vital for safe navigation, flood prevention, and sustaining aquatic life. It ensures a stable water supply, supports hydropower, and safeguards riverbanks from erosion. In essence, a river depth monitor is crucial for balancing human activities and preserving the health of river ecosystems.',
    image: 'https://media.istockphoto.com/id/1180471106/photo/save-us-out-from-the-darkness.jpg?s=612x612&w=0&k=20&c=v4ZOtzXmF6YnYdN3xhHATru9Y0yCQzWyARy_GyNDNQw=',
    imageLabel: 'Image Text',
  },
];

const sidebar = {
  title: 'About',
  description1:
    `My name is Ikmal Ismail. Last year student in Bachelor of Science Computer. This is my final year project using React JS, Node JS, Express JS, MongoDB and Material UI.\n\n`,
  description2:
    `This system is not actually measuring the depth of the river on-site. It measuring the depth of the river using simulator that act as depth of the river.`,
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'LinkedIn', icon: LinkedInIcon, link:'https://www.linkedin.com/in/muhammad-ikmal-ismail-243614155/' },
    { name: 'Twitter', icon: TwitterIcon, link:'https://twitter.com/1686Ikmal' },
    { name: 'Facebook', icon: FacebookIcon, link:'https://www.facebook.com/ikmalismail17'},
  ],
};


function App() {
  return(
    <Router>
      <AppContent />
    </Router>
  )
}

function AppContent() {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const { token } = useAuth();
  const route = useLocation();

  //web title
  React.useEffect(() => {
    let newTitle = 'Monitoring System'; // Default title

    if (route.pathname === '/admindashboard' && token) {
      newTitle = 'Dashboard';
    } else if (route.pathname === '/admindashboard/data' && token) {
      newTitle = 'Data';
    } else if (route.pathname === '/admindashboard/alarm' && token) {
      newTitle = 'Alarm';
    } else if (route.pathname === '/admindashboard/profile' && token) {
      newTitle = 'Profile';
    } else if (route.pathname === '/admindashboard/report' && token) {
      newTitle = 'Report';
    } else if (route.pathname === '/admindashboard/log' && token) {
      newTitle = 'Log';
    } else if (route.pathname === '/signin') {
      newTitle = 'Sign In';
    } else{
      newTitle = 'Monitoring System';
    }

    document.title = newTitle;

  }, [route.pathname, token]);

  //component
  const AdminDashboard = () => {
    return (
      <DashBoardContent />
    )
  }
  const AdminData = () => {
    return (
      <DashBoardData />
    )
  }
  const AdminAlarm = () => {
    return (
      <DashboardAlarm />
    )
  }
  const AdminProfile = () => {
    return (
      <DashboardProfile />
    )
  }
  const AdminReport = () => {
    return (
      <DashBoardUpdate />
    )
  }
  const AdminLog = () => {
    return (
      <DashBoardLog />
    )
  }

  //main content
  let mainContent;
  switch (route.pathname) {
    case '/signin':
      mainContent = (
        <>
          <SignInSide></SignInSide>
        </>
      );
      break;
    case '/admindashboard':
      if (token) {
        mainContent = (
          <>
            <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminDashboard} adminTitle="Dashboard"></Dashboard>
          </>
        );
      }
      break;
    case '/admindashboard/data':
      if (token) {
        mainContent = (
          <>
            <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminData} adminTitle="Data"></Dashboard>
          </>
        );
      }
      break;
    case '/admindashboard/alarm':
      if (token) {
        mainContent = (
          <>
            <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminAlarm} adminTitle="Alarm"></Dashboard>
          </>
        );
      }
      break;
    case '/admindashboard/profile':
      if (token) {
        mainContent = (
          <>
            <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminProfile} adminTitle="Profile"></Dashboard>
          </>
        );
      }
      break;
    case '/admindashboard/report':
      if (token) {
        mainContent = (
          <>
            <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminReport} adminTitle="Report"></Dashboard>
          </>
        );
      }
      break;
    case '/admindashboard/log':
      if (token) {
        mainContent = (
          <>
            <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminLog} adminTitle="Log"></Dashboard>
          </>
        );
      }
      break;
    default:
      mainContent = (
        <>
          <Container maxWidth="lg" id="mainpost">
            <Header title="Monitoring System" sections={sections} toggleColorMode={toggleColorMode} />
            <main>
              <MainFeaturedPost post={mainFeaturedPost}/>
              <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} />
                ))}
              </Grid>
              <Grid container spacing={5} sx={{ mt: 2 }} >
                <Grid item xs={12} md={12}>
                  <MainSec/>
                </Grid>
                <Grid item xs={12} md={12}>
                <Sidebar
                  title={sidebar.title}
                  description1={sidebar.description1}
                  description2={sidebar.description2}
                  archives={sidebar.archives}
                  social={sidebar.social}
                />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FeedBack/>
                </Grid>
              </Grid>
            </main>
            <Link href="#header">
              <Tooltip title="Back to top" placement="top">
                <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 25, right: 25 }}>
                  <NavigationIcon />
                </Fab>
              </Tooltip>
            </Link>
          </Container>
          <Footer
            title="RivDepMon"
            description="MonitorSystem"
          />
        </>
      );
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <SelectedIndexProvider>
      <CssBaseline />
        <Routes>
          <Route path="/" element={mainContent} />
          <Route path="/admindashboard/*" element={mainContent}/>
          <Route path="/signin" element={mainContent}/>
        </Routes>
      </SelectedIndexProvider>
    </ThemeProvider>
  )
}

export default App
