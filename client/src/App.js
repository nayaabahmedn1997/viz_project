import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import { themeSettings } from './theme';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Layout from './components/Layout';
import DashBoard from './components/Dashboard';
import Products from './Pages/Products';
import Customers from './Pages/Customers';
import Transactions from './Pages/Transactions';
import Geography from './Pages/Geography';
import Overview from './Pages/Overview';


function App() {

  const mode  = useSelector((state)=>state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode), [mode]));

  return (
   <BrowserRouter>
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
        <Route 
         element ={<Layout />}
        >
          <Route 
          path="/"
          element={<Navigate to="/dashboard" replace />}
          />
           <Route path='/dashboard' 
          element={<DashBoard />}
          />
          <Route path='/products' 
          element={<Products />}
          />
           <Route path='/customers' 
          element={<Customers />}
          />
           <Route path='/transactions' 
          element={<Transactions />}
          />
           <Route path='/geography' 
          element={<Geography />}
          />
           <Route path='/overview' 
          element={<Overview />}
          />
        </Route>
    </Routes>
   </ThemeProvider>
   </BrowserRouter>
  );
}

export default App;
