import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSecurityAdmin.css';
import logoImage from '../../assets/logo1.jpg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AdminForm from './AdminForm'; 

const LoginSecurityAdmin = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(); 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

     
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your email and password.');
    }
  };

  const handleSignup = () => {
    
    navigate('/signup');
    toggleSignup(); 
  };

  const toggleSignup = () => {
    setShowSignup((prevShowSignup) => !prevShowSignup); 
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="login-form">
        <div className="login-input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '5px', color: 'black' }}>You don't have an account?</p>
          <button
            onClick={handleSignup}
            style={{ color: '#810551', fontWeight: 'bold' }} 
          >
            Signup
          </button>
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>

      {showSignup && <AdminForm />}
    </div>
  );
};

export default LoginSecurityAdmin;
