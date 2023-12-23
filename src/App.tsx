// import {GridItem} from '@chakra-ui/react'
// import './assets/css/App.css'
import  MainSec  from "./components/MainSec";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import {ThemeProvider, useTheme } from '@mui/material/styles';
import Header from './components/Header';
import MainFeaturedPost from './components/MainFeaturedPost';
import FeaturedPost from './components/FeaturedPost';
import Sidebar from './components/SideBar';
import Footer from './components/Footer';
import { useColorMode } from './components/ToggleColorMode';
import SignInSide from "./components/SignInSide";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashBoardContent from "./components/DashBoardContent";
import DashBoardReport from "./components/DashBoardReport";
import DashboardAlarm from "./components/DashboardAlarm";
import { useAuth } from "./AuthContext";
import React from "react";

const sections = [
  { title: 'Main Post', url: '#mainpost' },
  { title: 'About', url: '#about' },
  { title: 'Visualization', url: '#tabledataoutside' }

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
  description:
    'My name is Ikmal Ismail. Last year student in Bachelor of Science Computer. This is my final year project',
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
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
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
    } else if (route.pathname === '/admindashboard/report' && token) {
      newTitle = 'Report';
    } else if (route.pathname === '/admindashboard/alarm' && token) {
      newTitle = 'Alarm';
    } else if (route.pathname === '/signin') {
      newTitle = 'Sign In';
    } else{
      newTitle = 'Monitoring System';
    }

  }, [route.pathname, token]);

  //component
  const AdminDashboard = () => {
    return (
      <DashBoardContent />
    )
  }
  const AdminReport = () => {
    return (
      <DashBoardReport />
    )
  }
  const AdminAlarm = () => {
    return (
      <DashboardAlarm />
    )
  }

  //main content
  let mainContent;
  if(route.pathname == '/signin'){
    mainContent = (
      <>
      <SignInSide></SignInSide>
      </>
    )
  }else if(route.pathname == '/admindashboard' && token){
    mainContent = (
      <>
      <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminDashboard} adminTitle="Dashboard"></Dashboard>
      </>
    )
  }else if(route.pathname == '/admindashboard/report' && token){
    mainContent = (
      <>
      <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminReport} adminTitle="Report"></Dashboard>
      </>
    )
  }else if(route.pathname == '/admindashboard/alarm' && token){
    mainContent = (
      <>
      <Dashboard toggleColorMode={toggleColorMode} dashboardContent={AdminAlarm} adminTitle="Alarm"></Dashboard>
      </>
    )
  }else{
    mainContent = (
      <>
      <Container maxWidth="lg">
        <Header title="Monitoring System" sections={sections} toggleColorMode={toggleColorMode}/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 2 }}>
          <MainSec></MainSec>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="MonitorSystem"
      />
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={mainContent} />
          <Route path="/admindashboard/*" element={mainContent}/>
          <Route path="/signin" element={mainContent}/>
        </Routes>
    </ThemeProvider>
  )
}

export default App
