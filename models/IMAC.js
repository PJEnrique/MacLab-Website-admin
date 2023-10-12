const mongoose = require('mongoose');

const IMACSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  timer: {
    type: Number,
    default: 7200
  },
  identifier: {
    type: String,
    required: true
  }
});

const IMAC = mongoose.model('IMAC', IMACSchema);
module.exports = IMAC;