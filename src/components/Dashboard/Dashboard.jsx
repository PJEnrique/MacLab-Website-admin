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

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      const chart = chartRef.current.chartInstance;
      if (chart.data) {
        chart.data.labels = ['Users', 'Remaining'];
        chart.data.datasets[0].data = [numUsers, 100 - numUsers];
        chart.update();
      }
    } else if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartRef.current.chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Users', 'Remaining'],
          datasets: [{
            data: [numUsers, 100 - numUsers],
            backgroundColor: ['#ffa500', '#ccc'],
          }],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [numUsers]);

  return (
    <div className="dashboard-container">
      <div className="menu-icon-container">
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon style={{ color: '#ffa500' }} />
        </IconButton>
      </div>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="content-container">
        <div className="analysis-section">
          <h2>Analysis</h2>
          <canvas ref={chartRef} style={{ width: '60px', height: '60px', border: '1px solid #ccc' }} />
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
    </div>
  );
};

export default Dashboard;