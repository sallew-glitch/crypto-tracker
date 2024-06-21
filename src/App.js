import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { Box } from '@mui/system';

function App() {

  return (
      <BrowserRouter>
        <Box sx={{backgroundColor: '#14161a', color: 'white', minHeight: '100vh'}}>
          <Header />
          <Routes>
            <Route path='/' Component={Homepage} exact/>
            <Route path='/coins/:id' Component={CoinPage}/>
          </Routes>
        </Box>
      </BrowserRouter>
  );
}

export default App;
