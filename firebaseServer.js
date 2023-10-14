require('dotenv').config();

const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./src/components/config/maclab-auth-399711-firebase-adminsdk-sgs4f-db8b2a6c32.json');
const cors = require('cors');
const mongoose = require('mongoose');
const MAC = require('./routes/MAC');
const AttendanceRoute = require('./routes/AttendanceRoute');

const app = express();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


app.use(cors({
  origin: ['http://192.168.100.36:3000'],
}));


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});



app.use('/mac', MAC);
app.use('/attendance', AttendanceRoute);

const PORT = process.env.PORT || 3900;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
