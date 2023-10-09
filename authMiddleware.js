const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Access denied.');

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access denied.');

  try {
    const verified = jwt.verify(token, 'XI84dO0PLkGSJtlhfjDfZT1AxfiE9QG3nlsVVnwSoRU'); // Replace with your secret key
    req.user = verified; // You can now access user details in the route handlers
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(400).send('Invalid token.');
  }
};

module.exports = verifyToken;

