import React, { useState, useEffect } from 'react';
import NavDrawer from '../navDrawer';
import './Home.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [imacData, setImacData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.100.14:3600/attendance/get2');
        console.log('Response from server:', response.data);
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    const fetchImacData = async () => {
      try {
        const response = await axios.get('http://192.168.100.14:3600/mac/macData');
        console.log('IMAC Data:', response.data);
        setImacData(response.data);
      } catch (error) {
        console.error('Error fetching IMAC data:', error);
      }
    };

    fetchData();
    fetchImacData();
  }, []);

  return (
    <div className="home-container">
      <div className="menu-icon-container">
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon style={{ color: '#ffa500' }} />
        </IconButton>
      </div>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <h2>Attendance Records</h2>
      <div className="attendance-table-container">
        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Student Number</th>
                <th>Year Level</th>
                <th>Major</th>
                <th>Entry Time</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.fullname}</td>
                  <td>{record.studentNumber}</td>
                  <td>{record.yearLevel}</td>
                  <td>{record.major}</td>
                  <td>{record.entryTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        <h2>IMAC Data</h2>
      <div className="imac-data">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Active</th>
              <th>Timer</th>
              <th>Identifier</th>
            </tr>
          </thead>
          <tbody>
            {imacData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.active ? 'True' : 'False'}</td>
                <td>{item.timer}</td>
                <td>{item.identifier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;