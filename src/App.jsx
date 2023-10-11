import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavDrawer from './components/navDrawer';
import Home from './components/Home/Home';
import LoginSecurityAdmin from './components/SecurityAdminLogin/LoginSecurityAdmin'; 
import Dashboard from './components/Dashboard/Dashboard';
import AdminForm from './components/SecurityAdminLogin/AdminForm.js'; // Import the AdminForm component
import './components/navDrawer.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <IconButton
            style={{ display: 'none' }}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon style={{ color: '#ffa500' }} />
          </IconButton>
          <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
          <Routes>
  <Route
    path="/home"
    element={<Home drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />}
  />
  <Route
    path="/dashboard"
    element={<Dashboard drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />}
  />
  <Route path="/" element={<LoginSecurityAdmin />} />
  <Route path="/signup" element={<AdminForm />} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
        </>
      )}
    </Router>
  );
};

export default App;