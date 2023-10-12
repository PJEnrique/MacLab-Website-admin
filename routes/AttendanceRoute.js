const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

// Create a new MAC
router.post('/post1', async (req, res) => {
  try {
    const { fullname, studentNumber, yearLevel, major, entryTime } = req.body;
    
    const attendanceData = { fullname, studentNumber, yearLevel, major, entryTime };

    const attendance = new Attendance(attendanceData);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all MAC
router.get('/get2', async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an attendance record
router.put('/put1/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(attendance);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete an attendance record
router.delete('/delete1/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndRemove(req.params.id);
    res.json(attendance);
    console.log("Deleted successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete All attendance records
router.delete('/delete1', async (req, res) => {
  try {
    await Attendance.deleteMany({});
    res.json({ message: "All attendance data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;