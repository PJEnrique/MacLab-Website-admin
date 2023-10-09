const admin = require('firebase-admin');

const serviceAccount = require('./maclab-auth-399711-firebase-adminsdk-sgs4f-db8b2a6c32.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const isFirebaseAdminLoggedIn = () => {
  // Check if the Firebase Admin SDK is initialized
  return admin.apps.length > 0;
};

module.exports = { admin, isFirebaseAdminLoggedIn };

