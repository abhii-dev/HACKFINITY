const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  location: String,
  threshold: { type: Number, default: 5 } // for low stock alerts
});

module.exports = mongoose.model('Equipment', equipmentSchema);
