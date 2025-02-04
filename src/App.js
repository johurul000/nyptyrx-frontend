import { Route, Routes, useLocation} from 'react-router-dom'
import Home from './auth_system/pages/Home';
import Login from './auth_system/pages/Login';
import Register from './auth_system/pages/Register';
import Dashboard from './auth_system/pages/Dashboard';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { verify } from './features/AuthSlice';
import CreatePharmacy from './auth_system/pages/CreatePharmacy';
import { ThemeProvider } from './theme/ThemeContext';
import Inventory from './inventory/pages/Inventory';
import CreateInvoice from './inventory/pages/CreateInvoice';
import ViewInvoice from './inventory/pages/ViewInvoice';
import Invoices from './inventory/pages/Invoices';
import Settings from './auth_system/pages/Settings';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(verify())
  }, [location, dispatch])


  return (
    <ThemeProvider>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='login/' element={<Login/>}></Route>
        <Route path='register/' element={<Register/>}></Route>
        <Route path='dashboard/' element={<Dashboard/>}></Route>

        <Route path='create-pharmacy/' element={<CreatePharmacy/>}></Route>
        <Route path='create-invoice/' element={<CreateInvoice/>}></Route>
        <Route path="invoice/:invoiceNumber" element={<ViewInvoice />} />
        <Route path='invoices/' element={<Invoices/>}></Route>
        <Route path='settings/' element={<Settings/>}></Route>

        <Route path='inventory/' element={<Inventory/>}></Route>
      </Routes>
    </ThemeProvider>
    
  );
}

export default App;
