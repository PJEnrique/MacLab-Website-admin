import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-background"></div>
      <div className="loading-content">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;

