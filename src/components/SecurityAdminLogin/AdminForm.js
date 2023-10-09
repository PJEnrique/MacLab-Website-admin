import React, { useState } from 'react';
import { createAdminAccount, designateAsAdmin } from '../config/firebase'; // Import designateAsAdmin function
import { useNavigate } from 'react-router-dom';
import './AdminForm.css';

const AdminForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState(''); // Add state for capturing ID
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the admin account
      const user = await createAdminAccount(email, password, name, id); // Pass the email, name, and ID to the function

      // Designate the user as an admin in Firestore
      await designateAsAdmin(user.uid, email, name, id); // Pass email, name, and id to the function

      console.log('Admin account created successfully!');
      alert('Admin account created successfully!');

      // Redirect to the desired page after account creation
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create Admin Account</button>
      </form>
    </div>
  );
};

export default AdminForm;