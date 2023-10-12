const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  fullname: String,
  studentNumber: String,
  yearLevel: String,
  major: String,
  entryTime: String
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;