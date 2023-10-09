const admin = require('./admin');  // Update with the correct path to your adminConfig.js

// Example function to create a user using the Admin SDK
const createUser = async (email, password) => {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    console.log('Successfully created new user:', userRecord.uid);
  } catch (error) {
    console.error('Error creating new user:', error);
  }
};

// Call the function
createUser('example@example.com', 'password');
