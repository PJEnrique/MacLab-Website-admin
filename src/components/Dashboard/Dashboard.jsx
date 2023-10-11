import React, { useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NavDrawer from '../navDrawer';
import './Dashboard.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from Firestore
    const fetchUserData = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const userData = usersSnapshot.docs.map(doc => doc.data());
      setUsers(userData);
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="menu-icon-container">
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon style={{ color: '#ffa500' }} />
        </IconButton>
      </div>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <h1>Welcome to Your Dashboard</h1>
      <div className="user-info">
        {users.map((user, index) => (
          <div key={index}>
            <p>displayName: {user.displayName}</p>
            <p>StudentNo: {user.studentNo}</p>
            <p>Department: {user.department}</p>
            <p>yearGrade: {user.yearGrade}</p>
          </div>
        ))}
      </div>
      </div>
  );
};

export default Dashboard;