import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { db } from '../components/config/firebase';
import './navDrawer.css';

const NavDrawer = ({ open, onClose }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [photoUpload, setPhotoUpload] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleSignOut = () => {
    navigate('/');
    onClose();
  };

  const handlePhotoUpload = async (event) => {
    if (!auth.currentUser || !userData) {
      console.error('User not authenticated or user data not available.');
      return;
    }

    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `${userData.id}/avatar.jpg`);

    try {
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      const userDocRef = doc(db, 'UserAdmin', userData.id);
      if (!(await getDoc(userDocRef)).exists()) {
        await setDoc(userDocRef, { photo: photoURL });
      } else {
        await updateDoc(userDocRef, { photo: photoURL });
      }

      localStorage.setItem(`avatarURL_${userData.id}`, photoURL);
      setPhotoUpload(photoURL);
    } catch (error) {
      console.error('Error uploading photo and saving to Firestore:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setPhotoUpload(null);
        localStorage.removeItem('avatarURL');

        try {
          const userDocRef = doc(db, 'UserAdmin', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(userData);
            setPhotoUpload(localStorage.getItem(`avatarURL_${userData.id}`));
          } else {
            console.log('User document not found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        console.log('No authenticated user.');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // Set the active item based on the current location
    if (location.pathname === '/home') {
      setActiveItem('home');
    } else if (location.pathname === '/dashboard') {
      setActiveItem('dashboard');
    } else {
      setActiveItem(null);
    }
  }, [location]);

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
    onClose(); // Close the drawer when a link is clicked
  };

  return (
    <SwipeableDrawer anchor="left" open={open} onClose={onClose}>
      <div className="drawer-content" role="presentation">
        <div className="drawer-header">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <div className="logo">FortiMac</div>
        </div>
        <div className="avatar-container">
          <label htmlFor="photo-upload" className="avatar">
            <div
              className="avatar-image"
              style={{
                backgroundImage: `url(${photoUpload || ''})`,
              }}
              onMouseEnter={() => setShowUploadButton(true)}
              onMouseLeave={() => setShowUploadButton(false)}
            >
              {showUploadButton && (
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCameraIcon />
                </IconButton>
              )}
            </div>
          </label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="photo-upload"
            type="file"
            onChange={handlePhotoUpload}
          />
        </div>
        <div className="user-info">
          <div className="user-info-text">
            <div className="user-name">{userData ? userData.name : 'Loading...'}</div>
            <div className="user-id">ID: {userData ? userData.id : 'Loading...'}</div>
          </div>
        </div>
        <List>
          <ListItem
            button
            className={`drawer-item ${activeItem === 'home' ? 'active' : ''}`}
            onClick={() => handleMenuItemClick('home')}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link to="/home" className="drawer-link">
              <ListItemText primary="Home" className="drawer-item-text" />
            </Link>
          </ListItem>
          <ListItem
            button
            className={`drawer-item ${activeItem === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleMenuItemClick('dashboard')}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Link to="/dashboard" className="drawer-link">
              <ListItemText primary="Dashboard" className="drawer-item-text" />
            </Link>
          </ListItem>
        </List>
        <ListItem button className="drawer-item sign-out-button" onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" className="drawer-item-text" />
        </ListItem>
      </div>
    </SwipeableDrawer>
  );
};

export default NavDrawer;