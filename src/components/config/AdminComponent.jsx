import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, db } from 'firebase/firestore';

const AdminContent = () => {
  return <div>This is the admin's content.</div>;
};

const RegularUserContent = () => {
  return <div>This is the regular user's content.</div>;
};

const AdminComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the user is an admin
        // For simplicity, let's assume the isAdmin field is stored in Firestore
        const userRef = doc(db, 'UserAdmin', user.uid); // Assuming 'users' collection
        getDoc(userRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setIsAdmin(userData.isAdmin);
            }
          })
          .catch((error) => {
            console.error('Error getting user data:', error);
          });
      } else {
        setIsAdmin(false); // Not logged in
      }
    });

    return () => unsubscribe();
  }, []); // Run once on component mount

  return isAdmin ? <AdminContent /> : <RegularUserContent />;
};

export default AdminComponent;
