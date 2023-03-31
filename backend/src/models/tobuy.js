const mongoose = require('mongoose');

const tobuySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Tobuy = mongoose.model('Tobuy', tobuySchema);

module.exports = Tobuy;