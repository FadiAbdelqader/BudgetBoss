const mongoose = require('mongoose');

const tobuySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: {type: String, required: true}
});

const Tobuy = mongoose.model('Tobuy', tobuySchema);

module.exports = Tobuy;