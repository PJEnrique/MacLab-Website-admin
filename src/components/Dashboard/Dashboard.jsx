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
      <h1 className="welcome-text">Welcome to Your Dashboard</h1>
      <table className="user-info-table">
        <thead>
          <tr>
            <th>Display Name</th>
            <th>Student No</th>
            <th>Department</th>
            <th>Year Grade</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="user-row">
              <td>{user.displayName}</td>
              <td>{user.studentNo}</td>
              <td>{user.department}</td>
              <td>{user.yearGrade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;