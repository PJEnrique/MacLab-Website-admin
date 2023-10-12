const express = require('express');
const IMAC = require('../models/IMAC');
const router = express.Router();
// Create a new MAC
router.post('/post', async (req, res) => {
  try {
    const { id, index, active, timer } = req.body;

    const requestData = { id, index, active, timer };
    const mac = new IMAC(requestData);

    await mac.save();
    res.status(201).json(mac);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all MAC
router.get('/macData', async (req, res) => {
  try {
    const imacData = await IMAC.find();
    res.json(imacData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a MAC
router.put('/MAC/put/:id', async (req, res) => {
  try {
    const MAC = await IMAC.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(MAC);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete a MAC
router.delete('/MAC/delete/:id', async (req, res) => {
  try {
    const MAC = await IMAC.findByIdAndRemove(req.params.id);
    res.json(MAC);
    console.log("deleted successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete All MAC
router.delete('/deleteAll', async (req, res) => {
  try {
    const imacData = await IMAC.deleteMany({});
    res.json(imacData);
    console.log("All data are deleted successfully");
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});


module.exports = router