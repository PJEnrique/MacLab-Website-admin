import React, { useState } from 'react';
import { createAdminAccount, designateAsAdmin } from '../config/firebase'; 
import { useNavigate } from 'react-router-dom';
import './AdminForm.css';

const AdminForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState(''); 
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createAdminAccount(email, password, name, id); 
      await designateAsAdmin(user.uid, email, name, id); 

      console.log('Admin account created successfully!');
      alert('Admin account created successfully!');

      navigate('/login');
    } catch (error) {
      console.error('Error creating admin account:', error.message);
      alert('Error creating admin account: ' + error.message);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Create Admin Account</h2>
      <form className="admin-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <button type="submit">Create Admin Account</button>
      </form>
    </div>
  );
};

export default AdminForm;