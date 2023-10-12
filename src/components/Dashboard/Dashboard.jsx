import React, { useEffect, useState, useRef } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NavDrawer from '../navDrawer';
import './Dashboard.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const chartRef = useRef(null);

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

  // Calculate the number of users
  const numUsers = users.length;

  // Count the number of users per department
  const departmentCounts = users.reduce((acc, user) => {
    acc[user.department] = (acc[user.department] || 0) + 1;
    return acc;
  }, {});

  // Count the number of users per yearGrade
  const yearGradeCounts = users.reduce((acc, user) => {
    acc[user.yearGrade] = (acc[user.yearGrade] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      const chart = chartRef.current.chartInstance;
      if (chart.data) {
        // Labels will be 'Users', 'Remaining', department names, and yearGrade names
        chart.data.labels = ['Users', 'Remaining', ...Object.keys(departmentCounts), ...Object.keys(yearGradeCounts)];
        // Data will be the counts of 'Users', 'Remaining', department users, and yearGrade users
        chart.data.datasets[0].data = [numUsers, 50 - numUsers, ...Object.values(departmentCounts), ...Object.values(yearGradeCounts)];
        chart.update();
      }
    } else if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartRef.current.chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Users', 'Remaining', ...Object.keys(departmentCounts), ...Object.keys(yearGradeCounts)],
          datasets: [{
            data: [numUsers, 50 - numUsers, ...Object.values(departmentCounts), ...Object.values(yearGradeCounts)],
            backgroundColor: ['#810551', '#ccc', '#ff4500', '#4caf50', '#2196f3', '#e9967a', '#00755e', '#8e3a59', '#836953'],
          }],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        },
      });
    }
  }, [numUsers, departmentCounts, yearGradeCounts]);

  return (
    <div className="dashboard-container">
      <div className="menu-icon-container">
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon style={{ color: '#fff' }} />
        </IconButton>
      </div>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="analysis-section">
        <h2>Analysis</h2>
        <canvas ref={chartRef} style={{ width: '500px', height: '500px', border: '3px solid white' }} />
        <p>Total Users: {numUsers}</p>
      </div>
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