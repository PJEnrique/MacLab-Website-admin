const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./src/components/config/maclab-auth-399711-firebase-adminsdk-sgs4f-db8b2a6c32.json');
const verifyToken = require('./authMiddleware');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Load the secret key
const secretKey = fs.readFileSync('secret_key.txt', 'utf8').trim();
console.log('Loaded secret key:', secretKey);

const generateToken = () => {
  const tokenLength = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  const generatedToken = jwt.sign({ token }, secretKey, { expiresIn: '2h' });
  console.log('Generated token:', generatedToken);
  return generatedToken;
};

// Protected route using the middleware
app.get('/protectedroute', verifyToken, (req, res) => {
  res.send('This is a protected route.');
});

app.post('/authenticateAdmin', (req, res) => {
  const { email, password } = req.body;

  // Replace with your own admin authentication logic
  if (email === 'pryllejay01@gmail.com' && password === 'Pryllejay01') {
    const token = generateToken();
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Check if Firebase Admin SDK is initialized
if (admin.apps.length > 0) {
  console.log('Firebase Admin SDK is initialized.');
} else {
  console.log('Firebase Admin SDK is not initialized.');
}

app.listen(3500, () => {
  console.log('Server is running on port 3500');
  console.log('Listening Port in 3500');
});