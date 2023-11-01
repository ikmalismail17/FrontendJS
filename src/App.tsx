import { Grid, GridItem} from '@chakra-ui/react'
// import './assets/css/App.css'
import  SideBar  from "./components/SideBar";
import  TopBar  from "./components/TopBar";
import  MainSec  from "./components/MainSec";
import Footer from './components/Footer';

function App() {

  return (
    <Grid
  templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
  gridTemplateRows={'50px 1fr 30px'}
  gridTemplateColumns={'150px 1fr'}
  h='200px'
  gap='1'
  color='blackAlpha.700'
  fontWeight='bold'
>
  <GridItem pl='2' area={'header'}>
    <TopBar />
  </GridItem>
  <GridItem pl='2' area={'nav'}>
    {/* <SideBar /> */}
  </GridItem>
  <GridItem pl='2' area={'main'}>
    <MainSec />
  </GridItem>
  <GridItem pl='2' area={'footer'}>
    <Footer />
  </GridItem>
  </Grid>
  )
}

export default App
