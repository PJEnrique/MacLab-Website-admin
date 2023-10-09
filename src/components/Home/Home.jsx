import React, { useState } from 'react';
import NavDrawer from '../navDrawer';
import './Home.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="home-container">
      <div className="menu-icon-container">
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon style={{ color: '#ffa500' }} />
        </IconButton>
      </div>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This is a temporary home page.</p>
      <p>You can add your dashboard content and features here.</p>
    </div>
  );
};

export default Home;
